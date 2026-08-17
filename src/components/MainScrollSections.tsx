import { Link } from 'react-router-dom';

export function MainScrollSections() {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-orb" />
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="eyebrow-line" />
              <span className="eyebrow-text">Trusted by families since 2001</span>
            </div>
            <h1>
              Helping families build wealth with clarity,
              <br />
              <em>discipline,</em> and trust.
            </h1>
            <p className="hero-desc">
              For more than 25 years, GSM Investment Services has helped families invest with purpose, protect their future, and move towards their financial goals with confidence.
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
                <div className="hstat-n count-anim" data-target="25">
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
                <div className="amfi-t2">ARN 359899 · Serving investors since May 2001</div>
              </div>
            </div>
            <div className="hero-quote">
              &quot;We believe money is not just about returns. It is about goals, responsibilities, and peace of mind.&quot;
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="si">
          <div className="about-head">
            <div className="stag">
              <span className="stag-line" />
              <span className="stag-text">About GSM</span>
            </div>
            <h2 className="sh">A trusted financial services firm built on clarity, trust, and long-term relationships.</h2>
            <p className="sdesc">
              Led by Mr. Ganesan Muralidharan, GSM Investment Services helps families make better financial decisions with honesty, clarity, and long-term guidance they can truly rely on.
            </p>
          </div>
          <div className="about-layout">
            <div className="about-summary reveal">
              <h3>Why families connect with GSM</h3>
              <p>
                Financial decisions become easier when they are explained clearly, connected to real life needs, and supported by a team that stays with the client for the long term.
              </p>
              <div className="about-summary-list">
                <div className="about-summary-item">
                  <span>•</span>
                  <div>Clear explanations without unnecessary jargon or pressure.</div>
                </div>
                <div className="about-summary-item">
                  <span>•</span>
                  <div>Guidance that looks at the family&apos;s goals, responsibilities, and comfort with risk.</div>
                </div>
                <div className="about-summary-item">
                  <span>•</span>
                  <div>A relationship-first approach built on trust, consistency, and practical support.</div>
                </div>
              </div>
              <div className="about-mini-stats">
                <div className="about-mini-stat">
                  <strong>600+</strong>
                  <span>Families served with long-term care</span>
                </div>
              </div>
            </div>
            <div className="about-points">
              <div className="pillar reveal">
                <div className="p-icon" aria-hidden="true">
                  🎯
                </div>
                <div>
                  <div className="p-title">What many families are really looking for</div>
                  <div className="p-desc">
                    Most families do not want complicated financial language, random product suggestions, or constant confusion about what to do next. They want someone who can understand their situation properly, explain things clearly, and guide them in a way that feels practical, trustworthy, and connected to their real life goals.
                  </div>
                </div>
              </div>
              <div className="pillar reveal">
                <div className="p-icon" aria-hidden="true">
                  🌱
                </div>
                <div>
                  <div className="p-title">What GSM aims to do</div>
                  <div className="p-desc">
                    At GSM, our role is to make financial decisions simpler and more meaningful for families. We take time to understand your needs, your responsibilities, your future goals, and your comfort with risk. Then we guide you with suitable solutions, clear communication, and a long-term approach built around trust, not pressure.
                  </div>
                </div>
              </div>
              <div className="pillar reveal">
                <div className="p-icon" aria-hidden="true">
                  🤝
                </div>
                <div>
                  <div className="p-title">What you can expect from us</div>
                  <div className="p-desc">
                    You can expect honest conversations, simple explanations, responsible guidance, and support that continues beyond one investment. Our focus is to help families stay organised, disciplined, and confident in their financial journey over the long term.
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  <p>
                    Hello GSM, I want to invest ₹50,000 per month in mutual funds. Which fund will give me good
                    returns?
                  </p>
                </div>
              </div>

              <div className="guide-turn gsm">
                <div className="guide-avatar" aria-hidden="true">
                  G
                </div>
                <div className="guide-bubble">
                  <span className="guide-who">GSM</span>
                  <p>
                    We can guide you. But before suggesting a fund, we first need to understand your goal,
                    investment period, and comfort with risk.
                  </p>
                </div>
              </div>

              <div className="guide-turn gsm">
                <div className="guide-avatar" aria-hidden="true">
                  G
                </div>
                <div className="guide-bubble">
                  <span className="guide-who">GSM</span>
                  <p>Do you have any specific goal in mind for this investment?</p>
                </div>
              </div>

              <div className="guide-turn client">
                <div className="guide-avatar" aria-hidden="true">
                  C
                </div>
                <div className="guide-bubble">
                  <span className="guide-who">Client</span>
                  <p>Not exactly. But I have a four-year-old daughter.</p>
                </div>
              </div>

              <div className="guide-turn gsm">
                <div className="guide-avatar" aria-hidden="true">
                  G
                </div>
                <div className="guide-bubble">
                  <span className="guide-who">GSM</span>
                  <p>
                    That gives us direction. We can plan the investment around her future needs, such as
                    education, marriage, or a broader family wealth goal.
                  </p>
                </div>
              </div>

              <div className="guide-turn gsm">
                <div className="guide-avatar" aria-hidden="true">
                  G
                </div>
                <div className="guide-bubble">
                  <span className="guide-who">GSM</span>
                  <p>
                    Before suggesting a fund, we would also understand how much you can invest comfortably,
                    how long you can remain invested, your existing investments, and how comfortable you are
                    with market ups and downs.
                  </p>
                </div>
              </div>

              <div className="guide-turn client">
                <div className="guide-avatar" aria-hidden="true">
                  C
                </div>
                <div className="guide-bubble">
                  <span className="guide-who">Client</span>
                  <p>That makes sense. I thought I only had to choose a fund and start investing.</p>
                </div>
              </div>

              <div className="guide-turn gsm">
                <div className="guide-avatar" aria-hidden="true">
                  G
                </div>
                <div className="guide-bubble">
                  <span className="guide-who">GSM</span>
                  <p>
                    That is where many people get confused. At GSM, we first understand your situation,
                    connect the investment to a meaningful goal, and then guide you with a suitable plan.
                  </p>
                </div>
              </div>

              <div className="guide-close">
                <strong>Person first. Purpose next. Then a clear path.</strong>
                <p>That is how GSM guides, without simply naming a fund and asking you to begin.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="who" id="who">
        <div className="si">
          <div className="who-head">
            <div className="stag">
              <span className="stag-line" />
              <span className="stag-text">Who We Work Best With</span>
            </div>
            <h2 className="sh">
              We work best with investors who value discipline, patience, and long-term thinking.
            </h2>
            <p className="sdesc">
              A strong financial relationship works well when both sides think alike. Here is the kind of
              investor who usually benefits most from our approach.
            </p>
          </div>

          <div className="who-grid">
            <div className="who-card who-card-yes reveal">
              <div className="who-header">
                <div className="who-badge who-badge-yes" aria-hidden="true">
                  ✓
                </div>
                <div className="who-title">We may be the right fit for you if...</div>
              </div>
              <ul className="who-list who-list-yes">
                <li>
                  You are looking for someone who can guide you for many years, not just help you do one
                  investment and disappear.
                </li>
                <li>
                  You want your investments to be connected to real life goals like children&apos;s education,
                  retirement, buying a home, or building long-term wealth.
                </li>
                <li>
                  You prefer simple explanations in plain language, so you clearly understand where your
                  money is going and why.
                </li>
                <li>
                  You know that wealth is usually built slowly through patience, discipline, and regular
                  investing, not through shortcuts.
                </li>
                <li>
                  You are ready to stay calm during market ups and downs instead of reacting to every piece
                  of news.
                </li>
                <li>
                  You want one trusted place for mutual funds, insurance, bonds, and overall financial
                  guidance.
                </li>
                <li>
                  You value honesty, personal attention, and a relationship where you can comfortably ask
                  doubts at any time.
                </li>
                <li>
                  You are a working professional, business owner, retiree, homemaker, NRI, or student
                  looking for clear financial guidance.
                </li>
              </ul>
            </div>

            <div className="who-card who-card-no reveal">
              <div className="who-header">
                <div className="who-badge who-badge-no" aria-hidden="true">
                  ✕
                </div>
                <div className="who-title">Our approach may not suit you if...</div>
              </div>
              <ul className="who-list who-list-no">
                <li>You expect very high returns in a very short time.</li>
                <li>You are mainly looking for quick ideas, market tips, or daily buy-and-sell guidance.</li>
                <li>
                  You want someone to predict every market movement or tell you exactly when the market will
                  go up or down.
                </li>
                <li>You keep changing investments frequently without a proper reason or long-term plan.</li>
                <li>
                  You only compare based on cost and do not see value in guidance, discipline, and ongoing
                  support.
                </li>
                <li>You are not comfortable giving your investments enough time to grow.</li>
                <li>
                  You want excitement and constant action, even when staying patient may be the better
                  decision.
                </li>
                <li>
                  You prefer to make decisions mainly based on social media, friends, news noise, or
                  short-term market talk.
                </li>
              </ul>
            </div>
          </div>

          <div className="who-bottom reveal">
            <div>
              <div className="who-bottom-title">Not sure whether our approach suits you?</div>
              <div className="who-bottom-text">
                You can speak with us for a brief introductory discussion and understand how we work. Then
                you can decide whether this relationship is right for you.
              </div>
            </div>
            <div className="who-bottom-btn">
              <a href="/#contact" className="btn-gold">
                Book a Discussion →
              </a>
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
              The same simple approach that has guided our work for more than 25 years.
            </p>
          </div>
          <ol className="philo-list">
            <li className="reveal">
              <span>01</span>
              <div>
                <h3>Understand your life first</h3>
                <p>Income, responsibilities, goals, time horizon, and risk comfort before any suggestion.</p>
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
                <p>Review, communicate, and stay available. Guidance does not stop after the first investment.</p>
              </div>
            </li>
            <li className="reveal">
              <span>05</span>
              <div>
                <h3>Keep it practical</h3>
                <p>Planning connected to what matters to your family, not just numbers on a screen.</p>
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
              <span className="svc-desc">
                Goal-based investing for wealth creation, children’s future, retirement, and tax saving.
              </span>
              <span className="svc-go" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/insurance" className="svc-row reveal">
              <span className="svc-idx">02</span>
              <span className="svc-name">Insurance</span>
              <span className="svc-desc">
                Protection solutions for health, life, vehicle, home, travel, and business needs.
              </span>
              <span className="svc-go" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/fixed-deposits-bonds" className="svc-row reveal">
              <span className="svc-idx">03</span>
              <span className="svc-name">Fixed Deposits &amp; Bonds</span>
              <span className="svc-desc">
                Options focused on stability, regular income, and better portfolio balance.
              </span>
              <span className="svc-go" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/capital-gain-tax-saving" className="svc-row reveal">
              <span className="svc-idx">04</span>
              <span className="svc-name">Capital Gain Tax Saving</span>
              <span className="svc-desc">
                Guidance on eligible tax-saving options and practical steps after a property sale.
              </span>
              <span className="svc-go" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/nri-investment-services" className="svc-row reveal">
              <span className="svc-idx">05</span>
              <span className="svc-name">NRI Investment Services</span>
              <span className="svc-desc">
                Support with onboarding, documentation, and managing investments in India.
              </span>
              <span className="svc-go" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/aif-pms-sif" className="svc-row reveal">
              <span className="svc-idx">06</span>
              <span className="svc-name">AIF, PMS &amp; SIF</span>
              <span className="svc-desc">
                Specialised investment solutions based on suitability, financial needs, and risk profile.
              </span>
              <span className="svc-go" aria-hidden="true">
                →
              </span>
            </Link>
            <Link to="/real-estate" className="svc-row reveal">
              <span className="svc-idx">07</span>
              <span className="svc-name">Real Estate</span>
              <span className="svc-desc">
                Support for selected apartments and plots, with a focus on quality and financial suitability.
              </span>
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
