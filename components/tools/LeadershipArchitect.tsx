import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, FileDown, RefreshCw, PenTool, ArrowRight, ArrowLeft } from 'lucide-react';
import { uploadPdfToDrive, saveDiagnosisData, generateDateString } from '../../utils/googleApi';

interface LeadershipArchitectProps {
  onClose: () => void;
}

const LeadershipArchitect: React.FC<LeadershipArchitectProps> = ({ onClose }) => {
  // Steps: intro -> info -> job -> contact -> quiz -> loading -> result
  const [step, setStep] = useState('intro');
  const [inputs, setInputs] = useState({ 
    name: '', 
    team: '', 
    job: '', 
    career: '',
    email: '',
    phone: '',
    company: '',
    consent: false
  });
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const questions = [
    {
        id: 1,
        text: "프로젝트 마감이 임박했지만 품질이 기준 미달입니다.",
        options: [
            "완벽함은 타협 불가. 마감을 미루고 품질 확보.",
            "팀원을 독려하고 야근해서라도 마감+품질 달성.",
            "핵심 기능만 남기고 가지치기하여 마감 준수.",
            "팀원들에게 현실적 방안을 묻고 따름."
        ]
    },
    {
        id: 2,
        text: "핵심 팀원 두 명이 방향성을 두고 다툽니다.",
        options: [
            "즉시 개입하여 리더로서 최종 결정.",
            "양쪽 의견을 듣고 절충안 제시하여 중재.",
            "스스로 해결하도록 둠. 충돌은 혁신의 씨앗.",
            "다수결이나 팀 토론으로 결정."
        ]
    },
    {
        id: 3,
        text: "팀원이 회사에 손해를 끼치는 실수를 했습니다.",
        options: [
            "시스템적 원인을 분석하여 재발 방지.",
            "개인 면담을 통해 엄중 경고 및 개선 요구.",
            "사례를 공유하여 팀 전체 학습 기회로 삼음.",
            "상부 비판으로부터 팀원을 보호하고 내가 책임짐."
        ]
    },
    {
        id: 4,
        text: "새로운 전략을 팀에게 전달할 때 방식은?",
        options: [
            "논리가 명확한 상세 문서 배포.",
            "비전과 열정이 담긴 프레젠테이션.",
            "워크숍을 열어 피드백을 받으며 소통.",
            "핵심 목표만 던지고 방법은 위임."
        ]
    },
    {
        id: 5,
        text: "의사결정의 제1원칙은 무엇입니까?",
        options: [
            "객관적인 데이터와 근거.",
            "미래에 대한 직관과 나의 감.",
            "팀 사기와 조직 문화에 미칠 영향.",
            "실행 속도와 효율성."
        ]
    },
    {
        id: 6,
        text: "리더로서 추구하는 궁극적 목표는?",
        options: [
            "완벽한 시스템 구축.",
            "구성원의 잠재력 폭발과 성장.",
            "신뢰하고 즐겁게 일하는 원팀.",
            "압도적인 성과 달성."
        ]
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    if (step === 'info') return inputs.name && inputs.team;
    if (step === 'job') return inputs.job && inputs.career;
    if (step === 'contact') return inputs.email && inputs.phone && inputs.company && inputs.consent;
    return true;
  };

  const nextStep = () => {
    if (!validateStep()) {
        alert('모든 항목을 입력해주세요.');
        return;
    }
    if (step === 'intro') setStep('info');
    else if (step === 'info') setStep('job');
    else if (step === 'job') setStep('contact');
    else if (step === 'contact') setStep('quiz');
  };

  const prevStep = () => {
    if (step === 'info') setStep('intro');
    else if (step === 'job') setStep('info');
    else if (step === 'contact') setStep('job');
    else if (step === 'quiz') setStep('contact');
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
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        당신은 세계적인 리더십 코치이자 조직 심리학자입니다. 
        사용자 정보: ${inputs.name} (소속: ${inputs.team}, 직책: ${inputs.job}, 경력: ${inputs.career})
        
        [목표]
        사용자의 응답 데이터를 기반으로 리더십 스타일을 입체적으로 분석하고,
        '건축물' 메타포를 활용하여 시각적이면서도 깊이 있는 진단을 내리십시오.
        
        [응답 데이터]
        ${JSON.stringify(finalAnswers)}

        [요구사항 (매우 중요)]
        - 분량: 기존보다 2배 더 상세하게 작성. 단순 요약이 아닌 심층 분석 리포트 수준.
        - 실용성: 리더가 당장 현업에서 적용할 수 있는 구체적인 가이드 제공.
        - 맥락 고려: 입력된 직책(${inputs.job})과 경력(${inputs.career})에 맞는 조언 제공.
        - 출력 형식: 오직 순수한 JSON 포맷일 것.

        [JSON 스키마]
        {
            "typeTitle": "창의적인 건축 유형 (예: '폭풍을 견디는 강철 요새', '유연하게 연결하는 현수교')",
            "summary": "해당 유형에 대한 3~4문장의 깊이 있는 정의 및 요약.",
            "strengths": ["강점1 (상세 설명)", "강점2 (상세 설명)", "강점3 (상세 설명)"],
            "weaknesses": ["약점1 (상세 설명)", "약점2 (상세 설명)"],
            "advice": "리더십 성장을 위한 구체적인 조언 (Construction Note). 약 5~6문장으로 깊이 있게 서술."
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
      setStep('intro'); // Reset on error
      alert("분석 중 오류가 발생했습니다.");
    }
  };

  const handleDownloadAndUpload = async () => {
    const element = document.getElementById('leadership-blueprint-area');
    if (!element || !(window as any).html2pdf) return;

    setIsDownloading(true);
    const fileName = `FLOW_Leadership_Style_${inputs.name}_${generateDateString()}.pdf`;

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
        
        const uploadRes = await uploadPdfToDrive(fileName, pdfDataUri);
        const pdfUrl = uploadRes?.url || '';

        if (result) {
            await saveDiagnosisData(
                inputs.name, 
                'Leadership Style Diagnosis', 
                { archetype: result.typeTitle, summary: result.summary, details: result }, 
                pdfUrl, 
                { ...inputs, answers }
            );
        }

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
        <div className="relative w-full max-w-3xl h-[90vh] max-h-[900px] bg-[#e0e5ec] flex flex-col overflow-hidden border-[3px] border-[#2d3436] shadow-2xl">
            
            {/* Header */}
            <header className="p-4 bg-white border-b-[3px] border-[#2d3436] flex justify-between items-center shrink-0 z-20">
                <div className="flex items-center gap-2">
                    <PenTool size={20} />
                    <span className="font-black uppercase text-lg">Leadership Style Diagnosis</span>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </header>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 relative bg-white custom-scrollbar">
                
                {/* INTRO */}
                {step === 'intro' && (
                    <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                        <div className="text-6xl mb-6">🏛️</div>
                        <h1 className="text-3xl font-black uppercase mb-4 tracking-tighter">리더십 스타일 진단</h1>
                        <p className="text-lg font-medium mb-8 text-gray-600">
                            6가지 전략적 질문을 통해<br/>
                            당신의 리더십 스타일을 입체적으로 조망합니다.
                        </p>
                        <button onClick={nextStep} className="px-8 py-3 bg-[#5d5fef] text-white font-black text-lg border-[3px] border-[#2d3436] rounded-lg shadow-[4px_4px_0_#2d3436] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#2d3436] transition-all">
                            START DIAGNOSIS
                        </button>
                    </div>
                )}

                {/* INFO */}
                {step === 'info' && (
                    <div className="max-w-md mx-auto animate-fadeIn mt-10">
                        <div className="inline-block bg-[#2d3436] text-white px-3 py-1 font-bold mb-6 text-sm uppercase tracking-widest">Step 01. Basic Info</div>
                        <div className="space-y-6">
                            <div>
                                <label className="block font-bold mb-2 text-sm text-gray-500 uppercase">Name</label>
                                <input type="text" value={inputs.name} onChange={(e) => handleInputChange('name', e.target.value)} 
                                    className="w-full p-3 border-b-[3px] border-[#2d3436] text-xl font-black focus:outline-none focus:border-[#5d5fef] transition-colors placeholder:text-gray-300" placeholder="성함 입력" />
                            </div>
                            <div>
                                <label className="block font-bold mb-2 text-sm text-gray-500 uppercase">Team / Org</label>
                                <input type="text" value={inputs.team} onChange={(e) => handleInputChange('team', e.target.value)} 
                                    className="w-full p-3 border-b-[3px] border-[#2d3436] text-xl font-black focus:outline-none focus:border-[#5d5fef] transition-colors placeholder:text-gray-300" placeholder="소속 입력" />
                            </div>
                        </div>
                    </div>
                )}

                {/* JOB */}
                {step === 'job' && (
                    <div className="max-w-md mx-auto animate-fadeIn mt-10">
                        <div className="inline-block bg-[#2d3436] text-white px-3 py-1 font-bold mb-6 text-sm uppercase tracking-widest">Step 02. Role Specification</div>
                        <div className="space-y-6">
                            <div>
                                <label className="block font-bold mb-2 text-sm text-gray-500 uppercase">Position</label>
                                <select value={inputs.job} onChange={(e) => handleInputChange('job', e.target.value)} 
                                    className="w-full p-3 border-[3px] border-[#2d3436] rounded-lg text-lg font-bold focus:outline-none bg-white">
                                    <option value="">직책을 선택하세요</option>
                                    <option value="Team Leader">팀장 / 리더</option>
                                    <option value="Manager">매니저 / 관리자</option>
                                    <option value="Executive">임원 / 경영진</option>
                                    <option value="Project Manager">PM / PO</option>
                                    <option value="Member">팀원 / 실무자</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-bold mb-3 text-sm text-gray-500 uppercase">Experience</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['1~3년', '4~6년', '7~9년', '10년 이상'].map((c) => (
                                        <div key={c} onClick={() => handleInputChange('career', c)}
                                            className={`p-3 border-[3px] border-[#2d3436] rounded-lg text-center font-bold cursor-pointer transition-all ${inputs.career === c ? 'bg-[#2d3436] text-white' : 'hover:bg-gray-100'}`}>
                                            {c}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CONTACT */}
                {step === 'contact' && (
                    <div className="max-w-md mx-auto animate-fadeIn mt-10">
                        <div className="inline-block bg-[#2d3436] text-white px-3 py-1 font-bold mb-6 text-sm uppercase tracking-widest">Step 03. Contact Info</div>
                        <p className="text-sm font-bold text-gray-600 mb-6">
                            진단 결과 전송 및 맞춤형 교육 상담을 위해 연락처를 남겨주세요.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-bold mb-2 text-sm text-gray-500 uppercase">Company</label>
                                <input type="text" value={inputs.company} onChange={(e) => handleInputChange('company', e.target.value)} 
                                    className="w-full p-3 border-[3px] border-[#2d3436] rounded-lg text-lg font-bold focus:outline-none bg-white" placeholder="예: 플로우컴퍼니" />
                            </div>
                            <div>
                                <label className="block font-bold mb-2 text-sm text-gray-500 uppercase">Email</label>
                                <input type="email" value={inputs.email} onChange={(e) => handleInputChange('email', e.target.value)} 
                                    className="w-full p-3 border-[3px] border-[#2d3436] rounded-lg text-lg font-bold focus:outline-none bg-white" placeholder="예: flow@example.com" />
                            </div>
                            <div>
                                <label className="block font-bold mb-2 text-sm text-gray-500 uppercase">Phone</label>
                                <input type="tel" value={inputs.phone} onChange={(e) => handleInputChange('phone', e.target.value)} 
                                    className="w-full p-3 border-[3px] border-[#2d3436] rounded-lg text-lg font-bold focus:outline-none bg-white" placeholder="예: 010-1234-5678" />
                            </div>
                            <div className="mt-4 p-3 bg-white border-[3px] border-[#2d3436] rounded-lg text-xs font-bold text-gray-600">
                                <label className="flex items-start gap-2 cursor-pointer">
                                    <input type="checkbox" className="mt-1" checked={inputs.consent} onChange={(e) => setInputs({...inputs, consent: e.target.checked})} required />
                                    <span>(필수) 개인정보 수집 및 이용에 동의합니다. 수집된 정보는 진단 결과 안내 및 교육 상담 목적으로만 사용됩니다.</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* QUIZ */}
                {step === 'quiz' && (
                    <div className="max-w-xl mx-auto animate-fadeIn mt-4">
                        <div className="flex items-center gap-4 mb-8">
                             <span className="font-black text-5xl text-[#5d5fef] opacity-20">0{currentQ + 1}</span>
                             <div className="flex-1 h-3 border-[3px] border-[#2d3436] rounded-full bg-white overflow-hidden">
                                <div className="h-full bg-[#5d5fef] transition-all duration-300" style={{width: `${((currentQ + 1) / 6) * 100}%`}}></div>
                            </div>
                        </div>
                        
                        <h2 className="text-2xl font-black mb-8 leading-relaxed text-[#2d3436]">{questions[currentQ].text}</h2>
                        
                        <div className="space-y-3">
                            {questions[currentQ].options.map((opt, idx) => (
                                <button key={idx}
                                    onClick={() => handleAnswer(opt)}
                                    className="w-full text-left p-5 border-[3px] border-[#2d3436] rounded-xl font-bold text-gray-700 hover:bg-[#5d5fef] hover:text-white hover:border-[#2d3436] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_#2d3436] transition-all"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* LOADING */}
                {step === 'loading' && (
                     <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                         <div className="w-16 h-16 border-[4px] border-[#2d3436] border-t-[#5d5fef] rounded-full animate-spin mb-6"></div>
                         <h2 className="text-2xl font-black mb-2 uppercase">Deep Analysis...</h2>
                         <p className="text-gray-500 font-medium">{inputs.name}님의 리더십 스타일을 정밀 분석중입니다.</p>
                    </div>
                )}

                {/* RESULT (A4 Single Page) */}
                {step === 'result' && result && (
                    <div className="w-full flex justify-center pb-20 overflow-x-auto">
                         {/* Strict A4 Container: 595px width */}
                        <div 
                            id="leadership-blueprint-area" 
                            className="bg-white w-[595px] min-w-[595px] min-h-[842px] border-[4px] border-[#2d3436] p-8 relative flex flex-col shrink-0"
                            style={{ backgroundImage: 'linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                        >
                             {/* Blueprint Header */}
                            <div className="flex justify-between items-start border-b-[4px] border-[#2d3436] pb-4 mb-6 shrink-0">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Project Code: L-ARC-{generateDateString().slice(2,8)}</div>
                                    <h1 className="text-3xl font-black uppercase text-[#2d3436] leading-none">Leadership<br/>Style Diagnosis</h1>
                                </div>
                                <div className="text-right text-xs font-bold text-gray-600">
                                    Client: {inputs.name}<br/>
                                    Role: {inputs.job}<br/>
                                    Exp: {inputs.career}
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 flex flex-col gap-6">
                                {/* Archetype Box */}
                                <div className="bg-white border-[3px] border-[#2d3436] p-6 text-center shadow-[6px_6px_0_rgba(0,0,0,0.05)]">
                                    <span className="inline-block bg-[#5d5fef] text-white px-3 py-1 text-xs font-black uppercase mb-3">Archetype</span>
                                    <h2 className="text-2xl md:text-3xl font-black text-[#2d3436] mb-3 uppercase leading-tight">{result.typeTitle}</h2>
                                    <p className="font-bold text-xs md:text-sm text-gray-600 leading-relaxed italic">"{result.summary}"</p>
                                </div>

                                {/* Strength & Weakness Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white border-[3px] border-[#2d3436] p-4">
                                        <h3 className="text-[#00b894] font-black text-sm uppercase border-b-2 border-dashed border-gray-300 pb-2 mb-3">Load Bearing (+)</h3>
                                        <ul className="space-y-2">
                                            {result.strengths.map((s: string, i: number) => (
                                                <li key={i} className="text-[11px] md:text-xs font-bold flex items-start leading-tight text-justify">
                                                    <span className="mr-2 text-[#00b894] shrink-0">■</span>{s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-white border-[3px] border-[#2d3436] p-4">
                                        <h3 className="text-[#ff7675] font-black text-sm uppercase border-b-2 border-dashed border-gray-300 pb-2 mb-3">Stress Points (-)</h3>
                                        <ul className="space-y-2">
                                            {result.weaknesses.map((s: string, i: number) => (
                                                <li key={i} className="text-[11px] md:text-xs font-bold flex items-start leading-tight text-justify">
                                                    <span className="mr-2 text-[#ff7675] shrink-0">■</span>{s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Advice Note */}
                                <div className="bg-white border-[3px] border-[#2d3436] p-5 relative flex-1">
                                    <h3 className="text-sm font-black uppercase mb-3 flex items-center gap-2">
                                        <PenTool size={16} /> Construction Note
                                    </h3>
                                    <p className="text-xs md:text-sm font-medium leading-loose text-gray-800 text-justify">
                                        {result.advice}
                                    </p>
                                    <div className="absolute bottom-3 right-3 opacity-20 text-6xl font-black text-[#2d3436] pointer-events-none">FLOW~</div>
                                </div>
                            </div>
                            
                            {/* Footer */}
                            <div className="mt-6 border-t-[4px] border-[#2d3436] pt-2 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase shrink-0">
                                <div>Approved by FLOW~ Research Lab</div>
                                <div>Scale 1:1</div>
                            </div>

                        </div>
                    </div>
                )}
            </div>

            {/* Footer Navigation */}
            <footer className="p-4 bg-white border-t-[3px] border-[#2d3436] flex gap-3 shrink-0 z-20">
                {step !== 'intro' && step !== 'loading' && step !== 'result' && (
                    <>
                        <button onClick={prevStep} className="px-6 py-3 border-[3px] border-[#2d3436] rounded-lg font-bold text-gray-500 hover:bg-gray-100">PREV</button>
                        <button onClick={nextStep} className="flex-1 py-3 bg-[#2d3436] text-white rounded-lg font-bold shadow-[4px_4px_0_rgba(0,0,0,0.2)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2">
                            NEXT <ArrowRight size={18} />
                        </button>
                    </>
                )}
                
                {step === 'result' && (
                    <div className="w-full flex gap-3 max-w-[595px] mx-auto">
                        <button onClick={handleDownloadAndUpload} disabled={isDownloading} className="flex-1 bg-[#5d5fef] text-white border-[3px] border-[#2d3436] rounded-lg font-black py-3 shadow-[4px_4px_0_#2d3436] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2">
                             {isDownloading ? <Loader2 className="animate-spin" /> : <FileDown />} SAVE PDF
                        </button>
                        <button onClick={() => {setStep('intro'); setResult(null);}} className="px-6 border-[3px] border-[#2d3436] rounded-lg font-bold hover:bg-gray-100">
                             RETRY
                        </button>
                    </div>
                )}
            </footer>

        </div>
    </div>
  );
};

export default LeadershipArchitect;