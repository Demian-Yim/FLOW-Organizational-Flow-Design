import React, { useState } from 'react';
import { X, ChevronRight, Check, AlertCircle, Zap, TrendingUp, Sparkles } from 'lucide-react';

interface TutorialModalProps {
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const steps = [
    {
      id: 1,
      icon: <Sparkles className="w-8 h-8 text-slate-700" />,
      title: '환영합니다! 👋',
      subtitle: 'FLOW~에 오신 것을 환영합니다',
      content: 'AI 시대, 조직과 개인의 성장을 위한\n여정을 시작해보세요.\n\n이곳은 사람과 일의 흐름을\n디자인하는 공간입니다.',
      color: 'bg-brand-pastelCyan',
    },
    {
      id: 2,
      icon: <AlertCircle className="w-8 h-8 text-slate-700" />,
      title: '진단 (Diagnosis)',
      subtitle: '현재의 흐름을 파악하세요',
      content: '단순한 AI 도입이 아닌,\n일하는 방식의 변화가 필요합니다.\n\n우리 조직의 AI 리터러시와\n리더십 현황을 진단해드립니다.',
      color: 'bg-brand-pastelBlue',
    },
    {
      id: 3,
      icon: <TrendingUp className="w-8 h-8 text-slate-700" />,
      title: '성장 (Growth)',
      subtitle: '최적의 로드맵을 설계합니다',
      content: '맞춤형 커리큘럼을 통해\n실무 역량(Reskilling)과\n리더십(Upskilling)을 강화하세요.',
      color: 'bg-brand-pastelPurple',
    },
    {
      id: 4,
      icon: <Zap className="w-8 h-8 text-slate-700" />,
      title: '변화 (Change)',
      subtitle: '새로운 흐름을 만드세요',
      content: 'FLOW~와 함께라면 가능합니다.\n\n지금 바로 문의하고\n조직의 변화를 시작해보세요!',
      color: 'bg-brand-pastelPink',
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Top Progress Line (Mobile) */}
        <div className="md:hidden w-full h-1.5 bg-slate-800 absolute top-0 left-0 z-30">
             <div 
                className={`h-full transition-all duration-500 ease-out ${currentStep.color}`}
                style={{ width: `${(step / steps.length) * 100}%` }}
            />
        </div>

        {/* Close Button */}
        <button 
            onClick={finishTutorial}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full z-40"
        >
            <X size={20} />
        </button>

        {/* Left: Content Area */}
        <div className="flex-1 p-8 md:p-10 z-20 flex flex-col">
            
            {/* Header: Icon & Badge */}
            <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-slate-800 rounded-2xl border border-white/5 shadow-inner">
                    {currentStep.icon}
                </div>
                <div className="hidden md:block text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
                    인사이트 0{step} / 0{steps.length}
                </div>
            </div>

            {/* Main Text */}
            <div className="flex-1 min-h-[140px]">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight animate-fadeIn" key={`title-${step}`}>
                    {currentStep.title}
                </h2>
                <p className="text-lg font-bold text-brand-blue mb-4 animate-fadeIn" key={`sub-${step}`}>
                    {currentStep.subtitle}
                </p>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed whitespace-pre-line animate-fadeIn" key={`cont-${step}`}>
                    {currentStep.content}
                </p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                {/* Dots Indicator */}
                <div className="flex gap-2">
                    {steps.map((s) => (
                        <div 
                            key={s.id} 
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${s.id === step ? 'bg-white scale-110' : 'bg-gray-700'}`}
                        ></div>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={finishTutorial}
                        className="text-sm font-medium text-gray-500 hover:text-white transition-colors px-3 py-2"
                    >
                        건너뛰기
                    </button>
                    <button
                        onClick={handleNext}
                        className={`
                            flex items-center gap-2 px-5 py-2.5 rounded-lg text-slate-900 font-bold shadow-lg transition-all hover:scale-105 active:scale-95
                            ${step === steps.length ? 'bg-brand-cyan hover:bg-cyan-400' : 'bg-white hover:bg-gray-100'}
                        `}
                    >
                        {step === steps.length ? '시작하기' : '다음'}
                        {step === steps.length ? <Check size={16} /> : <ChevronRight size={16} />}
                    </button>
                </div>
            </div>
        </div>

        {/* Right: Visual Area (Character) */}
        <div className="hidden md:flex w-1/3 bg-slate-800/50 relative items-end justify-center overflow-hidden border-l border-white/5">
             {/* Abstract Background */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80 z-10"></div>
             <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-40 transition-colors duration-500 ${currentStep.color.replace('bg-', 'bg-')}`}></div>
             
             {/* Character Image */}
             <img 
                src="https://i.ibb.co/Gv1hBpD1/transformed-image-1761555212912.png" 
                alt="AI Guide"
                className="relative z-10 w-[180%] max-w-none -mb-10 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-500"
                style={{ transform: `scale(${step === 1 ? 1 : step === 2 ? 1.05 : 1.1}) translateY(${step === 1 ? '0' : '10px'})` }}
             />
        </div>

      </div>
    </div>
  );
};

export default TutorialModal;