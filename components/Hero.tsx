import React from 'react';
import ThreeBackground from './ThreeBackground';
import { ChevronDown } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const Hero: React.FC = () => {
  const revealRef = useScrollReveal();

  const handleMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const resetMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <ThreeBackground />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto" ref={revealRef}>
        <div className="inline-block mb-6 animate-fadeIn">
            <span className="py-2 px-6 border-2 border-brand-cyan/30 rounded-full text-brand-cyan text-sm md:text-base font-bold tracking-widest uppercase bg-brand-cyan/5 backdrop-blur-sm">
                ORGANIZATIONAL FLOW DESIGNER
            </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 dark:text-white text-slate-900 leading-tight tracking-tighter animate-fadeIn drop-shadow-xl" style={{ animationDelay: '100ms' }}>
          <span className="font-flow text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple">FLOW~</span><br />
          <span className="block text-4xl md:text-6xl lg:text-7xl mt-4 font-black text-slate-800 dark:text-white pb-2 drop-shadow-md" style={{ letterSpacing: '-0.02em' }}>
            사람과 일의 흐름을 디자인합니다
          </span>
        </h1>
        
        <p className="dark:text-gray-300 text-slate-600 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 animate-fadeIn leading-relaxed" style={{ animationDelay: '200ms' }}>
          AI 시대, 기술이 아닌 <span className="text-brand-blue font-bold">사람과 일의 본질</span>에 집중합니다.<br className="hidden md:block" />
          조직의 잠재력을 깨우는 최적의 흐름을 설계해 드립니다.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <a 
            href="#program" 
            onClick={(e) => scrollToSection(e, 'program')}
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className="w-full sm:w-auto text-center transition-transform duration-200 ease-out px-10 py-4 bg-gradient-to-r from-brand-pastelCyan to-brand-pastelBlue dark:from-brand-cyan dark:to-brand-blue text-slate-900 dark:text-white font-bold text-lg rounded-full hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] shadow-lg cursor-pointer"
          >
            교육과정 보기
          </a>
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, 'contact')}
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className="w-full sm:w-auto text-center transition-transform duration-200 ease-out px-10 py-4 border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white text-slate-700 font-bold text-lg rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm cursor-pointer"
          >
            문의하기
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10 cursor-pointer" onClick={(e) => {
          e.preventDefault();
          scrollToSection(e as any, 'intro');
      }}>
        <ChevronDown className="text-slate-400 dark:text-white/50 w-10 h-10 hover:text-brand-cyan transition-colors" />
      </div>
    </section>
  );
};

export default Hero;