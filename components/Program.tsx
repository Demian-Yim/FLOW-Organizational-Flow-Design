import React, { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { TABS, PROGRAMS } from '../constants';
import { X, Check, Star, Clock, Target, Users, Sparkles, ArrowRight, MessageCircle, BookOpen, Layout, Grid, Zap, Layers } from 'lucide-react';
import { ProgramItem, ProgramDetail } from '../types';

interface ProgramProps {
  onInquire: (courseName: string) => void;
}

const Program: React.FC<ProgramProps> = ({ onInquire }) => {
  const [activeTab, setActiveTab] = useState('A');
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  
  const revealRef = useScrollReveal();
  const revealRef2 = useScrollReveal();

  const filteredPrograms = PROGRAMS.filter(p => p.category === activeTab);

  const getProgramDetail = (program: ProgramItem): ProgramDetail => {
      if (program.detail) {
          return program.detail;
      }
      return {
          purpose: "조직의 목표 달성과 구성원의 성장을 지원하는 맞춤형 교육입니다.",
          target: "해당 주제에 관심 있는 전 임직원",
          time: "4H ~ 8H (협의 가능)",
          modules: [
              { title: "M1. 과정의 이해", desc: "주제에 대한 기본 개념 및 필요성 학습", time: "1H" },
              { title: "M2. 핵심 원리 습득", desc: "이론과 사례를 통한 심층 학습", time: "2H" },
              { title: "M3. 실전 적용 실습", desc: "현업 이슈를 기반으로 한 적용 실습", time: "3H" },
              { title: "M4. 액션플랜 수립", desc: "현업 적용을 위한 실행 계획 수립", time: "1H" }
          ],
          keywords: ["맞춤형", "실습", "성장"],
          activities: [{title: "워크숍", desc: "실습 중심의 활동"}],
          effects: ["역량 향상", "동기 부여"],
          application: "현업에 즉시 적용 가능"
      };
  };

  const detailData = selectedProgram ? getProgramDetail(selectedProgram) : null;

  useEffect(() => {
    if (selectedProgram) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProgram]);

  const openModal = (program: ProgramItem) => {
    setSelectedProgram(program);
  };

  const closeModal = () => {
    setSelectedProgram(null);
  };

  const handleInquire = () => {
    if (selectedProgram) {
        onInquire(selectedProgram.title);
    }
    closeModal();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // High Contrast Theme Settings for better visibility
  const getCategoryTheme = (cat: string) => {
      switch(cat) {
          case 'A': // AI 실무 - Cyan/Black High Contrast
              return {
                  base: 'bg-white border-[3px] border-slate-900 text-slate-900',
                  hover: 'hover:bg-slate-900 hover:text-brand-cyan hover:border-brand-cyan hover:shadow-[8px_8px_0_#06b6d4]',
                  badge: 'bg-slate-900 text-brand-cyan',
                  iconBase: 'bg-slate-900 text-white',
                  iconHover: 'group-hover:bg-brand-cyan group-hover:text-slate-900',
                  accentColor: '#06b6d4',
                  gradient: 'from-brand-cyan to-blue-600',
                  lightBg: 'bg-cyan-50',
                  borderColor: 'border-brand-cyan',
                  titleColor: 'text-brand-cyan'
              };
          case 'B': // AI 코칭 - Purple/White
              return {
                  base: 'bg-white border-[3px] border-slate-900 text-slate-900',
                  hover: 'hover:bg-[#8b5cf6] hover:text-white hover:border-[#8b5cf6] hover:shadow-[8px_8px_0_#2e1065]',
                  badge: 'bg-[#8b5cf6] text-white',
                  iconBase: 'bg-[#8b5cf6] text-white',
                  iconHover: 'group-hover:bg-white group-hover:text-[#8b5cf6]',
                  accentColor: '#8b5cf6',
                  gradient: 'from-[#8b5cf6] to-[#6d28d9]',
                  lightBg: 'bg-purple-50',
                  borderColor: 'border-[#8b5cf6]',
                  titleColor: 'text-[#8b5cf6]'
              };
          case 'C': // HRD & 조직역량 - Green/Dark Green
              return {
                  base: 'bg-white border-[3px] border-slate-900 text-slate-900',
                  hover: 'hover:bg-[#10b981] hover:text-white hover:border-[#10b981] hover:shadow-[8px_8px_0_#064e3b]',
                  badge: 'bg-[#10b981] text-white',
                  iconBase: 'bg-[#10b981] text-white',
                  iconHover: 'group-hover:bg-white group-hover:text-[#10b981]',
                  accentColor: '#10b981',
                  gradient: 'from-[#10b981] to-[#059669]',
                  lightBg: 'bg-emerald-50',
                  borderColor: 'border-[#10b981]',
                  titleColor: 'text-[#10b981]'
              };
          case 'D': // 에너지 & 웰니스 - Yellow/Black
              return {
                  base: 'bg-white border-[3px] border-slate-900 text-slate-900',
                  hover: 'hover:bg-[#f59e0b] hover:text-slate-900 hover:border-[#f59e0b] hover:shadow-[8px_8px_0_#78350f]',
                  badge: 'bg-[#f59e0b] text-slate-900',
                  iconBase: 'bg-[#f59e0b] text-white',
                  iconHover: 'group-hover:bg-slate-900 group-hover:text-[#f59e0b]',
                  accentColor: '#f59e0b',
                  gradient: 'from-[#f59e0b] to-[#d97706]',
                  lightBg: 'bg-amber-50',
                  borderColor: 'border-[#f59e0b]',
                  titleColor: 'text-[#f59e0b]'
              };
          case 'E': // 리더십 & 인문학 - Pink/White
              return {
                  base: 'bg-white border-[3px] border-slate-900 text-slate-900',
                  hover: 'hover:bg-[#ec4899] hover:text-white hover:border-[#ec4899] hover:shadow-[8px_8px_0_#831843]',
                  badge: 'bg-[#ec4899] text-white',
                  iconBase: 'bg-[#ec4899] text-white',
                  iconHover: 'group-hover:bg-white group-hover:text-[#ec4899]',
                  accentColor: '#ec4899',
                  gradient: 'from-[#ec4899] to-[#be185d]',
                  lightBg: 'bg-pink-50',
                  borderColor: 'border-[#ec4899]',
                  titleColor: 'text-[#ec4899]'
              };
          default:
              return {
                  base: 'bg-white border-[3px] border-slate-900 text-slate-900',
                  hover: 'hover:bg-slate-800 hover:text-white',
                  badge: 'bg-slate-800 text-white',
                  iconBase: 'bg-slate-800',
                  iconHover: 'group-hover:bg-white group-hover:text-slate-800',
                  accentColor: '#1e293b',
                  gradient: 'from-slate-700 to-slate-900',
                  lightBg: 'bg-slate-100',
                  borderColor: 'border-slate-300',
                  titleColor: 'text-slate-800'
              };
      }
  };

  const getCategoryName = (cat: string) => {
      switch(cat) {
          case 'A': return 'AI 실무';
          case 'B': return 'AI 코칭';
          case 'C': return 'HRD & 조직역량';
          case 'D': return '에너지 & 웰니스';
          case 'E': return '리더십 & 인문학';
          default: return 'General';
      }
  }

  return (
    <section id="program" className="py-24 relative bg-slate-50 dark:bg-slate-950 scroll-mt-20 overflow-hidden transition-colors duration-300">
      {/* Background Texture */}
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

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {TABS.map((tab) => {
             const isActive = activeTab === tab.id;
             let activeClasses = '';
             const inactiveClasses = 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-500 scale-95 opacity-80';

             if (isActive) {
                 if(tab.id === 'A') activeClasses = 'bg-brand-cyan text-slate-900 border-brand-cyan scale-105 shadow-[0_0_20px_rgba(6,182,212,0.6)] z-10';
                 if(tab.id === 'B') activeClasses = 'bg-[#8b5cf6] text-white border-[#8b5cf6] scale-105 shadow-[0_0_20px_rgba(139,92,246,0.6)] z-10';
                 if(tab.id === 'C') activeClasses = 'bg-[#10b981] text-slate-900 border-[#10b981] scale-105 shadow-[0_0_20px_rgba(16,185,129,0.6)] z-10';
                 if(tab.id === 'D') activeClasses = 'bg-[#f59e0b] text-slate-900 border-[#f59e0b] scale-105 shadow-[0_0_20px_rgba(245,158,11,0.6)] z-10';
                 if(tab.id === 'E') activeClasses = 'bg-[#ec4899] text-white border-[#ec4899] scale-105 shadow-[0_0_20px_rgba(236,72,153,0.6)] z-10';
             }

             return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 rounded-xl text-base md:text-lg font-black transition-all duration-300 flex items-center gap-2 ${isActive ? activeClasses : inactiveClasses}`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
             );
          })}
        </div>

        {/* Programs Grid */}
        <div className="min-h-[500px]" ref={revealRef2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
            {filteredPrograms.map((program) => {
                const theme = getCategoryTheme(program.category);

                return (
                    <div 
                        key={program.id} 
                        onClick={() => openModal(program)}
                        className={`
                            relative p-8 rounded-[1.5rem] shadow-sm 
                            transform transition-all duration-200 group cursor-pointer flex flex-col h-full min-h-[380px] overflow-hidden
                            hover:-translate-y-2 hover:scale-[1.01]
                            ${theme.base} ${theme.hover}
                        `}
                    >
                        {/* Hover Texture Overlay (Dots) */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                             style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '10px 10px' }}
                        ></div>
                        
                        {/* Top Badge & Icon */}
                        <div className="relative z-10 flex justify-between items-start mb-6">
                            <span className={`text-sm font-black px-4 py-1.5 rounded-full shadow-sm tracking-wider uppercase group-hover:bg-white group-hover:text-slate-900 transition-colors ${theme.badge}`}>
                                {program.id}
                            </span>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:rotate-45 ${theme.iconBase} ${theme.iconHover}`}>
                                <ArrowRight size={24} strokeWidth={3} />
                            </div>
                        </div>
                        
                        {/* Title - Large & Bold for "One Glance" visibility */}
                        <h3 className="relative z-10 text-3xl font-black mb-4 leading-tight tracking-tight break-keep group-hover:text-current transition-colors duration-300" style={{ wordBreak: 'keep-all' }}>
                            {program.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="relative z-10 text-base font-bold mb-6 line-clamp-3 leading-relaxed flex-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                            {program.desc}
                        </p>
                        
                        {/* Tags */}
                        <div className="relative z-10 flex gap-2 flex-wrap mt-auto">
                            {program.tags.map(tag => (
                                <span key={tag} className="text-xs font-black px-2 py-1 rounded border border-current opacity-60 group-hover:opacity-100 group-hover:border-current transition-all">
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

      {/* --- Detail Modal (Bento Grid) --- */}
      {selectedProgram && detailData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
            <div className="relative w-full max-w-6xl max-h-[95vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border-4 border-slate-900">
                {(() => {
                    const theme = getCategoryTheme(selectedProgram.category);
                    
                    return (
                        <>
                            {/* 1. Header Bar */}
                            <div className={`px-8 py-6 flex justify-between items-center bg-gradient-to-r ${theme.gradient} text-white shrink-0 relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply pointer-events-none"></div>
                                <div className="flex items-center gap-4 relative z-10">
                                    <span className="bg-black/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/20 backdrop-blur-sm shadow-sm">
                                        {getCategoryName(selectedProgram.category)}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-black tracking-tight truncate max-w-3xl shadow-sm">{selectedProgram.title}</h2>
                                </div>
                                <button onClick={closeModal} className="p-2 hover:bg-white/20 rounded-full transition-colors relative z-10">
                                    <X size={28} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* 2. Content Body (Scrollable) */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 dark:bg-slate-950 custom-scrollbar">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                                    
                                    {/* Left Column: Core Info (4 cols) */}
                                    <div className="lg:col-span-4 flex flex-col gap-6">
                                        
                                        {/* Purpose Card */}
                                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 flex-1 flex flex-col justify-center">
                                            <div className={`w-12 h-12 rounded-xl ${theme.lightBg} flex items-center justify-center mb-4 border border-current opacity-80`}>
                                                <Target className={`w-6 h-6 ${theme.titleColor.split(' ')[0]}`} />
                                            </div>
                                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">교육 목적 (Why)</h3>
                                            <p className="text-xl font-bold text-slate-800 dark:text-white leading-relaxed tracking-tight" style={{ wordBreak: 'keep-all' }}>
                                                {detailData.purpose}
                                            </p>
                                        </div>

                                        {/* Target & Time Card */}
                                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700">
                                            <div className="space-y-6">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Users size={18} className="text-gray-400" />
                                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">추천 대상</span>
                                                    </div>
                                                    <p className="font-bold text-base text-slate-800 dark:text-white">{detailData.target}</p>
                                                </div>
                                                <div className="h-px bg-slate-100 dark:bg-slate-700"></div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Clock size={18} className="text-gray-400" />
                                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">소요 시간</span>
                                                    </div>
                                                    <p className="font-bold text-base text-slate-800 dark:text-white">{detailData.time}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Keywords Card */}
                                        <div className={`p-6 rounded-2xl border-2 ${theme.borderColor} ${theme.lightBg} dark:bg-slate-800`}>
                                            <h3 className="text-xs font-black opacity-60 uppercase tracking-widest mb-4">핵심 키워드</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {detailData.keywords && detailData.keywords.map((kw, i) => (
                                                    <span key={i} className="px-3 py-1.5 bg-white dark:bg-slate-900 rounded-lg text-sm font-bold shadow-sm border border-black/5 dark:border-white/10">
                                                        #{kw}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Curriculum & Details (8 cols) */}
                                    <div className="lg:col-span-8 flex flex-col gap-6">
                                        
                                        {/* Curriculum Flow */}
                                        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className={`p-2 rounded-lg ${theme.lightBg}`}>
                                                    <Layers className={`w-6 h-6 ${theme.titleColor.split(' ')[0]}`} />
                                                </div>
                                                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Curriculum Flow</h3>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {detailData.modules.map((mod, i) => (
                                                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700 hover:border-slate-300 transition-colors">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-black text-lg shadow-sm bg-white dark:bg-slate-800 border-2 ${theme.borderColor} ${theme.titleColor.split(' ')[0]}`}>
                                                            {i+1}
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between items-center mb-1">
                                                                <h4 className="font-bold text-slate-900 dark:text-white text-base">{mod.title}</h4>
                                                                <span className="text-[10px] font-black bg-slate-200 dark:bg-slate-600 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 font-mono">{mod.time}</span>
                                                            </div>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-snug">{mod.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6 flex-1">
                                            {/* Activity & Application */}
                                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border-2 border-slate-200 dark:border-slate-700 flex flex-col">
                                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                    <Zap size={16} /> 현장 활동 & 적용
                                                </h3>
                                                <div className="space-y-4 flex-1">
                                                    {detailData.activities && detailData.activities.map((act, i) => (
                                                        <div key={i} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-100 dark:border-slate-600">
                                                            <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">🎯 {act.title}</div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{act.desc}</div>
                                                        </div>
                                                    ))}
                                                    <div className="mt-auto pt-4 border-t border-dashed border-slate-200 dark:border-slate-700">
                                                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300 bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800/30 leading-snug">
                                                            🚀 <span className="font-bold">현업 적용:</span> {detailData.application}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* KPIs */}
                                            <div className={`p-6 rounded-2xl border-2 ${theme.borderColor} ${theme.lightBg} dark:bg-slate-800/50 flex flex-col`}>
                                                <h3 className="text-xs font-black opacity-60 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                    <Sparkles size={16} /> Before & After
                                                </h3>
                                                <div className="space-y-3 my-auto">
                                                    {detailData.effects && detailData.effects.map((effect, i) => {
                                                        if (effect.includes('→') || effect.includes('➔')) {
                                                            const splitChar = effect.includes('➔') ? '➔' : '→';
                                                            const [before, after] = effect.split(splitChar).map(s => s.trim().replace(/^\[Before\]\s*/i, '').replace(/^\[After\]\s*/i, ''));
                                                            return (
                                                                <div key={i} className="flex flex-col gap-2.5 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-black/5">
                                                                    <div className="flex items-start gap-2.5 text-slate-500 dark:text-slate-400">
                                                                        <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500 dark:text-slate-400 shrink-0 uppercase tracking-wider mt-0.5">Before</span>
                                                                        <span className="text-sm line-through decoration-slate-300 dark:decoration-slate-600 leading-snug">{before}</span>
                                                                    </div>
                                                                    <div className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200">
                                                                        <span className={`text-[10px] font-black px-2 py-1 rounded shrink-0 uppercase tracking-wider ${theme.titleColor} bg-white dark:bg-slate-800 border border-current mt-0.5`}>After</span>
                                                                        <span className="text-sm font-bold leading-snug">{after}</span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                        return (
                                                            <div key={i} className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm border border-black/5">
                                                                <Check size={18} className="text-green-500 shrink-0" strokeWidth={3} />
                                                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{effect}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* 3. Footer CTA */}
                            <div className="p-6 bg-white dark:bg-slate-900 border-t-2 border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                                <div className="text-xs font-bold text-gray-400 flex items-center gap-2">
                                    <BookOpen size={14} />
                                    <span>조직의 상황과 니즈에 맞춰 커리큘럼 조정이 가능합니다.</span>
                                </div>
                                <button 
                                    onClick={handleInquire}
                                    className={`w-full md:w-auto px-8 py-3.5 rounded-xl font-black text-lg text-white shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 bg-gradient-to-r ${theme.gradient}`}
                                >
                                    이 과정으로 문의하기 <ArrowRight size={20} strokeWidth={3} />
                                </button>
                            </div>
                        </>
                    );
                })()}
            </div>
        </div>
      )}
    </section>
  );
};

export default Program;