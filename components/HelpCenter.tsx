import React from 'react';
import { HelpCircle, PlayCircle, FileText, MessageCircle, ChevronRight, ExternalLink } from 'lucide-react';

const HelpCenter: React.FC = () => {
  const faqs = [
    {
      q: "관리자 계정은 어떻게 생성하나요?",
      a: "Firebase 콘솔의 Authentication 메뉴에서 직접 이메일/비밀번호 사용자를 추가하거나, /setup 페이지의 자동 생성 기능을 이용하세요."
    },
    {
      q: "데이터가 실시간으로 반영되지 않아요.",
      a: "인터넷 연결 상태를 확인하고, 브라우저를 새로고침 해보세요. 지속될 경우 Firebase 보안 규칙 설정을 다시 확인해야 합니다."
    },
    {
      q: "CSV 파일 한글이 깨져서 나와요.",
      a: "엑셀에서 열 때 '데이터 > 텍스트/CSV에서' 메뉴를 통해 인코딩을 '65001: 유니코드(UTF-8)'로 설정하여 불러오세요."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-brand-cyan/10 rounded-2xl text-brand-cyan mb-4">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">도움말 센터</h1>
          <p className="text-slate-500 dark:text-slate-400">FLOW Admin 대시보드 사용 중 궁금한 점을 해결해 드립니다.</p>
        </div>

        {/* Video Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800 mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <PlayCircle className="text-brand-cyan" /> 대시보드 사용법 가이드 영상
          </h2>
          <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center group cursor-pointer relative overflow-hidden">
            <img 
              src="https://picsum.photos/seed/admin-guide/1280/720" 
              alt="Video Thumbnail" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <PlayCircle size={32} className="text-brand-cyan ml-1" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="font-bold text-lg">Admin Dashboard Walkthrough</p>
              <p className="text-sm opacity-80">기본 기능부터 데이터 관리까지 5분 만에 마스터하기</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <a href="/FIREBASE_SETUP.md" target="_blank" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-brand-cyan transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-500">
                <FileText size={24} />
              </div>
              <ExternalLink size={16} className="text-slate-300 group-hover:text-brand-cyan" />
            </div>
            <h3 className="font-bold mb-1">Firebase 설정 가이드</h3>
            <p className="text-xs text-slate-500">프로젝트 생성부터 API 연동까지</p>
          </a>
          <a href="/ADMIN_GUIDE.md" target="_blank" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-brand-cyan transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-500">
                <ChevronRight size={24} />
              </div>
              <ExternalLink size={16} className="text-slate-300 group-hover:text-brand-cyan" />
            </div>
            <h3 className="font-bold mb-1">대시보드 상세 매뉴얼</h3>
            <p className="text-xs text-slate-500">각 탭별 기능 및 데이터 활용법</p>
          </a>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-6 px-2">자주 묻는 질문 (FAQ)</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="text-brand-cyan font-black">Q.</span> {faq.q}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 p-8 bg-brand-cyan/5 rounded-3xl border border-brand-cyan/20 text-center">
          <h3 className="font-bold mb-2">추가 도움이 필요하신가요?</h3>
          <p className="text-sm text-slate-500 mb-6">기술적인 문제나 커스텀 기능 문의는 아래 메일로 연락주세요.</p>
          <a href="mailto:rescuemyself@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-cyan text-white rounded-xl font-bold hover:bg-brand-blue transition-all">
            <MessageCircle size={18} /> 기술 지원 문의하기
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
