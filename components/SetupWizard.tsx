import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, CheckCircle2, AlertCircle, Copy, Save, Database, ShieldCheck, Key } from 'lucide-react';
import { seedSampleData } from '../utils/seedData';

const SetupWizard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    apiKey: localStorage.getItem('VITE_FIREBASE_API_KEY') || '',
    authDomain: localStorage.getItem('VITE_FIREBASE_AUTH_DOMAIN') || '',
    projectId: localStorage.getItem('VITE_FIREBASE_PROJECT_ID') || '',
    storageBucket: localStorage.getItem('VITE_FIREBASE_STORAGE_BUCKET') || '',
    messagingSenderId: localStorage.getItem('VITE_FIREBASE_MESSAGING_SENDER_ID') || '',
    appId: localStorage.getItem('VITE_FIREBASE_APP_ID') || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    Object.entries(config).forEach(([key, value]) => {
      localStorage.setItem(`VITE_FIREBASE_${key.toUpperCase().replace(/([A-Z])/g, '_$1')}`, value);
    });
    
    setTimeout(() => {
      setIsSaving(false);
      setStep(2);
    }, 1000);
  };

  const handleSeed = async () => {
    setIsSeeding(true);
    const success = await seedSampleData();
    setIsSeeding(false);
    if (success) {
      alert('테스트 계정 및 샘플 데이터가 성공적으로 생성되었습니다!');
      navigate('/admin/login');
    } else {
      alert('데이터 생성 중 오류가 발생했습니다. Firebase 설정을 먼저 확인해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 font-sans">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-cyan to-brand-blue p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="animate-spin-slow" size={24} />
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Setup Wizard</span>
          </div>
          <h1 className="text-3xl font-black">Firebase 자동 설정 마법사</h1>
          <p className="mt-2 opacity-90 text-sm">대시보드 운영을 위한 환경을 1분 만에 구축합니다.</p>
        </div>

        <div className="p-8">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0"></div>
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= s ? 'bg-brand-cyan text-white shadow-lg shadow-brand-cyan/30' : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700'
                }`}
              >
                {step > s ? <CheckCircle2 size={20} /> : s}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-700 dark:text-blue-300 text-sm">
                <Key size={20} />
                <p>Firebase 콘솔의 <strong>Project Settings &gt; General</strong> 하단에서 웹 앱 설정값을 복사해 입력하세요.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(config).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">{key}</label>
                    <input 
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleChange}
                      placeholder={`Enter ${key}...`}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-cyan outline-none transition-all"
                    />
                  </div>
                ))}
              </div>

              <button 
                onClick={handleSave}
                disabled={!config.apiKey || isSaving}
                className="w-full py-4 bg-brand-cyan text-white font-black rounded-2xl shadow-lg shadow-brand-cyan/20 hover:bg-brand-blue transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSaving ? '설정 저장 중...' : '설정 저장 및 다음 단계'}
                <Save size={20} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                  <ShieldCheck size={40} />
                </div>
                <h2 className="text-xl font-bold">인증 및 데이터베이스 준비</h2>
                <p className="text-slate-500 text-sm mt-2">테스트 계정과 샘플 데이터를 생성하여 대시보드를 즉시 체험해보세요.</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-brand-cyan rounded-full"></div>
                  <span>테스트 계정: <strong>test@flow.com</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-brand-cyan rounded-full"></div>
                  <span>비밀번호: <strong>Test123!!</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-brand-cyan rounded-full"></div>
                  <span>샘플 문의 10건 & 진단 데이터 10건</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  이전으로
                </button>
                <button 
                  onClick={handleSeed}
                  disabled={isSeeding}
                  className="flex-[2] py-4 bg-brand-cyan text-white font-black rounded-2xl shadow-lg shadow-brand-cyan/20 hover:bg-brand-blue transition-all flex items-center justify-center gap-2"
                >
                  {isSeeding ? '데이터 생성 중...' : '테스트 데이터 생성'}
                  <Database size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
