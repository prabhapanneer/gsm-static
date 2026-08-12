import { useEffect, useState } from 'react';
import { TEAM_MEMBERS, type TeamMember } from '../data/teamMembers';
import { assetUrl } from '../lib/assetUrl';

function Photo({ m }: { m: TeamMember }) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(m.img) && !failed;

  return (
    <div className="ft-photo">
      {showImg ? (
        <img src={assetUrl(`assets/images/${m.img}`)} alt="" onError={() => setFailed(true)} />
      ) : (
        <span className="ft-initials" aria-hidden="true">
          {m.initials ?? m.name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

type FullTeamOverlayProps = { open: boolean; onClose: () => void };

export function FullTeamOverlay({ open, onClose }: FullTeamOverlayProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="ft-overlay active"
      id="ft-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ft-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ft-sheet">
        <header className="ft-sheet-head">
          <div>
            <p className="ft-kicker">GSM Investment Services</p>
            <h2 className="ft-page-title" id="ft-title">
              The full team
            </h2>
            <p className="ft-page-sub">
              {TEAM_MEMBERS.length} professionals supporting 600+ families with clarity and long-term care.
            </p>
          </div>
          <button type="button" className="ft-close" onClick={onClose} aria-label="Close team profiles">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="ft-sheet-body">
          <ul className="ft-grid">
            {TEAM_MEMBERS.map((m) => (
              <li className="ft-card" key={m.name}>
                <Photo m={m} />
                <div className="ft-card-copy">
                  <h3 className="ft-name">{m.name}</h3>
                  <p className="ft-role">{m.role}</p>
                  {m.experience ? <p className="ft-exp">{m.experience}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
