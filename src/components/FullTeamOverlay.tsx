import { useEffect } from 'react';
import { assetUrl } from '../lib/assetUrl';

const members: {
  img?: string;
  initials?: string;
  name: string;
  role: string;
  bio: string;
  q: string;
  e: string;
}[] = [
  {
    img: 'img-21b77350e74a.jpg',
    name: 'Ganesan Muralidharan',
    role: 'Founder & Principal Mentor',
    bio: 'Founded GSM Investment Services in 2003. With 25 years of experience in mutual fund distribution, he brings deep relationship-based guidance to every client.',
    q: 'M.Com, NISM V-A',
    e: '25 Years',
  },
  {
    img: 'img-998991eb0739.jpg',
    name: 'Vishal Muralidharan',
    role: 'CEO & Research Analyst',
    bio: 'Certified Financial Planner overseeing operations, client relationships, and strategy. Author of published books on personal finance.',
    q: 'CFP, QPFP, NISM V-A, NISM XV',
    e: '7 Years',
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
      aria-label="Full team"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ft-page">
        <div className="ft-page-header">
          <div>
            <div className="ft-page-title">The GSM Team</div>
            <div className="ft-page-sub">8 dedicated professionals serving 600+ families across Chennai and beyond.</div>
          </div>
          <button type="button" className="ft-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="ft-grid">
          {members.map((m) => (
            <div className="ft-card" key={m.name}>
              <div className="tm-avatar">
                {m.img ? (
                  <img src={assetUrl(`assets/images/${m.img}`)} alt={m.name} />
                ) : (
                  <div className="tm-initials">{m.initials}</div>
                )}
              </div>
              <div className="ft-body">
                <div className="ft-name">{m.name}</div>
                <div className="ft-role">{m.role}</div>
                <p className="ft-bio">{m.bio}</p>
                <div className="ft-meta">
                  <div className="ft-badge-row">
                    <div className="ft-badge">
                      <div className="ft-badge-label">Qualification</div>
                      <div className="ft-badge-val">{m.q}</div>
                    </div>
                    <div className="ft-badge">
                      <div className="ft-badge-label">Experience</div>
                      <div className="ft-badge-val">{m.e}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
