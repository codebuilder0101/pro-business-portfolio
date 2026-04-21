import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return { isScrolled, showBackToTop };
}

export function useAosObserver() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-aos-delay') || 0;
            setTimeout(() => entry.target.classList.add('aos-animate'), parseInt(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    el.querySelectorAll('[data-aos]').forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export function useCounterAnimation(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const step = target / (duration / 16);
    let current = 0;
    let raf;
    function update() {
      current += step;
      if (current < target) {
        setCount(Math.floor(current));
        raf = requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    }
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return { count, ref };
}
