import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  Users, MessageSquare, Activity, LogOut, Calendar, Search, Filter, 
  ChevronRight, ArrowUpRight, ArrowDownRight, LayoutDashboard, List,
  Download, RefreshCw, Bell, User as UserIcon, Phone, Mail
} from 'lucide-react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo?: any[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const AdminDashboard: React.FC = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [diagnostics, setDiagnostics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'diagnostics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    // Real-time Inquiries
    const inquiriesQuery = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubscribeInquiries = onSnapshot(inquiriesQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt?.toDate() || new Date()
        };
      });
      setInquiries(data);
      setLastUpdated(new Date());
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'inquiries');
    });

    // Real-time Diagnostics
    const diagnosticsQuery = query(collection(db, 'diagnostics'), orderBy('createdAt', 'desc'));
    const unsubscribeDiagnostics = onSnapshot(diagnosticsQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt?.toDate() || new Date()
        };
      });
      setDiagnostics(data);
      setLastUpdated(new Date());
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'diagnostics');
    });

    return () => {
      unsubscribeInquiries();
      unsubscribeDiagnostics();
    };
  }, []);

  const handleLogout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      await signOut(auth);
      navigate('/admin/login');
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]).filter(k => k !== 'id' && k !== 'createdAt');
    const csvRows = [
      ['Date', ...headers].join(','),
      ...data.map(row => {
        const date = row.createdAt.toISOString();
        const values = headers.map(header => {
          const val = row[header];
          return typeof val === 'object' ? `"${JSON.stringify(val).replace(/"/g, '""')}"` : `"${String(val).replace(/"/g, '""')}"`;
        });
        return [date, ...values].join(',');
      })
    ];
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats Calculation
  const totalInquiries = inquiries.length;
  const totalDiagnostics = diagnostics.length;
  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const recentInquiries = inquiries.filter(i => i.createdAt >= oneWeekAgo).length;
  const recentDiagnostics = diagnostics.filter(d => d.createdAt >= oneWeekAgo).length;

  // Chart Data Preparation
  const getDailyTrend = (data: any[]) => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
    }).reverse();

    const counts: {[key: string]: number} = {};
    data.forEach(item => {
      const date = item.createdAt.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
      if (last7Days.includes(date)) {
        counts[date] = (counts[date] || 0) + 1;
      }
    });

    return last7Days.map(date => ({ name: date, count: counts[date] || 0 }));
  };

  const trendData = getDailyTrend(inquiries);

  const getTypeDistribution = () => {
    const counts: {[key: string]: number} = {};
    diagnostics.forEach(item => {
      const type = item.type || '기타';
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.keys(counts).map(type => ({ name: type, value: counts[type] }));
  };

  const typeDistributionData = getTypeDistribution();
  const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

  const filteredInquiries = inquiries.filter(i => 
    i.name?.includes(searchTerm) || 
    i.company?.includes(searchTerm) || 
    i.contact?.includes(searchTerm) ||
    i.course?.includes(searchTerm)
  );

  const filteredDiagnostics = diagnostics.filter(d => 
    d.name?.includes(searchTerm) || 
    d.type?.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-cyan"></div>
          <p className="text-slate-500 font-medium animate-pulse">데이터를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-sans">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden lg:flex flex-col z-50">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-cyan rounded-lg flex items-center justify-center text-white font-bold">F</div>
          <h1 className="text-xl font-bold tracking-tight">FLOW Admin</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 mb-2">Main Menu</div>
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-brand-cyan text-white shadow-lg shadow-brand-cyan/20 font-bold' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            <LayoutDashboard size={20} />
            대시보드 홈
          </button>
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inquiries' ? 'bg-brand-cyan text-white shadow-lg shadow-brand-cyan/20 font-bold' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            <MessageSquare size={20} />
            문의 관리
          </button>
          <button 
            onClick={() => setActiveTab('diagnostics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'diagnostics' ? 'bg-brand-cyan text-white shadow-lg shadow-brand-cyan/20 font-bold' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            <Activity size={20} />
            진단 결과
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center">
              <UserIcon size={16} className="text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">임정훈 소장</p>
              <p className="text-[10px] text-slate-500 truncate">Administrator</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all text-sm font-medium"
          >
            <LogOut size={18} />
            로그아웃
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-40 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              {activeTab === 'overview' ? '대시보드 개요' : activeTab === 'inquiries' ? '문의 내역 관리' : '진단 결과 분석'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
              <RefreshCw size={10} className={loading ? 'animate-spin' : ''} />
              Last Updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="검색어를 입력하세요..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-cyan transition-all w-64"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
              <Bell size={20} />
              {recentInquiries > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>}
            </button>
          </div>
        </header>

        <main className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 group hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl text-cyan-600 group-hover:scale-110 transition-transform">
                      <MessageSquare size={24} />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">최근 7일</span>
                      <span className="text-xs font-bold text-green-500 flex items-center gap-1">
                        <ArrowUpRight size={14} /> {recentInquiries}건
                      </span>
                    </div>
                  </div>
                  <h3 className="text-slate-500 text-sm font-medium">총 문의 건수</h3>
                  <p className="text-4xl font-black mt-1 tracking-tight">{totalInquiries}</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 group hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform">
                      <Activity size={24} />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">최근 7일</span>
                      <span className="text-xs font-bold text-green-500 flex items-center gap-1">
                        <ArrowUpRight size={14} /> {recentDiagnostics}건
                      </span>
                    </div>
                  </div>
                  <h3 className="text-slate-500 text-sm font-medium">총 진단 참여</h3>
                  <p className="text-4xl font-black mt-1 tracking-tight">{totalDiagnostics}</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 group hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl text-amber-600 group-hover:scale-110 transition-transform">
                      <Users size={24} />
                    </div>
                  </div>
                  <h3 className="text-slate-500 text-sm font-medium">전환율 (진단→문의)</h3>
                  <p className="text-4xl font-black mt-1 tracking-tight">
                    {totalDiagnostics > 0 ? ((totalInquiries / totalDiagnostics) * 100).toFixed(1) : 0}%
                  </p>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-bold">주간 문의 유입 현황</h3>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-brand-cyan"></span> 신규 문의
                      </span>
                    </div>
                  </div>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <defs>
                          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                        />
                        <Area type="monotone" dataKey="count" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <h3 className="text-lg font-bold mb-8">진단 유형 분포</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={typeDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          {typeDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                          ))}
                        </Pie>
                        <Tooltip 
                           contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '20px'}} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Recent Inquiries Section */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">최근 문의 내역</h3>
                    <p className="text-xs text-slate-500 mt-1">실시간으로 접수되는 신규 문의입니다.</p>
                  </div>
                  <button onClick={() => setActiveTab('inquiries')} className="px-4 py-2 text-sm text-brand-cyan font-bold bg-brand-cyan/10 rounded-xl hover:bg-brand-cyan/20 transition-all">전체 보기</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-700/30 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="px-8 py-4">담당자 / 회사</th>
                        <th className="px-8 py-4">연락처 정보</th>
                        <th className="px-8 py-4">관심 과정</th>
                        <th className="px-8 py-4">접수 일시</th>
                        <th className="px-8 py-4 text-right">상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {inquiries.slice(0, 5).map((inquiry) => (
                        <tr key={inquiry.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="font-bold text-slate-900 dark:text-white group-hover:text-brand-cyan transition-colors">{inquiry.name}</div>
                            <div className="text-slate-500 text-xs">{inquiry.company}</div>
                          </td>
                          <td className="px-8 py-5 text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2"><Phone size={12} /> {inquiry.contact}</div>
                            <div className="flex items-center gap-2 text-xs opacity-70"><Mail size={12} /> {inquiry.email}</div>
                          </td>
                          <td className="px-8 py-5">
                            <span className="px-3 py-1 bg-brand-cyan/10 text-brand-cyan rounded-full text-[11px] font-bold">
                              {inquiry.course || '일반 문의'}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-slate-500">
                            <div className="font-medium">{inquiry.createdAt.toLocaleDateString()}</div>
                            <div className="text-[10px] opacity-60">{inquiry.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> 신규
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'inquiries' || activeTab === 'diagnostics') && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative w-full md:w-96 lg:hidden">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="검색..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                  />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => exportToCSV(activeTab === 'inquiries' ? inquiries : diagnostics, activeTab)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
                  >
                    <Download size={16} /> CSV 내보내기
                  </button>
                  <button 
                    onClick={() => window.location.reload()}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-brand-cyan text-white rounded-xl text-sm font-bold hover:bg-brand-blue transition-all"
                  >
                    <RefreshCw size={16} /> 새로고침
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-700/30 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                      {activeTab === 'inquiries' ? (
                        <tr>
                          <th className="px-8 py-4">접수 일시</th>
                          <th className="px-8 py-4">회사명</th>
                          <th className="px-8 py-4">담당자</th>
                          <th className="px-8 py-4">연락처/이메일</th>
                          <th className="px-8 py-4">관심 과정</th>
                          <th className="px-8 py-4">문의 내용</th>
                        </tr>
                      ) : (
                        <tr>
                          <th className="px-8 py-4">참여 일시</th>
                          <th className="px-8 py-4">이름</th>
                          <th className="px-8 py-4">진단 유형</th>
                          <th className="px-8 py-4">점수</th>
                          <th className="px-8 py-4">결과 PDF</th>
                        </tr>
                      )}
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {activeTab === 'inquiries' ? (
                        filteredInquiries.map((inquiry) => (
                          <tr key={inquiry.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                            <td className="px-8 py-5 text-slate-500 whitespace-nowrap">
                              <div className="font-medium">{inquiry.createdAt.toLocaleDateString()}</div>
                              <div className="text-[10px] opacity-60">{inquiry.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                            </td>
                            <td className="px-8 py-5 font-bold text-slate-900 dark:text-white">{inquiry.company}</td>
                            <td className="px-8 py-5 text-slate-700 dark:text-slate-300">{inquiry.name}</td>
                            <td className="px-8 py-5 text-slate-500">
                              <div className="flex items-center gap-2"><Phone size={12} /> {inquiry.contact}</div>
                              <div className="flex items-center gap-2 text-xs opacity-70"><Mail size={12} /> {inquiry.email}</div>
                            </td>
                            <td className="px-8 py-5">
                              <span className="px-3 py-1 bg-brand-cyan/10 text-brand-cyan rounded-full text-[11px] font-bold">
                                {inquiry.course || '일반 문의'}
                              </span>
                            </td>
                            <td className="px-8 py-5 text-slate-500 max-w-xs truncate" title={inquiry.issues}>
                              {inquiry.issues || '-'}
                            </td>
                          </tr>
                        ))
                      ) : (
                        filteredDiagnostics.map((diag) => (
                          <tr key={diag.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                            <td className="px-8 py-5 text-slate-500 whitespace-nowrap">
                              <div className="font-medium">{diag.createdAt.toLocaleDateString()}</div>
                              <div className="text-[10px] opacity-60">{diag.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                            </td>
                            <td className="px-8 py-5 font-bold text-slate-900 dark:text-white">{diag.name || '익명'}</td>
                            <td className="px-8 py-5 text-slate-700 dark:text-slate-300">{diag.type}</td>
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-brand-cyan" 
                                    style={{width: `${(diag.results?.score || 0) * 20}%`}}
                                  ></div>
                                </div>
                                <span className="font-bold text-brand-cyan">{diag.results?.score ? Number(diag.results.score).toFixed(1) : '-'}</span>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              {diag.pdfUrl ? (
                                <a 
                                  href={diag.pdfUrl} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-brand-cyan hover:text-white transition-all"
                                >
                                  <Download size={12} /> PDF 보기
                                </a>
                              ) : (
                                <span className="text-slate-400 text-xs">-</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  {(activeTab === 'inquiries' ? filteredInquiries : filteredDiagnostics).length === 0 && (
                    <div className="p-20 text-center">
                      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search size={24} className="text-slate-300" />
                      </div>
                      <p className="text-slate-500 font-medium">검색 결과가 없습니다.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

