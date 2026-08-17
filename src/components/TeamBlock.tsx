import { useCallback, useEffect, useRef, useState } from 'react';
import { TEAM_MEMBERS, type TeamMember } from '../data/teamMembers';
import { assetUrl } from '../lib/assetUrl';

function Portrait({ m }: { m: TeamMember }) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(m.img) && !failed;

  return (
    <div className="tm-photo">
      {showImg ? (
        <img
          src={assetUrl(`assets/images/${m.img}`)}
          alt={m.name}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="tm-initials" aria-hidden="true">
          {m.initials ?? m.name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

type TeamBlockProps = { onOpenFullTeam: () => void };

export function TeamBlock({ onOpenFullTeam }: TeamBlockProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [cur, setCur] = useState(0);
  const total = TEAM_MEMBERS.length;

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(total - 1, index));
    setCur(next);
    const track = trackRef.current;
    const slide = track?.children[next] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const slides = Array.from(track.children) as HTMLElement[];
      if (!slides.length) return;
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      slides.forEach((slide, i) => {
        const center = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setCur(best);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="team" id="team">
      <div className="si">
        <div className="team-section-head">
          <div>
            <div className="stag">
              <span className="stag-line" />
              <span className="stag-text">Our Team</span>
            </div>
            <h2 className="sh">People who stay with your financial journey.</h2>
            <p className="sdesc">
              Leadership that sets the direction, and a team that supports clients with clarity,
              coordination, and care.
            </p>
          </div>
          <button type="button" className="view-full-team-btn" onClick={onOpenFullTeam}>
            View full team
          </button>
        </div>

        <div className="team-slider">
          <ul className="team-grid" ref={trackRef}>
            {TEAM_MEMBERS.map((m) => (
              <li className="team-card reveal" key={m.name}>
                <Portrait m={m} />
                <div className="team-card-copy">
                  <h3 className="team-card-name">{m.name}</h3>
                  <p className="team-card-role">{m.role}</p>
                  {m.experience ? <p className="team-card-exp">{m.experience}</p> : null}
                </div>
              </li>
            ))}
          </ul>

          <div className="team-slider-nav" aria-hidden={false}>
            <button
              type="button"
              className="team-slider-arr"
              aria-label="Previous team member"
              disabled={cur === 0}
              onClick={() => goTo(cur - 1)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="team-slider-dots">
              {TEAM_MEMBERS.map((m, i) => (
                <button
                  type="button"
                  key={m.name}
                  className={`team-slider-dot${i === cur ? ' on' : ''}`}
                  aria-label={`Show ${m.name}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <button
              type="button"
              className="team-slider-arr"
              aria-label="Next team member"
              disabled={cur === total - 1}
              onClick={() => goTo(cur + 1)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          <p className="team-slider-count">
            {cur + 1} / {total}
          </p>
        </div>
      </div>
    </section>
  );
}
