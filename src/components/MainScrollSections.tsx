import { Link } from 'react-router-dom';

export function MainScrollSections() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-orb" />
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="eyebrow-line" />
              <span className="eyebrow-text">Trusted by families since 2003</span>
            </div>
            <h1>
              Helping families build wealth with clarity,
              <br />
              <em>discipline,</em> and trust.
            </h1>
            <p className="hero-desc">
              For more than 23 years, GSM Investment Services has helped families invest with purpose, protect their future, and move towards their financial goals with confidence.
            </p>
            <div className="hero-btns">
              <a href="/#contact" className="btn-gold">
                Book a Consultation
              </a>
              <a href="/#about" className="btn-ghost">
                See How We Work →
              </a>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-label">Why Clients Stay With GSM</div>
            <div className="hero-stats">
              <div className="hstat">
                <div className="hstat-n count-anim" data-target="23">
                  0
                </div>
                <div className="hstat-l">Years of Service</div>
              </div>
              <div className="hstat">
                <div className="hstat-n count-anim" data-target="600">
                  0
                </div>
                <div className="hstat-l">Families Served</div>
              </div>
              <div className="hstat">
                <div className="hstat-n" style={{ fontSize: 24 }}>
                  ₹230+ Cr
                </div>
                <div className="hstat-l">Client Investments</div>
              </div>
              <div className="hstat">
                <div className="hstat-n" style={{ fontSize: 21 }}>
                  Multiple
                </div>
                <div className="hstat-l">Services under one roof</div>
              </div>
            </div>
            <div className="amfi-row">
              <div className="amfi-check">✓</div>
              <div>
                <div className="amfi-t1">AMFI Registered Mutual Fund Distributor</div>
                <div className="amfi-t2">ARN 174939 · Serving investors since May 2003</div>
              </div>
            </div>
            <div className="hero-quote">
              &quot;We believe money is not just about returns. It is about goals, responsibilities, and peace of mind.&quot;
            </div>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="trust-wrap">
          <div className="trust-top">
            <div>
              <div className="trust-kicker">Why Families Trust GSM</div>
              <h3 className="trust-title">Built on experience, clarity, and long-term trust.</h3>
            </div>
          </div>
          <div className="trust-metrics">
            <div className="tmetric reveal reveal-delay-1">
              <div className="tmetric-label">Track Record</div>
              <div className="tmetric-value">Since 2003</div>
              <div className="tmetric-note">Continuity, discipline, and trust.</div>
            </div>
            <div className="tmetric reveal reveal-delay-2">
              <div className="tmetric-label">Client Base</div>
              <div className="tmetric-value">600+ Families</div>
              <div className="tmetric-note">Across generations and life stages.</div>
            </div>
            <div className="tmetric reveal reveal-delay-3">
              <div className="tmetric-label">Registration</div>
              <div className="tmetric-value">ARN 174939</div>
              <div className="tmetric-note">AMFI Registered Mutual Fund Distributor.</div>
            </div>
            <div className="tmetric reveal">
              <div className="tmetric-label">Qualification</div>
              <div className="tmetric-value">CFP Backed</div>
              <div className="tmetric-note">Guidance supported by formal certification.</div>
            </div>
            <div className="tmetric reveal">
              <div className="tmetric-label">Approach</div>
              <div className="tmetric-value">Transparent</div>
              <div className="tmetric-note">Clear communication and honest disclosure.</div>
            </div>
          </div>
        </div>
      </div>

      <section className="about" id="about">
        <div className="si about-layout">
          <div className="about-copy">
            <div className="stag">
              <span className="stag-line" />
              <span className="stag-text">About GSM</span>
            </div>
            <h2 className="sh">A firm built on clarity, trust, and relationships that last.</h2>
            <p className="about-lead">
              Founded in 2003 by Mr. Ganesan Muralidharan, GSM Investment Services helps families make better financial decisions — with honesty, practical guidance, and support that continues beyond a single investment.
            </p>
            <blockquote className="about-quote">
              Financial decisions become easier when they are explained clearly, connected to real life, and backed by a team that stays for the long term.
            </blockquote>
          </div>
          <ol className="about-steps">
            <li className="reveal">
              <span className="about-step-n">01</span>
              <div>
                <h3>What families need</h3>
                <p>Not jargon or pressure — someone who understands their situation and explains the next step clearly.</p>
              </div>
            </li>
            <li className="reveal">
              <span className="about-step-n">02</span>
              <div>
                <h3>What GSM does</h3>
                <p>We understand your goals, responsibilities, and comfort with risk — then guide you with suitable solutions.</p>
              </div>
            </li>
            <li className="reveal">
              <span className="about-step-n">03</span>
              <div>
                <h3>What you can expect</h3>
                <p>Honest conversations, simple explanations, and support that continues over years, not transactions.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="gsm-example" id="example">
        <div className="si">
          <div className="example-head">
            <div className="stag">
              <span className="stag-line" />
              <span className="stag-text">How We Guide</span>
            </div>
            <h2 className="sh">We do not start with a product. We start with the person.</h2>
            <p className="sdesc">
              A short example of how a typical conversation begins when someone asks where to invest.
            </p>
          </div>

          <div className="guide-layout">
            <aside className="guide-process">
              <p className="guide-process-label">Our sequence</p>
              <ol className="guide-steps">
                <li>
                  <span>01</span>
                  <div>
                    <strong>Person</strong>
                    <p>Understand the life situation first.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>Purpose</strong>
                    <p>Connect money to a meaningful goal.</p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <strong>Path</strong>
                    <p>Then guide with a suitable plan.</p>
                  </div>
                </li>
              </ol>
              <p className="guide-process-note">
                That is why we never begin by simply naming a fund and asking you to start.
              </p>
            </aside>

            <div className="guide-chat reveal">
              <div className="guide-chat-top">
                <span>Example conversation</span>
                <span>SIP enquiry</span>
              </div>

              <div className="guide-turn client">
                <div className="guide-avatar" aria-hidden="true">
                  C
                </div>
                <div className="guide-bubble">
                  <span className="guide-who">Client</span>
                  <p>I want to invest ₹5,000 a month. Which fund will give good returns?</p>
                </div>
              </div>

              <div className="guide-turn gsm">
                <div className="guide-avatar" aria-hidden="true">
                  G
                </div>
                <div className="guide-bubble">
                  <span className="guide-who">GSM</span>
                  <p>
                    We can guide you — but first we need to understand your need. The right investment depends on your situation, your future needs, and how long you can stay invested.
                  </p>
                </div>
              </div>

              <div className="guide-turn client">
                <div className="guide-avatar" aria-hidden="true">
                  C
                </div>
                <div className="guide-bubble">
                  <span className="guide-who">Client</span>
                  <p>I do not have a specific goal yet. I have a daughter who is 4 years old.</p>
                </div>
              </div>

              <div className="guide-turn gsm">
                <div className="guide-avatar" aria-hidden="true">
                  G
                </div>
                <div className="guide-bubble">
                  <span className="guide-who">GSM</span>
                  <p>
                    That already gives direction. Instead of a random fund, we can plan around her future — education, marriage, or broader family wealth — after understanding your comfort with market ups and downs.
                  </p>
                </div>
              </div>

              <div className="guide-close">
                <strong>Person first. Purpose next. Then a clear path.</strong>
                <p>That is how GSM guides — not by naming a fund and asking you to begin.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="who" id="who">
        <div className="si who-layout">
          <div className="who-intro">
            <div className="stag">
              <span className="stag-line" />
              <span className="stag-text">Who We Work With</span>
            </div>
            <h2 className="sh">
              Best suited for investors who value patience and long-term thinking.
            </h2>
            <p className="sdesc">
              A strong relationship works when both sides think alike. Speak with us if you are unsure — a short discussion usually makes the fit clear.
            </p>
            <a href="/#contact" className="btn-navy who-cta">
              Book a discussion
            </a>
          </div>
          <div className="who-cols">
            <div className="who-col who-yes reveal">
              <h3>A good fit if you…</h3>
              <ul>
                <li>Want guidance for years, not one transaction</li>
                <li>Connect money to real goals — education, retirement, home, wealth</li>
                <li>Prefer plain-language explanations</li>
                <li>Believe wealth is built with patience and discipline</li>
                <li>Stay calm through market ups and downs</li>
                <li>Want one trusted place for funds, insurance, and bonds</li>
              </ul>
            </div>
            <div className="who-col who-no reveal">
              <h3>Less suited if you…</h3>
              <ul>
                <li>Expect very high returns in a short time</li>
                <li>Want daily tips or market timing</li>
                <li>Switch investments frequently without a plan</li>
                <li>Judge only on cost, not ongoing guidance</li>
                <li>Decide mainly from social media or news noise</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="philosophy">
        <div className="si">
          <div className="philo-head">
            <div className="stag">
              <span className="stag-line" />
              <span className="stag-text">Our Approach</span>
            </div>
            <h2 className="sh sh-light">Six principles. No jargon.</h2>
            <p className="sdesc sdesc-light">
              The same simple approach that has guided our work for more than 23 years.
            </p>
          </div>
          <ol className="philo-list">
            <li className="reveal">
              <span>01</span>
              <div>
                <h3>Understand your life first</h3>
                <p>Income, responsibilities, goals, time horizon, and risk comfort — before any suggestion.</p>
              </div>
            </li>
            <li className="reveal">
              <span>02</span>
              <div>
                <h3>Stay disciplined in volatility</h3>
                <p>Help you stay calm and avoid emotional decisions that hurt long-term wealth.</p>
              </div>
            </li>
            <li className="reveal">
              <span>03</span>
              <div>
                <h3>Be transparent</h3>
                <p>Simple language, clear disclosure, recommendations only where suitability is real.</p>
              </div>
            </li>
            <li className="reveal">
              <span>04</span>
              <div>
                <h3>Build for the long term</h3>
                <p>Review, communicate, and stay available — guidance does not stop after the first investment.</p>
              </div>
            </li>
            <li className="reveal">
              <span>05</span>
              <div>
                <h3>Keep it practical</h3>
                <p>Planning connected to what matters to your family — not just numbers on a screen.</p>
              </div>
            </li>
            <li className="reveal">
              <span>06</span>
              <div>
                <h3>Respect your trust</h3>
                <p>Every recommendation is treated as a personal responsibility, not a transaction.</p>
              </div>
            </li>
          </ol>
          <div className="avoid-band">
            <h3>What we avoid</h3>
            <div className="avoid-items">
              <p>
                <strong>No market prediction games</strong>
                Plans are not built on guessing short-term moves.
              </p>
              <p>
                <strong>No activity for activity’s sake</strong>
                Portfolios change only when there is a clear reason.
              </p>
              <p>
                <strong>No unrealistic promises</strong>
                Results come from patience and sensible decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="si">
          <div className="services-head">
            <div className="stag">
              <span className="stag-line" />
              <span className="stag-text">Solutions</span>
            </div>
            <h2 className="sh">Practical solutions under one trusted relationship.</h2>
          </div>
          <div className="svc-index">
            <Link to="/mutual-funds" className="svc-row reveal">
              <span className="svc-idx">01</span>
              <span className="svc-name">Mutual Funds</span>
              <span className="svc-desc">Wealth creation, children’s future, retirement, and tax saving.</span>
              <span className="svc-go" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/insurance" className="svc-row reveal">
              <span className="svc-idx">02</span>
              <span className="svc-name">Insurance</span>
              <span className="svc-desc">Health, term, vehicle, home, travel, and business cover.</span>
              <span className="svc-go" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/fixed-deposits-bonds" className="svc-row reveal">
              <span className="svc-idx">03</span>
              <span className="svc-name">Fixed Deposits &amp; Bonds</span>
              <span className="svc-desc">Stability and income alongside market-linked investing.</span>
              <span className="svc-go" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/capital-gain-tax-saving" className="svc-row reveal">
              <span className="svc-idx">04</span>
              <span className="svc-name">Capital Gain Tax Saving</span>
              <span className="svc-desc">Lawful routes and practical next steps after a property sale.</span>
              <span className="svc-go" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/nri-investment-services" className="svc-row reveal">
              <span className="svc-idx">05</span>
              <span className="svc-name">NRI Investment Services</span>
              <span className="svc-desc">Onboarding, documentation, and ongoing support for India investments.</span>
              <span className="svc-go" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/aif-pms-sif" className="svc-row reveal">
              <span className="svc-idx">06</span>
              <span className="svc-name">AIF, PMS &amp; SIF</span>
              <span className="svc-desc">Specialised routes — only where suitability and clarity allow.</span>
              <span className="svc-go" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/real-estate" className="svc-row reveal">
              <span className="svc-idx">07</span>
              <span className="svc-name">Real Estate</span>
              <span className="svc-desc">Apartments and plots with focus on quality and financial fit.</span>
              <span className="svc-go" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
