import { useEffect, useRef } from 'react';

// Content stays readable when observers or animation support are unavailable.
export default function useScrollMotion() {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.matchMedia || !window.IntersectionObserver) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const tracked = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.dataset.motionState = preference.matches ? 'complete' : 'entered';
        observer.unobserve(target);
      });
    }, { threshold: 0.08 });
    const register = () => {
      root.querySelectorAll('.section-heading, [data-motion]').forEach(target => {
        if (tracked.has(target)) return;
        tracked.add(target);
        target.dataset.motion = '';
        if (preference.matches) target.dataset.motionState = 'complete';
        else observer.observe(target);
      });
      tracked.forEach(target => {
        if (root.contains(target)) return;
        observer.unobserve(target);
        tracked.delete(target);
      });
    };
    const respectPreference = () => {
      if (!preference.matches) return;
      observer.disconnect();
      tracked.forEach(target => { target.dataset.motionState = 'complete'; });
    };
    register();
    // Lazy sections and CMS updates can mount after the initial render.
    const mutations = new MutationObserver(register);
    mutations.observe(root, { childList: true, subtree: true });
    preference.addEventListener('change', respectPreference);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener('change', respectPreference);
    };
  }, []);
  return rootRef;
}
