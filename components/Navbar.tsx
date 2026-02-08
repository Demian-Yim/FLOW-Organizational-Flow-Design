import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, BookOpen } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
  onOpenTutorial: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme, onOpenTutorial }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Handle Navbar background
      setIsScrolled(window.scrollY > 20);

      // Handle Active Section (Scrollspy)
      const sections = ['home', 'intro', 'experience', 'profile', 'program', 'process', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break; 
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '홈', href: '#home', id: 'home' },
    { name: '소개', href: '#intro', id: 'intro' },
    { name: '진단', href: '#experience', id: 'experience' },
    { name: '프로필', href: '#profile', id: 'profile' },
    { name: '교육과정', href: '#program', id: 'program' },
    { name: '프로세스', href: '#process', id: 'process' },
    { name: '문의', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80; // 80px for navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        isScrolled ? 'glass shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-3xl font-flow font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple group-hover:scale-105 transition-transform inline-block">
              FLOW~
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-md text-base font-bold transition-colors duration-300 ${
                    activeSection === link.id 
                      ? 'text-brand-cyan' 
                      : 'text-slate-700 dark:text-gray-200 hover:text-brand-cyan'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
             {/* Tutorial Button (Usage Guide) */}
             <button
              onClick={onOpenTutorial}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-white transition-colors"
            >
              <BookOpen size={14} />
              <span>사용법</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-800" />}
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md absolute w-full shadow-xl border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-bold ${
                   activeSection === link.id 
                      ? 'text-brand-cyan bg-brand-cyan/10' 
                      : 'text-gray-800 dark:text-gray-200 hover:text-brand-cyan'
                }`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <button
               onClick={() => { onOpenTutorial(); setIsMobileMenuOpen(false); }}
               className="w-full text-left text-brand-cyan font-bold block px-3 py-2 rounded-md text-base mt-2 border-t border-gray-100 dark:border-gray-700 pt-4"
            >
              사용 가이드 보기
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;