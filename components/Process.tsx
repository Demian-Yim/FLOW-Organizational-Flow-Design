import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const Process: React.FC = () => {
  const revealRef = useScrollReveal();
  const revealRef2 = useScrollReveal();

  const steps = [
    { id: 1, title: '니즈 파악 미팅', desc: '조직의 현황과 요구사항을 분석합니다.', color: 'bg-brand-cyan' },
    { id: 2, title: '맞춤 커리큘럼 설계', desc: 'Flow Design 기반 최적의 과정을 설계합니다.', color: 'bg-brand-blue' },
    { id: 3, title: '교육 실행 & 피드백', desc: '전문적인 강의 진행 및 실시간 피드백을 제공합니다.', color: 'bg-brand-purple' },
    { id: 4, title: '후속 지원 & 팔로업', desc: '현업 적용을 위한 가이드 및 후속 지원을 합니다.', color: 'bg-green-500' },
  ];

  return (
    <section id="process" className="py-24 bg-gray-100 dark:bg-slate-800 transition-colors duration-300 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" ref={revealRef}>
          <span className="text-brand-cyan font-bold tracking-wider uppercase">PROCESS</span>
          <h2 className="text-4xl font-bold mt-2 mb-6 text-slate-900 dark:text-white">교육 진행 프로세스</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4" ref={revealRef2}>
          {steps.map((step) => (
            <div key={step.id} className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md relative overflow-hidden group hover:-translate-y-1 transition-transform">
                <div className="absolute -right-4 -top-4 text-9xl font-black text-gray-100 dark:text-slate-800 opacity-50 z-0 select-none">
                    {step.id}
                </div>
                <div className="relative z-10">
                    <div className={`w-12 h-12 ${step.color} text-white flex items-center justify-center rounded-full mb-4 text-xl font-bold`}>
                        {step.id}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{step.title}</h3>
                    <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;