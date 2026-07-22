import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

const TOTAL = 7;

const items: { text: string; av: string; name: string; desig: string }[] = [
  {
    text: '"I have known Mr. Muralidharan and his team for the past 15 years, and they have guided me through many important financial decisions. What stands out is their dedication, practical approach, and the personal care they bring to every portfolio. They understand client needs clearly, honour their commitments, and always suggest what is genuinely best. Mr. Muralidharan\'s humility and integrity make GSM truly different."',
    av: 'JJ',
    name: 'Jacob Jacob',
    desig: 'Group CHRO, Aster DM Healthcare',
  },
  {
    text: '"I have been associated with Mr. Muralidharan and GSM Investment Services for the past 20 years. Their approach has always been highly professional, and they bring strong expertise in investment planning. They understand risk levels, client needs, and portfolio suitability very well, and they help clients make informed and well-aligned financial decisions. I have always found them to be trustworthy, knowledgeable, and sincere in the way they work."',
    av: 'NA',
    name: 'N S Arvind',
    desig: 'Chief Technology Officer, Asia Healthcare Holdings',
  },
  {
    text: '"I sincerely appreciate the guidance of Mr. Ganesan Muralidharan and his team at GSM Investment Services in my SIP journey since 2021. Their understanding of market behaviour and personal financial priorities has made decision-making much simpler and more confident for me. I also appreciate Mr. Sethuraman for his prompt coordination and consistent support. They have been outstanding partners in my financial journey."',
    av: 'DS',
    name: 'Dr. Sudhir',
    desig: 'Spine Surgeon',
  },
  {
    text: '"I became financially stronger because of the genuine and disciplined investment guidance of Mr. Murali and his team at GSM Investment Services. They are honest, trustworthy, and deeply committed to helping clients move forward with confidence."',
    av: 'SA',
    name: 'Sornamani Agneeswaran',
    desig: 'Director, Entrust Infotech',
  },
  {
    text: '"I have been with GSM Investment Services for nearly 7 years, and they have completely changed the way I plan and manage my finances. Mr. Muralidharan, Mr. Vishal, and Mr. Sethuraman combine deep expertise with genuine care, always offering honest and timely guidance. Their personalised and goal-based approach helped me stay confident even during difficult market phases, including COVID. They are true long-term partners in a client\'s financial journey."',
    av: 'BS',
    name: 'Balaji Sivaprakasam',
    desig: 'Engineering Lead, Associate Director',
  },
  {
    text: '"I have been a client of GSM for more than 8 years. Their team has a clear understanding of markets, investor behaviour, and risk appetite, and they recommend funds that are well aligned to individual goals. They stay in regular touch, review portfolios consistently, and guide clients calmly even during turbulent market periods. What I value most is their client-centric approach and their ability to combine experience, discipline, and long-term thinking."',
    av: 'RK',
    name: 'Ramkumar Kuppuswamy',
    desig: 'Senior Manufacturing and Engineering Assistant Bank Manager',
  },
  {
    text: '"I have been a client of GSM Investment Services for over a year, and my experience has been excellent. From the beginning, they took time to understand my financial goals and build a plan that felt right for me. Their communication is clear, honest, and free from unnecessary jargon or pressure. They keep me updated regularly, explain things patiently, and give me confidence that my money is being managed with genuine care."',
    av: 'VS',
    name: 'Vignesh Sridharan',
    desig: 'Assistant Bank Manager',
  },
];

