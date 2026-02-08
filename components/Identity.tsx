import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Sparkles, Puzzle, Zap, Target, PenTool, RefreshCw } from 'lucide-react';

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
            FLOW~는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-600">다릅니다.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            복잡한 보고 체계도, 형식적인 절차도 없습니다.<br/>
            <strong className="text-slate-900 dark:text-white">오직 당신의 조직을 위한 최적의 해답</strong>만을 다이렉트로 제안합니다.
          </p>
        </div>

        {/* Differentiation Points (Agility, Custom, Insight) */}
        <div className="grid md:grid-cols-3 gap-8 mb-24" ref={revealRef2}>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-brand-cyan/20"></div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-brand-cyan text-white rounded-xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                        <Zap size={24} fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Agility</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        대행사를 거치지 않습니다.<br/>
                        대표가 직접 진단하고, 설계하고, 강의합니다.<br/>
                        니즈 파악부터 실행까지 가장 빠르고 정확합니다.
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-purple-500/20"></div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-purple-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg -rotate-3 group-hover:rotate-0 transition-transform">
                        <Puzzle size={24} fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Custom-Fit</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        기성품 교육을 납품하지 않습니다.<br/>
                        조직의 산업군, 직무, 문화를 깊이 이해하고<br/>
                        딱 맞는 '수제작(Crafted)' 프로그램을 설계합니다.
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-yellow-500/20"></div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-yellow-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                        <Sparkles size={24} fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Real Insight</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        단순 지식 전달자가 아닙니다.<br/>
                        1,400명 조직의 HRD 총괄 경험과<br/>
                        AI 코디네이터로서의 실무 통찰을 전합니다.
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