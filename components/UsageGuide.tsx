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
    <section className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={revealRef}>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            FLOW~ 이용 가이드
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            3단계로 완성되는 조직의 변화
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-200 dark:bg-slate-700 z-0 transform -translate-y-1/2"></div>
              )}
              
              <div className={`
                relative z-10 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2
                ${step.color} shadow-lg hover:shadow-xl
              `}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed">
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
