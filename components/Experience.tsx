import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import AICompetency from './tools/AICompetency';
import StressDiagnosis from './tools/StressDiagnosis';
import LeadershipArchitect from './tools/LeadershipArchitect';
import { ArrowRight } from 'lucide-react';

const Experience: React.FC = () => {
  const [openTool, setOpenTool] = useState<'AI' | 'Stress' | 'Leadership' | null>(null);
  const revealRef = useScrollReveal();
  const revealRef2 = useScrollReveal();

  const tools = [
    {
      id: 'AI',
      number: '01',
      title: 'AI 활용 역량 진단',
      engTitle: 'AI COMPETENCY TEST',
      desc: '3분 만에 당신의 AI 활용 수준을 진단하고, 맞춤형 코칭 가이드를 받아보세요.',
      features: ['이해/활용/비판 3개 영역 정밀 진단', 'Gemini AI의 실시간 피드백', '레벨별 맞춤 솔루션 제공'],
      theme: 'yellow',
    },
    {
      id: 'Stress',
      number: '02',
      title: '스트레스 정밀 진단',
      engTitle: 'STRESS DIAGNOSIS',
      desc: '업무와 삶에서 오는 스트레스의 원인과 증상을 분석하여 솔루션을 제안합니다.',
      features: ['원인(Stressors) 및 반응 정밀 분석', '브루탈리즘 스타일의 직관적 UX', '구체적인 힐링 프로토콜 제시'],
      theme: 'blue',
    },
    {
      id: 'Leadership',
      number: '03',
      title: '리더십 스타일 진단',
      engTitle: 'LEADERSHIP STYLE DIAGNOSIS',
      desc: '당신의 리더십 스타일을 입체적으로 진단하고, 3D 청사진으로 시각화합니다.',
      features: ['6가지 전략적 질문을 통한 유형 분석', '건축적 메타포를 활용한 3D 리포트', '개인 소장용 PDF 다운로드'],
      theme: 'white',
    },
  ];

  return (
    <section id="experience" className="py-24 bg-white dark:bg-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16" ref={revealRef}>
          <span className="text-brand-cyan font-bold tracking-wider uppercase">EXPERIENCE</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 mb-6 text-slate-900 dark:text-white">
            5분 무료 진단
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            데이터와 AI를 통해 나를 객관적으로 파악해보세요.<br/>
            FLOW~가 개발한 3가지 진단 도구를 무료로 체험하실 수 있습니다.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid md:grid-cols-3 gap-8" ref={revealRef2}>
          {tools.map((tool) => {
            // Theme Styles
            let cardStyle = '';
            let numStyle = '';
            let textPrimary = '';
            let textSecondary = '';
            let bulletColor = '';
            let btnStyle = '';

            if (tool.theme === 'yellow') {
              cardStyle = 'bg-[#FCD34D] border-4 border-slate-900';
              numStyle = 'text-slate-900 opacity-10';
              textPrimary = 'text-slate-900';
              textSecondary = 'text-slate-800';
              bulletColor = 'bg-slate-900';
              btnStyle = 'text-slate-900 border-slate-900 hover:bg-slate-900 hover:text-[#FCD34D]';
            } else if (tool.theme === 'blue') {
              cardStyle = 'bg-[#1e3a8a] border-4 border-slate-900';
              numStyle = 'text-white opacity-10';
              textPrimary = 'text-white';
              textSecondary = 'text-gray-300';
              bulletColor = 'bg-brand-cyan';
              btnStyle = 'text-white border-white hover:bg-white hover:text-[#1e3a8a]';
            } else { // white
              cardStyle = 'bg-white border-4 border-slate-900';
              numStyle = 'text-slate-300 opacity-30';
              textPrimary = 'text-slate-900';
              textSecondary = 'text-gray-600';
              bulletColor = 'bg-slate-900';
              btnStyle = 'text-slate-900 border-slate-900 hover:bg-slate-900 hover:text-white';
            }

            return (
              <div 
                key={tool.id}
                onClick={() => setOpenTool(tool.id as any)}
                className={`relative p-8 rounded-xl shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer group flex flex-col h-full min-h-[420px] ${cardStyle}`}
              >
                {/* Background Number (Larger & Abstract) */}
                <div className={`absolute -top-6 -right-6 text-[180px] font-black select-none pointer-events-none leading-none z-0 ${numStyle}`} style={{ fontFamily: 'Impact, sans-serif' }}>
                  {tool.number}
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col pt-4">
                  <h3 className={`text-2xl font-black uppercase mb-2 tracking-tight ${textPrimary}`}>
                    {tool.engTitle}
                  </h3>
                  <div className={`w-16 h-2 mb-6 ${bulletColor}`}></div>
                  
                  <p className={`text-3xl font-black mb-6 leading-tight break-keep ${textPrimary}`}>
                    {tool.title}
                  </p>
                  
                  <p className={`text-base font-medium mb-8 leading-relaxed ${textSecondary}`}>
                    {tool.desc}
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className={`text-sm font-bold flex items-start ${textSecondary}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0 ${bulletColor}`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <div className={`mt-auto w-full py-4 px-4 border-4 font-black text-lg text-center flex items-center justify-center gap-2 transition-colors uppercase tracking-wider shadow-sm ${btnStyle}`}>
                    진단 시작하기 <ArrowRight size={20} strokeWidth={3} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modals */}
      {openTool === 'AI' && <AICompetency onClose={() => setOpenTool(null)} />}
      {openTool === 'Stress' && <StressDiagnosis onClose={() => setOpenTool(null)} />}
      {openTool === 'Leadership' && <LeadershipArchitect onClose={() => setOpenTool(null)} />}

    </section>
  );
};

export default Experience;