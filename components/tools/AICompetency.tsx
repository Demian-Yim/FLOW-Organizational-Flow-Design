import React, { useState, useEffect } from 'react';
import { X, Download, RefreshCw, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { uploadPdfToDrive, saveDiagnosisData, generateDateString } from '../../utils/googleApi';

// --- Static Data & Logic from provided file ---
const checkOptions = {
    p2_q6: [
        {v:'ChatGPT', l:'ChatGPT'}, {v:'Claude', l:'Claude'}, {v:'Gemini', l:'Gemini'},
        {v:'Copilot', l:'M365 Copilot'}, {v:'Internal', l:'자체 LLM'},
        {v:'Notion', l:'Notion AI'}, {v:'Slack', l:'Slack/Teams AI'}, {v:'GitHub', l:'GitHub Copilot'},
        {v:'Perplexity', l:'Perplexity'}, {v:'None', l:'없음'}
    ],
    p3_q8: [
        {v:'ChatGPT', l:'ChatGPT'}, {v:'Claude', l:'Claude'}, {v:'Gemini', l:'Gemini'},
        {v:'Perplexity', l:'Perplexity'}, {v:'NotebookLM', l:'NotebookLM'}, 
        {v:'Gamma', l:'Gamma'}, {v:'Cursor', l:'Cursor (코딩)'}, 
        {v:'Suno/Sora', l:'Suno/Sora (영상/음악)'}
    ],
    p5_q11: [
        {v:'Report', l:'보고서/문서 자동화'}, {v:'Data', l:'데이터 분석 및 시각화'}, 
        {v:'Content', l:'이미지/영상 콘텐츠 제작'}, {v:'Bot', l:'나만의 AI 비서 제작'}, 
        {v:'Trend', l:'최신 AI 트렌드 및 도구'}, {v:'Prompt', l:'프롬프트 엔지니어링 심화'},
        {v:'Other', l:'기타'}
    ],
    p5_q12: [
        {v:'Gap', l:'기술 격차 우려'}, {v:'Security', l:'보안 및 유출'}, {v:'Cost', l:'구독 비용 부담'},
        {v:'Hallucination', l:'할루시네이션'}, {v:'Fatigue', l:'학습 피로도'}, {v:'None', l:'고민 없음'}
    ]
};

const likertDescs: Record<string, string[]> = {
    q9_1: [ // Knowledge
        "AI가 무엇인지 전혀 모릅니다.",
        "들어본 적은 있지만 원리는 모릅니다.",
        "기본 원리와 주요 용어(LLM 등)를 압니다.",
        "환각 현상 등 한계점을 명확히 이해합니다.",
        "동료에게 AI의 작동 방식을 설명할 수 있습니다."
    ],
    q9_2: [ // Skill
        "프롬프트(명령어) 입력이 어렵습니다.",
        "단순한 질문 위주로 사용합니다.",
        "맥락을 주어 원하는 답변을 얻어냅니다.",
        "복잡한 작업(분석, 창작)을 수행합니다.",
        "업무 프로세스 전체를 AI로 자동화합니다."
    ],
    q9_3: [ // Attitude
        "결과물을 검증 없이 사용합니다.",
        "가끔 내용이 맞는지 확인합니다.",
        "반드시 팩트체크를 거칩니다.",
        "저작권/개인정보 문제를 고려하여 씁니다.",
        "팀 내 윤리 가이드를 제시할 수 있습니다."
    ]
};

const resultDefinitions: Record<string, any> = {
    explorer: {
        title: "😊 탐험가 (Explorer)",
        range: "1.0 ~ 2.5",
        desc: "AI의 세계를 탐험하기 시작한 단계입니다.<br>기본 개념을 익히고 간단한 도구 사용법을 배우는 시기입니다.",
        actions: [
            "<b>1. AI 기초 체력 기르기 (개념)</b><br>LLM, 프롬프트, 할루시네이션 등 핵심 용어 3가지를 정리하고, AI가 '만능'이 아닌 '확률적 도구'임을 이해하는 것이 중요합니다.",
            "<b>2. 일상 업무에 스며들기 (실행)</b><br>거창한 작업 대신, 이메일 초안 작성이나 회의록 요약부터 ChatGPT에게 맡겨보세요. 하루 10분, AI와 대화하는 루틴을 만드세요.",
            "<b>3. 안전장치 마련하기 (태도)</b><br>AI의 답변을 100% 신뢰하지 마세요. 반드시 원문과 대조하여 팩트체크하는 '휴먼 터치'가 필요합니다."
        ]
    },
    adopter: {
        title: "🙌 활용자 (Adopter)",
        range: "2.6 ~ 3.5",
        desc: "AI를 일상과 업무에 활용하고 있습니다.<br>다양한 도구를 시도하고 결과를 검증하는 습관을 기르면 좋습니다.",
        actions: [
            "<b>1. 도구의 지평 넓히기 (확장)</b><br>텍스트 생성(ChatGPT)을 넘어, NotebookLM으로 문서를 분석하거나 Gamma로 PPT 초안을 만드는 등 '멀티모달' 활용 능력을 키우세요.",
            "<b>2. 프롬프트 구조화 (심화)</b><br>단순 질문이 아닌 'Role(역할) - Context(상황) - Format(형식)'을 갖춘 구조화된 프롬프트를 사용하여 결과물의 품질을 높이세요.",
            "<b>3. 워크플로우 통합 (적용)</b><br>반복되는 주간 보고서 작성이나 뉴스 클리핑 업무를 AI와 연동하여 자동화된 워크플로우를 구축해보세요."
        ]
    },
    expert: {
        title: "🌟 전문가 (Expert)",
        range: "3.6 ~ 4.2",
        desc: "AI를 창의적으로 활용하는 전문가입니다.<br>팀 내 AI 활용을 선도하고 복잡한 문제 해결에 AI를 적용합니다.",
        actions: [
            "<b>1. 나만의 AI 비서 제작 (구축)</b><br>우리 팀/직무(HRD/마케팅 등) 전용 지식과 톤앤매너를 학습시킨 'Custom GPTs'를 제작하여 업무 효율을 극대화하세요.",
            "<b>2. 조직 내 전파자 되기 (리더십)</b><br>혼자만 잘 쓰는 것을 넘어, 팀원들에게 유용한 프롬프트 템플릿을 공유하고 미니 세미나를 열어 조직의 역량을 끌어올리세요.",
            "<b>3. 고난도 문제 해결 (혁신)</b><br>대규모 데이터 분석, 코드 생성(Cursor), 영상 제작 등 AI를 활용해 기존 방식으로는 불가능했던 고부가가치 업무에 도전하세요."
        ]
    },
    innovator: {
        title: "🚀 혁신가 (Innovator)",
        range: "4.3 ~ 5.0",
        desc: "AI로 새로운 가치를 창출하는 혁신가입니다.<br>조직의 AI 전환을 주도하고 미래 전략을 수립합니다.",
        actions: [
            "<b>1. AI 거버넌스 수립 (전략)</b><br>조직 전체의 AI 도입 로드맵을 설계하고, 데이터 보안 및 윤리 가이드라인을 정립하여 안전하고 지속 가능한 활용 기반을 마련하세요.",
            "<b>2. 비즈니스 모델 혁신 (창출)</b><br>AI 기술을 접목하여 기존에 없던 새로운 고객 경험이나 서비스 모델을 기획하고, 비즈니스 임팩트를 창출하세요.",
            "<b>3. 하이브리드 조직 문화 (문화)</b><br>AI와 인간이 최적으로 협업하는 'Hybrid Intelligence' 조직 문화를 구축하고, 이를 위한 평가 및 보상 체계를 설계하세요."
        ]
    }
};

const profileTypes: Record<string, {name: string, desc: string}> = {
    balance: { name: "⚖️ 균형형", desc: "모든 영역이 고릅니다. 관심 분야 심화를 추천합니다." },
    execution: { name: "⚡ 실행형", desc: "활용력은 좋으나 이론/윤리 기초 보강이 필요합니다." },
    theory: { name: "📚 이론형", desc: "이론은 강하나 실습이 부족합니다. 도구를 더 써보세요." },
    future: { name: "🔭 미래형", desc: "잠재력은 높으나 현재 활용이 부족합니다." }
};

interface AICompetencyProps {
  onClose: () => void;
}

const AICompetency: React.FC<AICompetencyProps> = ({ onClose }) => {
  // Styles (Embedded for Notebook Look)
  const styles = `
    .notebook-container { font-family: 'Jua', sans-serif; color: #2b2b2b; }
    .accent-font { font-family: 'Nanum Pen Script', cursive; }
    .binding-tape { background-color: rgba(255, 235, 59, 0.5); backdrop-filter: blur(2px); }
    .progress-track { background-image: linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent); background-size: 10px 10px; }
    .section-tag { background: #f1c40f; box-shadow: 2px 2px 0 rgba(0,0,0,0.1); }
    .option-card { border: 2px solid #ddd; transition: all 0.2s; }
    .option-card:hover { border-color: #5f6c6d; }
    .option-card.selected { border-color: #2b2b2b; background-color: #fdf6e3; box-shadow: 3px 3px 0 #2b2b2b; transform: translate(-2px, -2px); font-weight: bold; }
    .desc-likert-opt { border: 2px solid #ddd; transition: 0.2s; }
    .desc-likert-opt:hover { border-color: #aaa; }
    .desc-likert-opt.selected { border-color: #2b2b2b; background: #f1c40f; box-shadow: 3px 3px 0 #2b2b2b; transform: translate(-2px, -2px); font-weight: bold; }
    .btn-action { box-shadow: 3px 3px 0 #ccc; transition: all 0.1s; }
    .btn-action:active { transform: translate(3px, 3px); box-shadow: none; }
    .loader { border: 6px solid #f3f3f3; border-top: 6px solid #2b2b2b; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  `;

  // State
  const steps = ['intro', 'info', 'q2', 'q3', 'q4', 'q5', 'q5b', 'q6', 'q7', 'q8', 'q9-1', 'q9-2', 'q9-3', 'q10', 'q11', 'loading', 'result'];
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<any>({});
  const [inputs, setInputs] = useState({ name: '', team: '', job: '', jobOther: '', size: '' });
  const [result, setResult] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const currentStep = steps[stepIndex];
  const progress = Math.min(((stepIndex) / (steps.length - 3)) * 100, 100);

  // Handlers
  const handleInputChange = (field: string, val: string) => {
    setInputs(prev => ({ ...prev, [field]: val }));
  };

  const updateData = (key: string, val: any) => {
    setData((prev: any) => ({ ...prev, [key]: val }));
    // Auto advance for radio (except check)
    if (!Array.isArray(val) && !key.startsWith('p4_')) { // p4 (Likert) has slight delay in original
        setTimeout(() => nextStep(), 300);
    } else if (key.startsWith('p4_')) {
        setTimeout(() => nextStep(), 400);
    }
  };

  const toggleCheck = (key: string, val: string, max: number) => {
    const current = (data[key] || []) as string[];
    if (current.includes(val)) {
        setData((prev: any) => ({ ...prev, [key]: current.filter(v => v !== val) }));
    } else {
        if (current.length >= max) return alert(`최대 ${max}개까지 선택 가능합니다.`);
        setData((prev: any) => ({ ...prev, [key]: [...current, val] }));
    }
  };

  const validate = () => {
    const s = currentStep;
    if(s === 'info') return inputs.name && inputs.team;
    if(s === 'q2') return inputs.job && inputs.size;
    if(s === 'q3') return data.p1_q4;
    if(s === 'q4') return data.p2_q5;
    if(s === 'q5b') return data.p2_q6b;
    if(s === 'q6') return data.p3_q7;
    if(s === 'q7') return data.p3_q9;
    if(s === 'q9-1') return data.p4_q10_1;
    if(s === 'q9-2') return data.p4_q10_2;
    if(s === 'q9-3') return data.p4_q10_3;
    return true;
  };

  const nextStep = () => {
    if (!validate()) {
        if (currentStep === 'info' || currentStep === 'q2') return alert('모든 항목을 입력/선택해주세요.');
        return; // Don't alert for auto-advance attempts
    }

    if (stepIndex < steps.length - 1) {
        setStepIndex(prev => prev + 1);
    }
    
    // Check if next step is loading
    if (steps[stepIndex + 1] === 'loading') {
        setTimeout(finishDiagnosis, 2000);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) setStepIndex(prev => prev - 1);
  };

  const finishDiagnosis = () => {
    const k = data.p4_q10_1 || 0;
    const s = data.p4_q10_2 || 0;
    const a = data.p4_q10_3 || 0;
    const avg = parseFloat(((k + s + a) / 3).toFixed(1));

    let typeKey = 'explorer';
    if(avg >= 4.3) typeKey = 'innovator';
    else if(avg >= 3.6) typeKey = 'expert';
    else if(avg >= 2.6) typeKey = 'adopter';

    const resData = resultDefinitions[typeKey];

    // Profile Logic
    let profile = profileTypes.balance;
    const scores = [k, s, a];
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    
    if (max - min <= 1) profile = profileTypes.balance;
    else if (max === s) profile = profileTypes.execution;
    else if (max === k) profile = profileTypes.theory;
    else profile = profileTypes.future;

    setResult({
        avg,
        scores: { k, s, a },
        resData,
        profile,
        date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
    });
    setStepIndex(prev => prev + 1); // Go to result
  };

  const handleDownload = async () => {
    const element = document.getElementById('capture-target');
    if (!element || !(window as any).html2pdf) {
        alert("PDF 라이브러리를 로드하지 못했습니다.");
        return;
    }

    setIsDownloading(true);
    const fileName = `AI_역량진단_${inputs.name}_${generateDateString()}.pdf`;

    const opt = {
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        const pdfWorker = (window as any).html2pdf().set(opt).from(element);
        const pdfDataUri = await pdfWorker.outputPdf('datauristring');
        
        // 1. Upload to Drive (Optional Backup)
        const uploadRes = await uploadPdfToDrive(fileName, pdfDataUri);
        const pdfUrl = uploadRes?.url || '';

        // 2. Save Data to Sheet (Sync with backend)
        if (result) {
             const fullData = { ...inputs, ...data };
             await saveDiagnosisData(
                inputs.name, 
                'AI Competency (V2)', 
                { 
                    score: result.avg, 
                    type: result.resData.title,
                    details: { k: result.scores.k, s: result.scores.s, a: result.scores.a } 
                }, 
                pdfUrl, 
                fullData
            );
        }

        // 3. Download
        await pdfWorker.save();
    } catch (e) {
        console.error(e);
        alert("PDF 생성 중 오류가 발생했습니다.");
    } finally {
        setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm notebook-container">
      <style>{styles}</style>
      
      {/* Notebook Wrapper */}
      <div className="relative w-full max-w-3xl h-[95vh] bg-[#fffef8] rounded-[15px] shadow-[0_0_0_2px_#e0e0e0,15px_15px_0_rgba(0,0,0,0.1)] flex flex-col overflow-hidden">
        
        {/* Binding Tape */}
        <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 -rotate-1 w-[150px] h-[40px] binding-tape border border-black/5 shadow-sm z-10"></div>

        {/* Header */}
        <header className="pt-8 pb-4 px-6 text-center border-b-2 border-dashed border-[#ddd] shrink-0 bg-[#fffef8] z-20">
            <h1 className="text-2xl font-bold mb-2">AI 활용역량 진단 노트 ✏️</h1>
            <div className="w-full h-3 bg-[#eee] border-2 border-[#2b2b2b] rounded-full overflow-hidden">
                <div className="h-full bg-[#74b9ff] border-r-2 border-[#2b2b2b] transition-all duration-300 progress-track" style={{width: `${progress}%`}}></div>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
                <X size={24} color="#5f6c6d" />
            </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 relative">
            
            {/* 0. INTRO */}
            {currentStep === 'intro' && (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                    <div className="text-6xl mb-4">🚀</div>
                    <h2 className="text-3xl font-bold mb-4">준비되셨나요?</h2>
                    <p className="text-xl mb-6 leading-relaxed">
                        현재 당신의 AI 수준을 진단하고<br/>
                        <span className="bg-yellow-300/50 px-1">2026년형 성장 로드맵</span>을 드립니다.
                    </p>
                    <button onClick={() => setStepIndex(1)} className="btn-action bg-[#74b9ff] text-white border-2 border-[#2b2b2b] px-8 py-3 rounded-xl text-xl font-bold flex items-center gap-2">
                        시작하기 👉
                    </button>
                </div>
            )}

            {/* 1. INFO */}
            {currentStep === 'info' && (
                <div className="max-w-md mx-auto animate-fadeIn">
                    <div className="section-tag inline-block px-3 py-1 rounded-full border-2 border-[#2b2b2b] mb-4">STEP 0. 기본 정보</div>
                    <h3 className="text-2xl font-bold mb-2">리포트 발급을 위해<br/>이름과 소속을 입력해주세요.</h3>
                    <input type="text" value={inputs.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="이름 (예: 김데미)" className="w-full p-3 text-lg border-2 border-[#2b2b2b] rounded-lg mb-4 focus:outline-none focus:shadow-[3px_3px_0_rgba(0,0,0,0.1)]" />
                    <input type="text" value={inputs.team} onChange={(e) => handleInputChange('team', e.target.value)} placeholder="소속 (예: HRD팀)" className="w-full p-3 text-lg border-2 border-[#2b2b2b] rounded-lg focus:outline-none focus:shadow-[3px_3px_0_rgba(0,0,0,0.1)]" />
                </div>
            )}

            {/* 2. JOB & SIZE */}
            {currentStep === 'q2' && (
                <div className="max-w-md mx-auto animate-fadeIn">
                    <div className="section-tag inline-block px-3 py-1 rounded-full border-2 border-[#2b2b2b] mb-4">Q1. 직무/규모</div>
                    <h3 className="text-2xl font-bold mb-6">현재 직무와 조직 규모는?</h3>
                    <select value={inputs.job} onChange={(e) => handleInputChange('job', e.target.value)} className="w-full p-3 text-lg border-2 border-[#2b2b2b] rounded-lg mb-4 bg-white">
                        <option value="">직무를 선택해주세요</option>
                        <option value="HRD">HRD / 교육 담당</option>
                        <option value="HRM">HRM / 인사 기획</option>
                        <option value="CEO">경영진 / 임원</option>
                        <option value="Marketing">마케팅 / 홍보</option>
                        <option value="Sales">영업 / 기술영업</option>
                        <option value="IT">IT 개발 / 엔지니어</option>
                        <option value="Strategy">기획 / 전략</option>
                        <option value="Admin">총무 / 경영지원</option>
                        <option value="Freelancer">프리랜서 / 강사</option>
                        <option value="Other">기타(직접 입력)</option>
                    </select>
                    {inputs.job === 'Other' && (
                         <input type="text" value={inputs.jobOther} onChange={(e) => handleInputChange('jobOther', e.target.value)} placeholder="직무 입력" className="w-full p-3 text-lg border-2 border-[#2b2b2b] rounded-lg mb-4" />
                    )}
                    <select value={inputs.size} onChange={(e) => handleInputChange('size', e.target.value)} className="w-full p-3 text-lg border-2 border-[#2b2b2b] rounded-lg bg-white">
                        <option value="">조직 규모를 선택해주세요</option>
                        <option value="Small">~30명 (소규모)</option>
                        <option value="SME">30~300명 (중소)</option>
                        <option value="Mid">300~1000명 (중견)</option>
                        <option value="Large">1000명+ (대기업)</option>
                    </select>
                </div>
            )}

            {/* 3. CAREER (Radio) */}
            {currentStep === 'q3' && (
                <div className="max-w-md mx-auto animate-fadeIn">
                    <div className="section-tag inline-block px-3 py-1 rounded-full border-2 border-[#2b2b2b] mb-4">Q2. 경력</div>
                    <h3 className="text-2xl font-bold mb-6">해당 분야 경력은?</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {['1년 미만', '1~3년', '3~5년', '5~10년', '10~15년', '15년 이상'].map((opt) => (
                            <div key={opt} onClick={() => updateData('p1_q4', opt)} 
                                className={`option-card p-3 rounded-xl flex items-center cursor-pointer ${data.p1_q4 === opt ? 'selected' : 'bg-white'}`}>
                                <div className={`w-4 h-4 rounded-full border-2 border-[#2b2b2b] mr-2 flex items-center justify-center ${data.p1_q4 === opt ? 'bg-[#2b2b2b]' : 'bg-white'}`}></div>
                                {opt}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 4. POLICY (Radio) */}
            {currentStep === 'q4' && (
                <div className="max-w-md mx-auto animate-fadeIn">
                    <div className="section-tag inline-block px-3 py-1 rounded-full border-2 border-[#2b2b2b] mb-4">Q3. 조직 환경</div>
                    <h3 className="text-2xl font-bold mb-6">사내 AI 정책 수준은?</h3>
                    <div className="space-y-3">
                        {[
                            {k: 'Explicit', l: '보안 가이드와 사용 매뉴얼이 명확히 있습니다'},
                            {k: 'Security', l: '사용은 가능하나, 보안 절차가 까다롭습니다'},
                            {k: 'Informal', l: '알아서 쓰되, 문제 생기면 책임지는 분위기입니다'},
                            {k: 'None', l: '금지되었거나, 쓸 수 있는 환경이 아닙니다'}
                        ].map((opt) => (
                            <div key={opt.k} onClick={() => updateData('p2_q5', opt.k)} 
                                className={`option-card p-3 rounded-xl flex items-center cursor-pointer ${data.p2_q5 === opt.k ? 'selected' : 'bg-white'}`}>
                                <div className={`w-4 h-4 rounded-full border-2 border-[#2b2b2b] mr-2 ${data.p2_q5 === opt.k ? 'bg-[#2b2b2b]' : 'bg-white'}`}></div>
                                {opt.l}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 5. ALLOWED TOOLS (Check) */}
            {currentStep === 'q5' && (
                <div className="max-w-md mx-auto animate-fadeIn">
                    <div className="section-tag inline-block px-3 py-1 rounded-full border-2 border-[#2b2b2b] mb-4">Q4. 공식 도구</div>
                    <h3 className="text-2xl font-bold mb-2">사내 공식 허용 도구는?</h3>
                    <p className="text-gray-500 mb-6">(복수 선택 가능)</p>
                    <div className="grid grid-cols-2 gap-3">
                        {checkOptions.p2_q6.map((opt) => {
                            const selected = (data.p2_q6 || []).includes(opt.v);
                            return (
                                <div key={opt.v} onClick={() => toggleCheck('p2_q6', opt.v, 10)} 
                                    className={`option-card p-3 rounded-xl flex items-center cursor-pointer ${selected ? 'selected' : 'bg-white'}`}>
                                    <div className={`w-4 h-4 rounded border-2 border-[#2b2b2b] mr-2 flex items-center justify-center ${selected ? 'bg-[#2b2b2b]' : 'bg-white'}`}>
                                        {selected && <div className="w-2 h-2 bg-yellow-400"></div>}
                                    </div>
                                    {opt.l}
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={nextStep} className="mt-6 w-full btn-action bg-[#74b9ff] text-white border-2 border-[#2b2b2b] py-3 rounded-xl font-bold">다음</button>
                </div>
            )}

            {/* 6. ACCOUNT TYPE */}
            {currentStep === 'q5b' && (
                 <div className="max-w-md mx-auto animate-fadeIn">
                    <div className="section-tag inline-block px-3 py-1 rounded-full border-2 border-[#2b2b2b] mb-4">Q5. 계정 유형</div>
                    <h3 className="text-2xl font-bold mb-6">주로 사용하는 계정 형태는?</h3>
                    <div className="space-y-3">
                        {[{k:'Personal', l:'👤 개인 계정 (무료/유료)'}, {k:'Team', l:'🏢 팀/기업용 공용 계정'}, {k:'Both', l:'🤝 둘 다 혼용'}].map((opt) => (
                             <div key={opt.k} onClick={() => updateData('p2_q6b', opt.k)} 
                                className={`option-card p-3 rounded-xl flex items-center cursor-pointer ${data.p2_q6b === opt.k ? 'selected' : 'bg-white'}`}>
                                <div className={`w-4 h-4 rounded-full border-2 border-[#2b2b2b] mr-2 ${data.p2_q6b === opt.k ? 'bg-[#2b2b2b]' : 'bg-white'}`}></div>
                                {opt.l}
                            </div>
                        ))}
                    </div>
                </div>
            )}

             {/* 7. START DATE */}
             {currentStep === 'q6' && (
                 <div className="max-w-md mx-auto animate-fadeIn">
                    <div className="section-tag inline-block px-3 py-1 rounded-full border-2 border-[#2b2b2b] mb-4">Q6. 개인 경험</div>
                    <h3 className="text-2xl font-bold mb-6">AI를 언제 처음 사용하셨나요?</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {['2023년', '2024년', '2025년', '2026년', '아직 안 써봄'].map((opt) => (
                             <div key={opt} onClick={() => updateData('p3_q7', opt)} 
                                className={`option-card p-3 rounded-xl flex items-center cursor-pointer ${data.p3_q7 === opt ? 'selected' : 'bg-white'}`}>
                                <div className={`w-4 h-4 rounded-full border-2 border-[#2b2b2b] mr-2 ${data.p3_q7 === opt ? 'bg-[#2b2b2b]' : 'bg-white'}`}></div>
                                {opt}
                            </div>
                        ))}
                    </div>
                </div>
            )}

             {/* 8. FREQUENCY */}
             {currentStep === 'q7' && (
                 <div className="max-w-md mx-auto animate-fadeIn">
                    <div className="section-tag inline-block px-3 py-1 rounded-full border-2 border-[#2b2b2b] mb-4">Q7. 사용 빈도</div>
                    <h3 className="text-2xl font-bold mb-6">얼마나 자주 사용하시나요?</h3>
                    <div className="space-y-3">
                        {[{k:'Daily', l:'🔥 매일 사용'}, {k:'Weekly', l:'🌤️ 주 3~4회'}, {k:'Monthly', l:'🌙 월 1~2회'}, {k:'Rarely', l:'😴 거의 안 씀'}].map((opt) => (
                             <div key={opt.k} onClick={() => updateData('p3_q9', opt.k)} 
                                className={`option-card p-3 rounded-xl flex items-center cursor-pointer ${data.p3_q9 === opt.k ? 'selected' : 'bg-white'}`}>
                                <div className={`w-4 h-4 rounded-full border-2 border-[#2b2b2b] mr-2 ${data.p3_q9 === opt.k ? 'bg-[#2b2b2b]' : 'bg-white'}`}></div>
                                {opt.l}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 9. MAIN TOOLS (Check) */}
            {currentStep === 'q8' && (
                <div className="max-w-md mx-auto animate-fadeIn">
                     <div className="section-tag inline-block px-3 py-1 rounded-full border-2 border-[#2b2b2b] mb-4">Q8. 주 사용 도구</div>
                     <h3 className="text-2xl font-bold mb-2">자주 사용하는 도구는?</h3>
                     <p className="text-gray-500 mb-6">(최대 3개)</p>
                     <div className="grid grid-cols-2 gap-3">
                        {checkOptions.p3_q8.map((opt) => {
                            const selected = (data.p3_q8 || []).includes(opt.v);
                            return (
                                <div key={opt.v} onClick={() => toggleCheck('p3_q8', opt.v, 3)} 
                                    className={`option-card p-3 rounded-xl flex items-center cursor-pointer ${selected ? 'selected' : 'bg-white'}`}>
                                    <div className={`w-4 h-4 rounded border-2 border-[#2b2b2b] mr-2 flex items-center justify-center ${selected ? 'bg-[#2b2b2b]' : 'bg-white'}`}>
                                        {selected && <div className="w-2 h-2 bg-yellow-400"></div>}
                                    </div>
                                    {opt.l}
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={nextStep} className="mt-6 w-full btn-action bg-[#74b9ff] text-white border-2 border-[#2b2b2b] py-3 rounded-xl font-bold">다음</button>
                </div>
            )}

            {/* 10. COMPETENCY (Likert 1,2,3) */}
            {['q9-1', 'q9-2', 'q9-3'].includes(currentStep) && (
                <div className="max-w-md mx-auto animate-fadeIn">
                     <div className="section-tag inline-block px-3 py-1 rounded-full border-2 border-[#2b2b2b] mb-4">Q9. 역량 진단 ({currentStep.split('-')[1]}/3)</div>
                     <h3 className="text-2xl font-bold mb-2">
                        {currentStep === 'q9-1' ? '🧠 이해 (Knowledge)' : currentStep === 'q9-2' ? '🛠️ 활용 (Skill)' : '🔍 비판 (Attitude)'}
                     </h3>
                     <p className="text-gray-500 mb-6">
                        {currentStep === 'q9-1' ? 'AI의 원리와 한계를 얼마나 이해하나요?' : currentStep === 'q9-2' ? '프롬프트를 얼마나 능숙하게 다루나요?' : '결과물을 검증하고 윤리적으로 판단하나요?'}
                     </p>
                     <div className="space-y-3">
                        {likertDescs[currentStep.replace('-', '_')].map((desc, i) => {
                            const key = currentStep === 'q9-1' ? 'p4_q10_1' : currentStep === 'q9-2' ? 'p4_q10_2' : 'p4_q10_3';
                            return (
                                <div key={i} onClick={() => updateData(key, i+1)} 
                                    className={`desc-likert-opt p-3 rounded-xl flex items-center cursor-pointer ${data[key] === i+1 ? 'selected' : 'bg-white'}`}>
                                    <div className="w-6 h-6 rounded-full border-2 border-[#2b2b2b] flex items-center justify-center mr-3 bg-white shrink-0 font-bold text-sm">
                                        {i+1}
                                    </div>
                                    <div className="text-sm">{desc}</div>
                                </div>
                            );
                        })}
                     </div>
                </div>
            )}

            {/* 11. WANTS */}
            {currentStep === 'q10' && (
                <div className="max-w-md mx-auto animate-fadeIn">
                    <div className="section-tag inline-block px-3 py-1 rounded-full border-2 border-[#2b2b2b] mb-4">Q10. 기대 사항</div>
                    <h3 className="text-2xl font-bold mb-2">가장 필요한 콘텐츠는?</h3>
                    <p className="text-gray-500 mb-6">(최대 3개)</p>
                    <div className="space-y-2">
                         {checkOptions.p5_q11.map((opt) => {
                            const selected = (data.p5_q11 || []).includes(opt.v);
                            return (
                                <div key={opt.v} onClick={() => toggleCheck('p5_q11', opt.v, 3)} 
                                    className={`option-card p-3 rounded-xl flex items-center cursor-pointer ${selected ? 'selected' : 'bg-white'}`}>
                                    <div className={`w-4 h-4 rounded border-2 border-[#2b2b2b] mr-2 flex items-center justify-center ${selected ? 'bg-[#2b2b2b]' : 'bg-white'}`}>
                                        {selected && <div className="w-2 h-2 bg-yellow-400"></div>}
                                    </div>
                                    {opt.l}
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={nextStep} className="mt-6 w-full btn-action bg-[#74b9ff] text-white border-2 border-[#2b2b2b] py-3 rounded-xl font-bold">다음</button>
                </div>
            )}

            {/* 12. CONCERNS */}
            {currentStep === 'q11' && (
                <div className="max-w-md mx-auto animate-fadeIn">
                    <div className="section-tag inline-block px-3 py-1 rounded-full border-2 border-[#2b2b2b] mb-4">Q11. 고민 사항</div>
                    <h3 className="text-2xl font-bold mb-2">현재 가장 큰 고민은?</h3>
                    <p className="text-gray-500 mb-6">(최대 2개)</p>
                    <div className="grid grid-cols-2 gap-3">
                         {checkOptions.p5_q12.map((opt) => {
                            const selected = (data.p5_q12 || []).includes(opt.v);
                            return (
                                <div key={opt.v} onClick={() => toggleCheck('p5_q12', opt.v, 2)} 
                                    className={`option-card p-3 rounded-xl flex items-center cursor-pointer ${selected ? 'selected' : 'bg-white'}`}>
                                    <div className={`w-4 h-4 rounded border-2 border-[#2b2b2b] mr-2 flex items-center justify-center ${selected ? 'bg-[#2b2b2b]' : 'bg-white'}`}>
                                        {selected && <div className="w-2 h-2 bg-yellow-400"></div>}
                                    </div>
                                    {opt.l}
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={nextStep} className="mt-6 w-full btn-action bg-[#ff7675] text-white border-2 border-[#2b2b2b] py-3 rounded-xl font-bold">결과 보기 ✨</button>
                </div>
            )}

            {/* LOADING */}
            {currentStep === 'loading' && (
                 <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                    <div className="loader mb-6"></div>
                    <h2 className="text-2xl font-bold mb-2">분석 중입니다...</h2>
                    <p className="text-gray-500">Eva가 2026년형 솔루션을<br/>준비하고 있어요 📝</p>
                </div>
            )}

            {/* RESULT */}
            {currentStep === 'result' && result && (
                <div className="w-full flex flex-col items-center animate-fadeIn pb-20">
                    
                    {/* Capture Target */}
                    <div id="capture-target" className="bg-[#fffef8] w-full max-w-[595px] p-6 text-left relative">
                        {/* Header */}
                        <div className="flex justify-between items-end border-b-2 border-[#2b2b2b] pb-4 mb-6">
                            <h2 className="text-3xl font-bold">AI 역량 진단 리포트</h2>
                            <div className="text-right text-sm text-gray-600">
                                <span className="font-bold text-lg">{inputs.name}</span>님<br/>
                                {inputs.team} | {result.date}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {/* Score Card */}
                            <div className="bg-white border-2 border-[#2b2b2b] rounded-xl p-4 text-center shadow-sm">
                                <div className="text-sm text-gray-500 mb-2">당신의 AI 활용 수준</div>
                                <div className="text-3xl font-bold mb-2">{result.resData.title}</div>
                                <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold border border-[#2b2b2b] mb-2`}
                                     style={{backgroundColor: result.profile === profileTypes.balance ? "#a8dadc" : result.profile === profileTypes.execution ? "#ffadad" : result.profile === profileTypes.theory ? "#ffd6a5" : "#bdb2ff"}}>
                                    {result.profile.name} 프로필
                                </div>
                                <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{__html: result.resData.desc + '<br/>' + result.profile.desc}}></div>
                            </div>

                            {/* Chart */}
                            <div className="bg-white border-2 border-[#2b2b2b] rounded-xl p-4 shadow-sm flex flex-col justify-center gap-3">
                                <div className="font-bold border-b border-dashed border-gray-300 pb-1">📊 영역별 상세 진단</div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 text-sm font-bold">이해</div>
                                    <div className="flex-1 h-3 bg-gray-100 rounded-full border border-[#2b2b2b] overflow-hidden"><div className="h-full bg-[#74b9ff]" style={{width:`${(result.scores.k/5)*100}%`}}></div></div>
                                    <div className="w-8 text-xs font-bold text-right">{result.scores.k}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 text-sm font-bold">활용</div>
                                    <div className="flex-1 h-3 bg-gray-100 rounded-full border border-[#2b2b2b] overflow-hidden"><div className="h-full bg-[#ff7675]" style={{width:`${(result.scores.s/5)*100}%`}}></div></div>
                                    <div className="w-8 text-xs font-bold text-right">{result.scores.s}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 text-sm font-bold">비판</div>
                                    <div className="flex-1 h-3 bg-gray-100 rounded-full border border-[#2b2b2b] overflow-hidden"><div className="h-full bg-[#ffeaa7]" style={{width:`${(result.scores.a/5)*100}%`}}></div></div>
                                    <div className="w-8 text-xs font-bold text-right">{result.scores.a}</div>
                                </div>
                            </div>
                        </div>

                        {/* Action Plan */}
                        <div className="bg-[#f0f7ff] border border-blue-200 rounded-xl p-4 mb-4">
                            <div className="font-bold text-blue-800 mb-3 flex items-center gap-2"><Check size={16}/> 맞춤형 성장 제안</div>
                            <ul className="space-y-3 text-sm text-gray-700">
                                {result.resData.actions.map((act: string, i: number) => (
                                    <li key={i} dangerouslySetInnerHTML={{__html: act}}></li>
                                ))}
                            </ul>
                        </div>

                        {/* Comment */}
                        <div className="bg-[#f9fafb] rounded-xl p-4 text-sm text-gray-700">
                             <div className="font-bold mb-1">💡 AI 코디네이터 임정훈의 추천</div>
                             "데미안님, <b>{result.resData.title.split(' ')[1]}</b> 단계에 도달하신 것을 축하합니다! {result.profile.desc} 이 액션 플랜을 하나씩 실천하면 곧 다음 단계로 도약하실 수 있을 거예요."
                        </div>

                        <div className="mt-8 pt-4 border-t border-gray-300 text-center text-xs text-gray-400">
                             Developed by Demian 임정훈 HRD & AI Coordinator
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-col gap-3 w-full max-w-[595px]">
                        <button 
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className={`w-full py-4 bg-[#6c5ce7] text-white border-2 border-[#2b2b2b] rounded-xl font-bold shadow-[4px_4px_0_#2b2b2b] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2 ${isDownloading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isDownloading ? '생성 중...' : '결과 PDF 저장하기'} <Download size={20} />
                        </button>
                        <button onClick={() => window.location.reload()} className="w-full py-3 bg-gray-100 text-gray-600 border-2 border-[#2b2b2b] rounded-xl font-bold hover:bg-gray-200 flex items-center justify-center gap-2">
                             <RefreshCw size={18} /> 다시 하기
                        </button>
                    </div>
                </div>
            )}

        </div>

        {/* Footer Navigation (for steps) */}
        {['intro', 'loading', 'result'].indexOf(currentStep) === -1 && (
            <footer className="p-4 border-t-2 border-dashed border-[#ddd] flex gap-3 bg-[#fffef8] shrink-0 z-20">
                <button onClick={prevStep} className="flex-1 py-3 bg-[#f1f2f6] text-[#5f6c6d] border-2 border-[#2b2b2b] rounded-xl font-bold shadow-[3px_3px_0_#ccc] btn-action flex items-center justify-center gap-2">
                    <ArrowLeft size={18} /> 이전
                </button>
                {/* Check/Radio steps usually auto-advance, but providing Next button for manual steps or if user wants to skip optional? No, validation prevents skip. */}
                {['info', 'q2', 'q5', 'q8', 'q10', 'q11'].includes(currentStep) && (
                     <button onClick={nextStep} className="flex-1 py-3 bg-[#74b9ff] text-white border-2 border-[#2b2b2b] rounded-xl font-bold shadow-[3px_3px_0_#2b2b2b] btn-action flex items-center justify-center gap-2">
                        {currentStep === 'q11' ? '결과 보기' : '다음'} <ArrowRight size={18} />
                    </button>
                )}
            </footer>
        )}
      </div>
    </div>
  );
};

export default AICompetency;