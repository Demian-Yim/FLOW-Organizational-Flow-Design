import React from 'react';

const Marquee: React.FC = () => {
  const text = "AI COACHING • AI TEACHING • AI FACILITATION • FLOW DESIGN • ORGANIZATION CULTURE • LEADERSHIP • WORK SMART • ";
  
  return (
    <div className="relative bg-brand-cyan py-4 overflow-hidden z-20 rotate-1 shadow-lg border-y-2 border-slate-900 dark:border-transparent">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="text-slate-900 font-black text-2xl mx-4">{text}</span>
        <span className="text-slate-900 font-black text-2xl mx-4">{text}</span>
        <span className="text-slate-900 font-black text-2xl mx-4">{text}</span>
        <span className="text-slate-900 font-black text-2xl mx-4">{text}</span>
      </div>
    </div>
  );
};

export default Marquee;
