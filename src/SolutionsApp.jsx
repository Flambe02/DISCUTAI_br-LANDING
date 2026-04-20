import { useEffect, useMemo, useState } from "react";
import { getSolutionBySlug, solutions } from "./solutionsData";

const LOGO = "/images/logo.webp";

function parseHash(hash) {
  const cleaned = (hash || "").replace(/^#\/?/, "");
  if (!cleaned) {
    return { page: "overview" };
  }

  const parts = cleaned.split("/").filter(Boolean);
  if (parts[0] !== "solucoes") {
    return { page: "overview" };
  }

  if (parts.length === 1) {
    return { page: "overview" };
  }

  return { page: "detail", slug: parts[1] };
}

function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = "/solucoes";
    }

    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

function Pill({ children }) {
  return <span className="solutions-pill">{children}</span>;
}

function AppStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Work+Sans:wght@400;500;600;700;800&display=swap');

      * { box-sizing: border-box; }

      html { scroll-behavior: smooth; }

      body {
        margin: 0;
        background:
          radial-gradient(circle at top left, rgba(218, 185, 159, 0.24), transparent 28%),
          radial-gradient(circle at top right, rgba(70, 111, 178, 0.08), transparent 24%),
          #fffaf7;
        color: #201816;
        font-family: "Work Sans", system-ui, sans-serif;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      button {
        font: inherit;
      }

      .solutions-app {
        min-height: 100vh;
      }

      .shell {
        max-width: 1180px;
        margin: 0 auto;
        padding: 0 24px;
      }

      .solutions-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border-radius: 999px;
        border: 1px solid rgba(111, 89, 81, 0.14);
        background: rgba(255, 246, 239, 0.88);
        color: #92553a;
        padding: 8px 14px;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .topbar {
        position: sticky;
        top: 0;
        z-index: 20;
        background: rgba(255, 250, 247, 0.86);
        backdrop-filter: blur(16px);
        border-bottom: 1px solid rgba(111, 89, 81, 0.08);
      }

      .topbar__inner {
        min-height: 76px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
      }

      .topbar__links {
        display: flex;
        gap: 24px;
        color: #6d5d57;
        font-size: 15px;
      }

      .topbar__cta,
      .primary-button,
      .secondary-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        min-height: 52px;
        padding: 0 22px;
        transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
      }

      .topbar__cta:hover,
      .primary-button:hover,
      .secondary-button:hover,
      .faq-card__button:hover,
      .solution-card:hover {
        transform: translateY(-1px);
      }

      .topbar__cta {
        background: #231714;
        color: #fffaf7;
        font-size: 14px;
        font-weight: 700;
        box-shadow: 0 14px 28px rgba(35, 23, 20, 0.14);
      }

      .hero {
        padding: 72px 0 32px;
      }

      .hero__grid,
      .detail-hero__grid,
      .catalogue-grid,
      .feature-grid,
      .steps-grid,
      .usecases-grid,
      .highlights-grid,
      .other-grid {
        display: grid;
        gap: 18px;
      }

      .hero__grid {
        grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
        align-items: center;
        gap: 36px;
      }

      .hero h1,
      .section-title,
      .detail-hero h1,
      .cta-panel h2 {
        font-family: "DM Serif Display", serif;
        font-weight: 400;
        letter-spacing: -0.03em;
      }

      .hero h1,
      .detail-hero h1 {
        margin: 18px 0 20px;
        font-size: clamp(3.1rem, 6.6vw, 5.8rem);
        line-height: 0.94;
      }

      .hero h1 em,
      .section-title em,
      .detail-hero h1 em,
      .cta-panel h2 em {
        color: var(--accent, #a45732);
        font-style: italic;
      }

      .hero-copy,
      .section-copy,
      .detail-copy,
      .card-copy,
      .cta-panel p {
        color: #5d4d48;
        line-height: 1.7;
      }

      .hero-copy,
      .detail-copy {
        font-size: 1.08rem;
        max-width: 640px;
      }

      .hero-actions,
      .detail-actions {
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
        margin: 28px 0 18px;
      }

      .primary-button {
        background: linear-gradient(135deg, var(--accent, #a45732), #251816);
        color: white;
        font-weight: 700;
        box-shadow: 0 18px 32px color-mix(in srgb, var(--accent, #a45732) 28%, transparent);
      }

      .secondary-button {
        border: 1px solid rgba(111, 89, 81, 0.16);
        background: rgba(255, 255, 255, 0.72);
        color: #231714;
        font-weight: 600;
      }

      .hero-panel,
      .solution-card,
      .feature-card,
      .integration-showcase,
      .step-card,
      .usecase-card,
      .highlight-card,
      .faq-card,
      .mini-card {
        border: 1px solid rgba(111, 89, 81, 0.1);
        background: rgba(255, 255, 255, 0.88);
        border-radius: 26px;
        box-shadow: 0 18px 34px rgba(78, 56, 49, 0.06);
      }

      .hero-panel {
        padding: 28px;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.96), rgba(249,236,228,0.94)),
          white;
      }

      .hero-panel__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 20px;
      }

      .status-chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border-radius: 999px;
        padding: 8px 12px;
        background: rgba(36, 172, 111, 0.12);
        color: #16643f;
        font-size: 13px;
        font-weight: 700;
      }

      .status-dot {
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: #16a34a;
      }

      .hero-panel__stack {
        display: grid;
        gap: 14px;
      }

      .mini-card {
        padding: 18px;
      }

      .mini-card small,
      .feature-card small,
      .integration-showcase small,
      .step-card small,
      .solution-card__category,
      .detail-stat__label {
        display: block;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 11px;
        font-weight: 800;
        color: var(--accent, #a45732);
      }

      .mini-card strong,
      .detail-stat__value {
        display: block;
        margin: 8px 0 6px;
        font-size: 1.02rem;
      }

      .section {
        padding: 84px 0;
      }

      .section--soft {
        background: rgba(255, 245, 238, 0.62);
        border-top: 1px solid rgba(111, 89, 81, 0.08);
        border-bottom: 1px solid rgba(111, 89, 81, 0.08);
      }

      .section-header {
        max-width: 720px;
        margin-bottom: 34px;
      }

      .section-title {
        margin: 16px 0 14px;
        font-size: clamp(2.1rem, 5vw, 4.3rem);
        line-height: 0.98;
      }

      .catalogue-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .solution-card {
        padding: 24px;
      }

      .solution-card__title {
        margin: 10px 0 12px;
        font-size: 1.45rem;
        line-height: 1.16;
      }

      .solution-card__list,
      .detail-list {
        display: grid;
        gap: 10px;
        margin: 18px 0 22px;
      }

      .solution-card__item,
      .detail-list__item {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        color: #433531;
        line-height: 1.55;
      }

      .solution-card__item span,
      .detail-list__item span {
        width: 24px;
        height: 24px;
        flex: 0 0 auto;
        border-radius: 999px;
        background: color-mix(in srgb, var(--accent, #a45732) 14%, white);
        color: var(--accent, #a45732);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 800;
      }

      .solution-card__link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-weight: 700;
        color: var(--accent, #a45732);
      }

      .detail-hero {
        padding: 56px 0 24px;
      }

      .detail-hero__grid {
        grid-template-columns: minmax(0, 1fr) 360px;
        align-items: start;
        gap: 28px;
      }

      .detail-stat {
        border-radius: 24px;
        padding: 22px;
        background: rgba(255,255,255,0.9);
        border: 1px solid rgba(111, 89, 81, 0.08);
        box-shadow: 0 18px 34px rgba(78, 56, 49, 0.06);
      }

      .detail-stat + .detail-stat {
        margin-top: 14px;
      }

      .detail-stat__value {
        font-size: 1.12rem;
        color: #241917;
      }

      .highlights-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .highlight-card,
      .feature-card,
      .integration-showcase,
      .step-card,
      .usecase-card {
        padding: 24px;
      }

      .highlight-card strong,
      .feature-card h3,
      .integration-showcase h3,
      .step-card h3,
      .usecase-card h3 {
        display: block;
        margin: 8px 0 10px;
        font-size: 1.25rem;
        line-height: 1.2;
      }

      .feature-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .integration-showcase {
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
        gap: 24px;
        align-items: center;
        margin-top: 24px;
        overflow: hidden;
      }

      .integration-showcase__media img {
        display: block;
        width: 100%;
        min-height: 280px;
        object-fit: cover;
        border-radius: 18px;
        border: 1px solid rgba(111, 89, 81, 0.08);
      }

      .steps-grid,
      .usecases-grid,
      .other-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .operations-grid {
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        margin-top: 24px;
      }

      .operation-item {
        border-radius: 18px;
        border: 1px solid rgba(111, 89, 81, 0.08);
        background: rgba(255,255,255,0.76);
        padding: 16px 18px;
        display: flex;
        gap: 12px;
        align-items: flex-start;
      }

      .operation-item span {
        width: 28px;
        height: 28px;
        flex: 0 0 auto;
        border-radius: 999px;
        background: color-mix(in srgb, var(--accent, #a45732) 18%, white);
        color: var(--accent, #a45732);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 800;
      }

      .faq-list {
        display: grid;
        gap: 14px;
      }

      .faq-card {
        overflow: hidden;
      }

      .faq-card__button {
        width: 100%;
        border: 0;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        padding: 22px 24px;
        cursor: pointer;
        color: #241917;
        font-weight: 700;
        text-align: left;
      }

      .faq-card__answer {
        padding: 0 24px 24px;
        color: #5d4d48;
        line-height: 1.7;
      }

      .cta-panel {
        position: relative;
        overflow: hidden;
        border-radius: 34px;
        padding: 40px;
        background: linear-gradient(135deg, #241816, color-mix(in srgb, var(--accent, #a45732) 70%, #241816));
        color: white;
        box-shadow: 0 28px 60px rgba(60, 35, 27, 0.2);
      }

      .cta-panel::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.16), transparent 24%),
          radial-gradient(circle at 80% 30%, rgba(255,255,255,0.12), transparent 20%);
        pointer-events: none;
      }

      .cta-panel h2 {
        position: relative;
        z-index: 1;
        margin: 16px 0 12px;
        font-size: clamp(2.1rem, 5vw, 4rem);
        line-height: 0.98;
      }

      .cta-panel p,
      .cta-panel .primary-button {
        position: relative;
        z-index: 1;
      }

      .cta-panel p {
        color: rgba(255,255,255,0.82);
        max-width: 720px;
        margin: 0 0 26px;
      }

      .cta-panel .primary-button {
        background: white;
        color: var(--accent, #a45732);
        box-shadow: none;
      }

      .footer {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        flex-wrap: wrap;
        padding: 28px 0 40px;
        color: #7c6a64;
        font-size: 14px;
      }

      @media (max-width: 1080px) {
        .hero__grid,
        .detail-hero__grid,
        .catalogue-grid,
        .feature-grid,
        .steps-grid,
        .usecases-grid,
        .highlights-grid,
        .other-grid,
        .operations-grid,
        .integration-showcase {
          grid-template-columns: 1fr;
        }

        .topbar__links {
          display: none;
        }
      }

      @media (max-width: 720px) {
        .shell {
          padding: 0 18px;
        }

        .hero,
        .detail-hero {
          padding-top: 46px;
        }

        .hero-panel,
        .solution-card,
        .feature-card,
        .step-card,
        .usecase-card,
        .highlight-card,
        .cta-panel {
          padding: 22px;
        }

        .hero-actions,
        .detail-actions {
          flex-direction: column;
        }

        .primary-button,
        .secondary-button,
        .topbar__cta {
          width: 100%;
        }

        .section {
          padding: 68px 0;
        }
      }
    `}</style>
  );
}

function OverviewHero() {
  return (
    <section className="hero">
      <div className="shell hero__grid" style={{ "--accent": "#a45732" }}>
        <div>
          <Pill>Catalogue de solutions</Pill>
          <h1>
            Des pages <em>verticales</em> pour chaque metier.
          </h1>
          <p className="hero-copy">
            La logique est la meme que sur une vraie page de solutions : chaque secteur
            a sa promesse, ses cas d'usage, ses objections et sa CTA. Tu peux maintenant
            naviguer entre `Coiffeur`, `Clinica / Dentista`, `Restaurante`, `Imobiliaria`,
            `Loja de Roupas`, `Psicologo` et `Escritorio Contabil`.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#/solucoes/coiffeur">
              Voir une page secteur
            </a>
            <a className="secondary-button" href="#catalogue">
              Parcourir les solutions
            </a>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel__top">
            <Pill>Structure inspiree page solutions</Pill>
            <div className="status-chip">
              <span className="status-dot" />
              7 verticales
            </div>
          </div>
          <div className="hero-panel__stack">
            <div className="mini-card">
              <small>Catalogue</small>
              <strong>Une entree claire par secteur</strong>
              <p className="card-copy">
                Chaque carte explique rapidement ce que le systeme gere et vers quelle page aller.
              </p>
            </div>
            <div className="mini-card">
              <small>Pages detail</small>
              <strong>Un template unique, un discours adapte</strong>
              <p className="card-copy">
                Hero, benefices, operations, cas d'usage, FAQ et CTA sont personnalises par metier.
              </p>
            </div>
            <div className="mini-card">
              <small>Scalabilite</small>
              <strong>Ajouter un nouveau secteur prend peu de temps</strong>
              <p className="card-copy">
                Le contenu est centralise dans une base de donnees locale, pas disperse dans plusieurs composants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionsCatalogue() {
  return (
    <section className="section" id="catalogue">
      <div className="shell">
        <div className="section-header" style={{ "--accent": "#a45732" }}>
          <Pill>Solutions</Pill>
          <h2 className="section-title">
            Une page par <em>secteur</em>.
          </h2>
          <p className="section-copy">
            Chaque page reprend la meme ossature de conversion, mais avec un message
            adapte au metier et a ses flux operationnels.
          </p>
        </div>

        <div className="catalogue-grid">
          {solutions.map((solution) => (
            <a
              key={solution.slug}
              className="solution-card"
              href={`#/solucoes/${solution.slug}`}
              style={{ "--accent": solution.accent }}
            >
              <span className="solution-card__category">{solution.category}</span>
              <h3 className="solution-card__title">{solution.name}</h3>
              <p className="card-copy">{solution.heroLead}</p>
              <div className="solution-card__list">
                {solution.heroSnapshot.map((item, index) => (
                  <div key={item} className="solution-card__item">
                    <span>{index + 1}</span>
                    <div>{item}</div>
                  </div>
                ))}
              </div>
              <span className="solution-card__link">Ouvrir la solution {"->"}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailPage({ solution }) {
  const [openFaq, setOpenFaq] = useState(0);
  const otherSolutions = useMemo(
    () => solutions.filter((item) => item.slug !== solution.slug).slice(0, 3),
    [solution.slug],
  );

  return (
    <div style={{ "--accent": solution.accent }}>
      <section className="detail-hero">
        <div className="shell detail-hero__grid">
          <div>
            <Pill>{solution.category}</Pill>
            <h1>
              {solution.heroTitle.split(solution.name)[0]}
              <em>{solution.name}</em>
              {solution.heroTitle.split(solution.name)[1] || ""}
            </h1>
            <p className="detail-copy">{solution.heroLead}</p>
            <div className="detail-actions">
              <a className="primary-button" href="#contact">
                Demander une demo
              </a>
              <a className="secondary-button" href="#/solucoes">
                Revenir aux solutions
              </a>
            </div>
            <div className="detail-list">
              {solution.heroSnapshot.map((item, index) => (
                <div key={item} className="detail-list__item">
                  <span>{index + 1}</span>
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="detail-stat">
              <span className="detail-stat__label">Ce que la page promet</span>
              <span className="detail-stat__value">Une proposition de valeur claire pour {solution.name}</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat__label">Type de demandes</span>
              <span className="detail-stat__value">{solution.operations[0]}</span>
            </div>
            <div className="detail-stat">
              <span className="detail-stat__label">Impact vise</span>
              <span className="detail-stat__value">Moins de friction, plus de qualification, plus de conversion</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="highlights-grid">
            {solution.highlights.map((item) => (
              <article key={item} className="highlight-card">
                <small>Point cle</small>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <div className="section-header">
            <Pill>Positionnement</Pill>
            <h2 className="section-title">
              Une page {solution.name} qui parle du <em>vrai travail</em>.
            </h2>
            <p className="section-copy">
              Le message n'est pas generic. Il reprend les demandes recurrentes,
              les objections et les scenarios de conversion propres au secteur.
            </p>
          </div>

          <div className="feature-grid">
            {solution.features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <small>{feature.eyebrow}</small>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>

          {solution.integrationShowcase ? (
            <article className="integration-showcase">
              <div>
                <small>{solution.integrationShowcase.eyebrow}</small>
                <h3>{solution.integrationShowcase.title}</h3>
                <p>{solution.integrationShowcase.description}</p>
              </div>
              <div className="integration-showcase__media">
                <img
                  src={solution.integrationShowcase.image}
                  alt={solution.integrationShowcase.imageAlt}
                />
              </div>
            </article>
          ) : null}

          <div className="operations-grid">
            {solution.operations.map((item, index) => (
              <div key={item} className="operation-item">
                <span>{index + 1}</span>
                <div>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="fonctionnement">
        <div className="shell">
          <div className="section-header">
            <Pill>Fonctionnement</Pill>
            <h2 className="section-title">
              Connecte, configure, <em>laisse tourner</em>.
            </h2>
            <p className="section-copy">
              La page explique un parcours court, lisible et adapte a la facon dont {solution.name.toLowerCase()} travaille.
            </p>
          </div>

          <div className="steps-grid">
            {solution.steps.map((step) => (
              <article key={step.number} className="step-card">
                <small>{step.number}</small>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft" id="cas-usage">
        <div className="shell">
          <div className="section-header">
            <Pill>Cas d'usage</Pill>
            <h2 className="section-title">
              Des scenarios concrets pour <em>{solution.name}</em>.
            </h2>
            <p className="section-copy">
              Chaque bloc aide le visiteur a se reconnaitre rapidement dans le parcours de vente.
            </p>
          </div>

          <div className="usecases-grid">
            {solution.useCases.map((item) => (
              <article key={item.title} className="usecase-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="shell">
          <div className="section-header">
            <Pill>FAQ</Pill>
            <h2 className="section-title">
              Les objections sont traitees <em>sur la page</em>.
            </h2>
            <p className="section-copy">
              La FAQ repond aux questions les plus probables avant que le lead n'aille chercher l'information ailleurs.
            </p>
          </div>

          <div className="faq-list">
            {solution.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <article key={faq.question} className="faq-card">
                  <button
                    className="faq-card__button"
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span>{faq.question}</span>
                    <span>{isOpen ? "-" : "+"}</span>
                  </button>
                  {isOpen ? <div className="faq-card__answer">{faq.answer}</div> : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <div className="section-header">
            <Pill>Autres solutions</Pill>
            <h2 className="section-title">
              Le meme systeme, <em>d'autres verticales</em>.
            </h2>
          </div>
          <div className="other-grid">
            {otherSolutions.map((item) => (
              <a
                key={item.slug}
                href={`#/solucoes/${item.slug}`}
                className="solution-card"
                style={{ "--accent": item.accent }}
              >
                <span className="solution-card__category">{item.category}</span>
                <h3 className="solution-card__title">{item.name}</h3>
                <p className="card-copy">{item.heroLead}</p>
                <span className="solution-card__link">Voir la page {"->"}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="shell">
          <div className="cta-panel">
            <Pill>CTA finale</Pill>
            <h2>
              Mettre en ligne une page <em>{solution.name}</em> qui convertit mieux.
            </h2>
            <p>
              La page est deja structuree pour expliquer le cas d'usage, qualifier le besoin,
              traiter les objections et pousser une demande de demo ou de contact.
            </p>
            <a className="primary-button" href="mailto:contacto@discutai.com.br">
              Demander la mise en ligne
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SolutionsApp() {
  const route = useHashRoute();
  const solution = route.page === "detail" ? getSolutionBySlug(route.slug) : null;

  return (
    <div className="solutions-app">
      <AppStyles />

      <nav className="topbar">
        <div className="shell topbar__inner">
          <a href="#/solucoes" aria-label="DiscutAI_BR">
            <img src={LOGO} alt="DiscutAI_BR" style={{ height: 30, filter: "brightness(0)" }} />
          </a>
          <div className="topbar__links">
            <a href="#/solucoes">Solutions</a>
            <a href="#/solucoes/coiffeur">Coiffeur</a>
            <a href="#/solucoes/clinica-dentista">Clinica / Dentista</a>
            <a href="#/solucoes/restaurante">Restaurante</a>
          </div>
          <a className="topbar__cta" href="mailto:contacto@discutai.com.br">
            Demander une demo
          </a>
        </div>
      </nav>

      {route.page === "detail" && solution ? (
        <DetailPage key={solution.slug} solution={solution} />
      ) : (
        <>
          <OverviewHero />
          <SolutionsCatalogue />
          <section className="section section--soft">
            <div className="shell">
              <div className="cta-panel" style={{ "--accent": "#a45732" }}>
                <Pill>Suite</Pill>
                <h2>
                  Ajouter d'autres verticales sur la meme <em>base</em>.
                </h2>
                <p>
                  La structure est maintenant prete pour dupliquer proprement de nouvelles solutions
                  sans recreer une page complete a chaque fois.
                </p>
                <a className="primary-button" href="#/solucoes/coiffeur">
                  Ouvrir une solution
                </a>
              </div>
            </div>
          </section>
        </>
      )}

      <footer className="shell footer">
        <img src={LOGO} alt="DiscutAI_BR" style={{ height: 28, filter: "brightness(0)" }} />
        <span>© 2026 DiscutAI_BR - Catalogue de solutions sectorielles</span>
        <span>contacto@discutai.com.br</span>
      </footer>
    </div>
  );
}
