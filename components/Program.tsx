import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { TABS, PROGRAMS } from '../constants';
import { X, Check, Star, Clock, Target, Users, BookOpen, Sparkles, Zap, ArrowRight } from 'lucide-react';

// --- Types & Helpers ---
interface Review { name: string; role: string; content: string; }
interface ProgramDetails {
  purpose: string; target: string; time: string;
  reviews: Review[]; modules: { title: string; desc: string }[]; features: string[];
}

const generateProgramDetails = (program: typeof PROGRAMS[0]): ProgramDetails => {
  const commonReviews = [
    { name: '김민성', role: '마케팅팀 대리', content: '실무에 바로 적용할 수 있는 꿀팁이 가득했습니다.' },
    { name: '이수진', role: '인사팀 과장', content: '팀장님이 교육 끝나고 너무 좋아하시네요. 분위기 반전 성공!' },
    { name: '박준형', role: '영업팀 사원', content: '노션이랑 AI 연동이 이렇게 쉬운줄 몰랐어요.' },
    { name: '최지혜', role: '기획팀 팀장', content: '이론보다 실습 위주라 시간 가는 줄 몰랐습니다.' },
  ];
  const shuffledReviews = [...commonReviews].sort(() => 0.5 - Math.random()).slice(0, 3);

  let purpose = '조직의 업무 효율을 극대화합니다.';
  let target = '전 임직원';
  let modules = [{title: 'M1. 기초 다지기', desc: '기본 원리 이해'}, {title: 'M2. 심화 실습', desc: '현업 적용 케이스'}];
  
  if (program.category === 'A') {
      purpose = 'AI 도구를 활용해 반복 업무를 자동화하고 창의적 업무에 집중합니다.';
      modules = [{title: 'M1. AI 마인드셋', desc: 'AI 시대의 변화'}, {title: 'M2. 프롬프트 엔지니어링', desc: '질문의 기술'}, {title: 'M3. 실무 자동화', desc: '업무 프로세스 구축'}, {title: 'M4. 나만의 비서 만들기', desc: 'GPTs 실습'}];
  } else if (program.category === 'B') {
      purpose = '조직의 핵심 가치를 내재화하고 건강한 문화를 만듭니다.';
      modules = [{title: 'M1. 조직 진단', desc: '우리의 온도 체크'}, {title: 'M2. 가치 내재화', desc: 'Vision Align'}, {title: 'M3. 협업 워크숍', desc: '시너지 만들기'}, {title: 'M4. 액션플랜', desc: '그라운드 룰 설정'}];
  } else if (program.category === 'C') {
      purpose = '번아웃을 예방하고 최상의 컨디션을 유지합니다.';
      modules = [{title: 'M1. 에너지 진단', desc: '내 몸과 마음 읽기'}, {title: 'M2. 피지컬 케어', desc: '수면과 스트레칭'}, {title: 'M3. 멘탈 케어', desc: '회복탄력성'}, {title: 'M4. 루틴 설계', desc: '지속 가능한 습관'}];
  } else {
      purpose = '진정성 있는 리더십으로 구성원을 움직입니다.';
      modules = [{title: 'M1. 자기 인식', desc: '리더십 스타일 진단'}, {title: 'M2. 소통과 피드백', desc: '1:1 면담 스킬'}, {title: 'M3. 성과 관리', desc: '코칭 리더십'}, {title: 'M4. 변화 관리', desc: 'AI 시대의 리더'}];
  }

  return { purpose, target, time: '4H ~ 8H', reviews: shuffledReviews, modules, features: ['80% 실습 중심', '자체 템플릿 제공', '1:1 코칭', '사후 Q&A 지원'] };
};

