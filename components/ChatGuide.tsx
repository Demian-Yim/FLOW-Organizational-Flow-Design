import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";
import { PROGRAMS } from '../constants';
import { saveChatLog, generateDateString } from '../utils/googleApi';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '안녕하세요! 😊 FLOW~의 AI 매니저입니다.\n\n조직의 성장과 변화를 위한 여정에 함께하게 되어 기쁩니다.\n\n[FLOW~ 사용자 가이드 📘]\n1. 진단하기: \'Experience\' 섹션에서 조직의 현재 상태를 진단해보세요.\n2. 과정 탐색: \'Program\' 섹션에서 33개의 맞춤형 커리큘럼을 확인하세요.\n3. 문의하기: 궁금한 점은 저에게 물어보거나, \'Contact\'에서 직접 문의를 남겨주세요.\n\n궁금한 점이 있으시거나, FLOW~의 사용법이 궁금하시다면 언제든 말씀해주세요! 👇' }
  ]);

  const showUserGuide = () => {
    const guideText = `
    [FLOW~ 사용자 가이드 📘]

    1. **진단하기**: 'Experience' 섹션에서 조직의 현재 상태를 진단해보세요.
    2. **과정 탐색**: 'Program' 섹션에서 33개의 맞춤형 커리큘럼을 확인하세요.
    3. **문의하기**: 궁금한 점은 저(AI 매니저)에게 물어보거나, 'Contact'에서 직접 문의를 남겨주세요.

    무엇을 도와드릴까요?
    `;
    setMessages(prev => [...prev, { role: 'model', text: guideText }]);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [turnCount, setTurnCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session
  useEffect(() => {
    if (isOpen && !chatSession) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        // Context Construction
        const programContext = PROGRAMS.map(p => `- [${p.category}] ${p.title}: ${p.desc}`).join('\n');
        
        const systemInstruction = `
          당신은 기업교육 전문 기업 'FLOW~'의 **유능하고 친절한 영업 이사(Sales Representative)**입니다.
          당신의 목표는 고객의 니즈를 파악하고, FLOW~의 전문성을 어필하여 **강의 의뢰나 미팅**으로 연결하는 것입니다.
          
          [당신의 페르소나]
          - 이름: AI 매니저 (Demian의 파트너)
          - 성격: 전문적이고 신뢰감 있으면서도, 위트 있고 따뜻한 말투.
          - 태도: 고객의 고민에 깊이 공감하고, 해결책을 제시하며 은근히 FLOW~의 장점을 자랑합니다.
          
          [대화 전략]
          1. 고객의 상황(직급, 고민, 조직 규모 등)을 먼저 물어보세요. (예: "혹시 어떤 직무 교육을 고민 중이신가요?")
          2. FLOW~의 철학(기술보다 사람, Flow Design)을 기반으로 답변하세요.
          3. 구체적인 커리큘럼(33개 과정)을 추천할 때는 그 과정이 왜 필요한지 이유를 덧붙이세요.
          4. 대화 마무리는 항상 **"더 구체적인 제안서를 보내드릴까요?"** 또는 **"담당자(Demian)와 미팅을 잡아드릴까요?"**와 같이 행동을 유도(Call to Action)하세요.
          
          [FLOW~ 교육 프로그램 정보]
          ${programContext}
          
          [회사 정보]
          - 소장: 임정훈 (Demian) - HRD 전문가이자 AI 코디네이터.
          - 강점: 이론 중심이 아닌 80% 실습 위주, 현업 적용도 최상.
          
          [주의사항]
          - 너무 긴 답변은 지양하세요. 핵심 위주로 임팩트 있게 전달하세요.
          - 모르는 내용은 솔직하게 "상세한 내용은 담당자가 확인 후 안내드리겠습니다"라고 답하세요.
        `;

        const chat = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
          },
        });
        setChatSession(chat);
      } catch (error) {
        console.error("Failed to initialize AI chat", error);
      }
    }
  }, [isOpen, chatSession]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save chat log logic
  const handleSaveLog = useRef(async () => {
    if (turnCount >= 4 && messages.length > 2) {
       await saveChatLog(
         `User_${generateDateString().slice(8)}`, // Simple Anon ID
         messages
       );
       console.log("Chat log saved to sheet.");
    }
  });

  // Save log when chat closes if turns >= 4
  useEffect(() => {
      if (!isOpen && turnCount >= 4) {
          handleSaveLog.current();
      }
  }, [isOpen, turnCount]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    
    // Increment Turn Count
    setTurnCount(prev => prev + 1);

    try {
      const result = await chatSession.sendMessage({ message: userMsg });
      const responseText = result.text;
      
      setMessages(prev => [...prev, { role: 'model', text: responseText || "죄송합니다. 답변을 생성하는데 문제가 발생했습니다." }]);
      
      // Auto save trigger at exact 4th turn to capture potential leads early
      if (turnCount === 3) { // 0, 1, 2, 3 -> 4th turn
          // We trigger save slightly delayed to include the latest model response in state (though logic needs msg array, effect or timeout is safer)
          // Simplified: Save existing plus current turn logic in backend
          setTimeout(() => {
             saveChatLog(`User_${generateDateString().slice(8)}`, [...messages, { role: 'user', text: userMsg }, { role: 'model', text: responseText || '' }]);
          }, 1000);
      }

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="bg-slate-900 rounded-2xl shadow-2xl w-[90vw] sm:w-96 border border-white/10 animate-fadeIn mb-2 overflow-hidden flex flex-col max-h-[600px] backdrop-blur-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 flex justify-between items-center text-white border-b border-white/5 relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-cyan/20 border border-brand-cyan/50 overflow-hidden flex items-center justify-center relative">
                   <img 
                    src="https://i.ibb.co/Gv1hBpD1/transformed-image-1761555212912.png" 
                    alt="AI Avatar" 
                    className="w-full h-full object-cover transform scale-110 pt-1"
                   />
                   <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-flow font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">FLOW~</h4>
              </div>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={showUserGuide} className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-white transition-colors">
                    가이드 보기
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full transition-colors relative z-10 text-gray-400 hover:text-white">
                  <X size={18} />
                </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-black/20 space-y-4 min-h-[350px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                   <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 overflow-hidden flex-shrink-0 mt-1 flex items-center justify-center p-0.5">
                        <img 
                            src="https://i.ibb.co/Gv1hBpD1/transformed-image-1761555212912.png" 
                            alt="AI" 
                            className="w-full h-full object-cover transform scale-125 pt-1"
                        />
                   </div>
                )}
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-cyan text-slate-900 font-medium rounded-tr-none' 
                    : 'bg-slate-800 border border-white/10 text-gray-100 rounded-tl-none'
                }`}>
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 overflow-hidden flex-shrink-0 mt-1 flex items-center justify-center p-0.5">
                        <img 
                            src="https://i.ibb.co/Gv1hBpD1/transformed-image-1761555212912.png" 
                            alt="AI" 
                            className="w-full h-full object-cover transform scale-125 pt-1"
                        />
                  </div>
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-brand-cyan" />
                    <span className="text-xs text-gray-400">답변 작성 중...</span>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-900 border-t border-white/5 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="궁금한 내용을 입력해주세요..." 
              className="flex-1 bg-slate-800 rounded-full px-5 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-3 bg-brand-cyan rounded-full text-slate-900 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-cyan-500/20"
            >
                <Send size={18} />
            </button>
          </div>
        </div>
      )}
      
      <div className="relative group">
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-16 h-16 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 overflow-hidden border-2 border-white/20 ${isOpen ? 'bg-slate-700 rotate-90' : 'bg-gradient-to-br from-brand-cyan to-blue-600 animate-bounce-slow'}`}
        >
            {isOpen ? (
                <X size={28} className="text-white" /> 
            ) : (
                <img 
                    src="https://i.ibb.co/Gv1hBpD1/transformed-image-1761555212912.png" 
                    alt="Chat" 
                    className="w-full h-full object-cover transform scale-110 pt-1"
                />
            )}
        </button>
        {/* Tooltip */}
        {!isOpen && (
            <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-slate-900/90 backdrop-blur border border-white/10 text-white text-sm font-bold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                무엇이든 물어보세요!
                <div className="absolute top-full right-5 -mt-1.5 w-3 h-3 bg-slate-900 border-r border-b border-white/10 rotate-45"></div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ChatGuide;