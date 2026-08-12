import { useState } from 'react';
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

        <ul className="team-grid">
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
      </div>
    </section>
  );
}