const Program: React.FC = () => {
  const [activeTab, setActiveTab] = useState('A');
  const [selectedProgram, setSelectedProgram] = useState<typeof PROGRAMS[0] | null>(null);
  const [modalTab, setModalTab] = useState<'overview' | 'curriculum' | 'features'>('overview');
  
  const revealRef = useScrollReveal();
  const revealRef2 = useScrollReveal();

  const filteredPrograms = PROGRAMS.filter(p => p.category === activeTab);
  const detailData = selectedProgram ? generateProgramDetails(selectedProgram) : null;

  const openModal = (program: typeof PROGRAMS[0]) => {
    setSelectedProgram(program);
    setModalTab('overview');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProgram(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="program" className="py-24 relative bg-slate-50 dark:bg-slate-950 scroll-mt-20 overflow-hidden transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16" ref={revealRef}>
          <span className="text-brand-cyan font-black tracking-[0.2em] uppercase text-sm border-b-2 border-brand-cyan pb-1">Curriculum</span>
          <h2 className="text-4xl md:text-5xl font-black mt-6 mb-6 text-slate-900 dark:text-white leading-tight">
            AI 대전환 시대,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Reskilling</span> 
            <span className="mx-2 text-slate-500">&</span> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-pink-500">Upskilling</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            조직의 흐름(Organizational Flow)과 연결된 실전형 프로그램을 제안합니다.
          </p>
        </div>

        {/* Category Tabs - Emphasized */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {TABS.map((tab) => {
             const isActive = activeTab === tab.id;
             let activeClasses = '';
             let inactiveClasses = 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-500 scale-95 opacity-80';

             if (isActive) {
                 if(tab.id === 'A') activeClasses = 'bg-brand-cyan text-slate-900 border-brand-cyan scale-105 shadow-[0_0_20px_rgba(6,182,212,0.6)] z-10';
                 if(tab.id === 'B') activeClasses = 'bg-brand-purple text-white border-brand-purple scale-105 shadow-[0_0_20px_rgba(139,92,246,0.6)] z-10';
                 if(tab.id === 'C') activeClasses = 'bg-green-500 text-slate-900 border-green-500 scale-105 shadow-[0_0_20px_rgba(34,197,94,0.6)] z-10';
                 if(tab.id === 'D') activeClasses = 'bg-yellow-500 text-slate-900 border-yellow-500 scale-105 shadow-[0_0_20px_rgba(234,179,8,0.6)] z-10';
             }

             return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 rounded-xl text-base md:text-lg font-black transition-all duration-300 flex items-center gap-2 ${isActive ? activeClasses : inactiveClasses}`}
              >
                <span>{tab.label}</span>
              </button>
             );
          })}
        </div>

        {/* Programs Grid - Bold Textured Cards */}
        <div className="min-h-[500px]" ref={revealRef2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
            {filteredPrograms.map((program) => {
                let cardTheme = '';
                let textColor = '';
                let subTextColor = '';
                let badgeStyle = '';
                let iconStyle = '';
                let borderStyle = '';
                let bgPattern = '';

                // Bold Layered Design Styles
                if (program.category === 'A') { // AI - Cyan
                    cardTheme = 'bg-brand-cyan';
                    textColor = 'text-slate-900';
                    subTextColor = 'text-slate-800';
                    badgeStyle = 'bg-slate-900 text-brand-cyan border-slate-900';
                    iconStyle = 'bg-slate-900 text-brand-cyan';
                    borderStyle = 'border-slate-900';
                    bgPattern = 'opacity-20 bg-[url("https://www.transparenttextures.com/patterns/circuit-board.png")]';
                } else if (program.category === 'B') { // HRD - Purple
                    cardTheme = 'bg-brand-purple';
                    textColor = 'text-white';
                    subTextColor = 'text-purple-100';
                    badgeStyle = 'bg-white text-brand-purple border-white';
                    iconStyle = 'bg-white text-brand-purple';
                    borderStyle = 'border-white dark:border-white border-slate-900'; // Dark border in light mode for brutalist feel?
                    bgPattern = 'opacity-10 bg-[url("https://www.transparenttextures.com/patterns/cubes.png")]';
                } else if (program.category === 'C') { // Work Smart - Green
                    cardTheme = 'bg-green-500';
                    textColor = 'text-slate-900';
                    subTextColor = 'text-slate-800';
                    badgeStyle = 'bg-slate-900 text-green-500 border-slate-900';
                    iconStyle = 'bg-slate-900 text-green-500';
                    borderStyle = 'border-slate-900';
                    bgPattern = 'opacity-20 bg-[url("https://www.transparenttextures.com/patterns/diagonal-stripes.png")]';
                } else { // Leadership - Yellow
                    cardTheme = 'bg-yellow-400';
                    textColor = 'text-slate-900';
                    subTextColor = 'text-slate-800';
                    badgeStyle = 'bg-slate-900 text-yellow-400 border-slate-900';
                    iconStyle = 'bg-slate-900 text-yellow-400';
                    borderStyle = 'border-slate-900';
                    bgPattern = 'opacity-20 bg-[url("https://www.transparenttextures.com/patterns/hexellence.png")]';
                }

                return (
                    <div 
                        key={program.id} 
                        onClick={() => openModal(program)}
                        className={`
                            relative p-8 rounded-[2rem] border-4 shadow-[8px_8px_0px_rgba(0,0,0,0.5)] 
                            hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,0.5)] 
                            transition-all duration-200 group cursor-pointer flex flex-col h-full min-h-[350px] overflow-hidden
                            ${cardTheme} ${borderStyle}
                        `}
                    >
                        {/* Noise & Pattern Overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                        <div className={`absolute inset-0 ${bgPattern} pointer-events-none`}></div>
                        
                        {/* Top ID Badge */}
                        <div className="relative z-10 flex justify-between items-start mb-6">
                            <span className={`text-sm font-black px-4 py-1.5 rounded-full border-2 tracking-widest uppercase shadow-sm ${badgeStyle}`}>
                                {program.id}
                            </span>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform ${iconStyle}`}>
                                <ArrowRight size={20} strokeWidth={3} />
                            </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className={`relative z-10 text-3xl font-black mb-4 leading-tight tracking-tight ${textColor}`}>
                            {program.title}
                        </h3>
                        
                        {/* Description */}
                        <p className={`relative z-10 text-base mb-6 line-clamp-3 leading-relaxed font-bold flex-1 ${subTextColor}`}>
                            {program.desc}
                        </p>
                        
                        {/* Tags */}
                        <div className="relative z-10 flex gap-2 flex-wrap mt-auto">
                            {program.tags.map(tag => (
                                <span key={tag} className={`text-xs font-black px-2 py-1 rounded border ${textColor} border-current opacity-80`}>
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            })}
          </div>
        </div>
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && detailData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative border-4 border-slate-200 dark:border-slate-700">
                <div className="p-8 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex justify-between items-start">
                    <div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 mb-3 inline-block">
                            {selectedProgram.category === 'A' ? 'AI 실무' : selectedProgram.category === 'B' ? 'HRD' : selectedProgram.category === 'C' ? '워크스마트' : '리더십'}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">{selectedProgram.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300 mt-3 text-base md:text-lg font-light">{selectedProgram.desc}</p>
                    </div>
                    <button onClick={closeModal} className="p-3 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white"><X size={24} /></button>
                </div>
                {/* Tabs */}
                <div className="flex border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-0 z-10">
                    {[{ id: 'overview', label: '과정 개요', icon: <BookOpen size={16} /> }, { id: 'curriculum', label: '상세 커리큘럼', icon: <Target size={16} /> }, { id: 'features', label: '특장점', icon: <Star size={16} /> }].map((tab) => (
                        <button key={tab.id} onClick={() => setModalTab(tab.id as any)} className={`flex-1 py-5 text-sm md:text-base font-bold flex items-center justify-center gap-2 transition-all relative ${modalTab === tab.id ? 'text-brand-cyan bg-slate-50 dark:bg-slate-800' : 'text-gray-500 hover:text-slate-900 dark:hover:text-white'}`}>
                            {tab.icon} {tab.label}
                            {modalTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-cyan"></div>}
                        </button>
                    ))}
                </div>
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-white dark:bg-slate-950">
                    {modalTab === 'overview' && (
                        <div className="space-y-8 animate-fadeIn">
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"><Target className="text-brand-blue mb-2" size={24}/><h4 className="text-slate-900 dark:text-white font-bold mb-1">목적</h4><p className="text-gray-600 dark:text-gray-400 text-sm">{detailData.purpose}</p></div>
                                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"><Users className="text-brand-purple mb-2" size={24}/><h4 className="text-slate-900 dark:text-white font-bold mb-1">대상</h4><p className="text-gray-600 dark:text-gray-400 text-sm">{detailData.target}</p></div>
                                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"><Clock className="text-orange-500 mb-2" size={24}/><h4 className="text-slate-900 dark:text-white font-bold mb-1">시간</h4><p className="text-gray-600 dark:text-gray-400 text-sm">{detailData.time}</p></div>
                            </div>
                        </div>
                    )}
                    {modalTab === 'curriculum' && (
                        <div className="space-y-4 animate-fadeIn">
                            {detailData.modules.map((m, i) => (
                                <div key={i} className="flex gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-cyan transition-colors">
                                    <span className="text-brand-cyan font-black text-2xl">{i+1}</span>
                                    <div><h4 className="text-slate-900 dark:text-white font-bold text-lg mb-1">{m.title}</h4><p className="text-gray-600 dark:text-gray-400 text-sm">{m.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    )}
                    {modalTab === 'features' && (
                        <div className="grid gap-4 animate-fadeIn">
                            {detailData.features.map((f, i) => (
                                <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"><Check className="text-green-500" /><span className="text-gray-800 dark:text-gray-200 font-bold">{f}</span></div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}
    </section>
  );
};

export default Program;