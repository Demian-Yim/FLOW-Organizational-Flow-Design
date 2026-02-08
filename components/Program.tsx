import React, { useState } from 'react';
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

  const getCategoryTheme = (cat: string) => {
      switch(cat) {
          case 'A': // AI 실무 - Cyan
              return {
                  base: 'bg-white border-2 border-slate-200 hover:border-brand-cyan',
                  hover: 'group-hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.3)]',
                  badge: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20',
                  iconBase: 'bg-slate-100 text-slate-400 group-hover:bg-brand-cyan group-hover:text-white',
                  titleColor: 'text-slate-900 group-hover:text-brand-cyan',
                  accentColor: '#06b6d4',
                  gradient: 'from-brand-cyan to-blue-600',
                  lightBg: 'bg-cyan-50',
                  borderColor: 'border-brand-cyan'
              };
          case 'B': // HRD - Purple
              return {
                  base: 'bg-white border-2 border-slate-200 hover:border-[#8b5cf6]',
                  hover: 'group-hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.3)]',
                  badge: 'bg-purple-100 text-purple-600 border-purple-200',
                  iconBase: 'bg-slate-100 text-slate-400 group-hover:bg-[#8b5cf6] group-hover:text-white',
                  titleColor: 'text-slate-900 group-hover:text-[#8b5cf6]',
                  accentColor: '#8b5cf6',
                  gradient: 'from-[#8b5cf6] to-[#6d28d9]',
                  lightBg: 'bg-purple-50',
                  borderColor: 'border-[#8b5cf6]'
              };
          case 'C': // Work Smart - Green
              return {
                  base: 'bg-white border-2 border-slate-200 hover:border-[#10b981]',
                  hover: 'group-hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)]',
                  badge: 'bg-emerald-100 text-emerald-600 border-emerald-200',
                  iconBase: 'bg-slate-100 text-slate-400 group-hover:bg-[#10b981] group-hover:text-white',
                  titleColor: 'text-slate-900 group-hover:text-[#10b981]',
                  accentColor: '#10b981',
                  gradient: 'from-[#10b981] to-[#059669]',
                  lightBg: 'bg-emerald-50',
                  borderColor: 'border-[#10b981]'
              };
          case 'D': // Leadership - Amber
              return {
                  base: 'bg-white border-2 border-slate-200 hover:border-[#f59e0b]',
                  hover: 'group-hover:shadow-[0_10px_40px_-10px_rgba(245,158,11,0.3)]',
                  badge: 'bg-amber-100 text-amber-600 border-amber-200',
                  iconBase: 'bg-slate-100 text-slate-400 group-hover:bg-[#f59e0b] group-hover:text-white',
                  titleColor: 'text-slate-900 group-hover:text-[#f59e0b]',
                  accentColor: '#f59e0b',
                  gradient: 'from-[#f59e0b] to-[#d97706]',
                  lightBg: 'bg-amber-50',
                  borderColor: 'border-[#f59e0b]'
              };
          default: return { base: '', hover: '', badge: '', iconBase: '', titleColor: '', accentColor: '', gradient: '', lightBg: '', borderColor: '' };
      }
  };

  const getCategoryName = (cat: string) => {
      switch(cat) {
          case 'A': return 'AI 실무';
          case 'B': return 'HRD & 조직역량';
          case 'C': return '워크스마트';
          case 'D': return '리더십 & 인문학';
          default: return 'General';
      }
  }

  const openModal = (program: ProgramItem) => {
    setSelectedProgram(program);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProgram(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="program" className="py-24 relative bg-slate-50 dark:bg-slate-950 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16" ref={revealRef}>
          <span className="text-brand-cyan font-black tracking-[0.2em] uppercase text-sm border-b-2 border-brand-cyan pb-1">Curriculum</span>
          <h2 className="text-4xl md:text-5xl font-black mt-6 mb-6 text-slate-900 dark:text-white leading-tight">
            조직의 흐름을 바꾸는<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">실전형 교육 프로그램</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            AI 실무부터 리더십까지, 현업의 문제를 해결하는 구체적인 솔루션을 제안합니다.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {TABS.map((tab) => {
             const isActive = activeTab === tab.id;
             const theme = getCategoryTheme(tab.id);
             
             return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-base md:text-lg font-bold transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1 
                    ${isActive 
                        ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg` 
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-gray-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
             );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn" ref={revealRef2}>
            {filteredPrograms.map((program) => {
                const theme = getCategoryTheme(program.category);
                return (
                    <div 
                        key={program.id} 
                        onClick={() => openModal(program)}
                        className={`
                            relative p-8 rounded-3xl transition-all duration-300 group cursor-pointer flex flex-col h-full min-h-[340px]
                            ${theme.base} hover:-translate-y-2 ${theme.hover}
                        `}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <span className={`text-xs font-black px-3 py-1 rounded-full border tracking-wider transition-colors duration-300 ${theme.badge}`}>
                                {program.id}
                            </span>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${theme.iconBase}`}>
                                <ArrowRight size={18} strokeWidth={3} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                        </div>
                        
                        <div className="mb-4 min-h-[80px] flex items-center">
                             <h3 className={`text-2xl font-black leading-tight tracking-tight transition-colors duration-300 ${theme.titleColor}`} style={{ wordBreak: 'keep-all' }}>
                                {program.title}
                            </h3>
                        </div>
                        
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed flex-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                            {program.desc}
                        </p>
                        
                        <div className="flex gap-2 flex-wrap mt-auto">
                            {program.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>

      {/* --- Bento Grid Detail Modal (Scroll-Free Design) --- */}
      {selectedProgram && selectedProgram.detail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md animate-fadeIn">
            {(() => {
                const detail = selectedProgram.detail!;
                const theme = getCategoryTheme(selectedProgram.category);
                
                return (
                    <div className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
                        
                        {/* 1. Header Bar (Compact) */}
                        <div className={`px-8 py-5 flex justify-between items-center bg-gradient-to-r ${theme.gradient} text-white shrink-0`}>
                            <div className="flex items-center gap-4">
                                <span className="bg-black/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-white/10">
                                    {getCategoryName(selectedProgram.category)}
                                </span>
                                <h2 className="text-2xl font-black tracking-tight truncate max-w-2xl">{selectedProgram.title}</h2>
                            </div>
                            <button onClick={closeModal} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* 2. Bento Grid Content */}
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                                
                                {/* Left Column: Concept & Target (4 cols) */}
                                <div className="lg:col-span-4 flex flex-col gap-6">
                                    {/* Purpose Card */}
                                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex-1">
                                        <div className={`w-10 h-10 rounded-xl ${theme.lightBg} flex items-center justify-center mb-4`}>
                                            <Target className={`w-5 h-5 ${theme.titleColor.split(' ')[0]}`} />
                                        </div>
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">교육 목적 (Why)</h3>
                                        <p className="text-lg font-bold text-slate-800 dark:text-white leading-relaxed">
                                            {detail.purpose}
                                        </p>
                                    </div>

                                    {/* Target & Time Card */}
                                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Users size={16} className="text-gray-400" />
                                                    <span className="text-xs font-bold text-gray-400 uppercase">추천 대상</span>
                                                </div>
                                                <p className="font-bold text-slate-800 dark:text-white">{detail.target}</p>
                                            </div>
                                            <div className="h-px bg-slate-100 dark:bg-slate-700"></div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Clock size={16} className="text-gray-400" />
                                                    <span className="text-xs font-bold text-gray-400 uppercase">소요 시간</span>
                                                </div>
                                                <p className="font-bold text-slate-800 dark:text-white">{detail.time}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Keywords Card */}
                                    <div className={`p-6 rounded-2xl border ${theme.borderColor} ${theme.lightBg} dark:bg-slate-800`}>
                                        <h3 className="text-sm font-bold opacity-60 uppercase tracking-wider mb-3">핵심 키워드</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {detail.keywords && detail.keywords.map((kw, i) => (
                                                <span key={i} className="px-2 py-1 bg-white dark:bg-slate-900 rounded text-xs font-bold shadow-sm">
                                                    #{kw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Curriculum & Effects (8 cols) */}
                                <div className="lg:col-span-8 flex flex-col gap-6">
                                    
                                    {/* Curriculum Flow (Horizontal if possible, or dense vertical) */}
                                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center gap-2 mb-6">
                                            <Layers className={`w-5 h-5 ${theme.titleColor.split(' ')[0]}`} />
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase">Curriculum Flow</h3>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {detail.modules.map((mod, i) => (
                                                <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border border-transparent hover:border-slate-100">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${theme.lightBg} ${theme.titleColor.split(' ')[0]}`}>
                                                        {i+1}
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between items-center mb-1">
                                                            <h4 className="font-bold text-slate-800 dark:text-white text-sm">{mod.title}</h4>
                                                            <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">{mod.time}</span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">{mod.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 flex-1">
                                        {/* Activity & Application */}
                                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
                                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                <Zap size={16} /> 현장 활동 & 적용
                                            </h3>
                                            <div className="space-y-4 flex-1">
                                                {detail.activities && detail.activities.map((act, i) => (
                                                    <div key={i} className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                                                        <div className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">🎯 {act.title}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">{act.desc}</div>
                                                    </div>
                                                ))}
                                                <div className="mt-2 text-xs font-medium text-gray-500 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border border-yellow-100 dark:border-yellow-800/30">
                                                    🚀 <span className="font-bold">현업 적용:</span> {detail.application}
                                                </div>
                                            </div>
                                        </div>

                                        {/* KPIs */}
                                        <div className={`p-6 rounded-2xl border ${theme.borderColor} ${theme.lightBg} dark:bg-slate-800/50 flex flex-col justify-center`}>
                                            <h3 className="text-sm font-bold opacity-60 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                <Sparkles size={16} /> 기대 효과 (KPI)
                                            </h3>
                                            <div className="space-y-3">
                                                {detail.effects && detail.effects.map((effect, i) => (
                                                    <div key={i} className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm">
                                                        <Check size={16} className="text-green-500 shrink-0" strokeWidth={3} />
                                                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{effect}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* 3. Footer CTA */}
                        <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center shrink-0">
                            <div className="text-xs text-gray-400 hidden md:block">
                                * 조직의 상황에 맞춰 커리큘럼 조정이 가능합니다.
                            </div>
                            <button 
                                onClick={() => { onInquire(selectedProgram.title); closeModal(); document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}); }}
                                className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2 bg-gradient-to-r ${theme.gradient}`}
                            >
                                이 과정으로 문의하기 <ArrowRight size={18} strokeWidth={3} />
                            </button>
                        </div>

                    </div>
                );
            })()}
        </div>
      )}
    </section>
  );
};

export default Program;