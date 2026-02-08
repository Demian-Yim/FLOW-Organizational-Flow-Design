import { useEffect, useRef } from 'react';

const useScrollReveal = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-[30px]');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      // Set initial state
      currentEl.classList.add('opacity-0', 'translate-y-[30px]', 'transition-all', 'duration-700', 'ease-out');
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, []);

  return elementRef;
};

export default useScrollReveal;
