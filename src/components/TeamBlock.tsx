import { assetUrl } from '../lib/assetUrl';

type Member = {
  img?: string;
  initials?: string;
  name: string;
  role: string;
  e: string;
  blurb?: string;
};

const leaders: Member[] = [
  {
    img: 'img-21b77350e74a.jpg',
    name: 'Ganesan Muralidharan',
    role: 'Founder & Principal Mentor',
    e: '25 Years',
    blurb: 'Founded GSM Investment Services in 2003. Brings deep, relationship-based guidance shaped by 25 years in mutual fund distribution.',
  },
  {
    img: 'img-998991eb0739.jpg',
    name: 'Vishal Muralidharan',
    role: 'CEO & Research Analyst',
    e: '7 Years',
    blurb: 'Certified Financial Planner leading strategy, client relationships, and research. Author of published books on personal finance.',
  },
];

const core: Member[] = [
  { img: 'img-171ebd682110.jpg', name: 'Sethuraman Duraiswamy', role: 'Sales Head & Senior Manager', e: '16 Years' },
  { img: 'img-d6e5889db960.jpg', name: 'Rajendran S S', role: 'Operations Head', e: '10 Years' },
  { img: 'img-638b0c5f021c.jpg', name: 'Chitra S', role: 'Data Management Executive', e: '4 Years' },
  { initials: 'KS', name: 'Kalaimani S', role: 'Operations Executive', e: '2 Years' },
  { img: 'img-bf1eb88e87b3.jpg', name: 'Joni', role: 'Marketing Executive', e: '6 Months' },
  { initials: 'MS', name: 'Magesh S S', role: 'Field Support Executive', e: '6 Months' },
];

function Portrait({ m, size = 'md' }: { m: Member; size?: 'lg' | 'md' }) {
  return (
    <div className={`tm-photo tm-photo-${size}`}>
      {m.img ? (
        <img src={assetUrl(`assets/images/${m.img}`)} alt={m.name} />
      ) : (
        <span className="tm-initials" aria-hidden="true">
          {m.initials}
        </span>
      )}
    </div>
  );
}

type TeamBlockProps = { onOpenFullTeam: () => void };

export function TeamBlock({ onOpenFullTeam }: TeamBlockProps) {
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
              Leadership that sets the direction, and a team that supports clients with clarity, coordination, and care.
            </p>
          </div>
          <button type="button" className="view-full-team-btn" onClick={onOpenFullTeam}>
            View full profiles
          </button>
        </div>

        <div className="team-leaders">
          {leaders.map((m) => (
            <article className="team-leader reveal" key={m.name}>
              <Portrait m={m} size="lg" />
              <div className="team-leader-copy">
                <p className="team-leader-exp">{m.e} experience</p>
                <h3>{m.name}</h3>
                <p className="team-leader-role">{m.role}</p>
                <p className="team-leader-blurb">{m.blurb}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="team-core-head">
          <h3>Core team</h3>
          <span className="team-core-rule" />
        </div>

        <ul className="team-core">
          {core.map((m) => (
            <li className="team-core-item reveal" key={m.name}>
              <Portrait m={m} size="md" />
              <div>
                <div className="team-core-name">{m.name}</div>
                <div className="team-core-role">{m.role}</div>
                <div className="team-core-exp">{m.e}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
