import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, Download, Terminal, ArrowRight, ArrowLeft } from 'lucide-react';
import { uploadPdfToDrive, saveDiagnosisData, generateDateString } from '../../utils/googleApi';

interface StressDiagnosisProps {
  onClose: () => void;
}

const StressDiagnosis: React.FC<StressDiagnosisProps> = ({ onClose }) => {
  // Steps: intro -> info(name/team) -> job(job/career) -> input(stress/symptoms) -> loading -> result
  const [step, setStep] = useState('intro');
  const [inputs, setInputs] = useState({ 
    name: '', 
    team: '', 
    job: '', 
    career: '', 
    stress: '', 
    symptom: '' 
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');

  // Expanded Keywords
  const stressKeywords = [
    '업무 과다', '인간관계 갈등', '리더십 부재', 'R&R 불명확', 
    '잦은 야근', '성과 압박', '고용 불안', '보상 불만족', 
    '소통 단절', '경력 정체', '비효율 프로세스', '감정 노동'
  ];

  const symptomKeywords = [
    '만성 피로', '두통/편두통', '불면증', '소화 불량', 
    '집중력 저하', '잦은 짜증', '무기력감', '번아웃', 
    '불안/초조', '식욕 변화', '회피 성향', '신체 통증'
  ];

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    if (step === 'info') return inputs.name && inputs.team;
    if (step === 'job') return inputs.job && inputs.career;
    if (step === 'input') return inputs.stress && inputs.symptom;
    return true;
  };

  const nextStep = () => {
    if (!validateStep()) {
        alert('모든 항목을 입력해주세요.');
        return;
    }
    if (step === 'intro') setStep('info');
    else if (step === 'info') setStep('job');
    else if (step === 'job') setStep('input');
    else if (step === 'input') handleAnalyze();
  };

  const prevStep = () => {
    if (step === 'info') setStep('intro');
    else if (step === 'job') setStep('info');
    else if (step === 'input') setStep('job');
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setStep('loading');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        역할: 당신은 세계 최고의 심리 분석가이자 HR 조직문화 컨설턴트입니다.
        대상: ${inputs.name} (소속: ${inputs.team}, 직무: ${inputs.job}, 경력: ${inputs.career}차)
        
        [목표]
        사용자의 직무와 연차, 입력된 스트레스 원인과 증상을 종합적으로 분석하여
        매우 상세하고 실용적인 진단 리포트를 작성하십시오.
        
        [사용자 입력 데이터]
        1. 주요 원인(Stressors): ${inputs.stress}
        2. 주요 증상(Symptoms): ${inputs.symptom}

        [필수 요구사항 (매우 중요)]
        - 분석 톤: "냉철한 분석(Brutalism)"과 "따뜻한 치유(Healing)"가 공존하는 전문가적인 어조.
        - 분량: 기존보다 2배 더 상세하게 작성할 것. 단순한 나열이 아니라 깊이 있는 인사이트를 제공해야 함.
        - Action Protocols: 뜬구름 잡는 조언이 아니라, 내일부터 당장 실행할 수 있는 구체적인 행동 지침을 5개 이상 제안할 것.
        - 출력 형식: 오직 순수한 JSON 포맷일 것.

        [JSON 스키마]
        {
            "diagnosis": "임팩트 있는 진단명 (예: '번아웃 직전의 고기능 고립자')",
            "score": "0~100 사이의 숫자 (스트레스 위험 지수)",
            "description": "현재 심리 상태에 대한 3~4문장의 깊이 있는 분석 요약. 직무 특성(${inputs.job})과 경력(${inputs.career})을 고려하여 서술.",
            "cause_analysis": "단순히 원인을 나열하지 말고, 이것이 업무 퍼포먼스와 커리어에 미치는 악영향을 인과관계 중심으로 정밀 분석 (4문장 이상).",
            "solutions": [
                "1. [키워드] 구체적인 행동 지침 (예: '오전 11시까지는 이메일 알림 끄기' 등 매우 구체적으로)",
                "2. [키워드] ...",
                "3. [키워드] ...",
                "4. [키워드] ...",
                "5. [키워드] ..."
            ]
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });

      const jsonText = response.text;
      const parsed = JSON.parse(jsonText);
      setResult(parsed);
      setStep('result');

    } catch (e: any) {
      console.error(e);
      setError(`SYSTEM ERROR: ${e.message}`);
      setStep('input'); // Back to input on error
    } finally {
      setLoading(false);
    }
  };

  const addKeyword = (field: 'stress' | 'symptom', text: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: prev[field] ? `${prev[field]}, ${text}` : text
    }));
  };

  const handleDownloadAndUpload = async () => {
    const element = document.getElementById('stress-report-area');
    if (!element || !(window as any).html2pdf) return;

    setIsDownloading(true);
    const fileName = `FLOW_Stress_Report_${inputs.name}_${generateDateString()}.pdf`;

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
                'Stress Diagnosis', 
                { diagnosis: result.diagnosis, score: result.score, details: result }, 
                pdfUrl, 
                inputs
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
      <div className="relative w-full max-w-3xl h-[90vh] max-h-[900px] bg-[#e0e0e0] border-4 border-black shadow-[10px_10px_0_#000] flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="flex justify-between items-end border-b-4 border-black bg-black text-white p-4 shrink-0">
          <div>
            <h1 className="font-display text-2xl md:text-3xl uppercase tracking-tighter leading-none" style={{textShadow: '2px 2px 0 #2e00ff'}}>스트레스<br/>정밀진단</h1>
          </div>
          <div className="text-right">
             <div className="font-mono text-xs bg-[#ffcc00] text-black px-2 py-1 border border-white font-bold inline-block mb-1">
                SYSTEM: {step === 'loading' ? 'ANALYZING' : 'READY'}
             </div>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-500 z-50">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#dcdcdc] relative custom-scrollbar">
            
            {/* STEP: INTRO */}
            {step === 'intro' && (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                    <div className="text-6xl mb-6">⚡</div>
                    <h2 className="text-3xl font-black uppercase mb-4">SYSTEM WARNING</h2>
                    <p className="text-lg font-bold mb-8 max-w-md">
                        당신의 스트레스 레벨을 정밀 분석합니다.<br/>
                        가감 없는 솔직한 데이터가 필요합니다.
                    </p>
                    <button onClick={nextStep} className="bg-[#2e00ff] text-white text-xl font-bold py-4 px-10 border-4 border-black shadow-[6px_6px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#000] transition-all">
                        DIAGNOSIS START
                    </button>
                </div>
            )}

            {/* STEP: INFO */}
            {step === 'info' && (
                <div className="max-w-md mx-auto animate-fadeIn mt-10">
                    <label className="block bg-black text-white font-display text-xl px-4 py-2 mb-6 border-2 border-white shadow-[4px_4px_0_rgba(0,0,0,0.2)] w-fit">
                        01. SUBJECT IDENTITY
                    </label>
                    <div className="space-y-6">
                        <div>
                            <label className="block font-bold mb-2">NAME (이름)</label>
                            <input type="text" value={inputs.name} onChange={(e) => handleInputChange('name', e.target.value)} 
                                className="w-full p-4 border-4 border-black text-xl font-bold focus:outline-none focus:shadow-[inset_4px_4px_0_rgba(0,0,0,0.1)]" placeholder="예: 김데미" />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">AFFILIATION (소속)</label>
                            <input type="text" value={inputs.team} onChange={(e) => handleInputChange('team', e.target.value)} 
                                className="w-full p-4 border-4 border-black text-xl font-bold focus:outline-none focus:shadow-[inset_4px_4px_0_rgba(0,0,0,0.1)]" placeholder="예: 디자인팀" />
                        </div>
                    </div>
                </div>
            )}

            {/* STEP: JOB */}
            {step === 'job' && (
                <div className="max-w-md mx-auto animate-fadeIn mt-10">
                     <label className="block bg-black text-white font-display text-xl px-4 py-2 mb-6 border-2 border-white shadow-[4px_4px_0_rgba(0,0,0,0.2)] w-fit">
                        02. JOB & CAREER
                    </label>
                    <div className="space-y-6">
                        <div>
                            <label className="block font-bold mb-2">JOB ROLE (직무)</label>
                            <select value={inputs.job} onChange={(e) => handleInputChange('job', e.target.value)} className="w-full p-4 border-4 border-black text-lg font-bold bg-white focus:outline-none">
                                <option value="">직무 선택</option>
                                <option value="HRD">HRD / 교육</option>
                                <option value="HRM">HRM / 인사</option>
                                <option value="Management">경영 / 임원</option>
                                <option value="Marketing">마케팅 / 영업</option>
                                <option value="IT">IT / 개발</option>
                                <option value="Design">디자인 / 기획</option>
                                <option value="Other">기타</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-bold mb-3">CAREER LEVEL (경력)</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['1년 미만', '1~3년', '3~5년', '5~10년', '10년 이상'].map((c) => (
                                    <div key={c} onClick={() => handleInputChange('career', c)}
                                        className={`p-3 border-4 border-black font-bold text-center cursor-pointer transition-all ${inputs.career === c ? 'bg-[#2e00ff] text-white shadow-[4px_4px_0_#000]' : 'bg-white hover:bg-gray-100'}`}>
                                        {c}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* STEP: INPUT */}
            {step === 'input' && (
                <div className="max-w-xl mx-auto animate-fadeIn space-y-8 pb-10">
                    <div>
                        <label className="inline-block bg-[#ff2a00] text-white font-bold px-3 py-1 mb-2 border-2 border-black">STRESSORS (원인)</label>
                        <textarea 
                            className="w-full h-24 border-4 border-black bg-white p-3 text-lg font-bold resize-none focus:outline-none focus:shadow-[inset_6px_6px_0_rgba(0,0,0,0.1)]"
                            placeholder="무엇이 당신을 힘들게 합니까?"
                            value={inputs.stress}
                            onChange={(e) => setInputs({...inputs, stress: e.target.value})}
                        ></textarea>
                        <div className="flex flex-wrap gap-2 mt-2">
                             {stressKeywords.map(k => (
                                <button key={k} onClick={() => addKeyword('stress', k)} className="bg-white border-2 border-black px-2 py-0.5 text-xs font-bold hover:bg-black hover:text-white transition-colors">#{k}</button>
                             ))}
                        </div>
                    </div>

                    <div>
                        <label className="inline-block bg-[#ff2a00] text-white font-bold px-3 py-1 mb-2 border-2 border-black">SYMPTOMS (증상)</label>
                        <textarea 
                            className="w-full h-24 border-4 border-black bg-white p-3 text-lg font-bold resize-none focus:outline-none focus:shadow-[inset_6px_6px_0_rgba(0,0,0,0.1)]"
                            placeholder="어떤 반응이 나타납니까?"
                            value={inputs.symptom}
                            onChange={(e) => setInputs({...inputs, symptom: e.target.value})}
                        ></textarea>
                         <div className="flex flex-wrap gap-2 mt-2">
                             {symptomKeywords.map(k => (
                                <button key={k} onClick={() => addKeyword('symptom', k)} className="bg-white border-2 border-black px-2 py-0.5 text-xs font-bold hover:bg-black hover:text-white transition-colors">#{k}</button>
                             ))}
                        </div>
                    </div>
                </div>
            )}

            {/* STEP: LOADING */}
            {step === 'loading' && (
                <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                    <Loader2 size={64} className="animate-spin text-[#2e00ff] mb-6" strokeWidth={3} />
                    <h2 className="text-3xl font-black uppercase mb-2">DEEP ANALYSIS...</h2>
                    <p className="font-mono text-gray-600">직무/경력/심리 데이터를 통합 분석중입니다.</p>
                </div>
            )}

            {/* STEP: RESULT (A4 Single Page) */}
            {step === 'result' && result && (
                <div className="w-full flex justify-center pb-20">
                     {/* Strict A4 Container: 595px width */}
                     <div 
                        id="stress-report-area" 
                        className="bg-[#f0f0f0] w-[595px] min-h-[842px] relative border-4 border-black overflow-hidden flex flex-col"
                    >
                        {/* 1. Top Bar */}
                        <div className="bg-black text-white p-4 flex justify-between items-center border-b-4 border-black shrink-0">
                            <div>
                                <h2 className="text-2xl font-black leading-none text-[#00ff41]">STRESS<br/>DIAGNOSIS REPORT</h2>
                            </div>
                            <div className="text-right font-mono text-[10px] leading-tight opacity-80">
                                DATE: {generateDateString().slice(0,8)}<br/>
                                SUBJ: {inputs.name} ({inputs.team})<br/>
                                JOB: {inputs.job} / {inputs.career}
                            </div>
                        </div>

                        {/* 2. Score Section */}
                        <div className="p-6 border-b-4 border-black flex gap-6 items-center shrink-0 bg-white">
                             <div className="w-24 h-24 bg-[#ff2a00] border-4 border-black flex items-center justify-center shadow-[6px_6px_0_#000]">
                                 <span className="text-4xl font-black text-white">{result.score}</span>
                             </div>
                             <div className="flex-1">
                                 <div className="font-mono text-xs font-bold bg-black text-white inline-block px-2 mb-1">DIAGNOSIS RESULT</div>
                                 <h3 className="text-2xl font-black uppercase leading-tight mb-2">{result.diagnosis}</h3>
                                 <p className="text-sm font-bold text-gray-600 leading-snug">{result.description}</p>
                             </div>
                        </div>

                        {/* 3. Deep Dive (Cause) */}
                        <div className="p-6 border-b-4 border-black bg-[#e0e0e0] shrink-0">
                             <div className="flex items-center gap-2 mb-2">
                                <Terminal size={18} />
                                <span className="font-black text-sm uppercase">Deep Dive Analysis</span>
                             </div>
                             <p className="text-xs md:text-sm font-medium leading-relaxed font-mono bg-white p-4 border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,0.1)] text-justify">
                                {result.cause_analysis}
                             </p>
                        </div>

                        {/* 4. Solutions */}
                        <div className="p-6 flex-1 bg-white">
                            <span className="font-black text-sm uppercase mb-4 block bg-[#2e00ff] text-white px-2 py-1 w-fit border-2 border-black">Action Protocols</span>
                            <div className="space-y-3">
                                {result.solutions.map((sol: string, i: number) => (
                                    <div key={i} className="flex gap-3 items-start">
                                        <div className="w-6 h-6 bg-black text-white font-black flex items-center justify-center shrink-0 text-xs mt-0.5">{i+1}</div>
                                        <div className="border-b-2 border-dashed border-gray-300 pb-2 w-full text-xs md:text-sm font-bold leading-relaxed">
                                            {sol}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Visual Element */}
                            <div className="mt-6 border-t-4 border-black pt-4 flex justify-between items-end opacity-50">
                                <div className="text-[10px] font-mono">
                                    FLOW~ SYSTEM V2.2<br/>
                                    AUTHORIZED BY DEMIAN
                                </div>
                                <div className="w-10 h-10 border-4 border-black rounded-full flex items-center justify-center">
                                    <div className="w-6 h-6 bg-black"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Footer Actions */}
        <footer className="p-4 border-t-4 border-black bg-[#f0f0f0] flex gap-3 shrink-0 z-20">
             {step !== 'intro' && step !== 'loading' && step !== 'result' && (
                 <>
                    {step !== 'info' && (
                        <button onClick={prevStep} className="px-6 py-3 bg-white text-black border-4 border-black font-bold shadow-[4px_4px_0_#000] hover:translate-y-1 hover:shadow-none transition-all">
                            PREV
                        </button>
                    )}
                    <button onClick={nextStep} className="flex-1 py-3 bg-[#00ff41] text-black border-4 border-black font-bold shadow-[4px_4px_0_#000] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2">
                        {step === 'input' ? 'ANALYZE' : 'NEXT'} <ArrowRight size={20} />
                    </button>
                 </>
             )}
             
             {step === 'result' && (
                 <div className="w-full flex gap-3 max-w-[595px] mx-auto">
                     <button onClick={handleDownloadAndUpload} disabled={isDownloading} className="flex-1 py-3 bg-black text-white border-4 border-[#00ff41] font-bold flex items-center justify-center gap-2 hover:bg-[#00ff41] hover:text-black hover:border-black transition-colors">
                        {isDownloading ? <Loader2 className="animate-spin" /> : <Download />} SAVE PDF
                     </button>
                     <button onClick={() => {setStep('intro'); setResult(null);}} className="px-6 py-3 bg-white border-4 border-black font-bold hover:bg-gray-200">
                        RETRY
                     </button>
                 </div>
             )}
        </footer>

      </div>
    </div>
  );
};

export default StressDiagnosis;