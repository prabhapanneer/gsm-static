import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { assetUrl } from '../lib/assetUrl';

const TOTAL = 8;

const slides: { img?: string; initials?: string; name: string; role: string; q: string; e: string }[] = [
  { img: 'img-21b77350e74a.jpg', name: 'Ganesan Muralidharan', role: 'Founder & Principal Mentor', q: 'M.Com, NISM V-A', e: '25 Years' },
  { img: 'img-998991eb0739.jpg', name: 'Vishal Muralidharan', role: 'CEO & Research Analyst', q: 'CFP, QPFP, NISM V-A, NISM XV', e: '7 Years' },
  { img: 'img-171ebd682110.jpg', name: 'Sethuraman Duraiswamy', role: 'Sales Head & Senior Manager', q: 'M.A., NISM V-A', e: '16 Years' },
  { img: 'img-d6e5889db960.jpg', name: 'Rajendran S S', role: 'Operations Head', q: 'MBA, NISM V-A', e: '10 Years' },
  { img: 'img-638b0c5f021c.jpg', name: 'Chitra S', role: 'Data Management Executive', q: 'B.Com', e: '4 Years' },
  { initials: 'KS', name: 'Kalaimani S', role: 'Operations Executive', q: 'B.A.', e: '2 Years' },
  { img: 'img-bf1eb88e87b3.jpg', name: 'Joni', role: 'Marketing Executive', q: 'M.Com', e: '6 Months' },
  { initials: 'MS', name: 'Magesh S S', role: 'Field Support Executive', q: '—', e: '6 Months' },
];

function SlideCard({ s }: { s: (typeof slides)[0] }) {
  return (
    <div className="tc-slide">
      <div className="tc-card">
        <div className="tm-avatar">
          {s.img ? (
            <img src={assetUrl(`assets/images/${s.img}`)} alt={s.name} />
          ) : (
            <div className="tm-initials">{s.initials}</div>
          )}
        </div>
        <div className="tc-name">{s.name}</div>
        <div className="tc-role">{s.role}</div>
        <div className="tc-meta">
          <div className="tc-badge">
            <span>Qualification</span>
            <span>{s.q}</span>
          </div>
          <div className="tc-badge">
            <span>Experience</span>
            <span>{s.e}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

type TeamBlockProps = { onOpenFullTeam: () => void };

export function TeamBlock({ onOpenFullTeam }: TeamBlockProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentSlideRef = useRef(0);
  const dotInst = useId();

  const getSlidesPerView = useCallback(() => {
    const w = wrapRef.current?.offsetWidth;
    const width = w != null && w > 0 ? w : typeof window !== 'undefined' ? window.innerWidth : 1200;
    if (width < 500) return 1;
    if (width < 700) return 2;
    if (width < 980) return 3;
    return 4;
  }, []);

  const getSlideWidth = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return 0;
    const first = carousel.querySelector('.tc-slide');
    return first ? (first as HTMLElement).offsetWidth + 22 : 0;
  }, []);

  const maxCur = useCallback(() => {
    const spv = getSlidesPerView();
    return Math.max(0, TOTAL - spv);
  }, [getSlidesPerView]);

  const goTo = useCallback(
    (n: number) => {
      const spv = getSlidesPerView();
      const maxS = Math.max(0, TOTAL - spv);
      const next = Math.max(0, Math.min(n, maxS));
      currentSlideRef.current = next;
      setCurrentSlide(next);
    },
    [getSlidesPerView],
  );

  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const w = getSlideWidth();
    carousel.style.transform = `translateX(${-currentSlide * w}px)`;
  }, [currentSlide, getSlideWidth]);

  useEffect(() => {
    const onResize = () => {
      goTo(Math.min(currentSlideRef.current, maxCur()));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [goTo, maxCur]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let isDragging = false;
    let startX = 0;
    let diffX = 0;

    const onDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      carousel.style.transition = 'none';
    };
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      diffX = e.clientX - startX;
      const w = getSlideWidth();
      carousel.style.transform = `translateX(${-currentSlideRef.current * w + diffX}px)`;
    };
    const onUp = () => {
      if (!isDragging) return;
      isDragging = false;
      carousel.style.transition = '';
      const cs = currentSlideRef.current;
      if (diffX < -60) goTo(cs + 1);
      else if (diffX > 60) goTo(cs - 1);
      else goTo(cs);
      diffX = 0;
    };
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      carousel.style.transition = 'none';
    };
    const onTouchMove = (e: TouchEvent) => {
      diffX = e.touches[0].clientX - startX;
      const w = getSlideWidth();
      carousel.style.transform = `translateX(${-currentSlideRef.current * w + diffX}px)`;
    };
    const onTouchEnd = () => {
      carousel.style.transition = '';
      const cs = currentSlideRef.current;
      if (diffX < -60) goTo(cs + 1);
      else if (diffX > 60) goTo(cs - 1);
      else goTo(cs);
      diffX = 0;
    };

    carousel.addEventListener('mousedown', onDown);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    carousel.addEventListener('touchstart', onTouchStart, { passive: true });
    carousel.addEventListener('touchmove', onTouchMove, { passive: true });
    carousel.addEventListener('touchend', onTouchEnd);
    return () => {
      carousel.removeEventListener('mousedown', onDown);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      carousel.removeEventListener('touchstart', onTouchStart);
      carousel.removeEventListener('touchmove', onTouchMove);
      carousel.removeEventListener('touchend', onTouchEnd);
    };
  }, [getSlideWidth, goTo]);

  const spv = getSlidesPerView();
  const maxSlide = Math.max(0, TOTAL - spv);

  return (
    <section className="team" id="team">
      <div className="si">
        <div className="team-section-head">
          <div>
            <div className="stag">
              <span className="stag-line" />
              <span className="stag-text">Our Team</span>
            </div>
            <h2 className="sh" style={{ marginBottom: 6 }}>
              The People Behind GSM
            </h2>
            <p className="sdesc">A committed team working together to support clients with clarity, coordination, and long-term care.</p>
          </div>
          <button type="button" className="view-full-team-btn" onClick={onOpenFullTeam}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            View Full Team
          </button>
        </div>

        <div className="team-carousel-wrap" ref={wrapRef} id="carouselWrap">
          <div className="team-carousel" ref={carouselRef} id="teamCarousel">
            {slides.map((s) => (
              <SlideCard key={s.name} s={s} />
            ))}
          </div>
        </div>
        <div className="carousel-nav">
          <button
            type="button"
            className="c-btn"
            aria-label="Previous"
            disabled={currentSlide === 0}
            onClick={() => goTo(currentSlide - 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="c-dots" id="cDots">
            {Array.from({ length: maxSlide + 1 }, (_, i) => (
              <button
                type="button"
                key={`${dotInst}-${i}`}
                className={`c-dot${i === currentSlide ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Carousel page ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="c-btn"
            aria-label="Next"
            disabled={currentSlide >= maxSlide}
            onClick={() => goTo(currentSlide + 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
