import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import UsageGuide from './UsageGuide';
import VideoSection from './VideoSection';
import Marquee from './Marquee';
import Identity from './Identity';
import Experience from './Experience';
import Profile from './Profile';
import Program from './Program';
import Process from './Process';
import Clients from './Clients';
import Contact from './Contact';
import Footer from './Footer';
import TutorialModal from './TutorialModal';
import ChatGuide from './ChatGuide';

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    return savedTheme === 'dark';
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [inquiryCourse, setInquiryCourse] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Check tutorial seen status
    const tutorialSeen = sessionStorage.getItem('tutorialSeen');
    if (!tutorialSeen) {
      setTimeout(() => setShowTutorial(true), 1500);
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  const openTutorial = () => {
    setShowTutorial(true);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onOpenTutorial={openTutorial} />
      
      <main>
        <Hero />
        <UsageGuide />
        <VideoSection />
        <Identity />
        <Experience />
        <Profile />
        <Program onInquire={(course) => setInquiryCourse(course)} />
        <Process />
        <Clients />
        <Contact initialCourse={inquiryCourse} />
      </main>

      <Footer />
      
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
      
      {/* Floating Chat/Guide Widget */}
      <ChatGuide />
    </div>
  );
}
