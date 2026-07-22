import { useEffect } from 'react';
import { assetUrl } from '../lib/assetUrl';

type Member = {
  img?: string;
  initials?: string;
  name: string;
  role: string;
  bio: string;
  q: string;
  e: string;
  lead?: boolean;
};

const members: Member[] = [
  {
    img: 'img-21b77350e74a.jpg',
    name: 'Ganesan Muralidharan',
    role: 'Founder & Principal Mentor',
    bio: 'Founded GSM Investment Services in 2003. With 25 years of experience in mutual fund distribution, he brings deep relationship-based guidance to every client.',
    q: 'M.Com, NISM V-A',
    e: '25 Years',
    lead: true,
  },
  {
    img: 'img-998991eb0739.jpg',
    name: 'Vishal Muralidharan',
    role: 'CEO & Research Analyst',
    bio: 'Certified Financial Planner overseeing operations, client relationships, and strategy. Author of published books on personal finance.',
    q: 'CFP, QPFP, NISM V-A, NISM XV',
    e: '7 Years',
    lead: true,
  },
  {
    img: 'img-171ebd682110.jpg',
    name: 'Sethuraman Duraiswamy',
    role: 'Sales Head & Senior Manager',
    bio: 'Leads client acquisition and relationship management. Known for consistent support, prompt coordination, and deep investor understanding.',
    q: 'M.A., NISM V-A',
    e: '16 Years',
  },
  {
    img: 'img-d6e5889db960.jpg',
    name: 'Rajendran S S',
    role: 'Operations Head',
    bio: 'Oversees all operational workflows, ensuring smooth processing, timely documentation, and regulatory compliance for every client.',
    q: 'MBA, NISM V-A',
    e: '10 Years',
  },
  {
    img: 'img-638b0c5f021c.jpg',
    name: 'Chitra S',
    role: 'Data Management Executive',
    bio: 'Manages client data, portfolio records, and digital support functions with precision and care.',
    q: 'B.Com',
    e: '4 Years',
  },
  {
    initials: 'KS',
    name: 'Kalaimani S',
    role: 'Operations Executive',
    bio: 'Supports operational tasks and client service functions across the GSM team.',
    q: 'B.A.',
    e: '2 Years',
  },
  {
    img: 'img-bf1eb88e87b3.jpg',
    name: 'Joni',
    role: 'Marketing Executive',
    bio: "Handles GSM's marketing communications, social media content, and brand outreach initiatives.",
    q: 'M.Com',
    e: '6 Months',
  },
  {
    initials: 'MS',
    name: 'Magesh S S',
    role: 'Field Support Executive',
    bio: 'Provides field and client support services, assisting with on-ground activities across Chennai.',
    q: '—',
    e: '6 Months',
  },
];

function Photo({ m, size }: { m: Member; size: 'lg' | 'sm' }) {
  return (
    <div className={`ft-photo ft-photo-${size}`}>
      {m.img ? (
        <img src={assetUrl(`assets/images/${m.img}`)} alt="" />
      ) : (
        <span className="ft-initials" aria-hidden="true">
          {m.initials}
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

  const leaders = members.filter((m) => m.lead);
  const core = members.filter((m) => !m.lead);

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
            <p className="ft-page-sub">8 professionals supporting 600+ families with clarity and long-term care.</p>
          </div>
          <button type="button" className="ft-close" onClick={onClose} aria-label="Close team profiles">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="ft-sheet-body">
          <div className="ft-lead-grid">
            {leaders.map((m) => (
              <article className="ft-lead" key={m.name}>
                <Photo m={m} size="lg" />
                <div className="ft-lead-copy">
                  <p className="ft-exp">{m.e}</p>
                  <h3 className="ft-name">{m.name}</h3>
                  <p className="ft-role">{m.role}</p>
                  <p className="ft-bio">{m.bio}</p>
                  <p className="ft-qual">
                    <span>Qualification</span> {m.q}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="ft-core-label">
            <h3>Core team</h3>
            <span />
          </div>

          <ul className="ft-list">
            {core.map((m) => (
              <li className="ft-row" key={m.name}>
                <Photo m={m} size="sm" />
                <div className="ft-row-main">
                  <div className="ft-row-top">
                    <div>
                      <h3 className="ft-name">{m.name}</h3>
                      <p className="ft-role">{m.role}</p>
                    </div>
                    <p className="ft-exp">{m.e}</p>
                  </div>
                  <p className="ft-bio">{m.bio}</p>
                  <p className="ft-qual">
                    <span>Qualification</span> {m.q}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
