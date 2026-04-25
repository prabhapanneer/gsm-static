import { useEffect } from 'react';

export function useGsmRevealAndCount() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    function animateCount(el: HTMLElement, target: number, suffix: string) {
      const duration = 1800;
      let startTime: number | null = null;
      function step(ts: number) {
        if (startTime === null) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const ease = 1 - (1 - progress) ** 3;
        el.textContent = `${Math.floor(ease * target)}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = `${target}${suffix}`;
      }
      requestAnimationFrame(step);
    }

    const countObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = parseInt(el.dataset.target ?? '', 10);
          if (!Number.isFinite(target)) return;
          const suffix = el.dataset.suffix ?? (target >= 100 ? '+' : '+');
          animateCount(el, target, suffix);
          countObs.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );
    document.querySelectorAll('.count-anim').forEach((el) => countObs.observe(el));
    return () => countObs.disconnect();
  }, []);
}
