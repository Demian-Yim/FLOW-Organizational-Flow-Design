import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Linkedin, Facebook, Instagram } from 'lucide-react';

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
        
        <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Social Media</h3>
            <div className="flex justify-center gap-6">
                <a 
                  href="https://www.linkedin.com/in/%EC%A0%95%ED%9B%88-%EC%9E%84-23ab981aa/" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="LinkedIn"
                  className="w-12 h-12 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                >
                    <Linkedin size={24} />
                </a>
                <a 
                  href="https://www.facebook.com/Rescuemyself7" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Facebook"
                  className="w-12 h-12 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                >
                    <Facebook size={24} />
                </a>
                <a 
                  href="https://www.instagram.com/demian_yim/" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Instagram"
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                >
                    <Instagram size={24} />
                </a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Process;