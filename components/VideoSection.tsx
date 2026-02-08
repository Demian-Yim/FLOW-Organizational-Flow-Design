import React, { useState } from 'react';
import { PlayCircle, Play, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const VideoSection: React.FC = () => {
  const revealRef = useScrollReveal();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12" ref={revealRef}>
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-8 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-xs font-bold uppercase tracking-wider border border-brand-cyan/20">
              <PlayCircle size={14} />
              Demian's Insight
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              AI 시대,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                업무 플로우와 리더십의 리빌딩
              </span>
            </h2>
            
            <div className="space-y-4">
              <p className="text-xl font-medium text-slate-800 dark:text-gray-200">
                지식관리시스템(KMS) 도입과<br/>조직 변화에 대한 핵심 인사이트
              </p>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                단순한 도구의 도입이 아닙니다. 일하는 방식의 근본적인 변화와
                이를 이끄는 새로운 리더십의 방향성을 영상으로 확인하세요.
              </p>
            </div>
          </div>

          {/* Phone Frame / Video Container */}
          <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
            <div className="relative w-[300px] h-[600px] md:w-[320px] md:h-[640px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 ring-1 ring-white/10 group cursor-pointer">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-gray-800 rounded-b-2xl z-30"></div>
              
              {/* Screen Content Wrapper */}
              <div className="absolute inset-0 bg-white rounded-[2.5rem] overflow-hidden pt-8">
                  
                  {/* --- 1. Custom Header Overlay --- */}
                  {/* bg-white covers the native iframe header underneath */}
                  <div className="absolute top-0 left-0 right-0 h-[88px] bg-white z-20 flex items-end pb-3 px-4 border-b border-gray-100">
                      <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Profile Image */}
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
                                <div className="w-full h-full rounded-full bg-white p-[2px] overflow-hidden">
                                    <img src="https://i.ibb.co/Gv1hBpD1/transformed-image-1761555212912.png" className="w-full h-full object-cover transform scale-125 pt-1" alt="profile"/>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-flow font-bold text-black flex items-center gap-1">
                                    FLOW~ <span className="text-blue-500 fill-blue-500">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                                    </span>
                                </div>
                                <div className="text-[11px] text-gray-500 leading-none mt-0.5">Original Audio</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="bg-[#0095f6] hover:bg-[#1877f2] text-white text-[13px] font-semibold px-4 py-1.5 rounded-lg transition-colors">
                                프로필 보기
                            </button>
                            <MoreHorizontal size={20} className="text-black" />
                        </div>
                      </div>
                  </div>

                  {/* --- 2. Video Layer (Iframe) --- */}
                  <div className="absolute inset-0 bg-black z-10 pb-[130px]"> 
                    <iframe 
                      className="w-full h-full object-cover"
                      src={`https://www.instagram.com/reel/DUE-YSRF1Ae/embed${isPlaying ? '/?autoplay=1' : ''}`}
                      frameBorder="0" 
                      scrolling="no" 
                      allowTransparency={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      title="Demian Insight Reel"
                    ></iframe>
                    
                    {/* Play Button Overlay - Disappears on Click */}
                    {!isPlaying && (
                        <div 
                            className="absolute inset-0 flex items-center justify-center z-30 cursor-pointer bg-black/20 hover:bg-black/10 transition-colors"
                            onClick={() => setIsPlaying(true)}
                        >
                            <div className="w-20 h-20 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300">
                                <Play className="w-8 h-8 text-white fill-white ml-1" />
                            </div>
                        </div>
                    )}
                  </div>

                  {/* --- 3. Custom Footer Overlay --- */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white z-20 px-4 py-3 border-t border-gray-100 flex flex-col justify-end pb-8">
                      <div className="flex justify-between items-center mb-3">
                          <div className="flex gap-4 text-black">
                              <Heart size={26} className="hover:text-red-500 cursor-pointer transition-colors" />
                              <MessageCircle size={26} className="-rotate-90 hover:text-gray-600 cursor-pointer transition-colors" />
                              <Send size={26} className="hover:text-gray-600 cursor-pointer transition-colors" />
                          </div>
                          <Bookmark size={26} className="text-black hover:text-gray-600 cursor-pointer transition-colors" />
                      </div>
                      <div className="text-sm font-bold text-black mb-1">
                          좋아요 20,000개
                      </div>
                      <div className="flex items-center gap-2">
                          <span className="text-[13px] text-black"><span className="font-flow font-bold">FLOW~</span> 조직문화의 새로운 흐름...</span>
                          <span className="text-[13px] text-gray-500">더 보기</span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-2 uppercase">
                          3 DAYS AGO
                      </div>
                  </div>
              </div>

            </div>
            
            {/* Decorative blobs behind phone */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[400px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl opacity-60 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-purple/20 rounded-full blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;