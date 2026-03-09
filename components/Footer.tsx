import React from 'react';
import { Linkedin, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 py-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-4">
          <span className="text-4xl font-flow font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-cyan to-brand-blue drop-shadow-lg">
            FLOW~
          </span>
        </div>
        
        <div className="text-slate-300 text-sm font-normal leading-relaxed space-y-2">
          <p className="text-white font-bold text-lg tracking-wide mb-2">
            Developed by <span className="text-brand-cyan text-xl font-black drop-shadow-md">Demian 임정훈</span>
          </p>
          <p className="text-brand-pastelCyan font-medium mb-4">HRD & AI Coordinator</p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 mb-2">
            <span className="flex items-center gap-2">
              <span className="text-brand-cyan">📞</span> 010-5261-9459
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="flex items-center gap-2">
              <span className="text-brand-cyan">✉️</span> rescuemyself@gmail.com
            </span>
          </div>
          
          <p className="text-slate-300">서울특별시 용산구 유엔빌리지길 1, 헤드빌딩 4층</p>
          
          <div className="flex justify-center gap-4 py-4">
              <a 
                href="https://www.linkedin.com/in/%EC%A0%95%ED%9B%88-%EC%9E%84-23ab981aa/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
              >
                  <Linkedin size={20} />
              </a>
              <a 
                href="https://www.facebook.com/Rescuemyself7" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
              >
                  <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/demian_yim/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
              >
                  <Instagram size={20} />
              </a>
          </div>

          <p className="pt-2 text-slate-500 text-xs tracking-wider">
            © 2026 FLOW~ All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;