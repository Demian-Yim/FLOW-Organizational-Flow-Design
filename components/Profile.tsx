import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Briefcase, Award, Mic, Users, CheckCircle } from 'lucide-react';

const Profile: React.FC = () => {
  const revealRef = useScrollReveal();
  const revealRef2 = useScrollReveal();

  return (
    <section id="profile" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300 scroll-mt-20">
       {/* Textured Background */}
       <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Column: Visual (Real Photo) */}
          <div className="w-full lg:w-4/12 flex flex-col items-center" ref={revealRef}>
             <div className="relative group perspective-1000 w-full max-w-xs mx-auto">
                {/* Main Profile Card - Professional Real Photo */}
                <div className="relative z-20 w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-200 transform transition-transform duration-500 hover:scale-[1.02]">
                    <img 
                        src="https://i.ibb.co/dsLbNhBX/2019.png" 
                        alt="임정훈 소장" 
                        className="w-full h-full object-cover object-top filter contrast-105"
                    />
                    {/* Overlay Text */}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-6 pt-24">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
                            <p className="text-brand-cyan font-bold text-xs tracking-widest uppercase">FLOW~ 소장</p>
                        </div>
                        <h3 className="text-3xl font-black text-white leading-none">임 정 훈</h3>
                        <p className="text-gray-300 text-sm mt-1 font-light">Demian Yim</p>
                    </div>
                </div>

                {/* Floating Elements - Book Cover */}
                <div className="absolute -bottom-6 -right-6 w-28 rounded-lg shadow-2xl border border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-300 z-30 bg-black group-hover:scale-110">
                    <img src="https://i.ibb.co/MDDMLTBT/image-1.jpg" alt="Book Cover" className="w-full h-auto rounded-lg" />
                </div>
             </div>

             {/* Short Badge */}
             <div className="mt-10 flex gap-2 justify-center flex-wrap max-w-sm">
                <span className="px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan text-xs font-bold text-brand-cyan dark:text-brand-cyan shadow-sm">
                    #12년차_HRD
                </span>
                <span className="px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan text-xs font-bold text-brand-cyan dark:text-brand-cyan shadow-sm">
                    #1,400명_조직_실무경험
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-gray-300 shadow-sm">
                    #AI_실무_전문가
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-gray-300 shadow-sm">
                    #퍼실리테이터
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-gray-300 shadow-sm">
                    #조직문화_디자이너
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-gray-300 shadow-sm">
                    #응급처치법_강사
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-gray-300 shadow-sm">
                    #웰니스_코치
                </span>
             </div>
          </div>

          {/* Right Column: Content Area */}
          <div className="w-full lg:w-8/12" ref={revealRef2}>
            
            <div className="mb-8">
                <span className="text-brand-cyan font-black tracking-widest uppercase text-sm border-b-2 border-brand-cyan pb-1">HRD & AI COORDINATOR</span>
                <h2 className="text-4xl lg:text-5xl font-black mt-4 mb-6 text-slate-900 dark:text-white leading-tight">
                    <span className="text-slate-500">FLOW~ 소장</span><br/>
                    <span className="text-brand-cyan">AI 코디네이터</span> 임정훈입니다.
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                    "AI는 기술이 아니라 <span className="text-slate-900 dark:text-white font-bold underline decoration-brand-cyan underline-offset-4">새로운 일의 언어</span>입니다.<br/>
                    조직이 이 언어를 가장 유창하게 구사하도록 돕습니다."
                </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-10">
                 <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border-l-4 border-brand-blue shadow-lg dark:shadow-none dark:backdrop-blur-sm hover:translate-x-1 transition-transform">
                    <div className="flex items-center gap-3 mb-3">
                        <Briefcase className="text-brand-blue" />
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">업무 플로우 개선</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">현업의 이슈와 환경을 고려한 AI의 도입과 적용을 함께 고민하며, 일과 조직의 흐름이 원활하도록 지원합니다.</p>
                 </div>
                 <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border-l-4 border-brand-purple shadow-lg dark:shadow-none dark:backdrop-blur-sm hover:translate-x-1 transition-transform">
                    <div className="flex items-center gap-3 mb-3">
                        <Mic className="text-brand-purple" />
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">기업 강의 & 워크숍</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">단순 지식 전달이 아닌, 실습 비중 80%의 참여형 교육을 통해 현업에 즉시 적용 가능한 산출물을 만들어냅니다.</p>
                 </div>
                 <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border-l-4 border-green-500 shadow-lg dark:shadow-none dark:backdrop-blur-sm hover:translate-x-1 transition-transform">
                    <div className="flex items-center gap-3 mb-3">
                        <Users className="text-green-500" />
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">1:1 AI & 리더십 코칭</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">AI 대전환의 시기, 리더가 흔들리지 않도록 AI 접근성과 가이드라인 수립, 자기인식과 회복탄력성을 코칭합니다.</p>
                 </div>
                 <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border-l-4 border-yellow-500 shadow-lg dark:shadow-none dark:backdrop-blur-sm hover:translate-x-1 transition-transform">
                    <div className="flex items-center gap-3 mb-3">
                        <Award className="text-yellow-500" />
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">퍼실리테이션</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">AI 해커톤, 문제해결 워크숍 등 조직 내 복잡한 문제를 집단지성으로 해결하는 프로세스를 설계합니다.</p>
                 </div>
            </div>

            {/* Trust Indicators */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
                <h4 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Professional Career</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-brand-cyan shrink-0 mt-1" />
                        <span>現 FLOW~ 소장 (HRD & AI Coordinator)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-slate-500 dark:text-slate-600 shrink-0 mt-1" />
                        <span>희림종합건축사사무소 HRD 매니저 (1,420명 조직 교육체계 수립 및 기획/운영, AI 도입 및 워크플로우 구축)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-slate-500 dark:text-slate-600 shrink-0 mt-1" />
                        <span>現 HRD 담당자, 강사, 코치 커뮤니티 "기업교육 AI 스터디", "교학상장" 운영진</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-slate-500 dark:text-slate-600 shrink-0 mt-1" />
                        <span>한국코치협회 인증 코치 (KAC)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-slate-500 dark:text-slate-600 shrink-0 mt-1" />
                        <span>응급처치법 강사, 수상구조사, 스포츠재활치료사</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-slate-500 dark:text-slate-600 shrink-0 mt-1" />
                        <span className="font-medium text-slate-800 dark:text-gray-200">저서 『AI 대전환 시대, 조직은 문화다』</span>
                    </li>
                </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;