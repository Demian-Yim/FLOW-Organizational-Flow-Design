import React from 'react';
import { Sparkles, Zap, Star, Code, Cpu, Target, Users } from 'lucide-react';

const Marquee: React.FC = () => {
  // Row 1: Tech & AI Focus (Background: Cyan) - Professional Look
  const row1 = [
    { text: "AI 코칭", highlight: false },
    { text: "프롬프트 엔지니어링", highlight: true, icon: <Code size={22} className="mr-2" /> },
    { text: "AI 티칭", highlight: false },
    { text: "업무 자동화", highlight: true, icon: <Zap size={22} className="mr-2" /> },
    { text: "디지털 전환 (DX)", highlight: false },
    { text: "생성형 AI", highlight: true, icon: <Sparkles size={22} className="mr-2" /> },
    { text: "데이터 리터러시", highlight: false },
    { text: "노코드 개발", highlight: true, icon: <Cpu size={22} className="mr-2" /> },
    { text: "Flow Design", highlight: false },
  ];

  // Row 2: Culture & People Focus (Background: Dark) - Professional Look
  const row2 = [
    { text: "조직문화", highlight: true, color: "text-brand-cyan", icon: <Sparkles size={22} className="mr-2 text-brand-cyan" /> },
    { text: "리더십", highlight: false },
    { text: "일하는 방식 (WoW)", highlight: true, color: "text-green-400", icon: <Zap size={22} className="mr-2 text-green-400" /> },
    { text: "심리적 안전감", highlight: false },
    { text: "리스킬링 & 업스킬링", highlight: true, color: "text-yellow-400", icon: <Target size={22} className="mr-2 text-yellow-400" /> },
    { text: "문제해결", highlight: false },
    { text: "팀빌딩", highlight: true, color: "text-pink-400", icon: <Users size={22} className="mr-2 text-pink-400" /> },
    { text: "소통 (Communication)", highlight: false },
  ];

  const renderRow1 = (items: typeof row1) => (
    <>
        {items.map((item, idx) => (
            <div key={idx} className="flex items-center mx-8 lg:mx-12">
                {item.highlight ? (
                    <div className="flex items-center px-5 py-1.5 bg-slate-900 rounded-full text-brand-cyan shadow-lg transform hover:scale-105 transition-transform duration-300 border border-slate-700">
                        {item.icon}
                        <span className="font-sans font-bold text-lg md:text-xl tracking-tight whitespace-nowrap">
                            {item.text}
                        </span>
                    </div>
                ) : (
                    <span className="font-sans font-bold text-lg md:text-xl text-slate-800/70 tracking-tight whitespace-nowrap">
                        {item.text}
                    </span>
                )}
            </div>
        ))}
    </>
  );

  const renderRow2 = (items: typeof row2) => (
    <>
        {items.map((item, idx) => (
            <div key={idx} className="flex items-center mx-8 lg:mx-12">
                 {item.highlight ? (
                    <div className={`flex items-center px-0 py-1.5 ${item.color} transform hover:scale-105 transition-transform duration-300`}>
                        {item.icon}
                        <span className="font-sans font-bold text-lg md:text-xl tracking-tight border-b-2 border-current pb-0.5 whitespace-nowrap">
                            {item.text}
                        </span>
                    </div>
                ) : (
                    <span className="font-sans font-medium text-lg md:text-xl text-gray-500 tracking-tight whitespace-nowrap">
                        {item.text}
                    </span>
                )}
            </div>
        ))}
    </>
  );

  return (
    <div className="relative z-20 shadow-xl border-y-0 overflow-hidden transform -skew-y-1 my-16 bg-transparent select-none">
      
      {/* Row 1: Cyan Background - Clean & Structured */}
      <div className="bg-brand-cyan py-6 overflow-hidden relative shadow-md border-b border-white/10">
        <div className="animate-marquee flex whitespace-nowrap items-center">
             {renderRow1([...row1, ...row1, ...row1, ...row1])}
        </div>
      </div>

      {/* Row 2: Dark Background - High Contrast & Modern */}
      <div className="bg-slate-900 py-6 overflow-hidden relative shadow-md">
        <div className="animate-marquee flex whitespace-nowrap items-center" style={{ animationDirection: 'reverse', animationDuration: '50s' }}>
             {renderRow2([...row2, ...row2, ...row2, ...row2])}
        </div>
      </div>

    </div>
  );
};

export default Marquee;