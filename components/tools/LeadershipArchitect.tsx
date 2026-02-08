import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, FileDown, RefreshCw, PenTool } from 'lucide-react';
import { uploadPdfToDrive, saveDiagnosisData, generateDateString } from '../../utils/googleApi';

interface LeadershipArchitectProps {
  onClose: () => void;
}

const LeadershipArchitect: React.FC<LeadershipArchitectProps> = ({ onClose }) => {
  const [step, setStep] = useState('intro'); // intro, quiz, loading, result
  const [userName, setUserName] = useState('');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // ... (질문 데이터 기존 유지)
  const questions = [
    {
        id: 1,
        text: "프로젝트 마감이 임박했지만 품질이 기준에 미치지 못하는 상황입니다. 당신의 선택은?",
        options: [
            "완벽함은 타협할 수 없습니다. 마감을 미루더라도 품질을 확보합니다.",
            "팀원들을 독려하고 야근을 해서라도 마감일과 품질을 모두 맞춥니다.",
            "핵심 기능에 집중하고 부가적인 요소는 과감히 제외하여 마감을 지킵니다.",
            "현실적인 방안이 무엇인지 팀원들에게 묻고 그들의 의견을 따릅니다."
        ]
    },
    {
        id: 2,
        text: "핵심 팀원 두 명이 기술적인 방향성을 두고 심하게 다투고 있습니다. 당신의 행동은?",
        options: [
            "즉시 개입하여 소모적인 논쟁을 멈추고 리더로서 최종 결정을 내립니다.",
            "양쪽 의견을 따로 들어본 뒤, 절충안을 제시하여 중재합니다.",
            "스스로 해결하도록 둡니다. 건전한 충돌은 혁신을 낳을 수 있습니다.",
            "팀 전체가 참여하는 토론 자리를 마련하여 다수결이나 합의로 정합니다."
        ]
    },
    {
        id: 3,
        text: "팀원이 회사에 손해를 끼치는 큰 실수를 저질렀습니다. 어떻게 반응하시겠습니까?",
        options: [
            "개인의 문제보다는 실수가 발생하게 된 시스템적 원인을 분석합니다.",
            "따로 불러서 실수의 결과에 대해 엄중히 이야기하고 개선책을 요구합니다.",
            "다음 회의 때 이 사례를 공유하여 팀 전체의 배움의 기회로 삼습니다.",
            "상부의 비판으로부터 팀원을 보호하기 위해 내가 모든 책임을 집니다."
        ]
    },
    {
        id: 4,
        text: "새로운 전략을 팀에게 전달할 때 선호하는 방식은 무엇입니까?",
        options: [
            "논리와 단계가 명확하게 정리된 상세 문서를 작성하여 배포합니다.",
            "비전과 열정이 담긴 프레젠테이션으로 팀원들의 가슴을 뛰게 합니다.",
            "소규모 워크숍을 열어 질문을 받고 피드백을 반영하며 전달합니다.",
            "핵심 목표만 채팅으로 간결하게 던지고, 방법은 팀에게 맡깁니다."
        ]
    },
    {
        id: 5,
        text: "당신의 의사결정에 가장 큰 영향을 미치는 요소는 무엇입니까?",
        options: [
            "객관적인 데이터와 확실한 근거.",
            "미래에 대한 직관과 나의 '감'.",
            "팀의 사기와 조직 문화에 미칠 영향.",
            "실행 속도와 효율성."
        ]
    },
    {
        id: 6,
        text: "리더로서 당신이 추구하는 궁극적인 목표는 무엇입니까?",
        options: [
            "오류 없이 완벽하게 돌아가는 시스템 구축.",
            "팀원들이 자신의 잠재력을 뛰어넘도록 영감을 주는 것.",
            "서로 신뢰하고 즐겁게 일하는 '가족' 같은 팀 만들기.",
            "시장을 압도하는 확실하고 가시적인 성과 달성."
        ]
    }
  ];

  const handleStart = () => {
    if(!userName.trim()) {
        alert("건축주(사용자)의 성함을 입력해주세요.");
        return;
    }
    setStep('quiz');
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, { question: questions[currentQ].text, answer }];
    setAnswers(newAnswers);
    
    if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
    } else {
        finishQuiz(newAnswers);
    }
  };

  const finishQuiz = async (finalAnswers: any[]) => {
    setStep('loading');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        당신은 전문적인 리더십 코치이자 조직 심리학자입니다. 아래는 사용자의 리더십 진단 응답입니다.
        사용자 이름: ${userName}
        데이터: ${JSON.stringify(finalAnswers)}
        
        사용자의 "리더십 아키타입"을 분석해주세요. 건축/구조적 메타포를 사용한 창의적인 유형 이름(예: "강철의 실용주의자", "유연한 교량 설계자")을 지어주세요.
        
        JSON 형식으로 반환하세요:
        {
            "typeTitle": "창의적인 유형 이름",
            "summary": "핵심 요약 한 문장",
            "strengths": ["강점1", "강점2", "강점3"],
            "weaknesses": ["보완점1", "보완점2"],
            "advice": "구체적인 조언 (2-3문장)"
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      
      setResult(JSON.parse(response.text));
      setStep('result');

    } catch (e) {
      console.error(e);
      setResult({
          typeTitle: "미지의 설계자",
          summary: "일시적인 오류로 분석에 실패했습니다.",
          strengths: ["인내심"],
          weaknesses: ["연결 상태"],
          advice: "잠시 후 다시 시도해주세요."
      });
      setStep('result');
    }
  };

  const handleDownloadAndUpload = async () => {
    const element = document.getElementById('leadership-blueprint-area');
    if (!element || !(window as any).html2pdf) return;

    setIsDownloading(true);
    const fileName = `FLOW_Leadership_Blueprint_${userName}_${generateDateString()}.pdf`;

    const opt = {
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        const pdfWorker = (window as any).html2pdf().set(opt).from(element);
        const pdfDataUri = await pdfWorker.outputPdf('datauristring');
        
        // 1. Upload to Drive and Get URL
        const uploadRes = await uploadPdfToDrive(fileName, pdfDataUri);
        const pdfUrl = uploadRes?.url || '';

        // 2. Save Data to Sheet
        if (result) {
            await saveDiagnosisData(
                userName, 
                'Leadership Architect', 
                { archetype: result.typeTitle, summary: result.summary, details: result }, 
                pdfUrl, 
                answers
            );
        }

        // 3. Download
        await pdfWorker.save();

    } catch (e) {
        console.error("PDF Error", e);
        alert("다운로드 중 오류가 발생했습니다.");
    } finally {
        setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-space text-[#2d3436]">
        {/* Isometric Container */}
        <div className="relative w-full max-w-2xl bg-[#e0e5ec] p-4 flex items-center justify-center perspective-[1000px]">
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 text-red-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Main Card */}
            <div id="leadership-result-card" className="w-full bg-white border-[3px] border-[#2d3436] rounded-xl p-8 relative shadow-[8px_8px_0_#2d3436] transition-all min-h-[400px] flex flex-col">
                {/* Card Header Strip */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-black/5 rounded-t-lg"></div>

                {step === 'intro' && (
                    <div className="text-center animate-fadeIn my-auto">
                        <div className="text-6xl text-[#5d5fef] mb-6 drop-shadow-[4px_4px_0_#2d3436]">🧊</div>
                        <h1 className="text-3xl font-black uppercase mb-4 tracking-tighter">리더십 아키텍트</h1>
                        <p className="text-lg font-medium mb-6 leading-relaxed">
                            6가지 전략적 질문을 통해<br/>
                            당신의 리더십 스타일을<br/>
                            <span className="text-[#5d5fef] font-bold">건축학적 청사진</span>으로 설계합니다.
                        </p>
                        
                        <input 
                            type="text" 
                            placeholder="성함 입력 (Architect Name)" 
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full max-w-xs mx-auto p-3 mb-6 border-b-[3px] border-[#2d3436] text-center font-bold text-xl focus:outline-none focus:border-[#5d5fef]"
                            onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                        />

                        <button 
                            onClick={handleStart}
                            className="w-full bg-[#5d5fef] text-white font-black text-lg py-4 border-[3px] border-[#2d3436] rounded-lg shadow-[6px_6px_0_#2d3436] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#2d3436] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0_#2d3436] transition-all"
                        >
                            설계 시작 (START)
                        </button>
                    </div>
                )}

                {step === 'quiz' && (
                    <div className="animate-fadeIn">
                        {/* Progress Bar */}
                        <div className="w-full h-3 border-[3px] border-[#2d3436] rounded-full mb-6 bg-white overflow-hidden">
                            <div className="h-full bg-[#ff6b6b] border-r-[3px] border-[#2d3436] transition-all duration-300" style={{width: `${((currentQ) / 6) * 100}%`}}></div>
                        </div>

                        <h2 className="text-xl font-black mb-6 leading-relaxed">Q{currentQ + 1}. {questions[currentQ].text}</h2>
                        
                        <div className="flex flex-col gap-4">
                            {questions[currentQ].options.map((opt, idx) => (
                                <button key={idx}
                                    onClick={() => handleAnswer(opt)}
                                    className="text-left p-4 bg-white border-[3px] border-[#2d3436] rounded-lg shadow-[4px_4px_0_#2d3436] font-bold hover:bg-[#f0f0f0] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#2d3436] active:bg-[#ffc93c] transition-all"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'loading' && (
                    <div className="text-center my-auto animate-fadeIn">
                         <div className="w-16 h-16 bg-[#5d5fef] border-[3px] border-[#2d3436] shadow-[6px_6px_0_#2d3436] mx-auto mb-8 animate-[spin_3s_linear_infinite]"></div>
                         <h2 className="text-2xl font-black mb-2">구조 분석 중...</h2>
                         <p>{userName}님의 리더십 청사진을<br/>드로잉하고 있습니다.</p>
                    </div>
                )}

                {step === 'result' && result && (
                    <div className="animate-fadeIn w-full flex flex-col items-center">
                        
                        {/* PDF Capture Area: Blueprint Style */}
                        <div 
                            id="leadership-blueprint-area" 
                            className="bg-white w-full max-w-[595px] p-8 border-[4px] border-[#2d3436] relative"
                            style={{ minHeight: '842px', backgroundImage: 'linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                        >
                            {/* Blueprint Header */}
                            <div className="border-b-[4px] border-[#2d3436] pb-6 mb-8 flex justify-between items-start">
                                <div>
                                    <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">Project: Leadership Architecture</div>
                                    <h1 className="text-4xl font-black uppercase text-[#2d3436] leading-none">Blueprint<br/>Scale 1:1</h1>
                                </div>
                                <div className="border-[3px] border-[#2d3436] p-2 bg-white shadow-[4px_4px_0_#2d3436]">
                                    <PenTool size={32} />
                                </div>
                            </div>

                            {/* Main Type */}
                            <div className="mb-10 text-center">
                                <span className="inline-block bg-[#5d5fef] text-white px-4 py-1 font-black text-sm uppercase tracking-widest mb-3 border-2 border-[#2d3436]">Archetype</span>
                                <h2 className="text-4xl font-black text-[#2d3436] mb-4 uppercase">{result.typeTitle}</h2>
                                <p className="font-bold text-lg bg-white border-2 border-[#2d3436] p-4 inline-block shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
                                    "{result.summary}"
                                </p>
                            </div>

                            {/* Structural Analysis */}
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-white border-[3px] border-[#2d3436] p-4">
                                    <h3 className="text-[#00b894] font-black uppercase border-b-2 border-dashed border-[#2d3436] pb-2 mb-3">Load Bearing (Strength)</h3>
                                    <ul className="list-square pl-5 space-y-2">
                                        {result.strengths.map((s: string, i: number) => (
                                            <li key={i} className="font-bold text-sm leading-tight">{s}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white border-[3px] border-[#2d3436] p-4">
                                    <h3 className="text-[#ff6b6b] font-black uppercase border-b-2 border-dashed border-[#2d3436] pb-2 mb-3">Stress Points (Weakness)</h3>
                                    <ul className="list-square pl-5 space-y-2">
                                        {result.weaknesses.map((s: string, i: number) => (
                                            <li key={i} className="font-bold text-sm leading-tight">{s}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Advice / Spec */}
                            <div className="mb-8">
                                <h3 className="text-xl font-black uppercase mb-2 flex items-center gap-2">
                                    <span className="w-4 h-4 bg-[#2d3436]"></span> Construction Note
                                </h3>
                                <div className="bg-[#fff] border-[3px] border-[#2d3436] p-6 text-base font-medium leading-relaxed relative">
                                    {result.advice}
                                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#2d3436]"></div>
                                </div>
                            </div>

                             {/* Footer Info */}
                            <div className="mt-auto border-t-[4px] border-[#2d3436] pt-4 flex justify-between items-end">
                                <div className="text-xs font-bold text-gray-500 uppercase">
                                    Client: {userName}<br/>
                                    Designed by FLOW~<br/>
                                    Date: {generateDateString().slice(0, 8)}
                                </div>
                                <div className="text-4xl font-black opacity-10">FLOW~</div>
                            </div>
                        </div>

                         {/* Action Buttons */}
                        <div className="mt-6 flex flex-col gap-3 w-full max-w-[595px]">
                            <button 
                                onClick={handleDownloadAndUpload}
                                disabled={isDownloading}
                                className={`w-full bg-[#00b894] text-white font-black py-4 border-[3px] border-[#2d3436] rounded-lg shadow-[6px_6px_0_#2d3436] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#2d3436] transition-all flex items-center justify-center gap-2 ${isDownloading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isDownloading ? <Loader2 className="animate-spin" /> : <FileDown size={20} />}
                                {isDownloading ? '도면 인쇄 중...' : '청사진(PDF) 다운로드'}
                            </button>
                            <button onClick={() => setStep('intro')} className="w-full bg-white text-[#2d3436] font-black py-3 border-[3px] border-[#2d3436] rounded-lg shadow-[4px_4px_0_#2d3436] hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                <RefreshCw size={18} /> 다시 진단하기
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Decorative Cubes */}
            <div className="absolute top-[-20px] right-[-10px] w-10 h-10 bg-[#ffc93c] border-[3px] border-[#2d3436] shadow-[6px_6px_0_#2d3436] rotate-[15deg] z-0"></div>
            <div className="absolute bottom-[-15px] left-[-10px] w-6 h-6 bg-[#ff6b6b] border-[3px] border-[#2d3436] shadow-[4px_4px_0_#2d3436] rotate-[-10deg] z-0"></div>
        </div>
    </div>
  );
};

export default LeadershipArchitect;