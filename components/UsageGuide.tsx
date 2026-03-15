import React from 'react';
import { Search, PenTool, TrendingUp } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const UsageGuide: React.FC = () => {
  const revealRef = useScrollReveal();

  const steps = [
    {
      id: 1,
      title: '진단 (Diagnosis)',
      desc: '조직과 개인의 현재 흐름을 파악합니다.',
      icon: <Search className="w-8 h-8 text-slate-700 dark:text-slate-900" />,
      color: 'bg-brand-pastelCyan',
    },
    {
      id: 2,
      title: '설계 (Design)',
      desc: '최적의 교육과 코칭 로드맵을 그립니다.',
      icon: <PenTool className="w-8 h-8 text-slate-700 dark:text-slate-900" />,
      color: 'bg-brand-pastelBlue',
    },
    {
      id: 3,
      title: '변화 (Change)',
      desc: '실질적인 성장을 경험하고 확장합니다.',
      icon: <TrendingUp className="w-8 h-8 text-slate-700 dark:text-slate-900" />,
      color: 'bg-brand-pastelPurple',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={revealRef}>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-sans">
            사용 가이드
          </h2>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 font-medium font-sans">
            <span className="font-flow text-brand-blue dark:text-brand-pastelCyan">FLOW~</span> 와 함께하는 3단계 변화 프로세스
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-1 bg-gradient-to-r from-brand-pastelCyan via-brand-pastelBlue to-brand-pastelPurple z-0 transform -translate-y-1/2 opacity-50 rounded-full"></div>
          
          {steps.map((step, index) => (
            <div key={step.id} className="relative group z-10">
              <div className={`
                relative p-8 rounded-3xl transition-all duration-300 hover:-translate-y-3
                ${step.color} shadow-xl hover:shadow-2xl border-4 border-white dark:border-slate-800
              `}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-white/60 dark:bg-white/80 rounded-full flex items-center justify-center mb-6 backdrop-blur-md shadow-inner">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3 font-sans tracking-tight">{step.title}</h3>
                  <p className="text-slate-800 text-base font-bold leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsageGuide;