export function TestimonialsBlock() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const curRef = useRef(0);
  const dotId = useId();

  const spvNow = useCallback(() => {
    const w = wrapRef.current?.offsetWidth;
    const width = w != null && w > 0 ? w : typeof window !== 'undefined' ? window.innerWidth : 800;
    return width < 700 ? 1 : 2;
  }, []);

  const slideW = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const first = track.querySelector('.tst-slide');
    return first ? (first as HTMLElement).offsetWidth + 20 : 0;
  }, []);

  const maxCur = useCallback(() => Math.max(0, TOTAL - spvNow()), [spvNow]);

  const goTo = useCallback(
    (n: number) => {
      const m = maxCur();
      const next = Math.max(0, Math.min(n, m));
      curRef.current = next;
      setCur(next);
    },
    [maxCur],
  );

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(${-cur * slideW()}px)`;
  }, [cur, slideW]);

  useEffect(() => {
    const onResize = () => {
      goTo(Math.min(curRef.current, maxCur()));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [goTo, maxCur]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let dragging = false;
    let startX = 0;
    let diff = 0;

    const onDown = (e: MouseEvent) => {
      dragging = true;
      startX = e.clientX;
      track.style.transition = 'none';
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      diff = e.clientX - startX;
      track.style.transform = `translateX(${-curRef.current * slideW() + diff}px)`;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      track.style.transition = '';
      if (diff < -60) goTo(curRef.current + 1);
      else if (diff > 60) goTo(curRef.current - 1);
      else goTo(curRef.current);
      diff = 0;
    };
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      track.style.transition = 'none';
    };
    const onTouchMove = (e: TouchEvent) => {
      diff = e.touches[0].clientX - startX;
      track.style.transform = `translateX(${-curRef.current * slideW() + diff}px)`;
    };
    const onTouchEnd = () => {
      track.style.transition = '';
      if (diff < -60) goTo(curRef.current + 1);
      else if (diff > 60) goTo(curRef.current - 1);
      else goTo(curRef.current);
      diff = 0;
    };

    track.addEventListener('mousedown', onDown);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove', onTouchMove, { passive: true });
    track.addEventListener('touchend', onTouchEnd);
    return () => {
      track.removeEventListener('mousedown', onDown);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove', onTouchMove);
      track.removeEventListener('touchend', onTouchEnd);
    };
  }, [goTo, slideW]);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    let t: ReturnType<typeof setInterval> | undefined;
    const start = () => {
      t = setInterval(() => {
        if (curRef.current < maxCur()) goTo(curRef.current + 1);
        else goTo(0);
      }, 5000);
    };
    start();
    const onEnter = () => {
      if (t) clearInterval(t);
    };
    const onLeave = () => {
      if (t) clearInterval(t);
      start();
    };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      if (t) clearInterval(t);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [goTo, maxCur]);

  const m = maxCur();
  const counterText = `${cur + 1} / ${m + 1}`;

  return (
    <section className="testi">
      <div className="si">
        <div className="stag">
          <span className="stag-line" />
          <span className="stag-text">Client Feedback</span>
        </div>
        <h2 className="sh">
          Long-term relationships built
          <br />
          through trust and consistency.
        </h2>
        <p className="sdesc">A few words from clients who have experienced our approach over the years.</p>

        <div className="tst-carousel-outer" ref={outerRef}>
          <div className="tst-wrap" ref={wrapRef}>
            <div className="tst-track" id="tstiTrack" ref={trackRef}>
              {items.map((it) => (
                <div className="tst-slide" key={it.name}>
                  <div className="testcard">
                    <div className="test-stars">★★★★★</div>
                    <p className="test-text">{it.text}</p>
                    <div className="test-author">
                      <div className="test-av">{it.av}</div>
                      <div>
                        <div className="test-name">{it.name}</div>
                        <div className="test-desig">{it.desig}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="tst-arr tst-arr-l"
            id="tstiPrev"
            aria-label="Previous testimonial"
            onClick={() => goTo(cur - 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="tst-arr tst-arr-r"
            id="tstiNext"
            aria-label="Next testimonial"
            onClick={() => goTo(cur + 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="tst-nav">
          <div id="tstiDots" style={{ display: 'flex', gap: 8 }}>
            {Array.from({ length: m + 1 }, (_, i) => (
              <button
                type="button"
                key={`${dotId}-${i}`}
                className={`tst-dot${i === cur ? ' on' : ''}`}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <span id="tstiCounter" style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
            {counterText}
          </span>
        </div>
      </div>
    </section>
  );
}
