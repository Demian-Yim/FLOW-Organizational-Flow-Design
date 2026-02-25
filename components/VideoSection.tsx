import React, { useState } from 'react';
import { PlayCircle, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, BadgeCheck, Play } from 'lucide-react';
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
            
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              AI 시대,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                조직의 성장과 리더십의 리빌딩
              </span>
            </h2>
            
            <div className="space-y-4">
              <p className="text-xl font-medium text-slate-800 dark:text-gray-200">
                성공적인 AI 도입과 조직 변화를 고민하는<br/>HRD 담당자를 위한 핵심 인사이트
              </p>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                단순한 툴 교육을 넘어, 일하는 방식의 근본적인 혁신과<br className="hidden md:block" />
                구성원의 자발적 변화를 이끌어낼 새로운 교육 방향성을 영상으로 확인하세요.
              </p>
            </div>
          </div>

          {/* Phone Frame / Video Container */}
          <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
            <div className="relative w-[320px] h-[640px] bg-gray-900 rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 ring-1 ring-white/10 group">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-30 pointer-events-none"></div>
              
              {/* Screen Content Wrapper - Using Flex Column for layout */}
              <div className="absolute inset-0 bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
                  
                  {/* --- Header (Restored FLOW~ Profile) --- */}
                  <div className="h-[85px] bg-white flex items-center px-4 justify-between border-b border-gray-100 z-20 pt-8 pointer-events-none shrink-0">
                     <div className="flex items-center gap-3 pointer-events-auto">
                        <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-purple-600">
                            <img 
                                src="https://i.ibb.co/Gv1hBpD1/transformed-image-1761555212912.png" 
                                alt="Profile" 
                                className="w-full h-full object-cover rounded-full border border-white" 
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-1">
                                 <span className="font-bold text-sm text-slate-900 leading-none">FLOW~</span>
                                 <BadgeCheck size={14} className="text-[#0095f6] fill-[#0095f6] text-white" />
                            </div>
                            <p className="text-[11px] text-gray-500 leading-none mt-1">Original Audio</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3 pointer-events-auto">
                        <button className="bg-[#0095f6] hover:bg-[#1877f2] text-white text-xs font-bold px-4 py-1.5 rounded-[4px] transition-colors">
                            프로필 보기
                        </button>
                        <MoreHorizontal size={20} className="text-slate-900" />
                     </div>
                  </div>

                  {/* --- Video Layer --- */}
                  <div className="relative flex-1 bg-black z-10 overflow-hidden group/video"> 
                    <iframe 
                      className="absolute top-[-60px] left-0 w-full h-[calc(100%+220px)] object-cover"
                      src="https://www.instagram.com/reel/DUE-YSRF1Ae/embed"
                      frameBorder="0" 
                      scrolling="no" 
                      allowtransparency="true"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      title="Demian Insight Reel"
                    ></iframe>
                    {/* Play Icon Overlay */}
                    {!isPlaying && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer pointer-events-none"
                      >
                        <div 
                          className="w-24 h-24 bg-brand-cyan/90 rounded-full flex items-center justify-center backdrop-blur-md border-4 border-white shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-110 hover:bg-brand-cyan transition-all duration-300 animate-pulse pointer-events-auto"
                          onClick={() => setIsPlaying(true)}
                        >
                          <Play size={48} className="text-white ml-2 fill-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* --- Footer Area --- */}
                  <div className="bg-white z-20 flex flex-col shrink-0 pb-4 pt-4 border-t border-gray-100 pointer-events-none">
                     
                     {/* Icons Row */}
                     <div className="flex items-center justify-between px-4 mb-3 pointer-events-auto">
                        <div className="flex items-center gap-4">
                           <Heart size={24} className="text-slate-900 cursor-pointer hover:text-red-500 transition-colors" />
                           <MessageCircle size={24} className="text-slate-900 cursor-pointer hover:text-gray-600 transition-colors" />
                           <Send size={24} className="text-slate-900 cursor-pointer hover:text-gray-600 transition-colors" />
                        </div>
                        <Bookmark size={24} className="text-slate-900 cursor-pointer hover:text-gray-600 transition-colors" />
                     </div>
                     
                     {/* Info */}
                     <div className="px-4 space-y-1 pointer-events-auto">
                        <div className="text-sm font-bold text-slate-900">좋아요 118개</div>
                        <div className="text-xs text-slate-900 leading-snug line-clamp-2">
                           <span className="font-bold mr-2">FLOW~</span>
                           조직문화의 새로운 흐름... <span className="text-gray-400 cursor-pointer">더 보기</span>
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">3 DAYS AGO</div>
                     </div>
                  </div>

              </div>
            </div>
            
            {/* Decorative blobs */}
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