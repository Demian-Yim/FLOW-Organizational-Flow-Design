import React, { useState } from 'react';
import { X, ChevronRight, Check, AlertCircle, Zap, TrendingUp } from 'lucide-react';

interface TutorialModalProps {
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const steps = [
    {
      id: 1,
      icon: <AlertCircle className="w-8 h-8 text-red-400" />,
      title: 'AI 시대의 리얼 이슈',
      subtitle: '단순한 기능 도입으로 끝나선 안됩니다',
      content: '많은 기업이 AI 툴을 도입하지만,\n정작 일하는 방식은 그대로입니다.\n"도구"가 아닌 "변화"에 집중해야 할 때입니다.',
      bgGradient: 'from-slate-900 to-red-950',
    },
    {
      id: 2,
      icon: <TrendingUp className="w-8 h-8 text-brand-cyan" />,
      title: 'Reskilling & Upskilling',
      subtitle: '직무 역량의 재정의',
      content: 'AI가 대체할 영역과 리더가 맡아야 할 영역,\n그 경계에서 새로운 직무 역량이 필요합니다.\n조직의 Flow를 새롭게 설계하세요.',
      bgGradient: 'from-slate-900 to-brand-dark',
    },
    {
      id: 3,
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: 'FLOW~ 솔루션',
      subtitle: '사람과 기술의 연결 고리',
      content: 'AI 실무부터 리더십, 소통 방식까지.\nFLOW~는 조직의 일의 흐름을 진단하고\n최적의 교육 로드맵을 제안합니다.',
      bgGradient: 'from-brand-dark to-slate-900',
    },
  ];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      finishTutorial();
    }
  };

  const finishTutorial = () => {
    sessionStorage.setItem('tutorialSeen', 'true');
    onClose();
  };

  const currentStep = steps[step - 1];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* Left: Avatar Image Area */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-slate-800 to-slate-950 relative overflow-hidden flex items-end justify-center pt-10">
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div className="relative z-10 w-full h-full flex items-end justify-center">
                <img 
                    src="https://i.ibb.co/Gv1hBpD1/transformed-image-1761555212912.png" 
                    alt="AI Guide Character" 
                    className="h-[85%] object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                />
            </div>
             {/* Mobile Progress Bar (Visible only on mobile) */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 md:hidden z-20">
                <div 
                    className="h-full bg-brand-cyan transition-all duration-500 ease-out"
                    style={{ width: `${(step / steps.length) * 100}%` }}
                />
            </div>
        </div>

        {/* Right: Content Area */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative">
            
            {/* Close Button */}
            <button 
            onClick={finishTutorial}
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-20 p-2 hover:bg-white/5 rounded-full"
            >
            <X size={24} />
            </button>

            {/* Desktop Progress Indicators */}
            <div className="hidden md:flex gap-2 mb-8">
                {steps.map((s) => (
                    <div 
                        key={s.id} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${s.id === step ? 'w-8 bg-brand-cyan' : 'w-2 bg-gray-700'}`}
                    ></div>
                ))}
            </div>

            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-brand-cyan text-xs font-bold uppercase tracking-wider animate-fadeIn">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
                    INSIGHT 0{step}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight animate-fadeIn leading-tight" style={{ animationDelay: '100ms' }}>
                    {currentStep.title}
                </h2>
                
                <p className="text-xl font-medium text-brand-blue animate-fadeIn" style={{ animationDelay: '200ms' }}>
                    {currentStep.subtitle}
                </p>
                
                <p className="text-gray-400 text-base leading-relaxed whitespace-pre-line animate-fadeIn" style={{ animationDelay: '300ms' }}>
                    {currentStep.content}
                </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
                 <button
                onClick={handleNext}
                className="group relative overflow-hidden py-3 px-8 rounded-xl bg-white text-slate-900 font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                <span className="relative flex items-center gap-2">
                    {step === steps.length ? '솔루션 확인하기' : '다음'}
                    {step === steps.length ? <Check size={18} /> : <ChevronRight size={18} />}
                </span>
                </button>
                 <button 
                onClick={finishTutorial}
                className="text-sm font-medium text-gray-500 hover:text-white transition-colors px-4"
                >
                건너뛰기
                </button>
            </div>

        </div>
      </div>
    </div>
  );
};

export default TutorialModal;