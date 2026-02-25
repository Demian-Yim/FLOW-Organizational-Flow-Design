import React, { useState, useEffect, useRef } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { Quote, CheckCircle2, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const Clients: React.FC = () => {
  const revealRef = useScrollReveal();
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 5;
  const itemsPerPage = 9;
  const autoSlideInterval = 3000; // 3초
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // Dense list with domains - Added requested partners (Total 24 items)
  const clients = [
    { name: 'Samsung C&T', domain: 'samsungcnt.com', label: '삼성물산' },
    { name: 'Hyundai Card', domain: 'hyundaicard.com', label: '현대카드' },
    { name: 'SK Telecom', domain: 'sktelecom.com', label: 'SK텔레콤' },
    { name: 'HD Hyundai Oilbank', domain: 'hd-hyundaioilbank.co.kr', label: 'HD현대오일뱅크' },
    { name: 'Samsung Electronics Service', domain: 'samsungsvc.co.kr', label: '삼성전자서비스' },
    { name: 'Lotte Card', domain: 'lottecard.co.kr', label: '롯데카드' },
    
    { name: 'Shinsegae', domain: 'shinsegae.com', label: '신세계' },
    { name: 'Heerim', domain: 'heerim.com', label: '희림건축' },
    { name: 'Lotte E&C', domain: 'lottecon.co.kr', label: '롯데건설' },
    { name: 'SK Ecoplant', domain: 'skecoplant.com', label: 'SK에코플랜트' },
    { name: 'DB Insurance', domain: 'idbins.com', label: 'DB손해보험' },
    { name: 'SC Bank', domain: 'standardchartered.co.kr', label: 'SC제일은행' },
    
    { name: 'KSFC', domain: 'ksfc.co.kr', label: '한국증권금융' },
    { name: 'K-water', domain: 'kwater.or.kr', label: 'K-water' },
    { name: 'HRD Korea', domain: 'hrdkorea.or.kr', label: '한국산업인력공단' },
    { name: 'Korail', domain: 'korail.com', label: '한국철도공사' },
    { name: 'Customs', domain: 'customs.go.kr', label: '관세청' },
    { name: 'KAC', domain: 'airport.co.kr', label: '한국공항공사' },
    
    { name: 'Kepco E&C', domain: 'kepco-enc.com', label: '한국전력기술' },
    { name: 'SPC', domain: 'spc.co.kr', label: 'SPC그룹' },
    { name: 'BBQ', domain: 'genesiskorea.co.kr', label: '제너시스BBQ' },
    { name: 'KFCC', domain: 'kfcc.co.kr', label: '새마을금고' },
    { name: 'Kumho', domain: 'kumhoasiana.com', label: '금호아시아나' },
    { name: 'Pulmuone', domain: 'pulmuone.co.kr', label: '풀무원' },
  ];

  // Expanded Reviews Data (45 items for 5 pages x 9 items)
  const allReviews = [
    // Page 1
    { content: "실무진들이 바로 쓸 수 있는 AI 기능을 중심으로 교육해주셔서 좋았습니다. 특히 엑셀 데이터 분석 실습은 현업 적용도가 매우 높다는 평가를 받았습니다.", info: "종합상사 경영지원팀 과장" },
    { content: "AI 도입을 고민하던 차에 리더십 워크숍을 진행했습니다. 막연한 두려움을 없애고, 리더가 해야 할 역할을 명확히 할 수 있었던 시간이었습니다.", info: "통신사 디지털혁신팀 본부장" },
    { content: "신입사원 온보딩 과정에 포함시켰는데, MZ세대 사원들의 몰입도가 가장 높은 세션이었습니다. 결과물 퀄리티도 기대 이상이네요.", info: "공공기관 HR 담당자" },
    { content: "일방적인 강의가 아니라 실습 위주라 좋았습니다. 우리 팀만의 업무 봇을 만드는 과정에서 팀워크도 다질 수 있었습니다.", info: "카드사 디지털전략팀 리더" },
    { content: "단순한 툴 사용법을 넘어, 일을 대하는 관점을 바꿔주는 교육입니다. 구성원들의 디지털 역량 차이를 줄이는 데 큰 도움이 되었습니다.", info: "백화점 교육 담당" },
    { content: "강사님이 현업 경험이 풍부하셔서 그런지 기업의 니즈를 정확히 파악하고 계십니다. 커뮤니케이션 비용이 들지 않아 편했습니다.", info: "정유사 인사팀장" },
    { content: "ChatGPT로 보고서를 쓰는 법을 배우고 나서 야근이 확 줄었습니다. 팀장님도 보고서 퀄리티가 좋아졌다고 칭찬하시네요.", info: "식품기업 마케터" },
    { content: "우리 회사의 핵심 가치를 담은 AI 송을 만드는 과정이 너무 즐거웠습니다. 딱딱한 워크숍이 아니라 축제 같은 분위기였어요.", info: "프랜차이즈 조직문화 담당" },
    { content: "개발 지식이 없어도 나만의 앱을 만들 수 있다니 놀라웠습니다. 현업 부서의 작은 비효율들을 직접 해결하고 있습니다.", info: "물류운수회사 운영팀 대리" },
    
    // Page 2
    { content: "임원 대상 특강으로 진행했는데, AI에 대한 막연한 오해가 풀리고 비즈니스에 어떻게 접목할지 인사이트를 얻으셨다고 합니다.", info: "건설사 비서실장" },
    { content: "매년 하던 직무 교육이 지루했는데, AI 툴을 활용하니 신선하고 재미있었습니다. 강사님의 딕션과 전달력이 정말 좋으시네요.", info: "보험사 영업관리자" },
    { content: "팀장 승진자 과정에 포함된 리더십 진단이 매우 인상 깊었습니다. 제가 어떤 리더가 되어야 할지 명확한 그림이 그려졌습니다.", info: "건축설계사 현장소장" },
    { content: "사내 강사 양성 과정에서 AI를 활용한 교안 제작법을 배웠습니다. 강의 준비 시간이 절반으로 줄어들 것 같습니다.", info: "증권금융 교육파트장" },
    { content: "협업 툴과 AI를 연동하는 워크스마트 과정 덕분에 팀 커뮤니케이션 비용이 획기적으로 줄었습니다.", info: "IT/통신 기획자" },
    { content: "단순히 기능만 알려주는 게 아니라, AI 윤리와 보안 가이드까지 짚어주셔서 안심하고 도입할 수 있었습니다.", info: "정부기관 정보보안팀" },
    { content: "해커톤 형식으로 진행된 워크숍에서 실제 서비스 프로토타입까지 만들었습니다. 우리 팀의 실행력이 이렇게 좋은 줄 몰랐네요.", info: "은행 플랫폼기획팀" },
    { content: "신입사원들이 만든 AI 멘토 봇이 실제 OJT에 쓰이고 있습니다. 선배들이 바쁠 때 물어볼 곳이 생겨서 너무 좋다고 하네요.", info: "협동조합 인사팀 대리" },
    { content: "창의적인 아이디어가 필요할 때 AI와 브레인스토밍하는 법을 배우고 나서 기획안 작성의 부담이 사라졌습니다.", info: "F&B 마케팅팀" },

    // Page 3
    { content: "직무별로 필요한 프롬프트가 다 다른데, 우리 부서 특성에 딱 맞춰 커스터마이징 해주신 점이 가장 만족스러웠습니다.", info: "친환경/에너지 연구원" },
    { content: "교육 후에도 슬랙 커뮤니티에서 꾸준히 질의응답을 받아주셔서, 실무 적용 중에 막히는 부분을 바로 해결할 수 있었습니다.", info: "전력기술 공기업 개발팀장" },
    { content: "비개발자 대상 노코드 교육이었는데, 다들 눈이 반짝거리며 수업을 들었습니다. 디지털 전환의 불씨를 지핀 것 같습니다.", info: "수자원 공기업 DX 추진팀" },
    { content: "스트레스 관리 교육에서 배운 호흡법과 명상을 매일 아침 실천하고 있습니다. 업무 몰입도가 확실히 달라졌어요.", info: "고객서비스/CS 매니저" },
    { content: "비즈니스 매너 교육이 이렇게 트렌디할 수 있다니 놀랐습니다. 꼰대 같은 내용이 아니라 진짜 센스 있는 팁들이었어요.", info: "유통/패션 MD" },
    { content: "리더십 딜레마 상황을 AI와 롤플레잉하는 실습이 신선했습니다. 실제 상황처럼 몰입해서 연습해볼 수 있었습니다.", info: "공항운영 공기업 팀장" },
    { content: "데이터 분석이라고 해서 겁먹었는데, 자연어로 물어보면 차트를 그려주는 걸 보고 자신감을 얻었습니다.", info: "철도 공기업 역장/관리자" },
    { content: "전사 워크숍 아이스브레이킹으로 진행한 AI 그림 그리기가 대박이었습니다. 서로의 작품을 보며 한참 웃었네요.", info: "종합상사 경영지원" },
    { content: "강의 자료 퀄리티가 남다릅니다. 교육 끝나고도 계속 찾아보게 되는 알찬 자료들을 아낌없이 공유해 주셨습니다.", info: "인력개발 공공기관 교직원" },

    // Page 4
    { content: "글로벌 트렌드를 빠르게 반영한 커리큘럼이라 좋았습니다. 어제 나온 기능도 오늘 강의에 반영되어 있더군요.", info: "카드사 전략기획팀" },
    { content: "보고서의 논리 구조를 잡는 법부터 AI로 문장을 다듬는 법까지, 기획 업무의 A to Z를 마스터했습니다.", info: "관세/행정 공무원" },
    { content: "사내 동호회 활동으로 영상 제작 강의를 들었는데, 이제 회사 행사 영상은 제가 다 만듭니다. 너무 뿌듯해요.", info: "건설사 품질관리팀" },
    { content: "재택근무 중 소통의 어려움을 겪고 있었는데, 비대면 협업 툴 활용법을 배우고 나서 팀워크가 훨씬 좋아졌습니다.", info: "통신사 소프트웨어 개발자" },
    { content: "퇴직 예정자 분들을 위한 생애 설계 교육에 AI 활용법을 넣었는데, 제2의 인생을 준비하는 데 큰 도움이 되었다고 하십니다.", info: "공기업 복지담당" },
    { content: "매일 반복되는 엑셀 작업을 파이썬 코드로 자동화했습니다. 3시간 걸리던 일이 3초 만에 끝납니다. 마법 같아요.", info: "유통사 재무팀" },
    { content: "우리 회사의 톤앤매너를 학습시킨 마케팅 카피라이팅 봇을 만들었습니다. 카피 고민하는 시간이 확 줄었어요.", info: "식품 브랜드 마케터" },
    { content: "임직원 대상 AI 윤리 교육은 필수라고 생각합니다. 기술의 명과 암을 균형 있게 다뤄주셔서 좋았습니다.", info: "금융그룹 감사팀" },
    { content: "교육 만족도 5점 만점에 4.9점 나왔습니다. 다음 심화 과정도 꼭 FLOW~와 함께하고 싶습니다.", info: "보험사 HRD 담당자" },

    // Page 5
    { content: "강사님의 열정이 화면을 뚫고 나옵니다. 온라인 강의였는데도 오프라인처럼 생생하고 집중이 잘 되었습니다.", info: "글로벌 건축설계사" },
    { content: "질문 하나하나에 정성껏 답변해 주시고, 쉬는 시간에도 한 명 한 명 봐주시는 모습에 감동했습니다.", info: "협동조합 지점장" },
    { content: "어렵게만 느껴지던 AI가 이제는 든든한 파트너처럼 느껴집니다. 제 커리어의 터닝포인트가 된 교육이었습니다.", info: "중견 건설사 기사" },
    { content: "회의록 요약부터 일정 관리까지, AI 비서 활용법을 배우고 나서 '일잘러'라는 소리를 듣게 되었습니다.", info: "백화점 마케팅 인턴" },
    { content: "조직 내 세대 갈등을 주제로 한 소통 워크숍이 인상적이었습니다. 서로를 이해하는 계기가 되었습니다.", info: "프랜차이즈 슈퍼바이저" },
    { content: "고객 응대 매뉴얼을 AI 챗봇으로 만들어서 배포했습니다. 신입 상담원 교육 시간이 획기적으로 줄었습니다.", info: "가전 CS 센터장" },
    { content: "디자인 전공자가 아닌데도 고퀄리티 이미지를 뚝딱 만들어내니 다들 디자이너 채용했냐고 물어보네요.", info: "공공기관 홍보담당자" },
    { content: "매년 비슷한 교육에 지쳐있던 직원들에게 신선한 자극이 되었습니다. 교육 신청이 이렇게 빨리 마감된 건 처음입니다.", info: "정유사 인사팀" },
    { content: "변화하는 시대에 리더가 갖춰야 할 덕목에 대해 깊이 고민해보는 시간이었습니다. 진정성 있는 강의 감사합니다.", info: "에너지 공기업 부서장" }
  ];

  // Auto-slide effect
  useEffect(() => {
    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setCurrentPage((prev) => (prev + 1) % totalPages);
        }, autoSlideInterval);
    };

    startTimer();

    return () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleManualSlide = (idx: number) => {
    setCurrentPage(idx);
    // Reset timer on manual interaction
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    }, autoSlideInterval);
  };

  const nextSlide = () => handleManualSlide((currentPage + 1) % totalPages);
  const prevSlide = () => handleManualSlide((currentPage - 1 + totalPages) % totalPages);

  return (
    <section id="clients" className="py-20 bg-white dark:bg-slate-950 scroll-mt-20 border-t border-slate-100 dark:border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12" ref={revealRef}>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            함께한 파트너들
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            스타트업부터 대기업, 공공기관까지.<br className="hidden md:block" />
            조직의 성장을 고민하는 소중한 파트너들과 함께했습니다.
            <span className="text-xs text-gray-400 mt-2 block opacity-80">* 로고를 클릭하면 해당 기업 홈페이지로 이동합니다.</span>
          </p>
        </div>

        {/* Logos Grid - High Density & Interactive */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4 mb-20">
            {clients.map((client, idx) => (
                <a 
                    key={idx}
                    href={`https://${client.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-3 flex flex-col items-center justify-center h-24 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md hover:border-brand-cyan/30 transition-all duration-300 gap-2"
                >
                    {/* Link Icon Indicator */}
                    <ExternalLink size={10} className="absolute top-2 right-2 text-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity transform scale-75" />

                    {/* Logo Image */}
                    <div className="h-8 flex items-center justify-center w-full mb-1">
                        <img 
                            src={`https://logo.clearbit.com/${client.domain}?size=80`}
                            alt={`${client.label} 로고`}
                            className="max-h-full w-auto max-w-full object-contain transition-all duration-300 transform group-hover:scale-110"
                            onError={(e) => {
                                // Fallback to Google Favicon if Clearbit fails
                                const target = e.currentTarget;
                                if (!target.src.includes('gstatic')) {
                                    target.src = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${client.domain}&size=128`;
                                } else {
                                    // If even favicon fails, hide it
                                    target.style.display = 'none';
                                }
                            }}
                        />
                    </div>
                    
                    {/* Partner Name Text */}
                    <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white text-center break-keep leading-tight">
                        {client.label}
                    </span>

                    {/* Tooltip */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg tracking-wide font-medium">
                        {client.domain}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-800"></div>
                    </div>
                </a>
            ))}
        </div>

        {/* Testimonials - Auto Slider (5 Pages x 9 Items) */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 md:p-12 border border-slate-100 dark:border-slate-800 relative group"
             onMouseEnter={() => timerRef.current && clearInterval(timerRef.current)}
             onMouseLeave={() => timerRef.current = setInterval(() => setCurrentPage(prev => (prev + 1) % totalPages), autoSlideInterval)}
        >
            <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
                    <Quote size={20} className="text-brand-cyan rotate-180" />
                    담당자님들의 찐 후기 ({allReviews.length}건)
                </h3>
            </div>

            <div className="relative overflow-hidden">
                <div 
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentPage * 100}%)` }}
                >
                    {Array.from({ length: totalPages }).map((_, pageIndex) => (
                        <div key={pageIndex} className="w-full flex-shrink-0 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {allReviews.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((review, idx) => (
                                <div key={idx} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 flex-1 break-keep">
                                        "{review.content}"
                                    </p>
                                    <div className="flex items-center gap-2 border-t border-slate-100 dark:border-slate-700 pt-3 mt-auto">
                                        <CheckCircle2 size={14} className="text-brand-cyan flex-shrink-0" />
                                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                                            {review.info}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleManualSlide(idx)}
                        className={`transition-all duration-300 rounded-full h-1.5 ${
                            currentPage === idx ? 'w-8 bg-brand-cyan' : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-brand-cyan/50'
                        }`}
                        aria-label={`Go to page ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Nav Arrows (Visible on Hover) */}
            <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg text-slate-500 hover:text-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg text-slate-500 hover:text-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
            >
                <ChevronRight size={24} />
            </button>
        </div>

      </div>
    </section>
  );
};

export default Clients;