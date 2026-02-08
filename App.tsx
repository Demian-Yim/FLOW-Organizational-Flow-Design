import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import Marquee from './components/Marquee';
import Identity from './components/Identity';
import Experience from './components/Experience';
import Profile from './components/Profile';
import Program from './components/Program';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TutorialModal from './components/TutorialModal';
import ChatGuide from './components/ChatGuide';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Check local storage for theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Check tutorial seen status
    const tutorialSeen = sessionStorage.getItem('tutorialSeen');
    if (!tutorialSeen) {
      setTimeout(() => setShowTutorial(true), 1500);
    }
  }, []);

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
        <VideoSection />
        <Marquee />
        <Identity />
        <Experience />
        <Profile />
        <Program />
        <Process />
        <Contact />
      </main>

      <Footer />
      
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
      
      {/* Floating Chat/Guide Widget */}
      <ChatGuide />
    </div>
  );
}