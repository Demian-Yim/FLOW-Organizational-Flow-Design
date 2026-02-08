import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <span className="text-4xl font-flow font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-cyan to-brand-blue">
          FLOW~
        </span>
        <p className="text-gray-500 mt-6 text-sm font-light">
          © 2026 FLOW~ All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;