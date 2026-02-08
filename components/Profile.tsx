import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Briefcase, Award, Mic, Users, Quote, CheckCircle } from 'lucide-react';

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
          
          {/* Left Column: Visual (Smaller Image) */}
          <div className="w-full lg:w-4/12 flex flex-col items-center" ref={revealRef}>
             <div className="relative group perspective-1000 w-full max-w-xs mx-auto">
                {/* Main Profile Card - Resized */}
                <div className="relative z-20 w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-200 dark:border-white/10 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 transform transition-transform duration-500 hover:scale-[1.02]">
                    <img 
                        src="https://i.ibb.co/dsLbNhBX/2019.png" 
                        alt="임정훈 대표" 
                        className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                    />
                    {/* Overlay Text */}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-6 pt-20">
                        <p className="text-brand-cyan font-bold text-sm tracking-widest uppercase mb-1">AI Coordinator</p>
                        <h3 className="text-3xl font-black text-white leading-none">임 정 훈</h3>
                    </div>
                </div>

                {/* Floating Elements - Book Cover */}
                <div className="absolute -bottom-6 -right-6 w-28 rounded-lg shadow-2xl border border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-300 z-30 bg-black">
                    <img src="https://i.ibb.co/MDDMLTBT/image-1.jpg" alt="Book Cover" className="w-full h-auto rounded-lg" />
                </div>
             </div>

             {/* Short Badge */}
             <div className="mt-10 flex gap-3 justify-center">
                <span className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-gray-300 shadow-sm">
                    #12년차_HRD
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-gray-300 shadow-sm">
                    #AI_실무_전문가
                </span>
             </div>
          </div>

          {/* Right Column: Content Area */}
          <div className="w-full lg:w-8/12" ref={revealRef2}>
            
            <div className="mb-8">
                <span className="text-brand-cyan font-black tracking-widest uppercase text-sm border-b-2 border-brand-cyan pb-1">Representative & AI Coach</span>
                <h2 className="text-4xl lg:text-5xl font-black mt-4 mb-6 text-slate-900 dark:text-white leading-tight">
                    <span className="text-slate-500">FLOW~ 대표</span><br/>
                    AI 코디네이터 임정훈입니다.
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                    "AI는 기술이 아니라 <span className="text-slate-900 dark:text-white font-bold underline decoration-brand-cyan underline-offset-4">새로운 일의 언어</span>입니다.<br/>
                    조직이 이 언어를 가장 유창하게 구사하도록 돕습니다."
                </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-10">
                 <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border-l-4 border-brand-blue shadow-lg dark:shadow-none dark:backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <Briefcase className="text-brand-blue" />
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">업무 플로우 개선</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Notion, ChatGPT, Copilot을 연동하여<br/>반복 업무를 자동화하고 프로세스를 최적화합니다.</p>
                 </div>
                 <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border-l-4 border-brand-purple shadow-lg dark:shadow-none dark:backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <Mic className="text-brand-purple" />
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">기업 강의 & 워크숍</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">일방향 지식 전달이 아닌,<br/>실습과 토론 중심의 참여형 교육을 진행합니다.</p>
                 </div>
                 <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border-l-4 border-green-500 shadow-lg dark:shadow-none dark:backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <Users className="text-green-500" />
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">1:1 리더십 코칭</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">변화의 시기, 리더가 흔들리지 않도록<br/>자기인식과 회복탄력성을 코칭합니다.</p>
                 </div>
                 <div className="bg-white dark:bg-slate-900/50 p-6 rounded-xl border-l-4 border-yellow-500 shadow-lg dark:shadow-none dark:backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <Award className="text-yellow-500" />
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">퍼실리테이션</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">조직 내 복잡한 문제를 집단지성으로<br/>해결하는 회의와 워크숍을 설계합니다.</p>
                 </div>
            </div>

            {/* Trust Indicators */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
                <h4 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Professional Career</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-brand-cyan" />
                        現 FLOW~ 대표 (Organizational Flow Designer)
                    </li>
                    <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-slate-500 dark:text-slate-600" />
                        前 희림종합건축사사무소 HRD 매니저 (1,400명 조직 인재개발 총괄)
                    </li>
                    <li className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-slate-500 dark:text-slate-600" />
                        저서 『AI 대전환 시대, 조직은 문화다 (WHO AM I)』
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