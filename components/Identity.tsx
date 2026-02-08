import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Sparkles, Zap, Target, PenTool, RefreshCw, Waves, Link2, Lightbulb } from 'lucide-react';

const Identity: React.FC = () => {
  const revealRef = useScrollReveal();
  const revealRef2 = useScrollReveal();
  const revealRef3 = useScrollReveal();

  return (
    <section id="intro" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors scroll-mt-20">
      {/* Texture & Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Message */}
        <div className="text-center mb-20" ref={revealRef}>
          <div className="inline-block px-4 py-1.5 border-2 border-brand-cyan rounded-full font-black text-sm text-brand-cyan mb-6 tracking-widest uppercase">
            Why FLOW~?
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 dark:text-white leading-tight">
            흐름을 설계하고,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-600">성장을 연결합니다.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            <span className="block mb-2 text-slate-500 dark:text-slate-400 font-bold">"교육을 넘어, 조직의 변화를 디자인합니다."</span>
            <span className="block h-px w-20 bg-gray-300 mx-auto my-6"></span>
            현업의 문제를 함께 고민하고 해결하며,<br className="hidden md:block" />
            조직과 구성원이 몰입할 수 있는 <strong className="text-slate-900 dark:text-white bg-brand-cyan/10 px-1">최적의 흐름(Flow)</strong>을 만듭니다.
          </p>
        </div>

        {/* Differentiation Points (Renamed & Enhanced) */}
        <div className="grid md:grid-cols-3 gap-8 mb-24" ref={revealRef2}>
            {/* Card 1: FLOW DESIGN */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-brand-cyan/20"></div>
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-brand-cyan text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                        <Waves size={32} fill="currentColor" className="text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight">FLOW DESIGN</h3>
                    <p className="text-brand-cyan font-bold text-sm mb-4">최적의 흐름 설계</p>
                    <div className="w-12 h-1.5 bg-brand-cyan mb-6 rounded-full"></div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                        "막힘없는 업무와 소통의 흐름을 설계합니다."<br/><br/>
                        단절된 프로세스를 잇고 불필요한 장벽을 걷어냅니다. 조직과 개인이 온전히 일에 <strong>몰입(Flow)</strong>할 수 있는 환경을 만듭니다.
                    </p>
                </div>
            </div>

            {/* Card 2: GROWTH BRIDGE */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-purple-500/20"></div>
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-purple-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg -rotate-3 group-hover:rotate-0 transition-transform">
                        <Link2 size={32} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight">GROWTH BRIDGE</h3>
                    <p className="text-purple-500 font-bold text-sm mb-4">성장의 연결고리</p>
                    <div className="w-12 h-1.5 bg-purple-500 mb-6 rounded-full"></div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                        "현업의 이슈를 해결하며 성장을 연결합니다."<br/><br/>
                        문제를 상상하고, 실행하고, 확장합니다. 업무 환경을 개선하여 <strong>조직의 목표 달성이 구성원의 구체적인 성장</strong>으로 이어지도록 지원합니다.
                    </p>
                </div>
            </div>

            {/* Card 3: REAL SOLUTION */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-yellow-500/20"></div>
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-yellow-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                        <Lightbulb size={32} className="text-white fill-white/20" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight">REAL SOLUTION</h3>
                    <p className="text-yellow-500 font-bold text-sm mb-4">현장 중심 솔루션</p>
                    <div className="w-12 h-1.5 bg-yellow-500 mb-6 rounded-full"></div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                        "이론가가 아닌, 현장의 문제 해결사입니다."<br/><br/>
                        1,400명 조직 HRD 총괄 경험을 가진 실무자입니다. 상황을 정확히 판단하고, <strong>현장에 즉시 적용 가능한 실질적인 해답</strong>을 제시합니다.
                    </p>
                </div>
            </div>
        </div>

        {/* 3-Axis Approach Title */}
        <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">FLOW~ Solution Approach</h3>
        </div>

        {/* 3-Axis Approach - Enhanced Cards */}
        <div className="grid md:grid-cols-3 gap-6" ref={revealRef3}>
          {/* Card 1 */}
          <div className="group relative bg-slate-100 dark:bg-slate-800 p-8 rounded-tr-[3rem] rounded-bl-[3rem] shadow-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden border-l-8 border-brand-blue">
            <div className="relative z-10">
                <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mb-6 shadow-sm">
                   <Target className="text-3xl text-brand-blue" />
                </div>
                <h4 className="text-2xl font-black mb-2 text-slate-900 dark:text-white">AI Coaching</h4>
                <p className="text-brand-blue font-bold mb-4 text-xs tracking-wider uppercase">Role & Judgment</p>
                <p className="text-gray-600 dark:text-gray-300">
                "AI를 어떻게 쓸까?"보다<br/> 
                <strong>"누가 무엇을 판단할까?"</strong>를<br/> 
                먼저 정의합니다.
                </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-slate-100 dark:bg-slate-800 p-8 rounded-tl-[3rem] rounded-br-[3rem] shadow-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden border-l-8 border-brand-cyan">
            <div className="relative z-10">
                <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mb-6 shadow-sm">
                   <PenTool className="text-3xl text-brand-cyan" />
                </div>
                <h4 className="text-2xl font-black mb-2 text-slate-900 dark:text-white">AI Teaching</h4>
                <p className="text-brand-cyan font-bold mb-4 text-xs tracking-wider uppercase">Understanding & Skill</p>
                <p className="text-gray-600 dark:text-gray-300">
                단순 기능 습득이 아닌,<br/> 
                <strong>"왜 이 도구를 쓰는가?"</strong>에 대한<br/> 
                근본적 이해를 돕습니다.
                </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-slate-100 dark:bg-slate-800 p-8 rounded-tr-[3rem] rounded-bl-[3rem] shadow-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden border-l-8 border-orange-500">
            <div className="relative z-10">
                <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mb-6 shadow-sm">
                   <RefreshCw className="text-3xl text-orange-500" />
                </div>
                <h4 className="text-2xl font-black mb-2 text-slate-900 dark:text-white">AI Facilitation</h4>
                <p className="text-orange-500 font-bold mb-4 text-xs tracking-wider uppercase">Process & Change</p>
                <p className="text-gray-600 dark:text-gray-300">
                사람-일-AI 사이의<br/> 
                <strong>흐름을 시각화하고 조정</strong>하여<br/> 
                실질적인 변화를 만듭니다.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Identity;