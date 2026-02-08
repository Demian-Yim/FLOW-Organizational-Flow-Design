import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, Download, Terminal } from 'lucide-react';
import { uploadPdfToDrive, saveDiagnosisData, generateDateString } from '../../utils/googleApi';

interface StressDiagnosisProps {
  onClose: () => void;
}

const StressDiagnosis: React.FC<StressDiagnosisProps> = ({ onClose }) => {
  const [userName, setUserName] = useState('');
  const [inputs, setInputs] = useState({ stress: '', symptom: '' });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!userName.trim()) {
        setError('ERROR: 사용자 식별 실패. 성함을 입력하십시오.');
        return;
    }
    if (!inputs.stress || !inputs.symptom) {
      setError('ERROR: 입력 데이터 부족. 모든 필드를 채워주십시오.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        역할: 당신은 냉철하고 직관적인 '스트레스 분석 AI'입니다.
        대상: ${userName}
        목표: 사용자 데이터를 분석하여 스트레스 수준을 진단하고 해결책을 JSON으로 반환하십시오.
        
        [사용자 입력]
        1. 원인(Stressors): ${inputs.stress}
        2. 증상(Symptoms): ${inputs.symptom}

        [필수 요구사항]
        - 분석 톤: 객관적, 전문적, 단호함.
        - 출력 형식: 오직 순수한 JSON 포맷일 것.

        [JSON 스키마]
        {
            "diagnosis": "짧은 진단명 (예: 위험 단계, 번아웃 경고)",
            "description": "현재 상태에 대한 한 줄 요약",
            "cause_analysis": "심리학적 관점의 원인 분석 (2-3문장), 사용자 이름(${userName})을 언급할 것.",
            "solutions": [
                "구체적이고 실천 가능한 해결책 1",
                "구체적이고 실천 가능한 해결책 2",
                "구체적이고 실천 가능한 해결책 3"
            ]
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            responseMimeType: 'application/json'
        }
      });

      const jsonText = response.text;
      const parsed = JSON.parse(jsonText);
      setResult(parsed);

    } catch (e: any) {
      console.error(e);
      setError(`SYSTEM ERROR: ${e.message}`);
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
    const fileName = `FLOW_Stress_Report_${userName}_${generateDateString()}.pdf`;

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
                'Stress Diagnosis', 
                { diagnosis: result.diagnosis, details: result }, 
                pdfUrl, 
                inputs
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm font-sans">
      <div id="stress-content" className="relative w-full max-w-3xl max-h-[90vh] bg-[#e0e0e0] border-4 border-black shadow-[10px_10px_0_#000] overflow-y-auto flex flex-col p-6">
        
        {/* Header */}
        <header className="flex justify-between items-end border-b-4 border-black pb-4 mb-8 bg-black text-white p-4 shrink-0">
          <div>
            <h1 className="font-display text-3xl md:text-4xl uppercase tracking-tighter leading-none" style={{textShadow: '2px 2px 0 #2e00ff'}}>스트레스<br/>정밀진단 V2.2</h1>
          </div>
          <div className="font-mono text-xs text-right bg-[#ffcc00] text-black p-2 border-2 border-white font-bold hidden sm:block">
            SYSTEM: STABLE<br/>API: GEMINI-3
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-500">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </header>

        {!result ? (
            /* Input Section */
            <div className="space-y-8 pb-10">
                {/* Name Input */}
                <div>
                     <label className="inline-block bg-[#2e00ff] text-white font-display text-2xl px-4 py-2 mb-4 border-4 border-black shadow-[6px_6px_0_#000] -rotate-1">
                        00. SUBJECT IDENTITY (NAME)
                    </label>
                    <input 
                        type="text" 
                        className="w-full border-4 border-black bg-white p-4 text-2xl font-bold focus:outline-none focus:shadow-[inset_8px_8px_0_rgba(0,0,0,0.1)] placeholder:text-gray-400"
                        placeholder="이름을 입력하십시오"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="inline-block bg-[#2e00ff] text-white font-display text-2xl px-4 py-2 mb-4 border-4 border-black shadow-[6px_6px_0_#000] -rotate-1">
                        01. 원인 데이터 (STRESSORS)
                    </label>
                    <textarea 
                        className="w-full h-32 border-4 border-black bg-[#f4f4f4] p-4 text-lg font-bold resize-none focus:outline-none focus:bg-white focus:shadow-[inset_8px_8px_0_rgba(0,0,0,0.1)]"
                        placeholder="데이터 입력 대기중... (예: 마감 압박, 불확실한 미래 등)"
                        value={inputs.stress}
                        onChange={(e) => setInputs({...inputs, stress: e.target.value})}
                    ></textarea>
                    <div className="flex flex-wrap gap-2 mt-4 p-2 border-2 border-dashed border-black">
                        <span className="w-full font-mono text-xs font-black mb-1">QUICK_INPUT:</span>
                        {['업무과다', '돈문제', '미래불안', '관계갈등', '독박육아', '취업난'].map(k => (
                            <button key={k} onClick={() => addKeyword('stress', k)} className="bg-white border-2 border-black px-3 py-1 font-mono font-bold text-sm shadow-[4px_4px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#2e00ff] hover:bg-[#2e00ff] hover:text-white transition-all">
                                #{k}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="inline-block bg-[#2e00ff] text-white font-display text-2xl px-4 py-2 mb-4 border-4 border-black shadow-[6px_6px_0_#000] -rotate-1">
                        02. 반응 로그 (SYMPTOMS)
                    </label>
                    <textarea 
                        className="w-full h-32 border-4 border-black bg-[#f4f4f4] p-4 text-lg font-bold resize-none focus:outline-none focus:bg-white focus:shadow-[inset_8px_8px_0_rgba(0,0,0,0.1)]"
                        placeholder="증상 입력 대기중... (예: 불면증, 폭식, 이유 없는 짜증 등)"
                        value={inputs.symptom}
                        onChange={(e) => setInputs({...inputs, symptom: e.target.value})}
                    ></textarea>
                     <div className="flex flex-wrap gap-2 mt-4 p-2 border-2 border-dashed border-black">
                        <span className="w-full font-mono text-xs font-black mb-1">BODY_SIGNAL:</span>
                        {['수면장애', '만성피로', '두통', '소화불량', '예민보스', '번아웃', '공황'].map(k => (
                            <button key={k} onClick={() => addKeyword('symptom', k)} className="bg-white border-2 border-black px-3 py-1 font-mono font-bold text-sm shadow-[4px_4px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#2e00ff] hover:bg-[#2e00ff] hover:text-white transition-all">
                                #{k}
                            </button>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="bg-[#ff2a00] text-white p-4 border-4 border-black font-mono font-bold shadow-[6px_6px_0_#000]">
                        {error}
                    </div>
                )}

                <div className="border-t-4 border-black pt-8">
                    <button 
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="w-full bg-black text-[#00ff41] font-display text-2xl md:text-3xl py-6 border-4 border-[#00ff41] shadow-[10px_10px_0_#ff2a00] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[14px_14px_0_#ff2a00] hover:bg-[#ff2a00] hover:text-black hover:border-black transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? '[ PROCESSING... ]' : '[ EXECUTE DIAGNOSIS ]'}
                    </button>
                </div>
            </div>
        ) : (
            /* Results View */
            <div className="animate-fadeIn w-full flex flex-col items-center">
                 {/* PDF Capture Area */}
                <div 
                    id="stress-report-area" 
                    className="w-full max-w-[595px] bg-white border-4 border-black p-8 relative overflow-hidden"
                    style={{ minHeight: '842px' }}
                >
                    {/* Report Header */}
                    <div className="flex justify-between border-b-4 border-black pb-4 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Terminal size={24} className="text-black" />
                                <span className="font-mono font-bold text-sm">FLOW~ SYSTEM LOG</span>
                            </div>
                            <h2 className="font-display text-4xl uppercase">Diagnosis<br/>Final Report</h2>
                        </div>
                        <div className="text-right font-mono text-sm space-y-1">
                            <div className="bg-black text-[#00ff41] px-2 py-0.5 inline-block">STATUS: COMPLETED</div>
                            <div className="block font-bold">DATE: {generateDateString().slice(0,8)}</div>
                             <div className="block font-bold">USER: {userName}</div>
                            <div className="block text-gray-500">REF_ID: {Math.floor(Math.random()*10000)}</div>
                        </div>
                    </div>

                    {/* Section 1: Main Diagnosis */}
                    <div className="mb-10 relative">
                        <div className="absolute -left-4 top-4 w-2 h-full bg-[#ff2a00]"></div>
                        <div className="pl-6">
                            <div className="font-mono text-gray-500 text-sm mb-1">01_CURRENT_STATUS</div>
                            <h3 className="text-4xl font-display uppercase leading-none mb-4 text-[#ff2a00]">{result.diagnosis}</h3>
                            <p className="text-xl font-bold border-t-2 border-black pt-4">{result.description}</p>
                        </div>
                    </div>

                    {/* Section 2: Deep Analysis */}
                    <div className="mb-10 bg-[#f4f4f4] p-6 border-2 border-black shadow-[6px_6px_0_#000]">
                        <div className="font-mono text-xs font-bold bg-black text-white px-2 py-1 inline-block mb-3">02_ROOT_CAUSE_ANALYSIS</div>
                        <p className="font-medium text-lg leading-relaxed font-sans">
                            {result.cause_analysis}
                        </p>
                    </div>

                    {/* Section 3: Solutions */}
                    <div className="mb-10">
                        <div className="font-mono text-gray-500 text-sm mb-4">03_ACTION_PROTOCOLS</div>
                        <div className="space-y-4">
                            {result.solutions.map((sol: string, i: number) => (
                                <div key={i} className="flex items-stretch border-2 border-black bg-white">
                                    <div className="bg-[#2e00ff] text-white font-mono font-bold p-3 flex items-center justify-center text-xl min-w-[60px]">
                                        {i+1}
                                    </div>
                                    <div className="p-4 font-bold flex items-center">
                                        {sol}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-8 border-t-4 border-black flex justify-between items-center">
                         <div className="font-mono text-xs text-gray-500">
                             GENERATED BY FLOW~ AI ENGINE<br/>
                             ALL SYSTEMS OPERATIONAL
                         </div>
                         <div className="w-16 h-16 border-4 border-black rounded-full flex items-center justify-center font-display text-xs text-center leading-none rotate-12">
                             END<br/>LOG
                         </div>
                    </div>
                </div>

                {/* Download Button */}
                <div className="mt-6 w-full max-w-[595px]">
                     <button 
                        onClick={handleDownloadAndUpload}
                        disabled={isDownloading}
                        className={`w-full py-4 bg-black text-[#00ff41] border-4 border-[#00ff41] font-display text-xl hover:bg-[#00ff41] hover:text-black hover:border-black transition-all shadow-[8px_8px_0_#000] flex items-center justify-center gap-2 ${isDownloading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                         {isDownloading ? <Loader2 className="animate-spin" /> : <Download />}
                         {isDownloading ? 'SAVING DATA...' : 'DOWNLOAD REPORT'}
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default StressDiagnosis;