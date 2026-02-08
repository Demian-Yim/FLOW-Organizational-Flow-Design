import React, { useState, useRef, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { User, Phone, Mail, Loader2, Send, Calendar, MapPin, Users, HelpCircle, Building } from 'lucide-react';
import { sendContactToSheet } from '../utils/googleApi';

interface ContactProps {
  initialCourse?: string;
}

const Contact: React.FC<ContactProps> = ({ initialCourse }) => {
  const revealRef = useScrollReveal();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Detailed Form State
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    contact: '',
    email: '',
    course: '',
    schedule: '',
    target: '',
    location: '',
    issues: ''
  });

  // Auto-fill course when initialCourse prop changes
  useEffect(() => {
    if (initialCourse) {
        setFormData(prev => ({ ...prev, course: initialCourse }));
    }
  }, [initialCourse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.name || !formData.contact) {
      alert('필수 항목(회사명, 담당자, 연락처)을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
        await sendContactToSheet(formData);
        alert('문의가 성공적으로 접수되었습니다.\n담당자가 확인 후 24시간 이내에 연락드리겠습니다.');
        setFormData({ company: '', name: '', contact: '', email: '', course: '', schedule: '', target: '', location: '', issues: '' });
    } catch (error) {
        console.error('Submission Error:', error);
        alert('전송 중 오류가 발생했습니다.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 scroll-mt-20 transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-white/10 backdrop-blur-xl" ref={revealRef}>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">교육 문의하기</h2>
            <p className="text-gray-600 dark:text-gray-400">
                조직의 성장을 위한 최적의 설계를 도와드리겠습니다.<br/>
                아래 내용을 작성해주시면 더 빠르고 정확한 안내가 가능합니다.
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid Layout for Inputs */}
            <div className="grid md:grid-cols-2 gap-6">
                
                {/* 1. Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-brand-cyan text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><User size={16}/> 담당자 정보 (필수)</h3>
                    <div className="group">
                        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="회사/기관명" required 
                            className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-cyan transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-1 focus:ring-brand-cyan/50" />
                    </div>
                    <div className="group">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="담당자 성함 / 직급" required 
                            className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-cyan transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-1 focus:ring-brand-cyan/50" />
                    </div>
                    <div className="group">
                        <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="연락처 (010-0000-0000)" required 
                            className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-cyan transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-1 focus:ring-brand-cyan/50" />
                    </div>
                    <div className="group">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="이메일 주소" required 
                            className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-cyan transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-1 focus:ring-brand-cyan/50" />
                    </div>
                </div>

                {/* 2. Course Details */}
                <div className="space-y-4">
                    <h3 className="text-brand-purple text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Building size={16}/> 교육 세부 정보</h3>
                    <div className="group">
                        <input type="text" name="course" value={formData.course} onChange={handleChange} placeholder="희망 교육 과정 (예: AI 실무, 리더십 등)" 
                            className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-purple transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-1 focus:ring-brand-purple/50" />
                    </div>
                    <div className="flex gap-4">
                        <input type="text" name="schedule" value={formData.schedule} onChange={handleChange} placeholder="희망 일정/시간" 
                            className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-purple transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-1 focus:ring-brand-purple/50" />
                        <input type="text" name="target" value={formData.target} onChange={handleChange} placeholder="대상/인원" 
                            className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-purple transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-1 focus:ring-brand-purple/50" />
                    </div>
                    <div className="group">
                        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="교육 장소 (사내교육장, 외부 등)" 
                            className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-purple transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-1 focus:ring-brand-purple/50" />
                    </div>
                </div>
            </div>

            {/* 3. Detailed Issues */}
            <div className="space-y-2">
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2"><HelpCircle size={16}/> 기타 문의 및 이슈사항</h3>
                <textarea 
                  rows={4} 
                  name="issues"
                  value={formData.issues}
                  onChange={handleChange}
                  placeholder="조직의 현재 고민이나 교육을 통해 해결하고 싶은 이슈가 있다면 자유롭게 적어주세요." 
                  className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-cyan/50 dark:focus:border-white/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none focus:ring-1 focus:ring-brand-cyan/30 dark:focus:ring-white/30"
                ></textarea>
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full font-black text-lg py-4 rounded-xl transition-all transform flex items-center justify-center gap-3 shadow-lg ${
                    isSubmitting 
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400' 
                    : 'bg-gradient-to-r from-brand-cyan to-brand-blue text-white hover:shadow-cyan-500/30 hover:-translate-y-1'
                }`}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="animate-spin" size={24} />
                        문의 접수 중...
                    </>
                ) : (
                    <>
                        교육 문의하기
                        <Send size={20} />
                    </>
                )}
            </button>
            <p className="text-xs text-center text-gray-500 dark:text-gray-600 mt-2">
                * 보내주신 정보는 교육 상담 목적으로만 사용되며, 안전하게 보호됩니다.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;