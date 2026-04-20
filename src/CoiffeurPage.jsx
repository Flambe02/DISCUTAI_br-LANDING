import { useState } from "react";

const LOGO = "/images/logo.webp";

const highlights = [
  "Prise de rendez-vous directement dans votre Google Agenda",
  "Fonctionne pour salon fixe et prestations a domicile",
  "Vente de produits complementaires dans la conversation",
  "Atendimento general pour questions, prix et disponibilites",
];

const featureCards = [
  {
    eyebrow: "Google Agenda",
    title: "Le systeme reserve sans double saisie.",
    description:
      "Chaque rendez-vous confirme est ajoute directement a votre Google Agenda avec le bon service, le bon horaire et les details du client.",
  },
  {
    eyebrow: "Salon ou domicile",
    title: "Une seule page pour tous vos modes d'activite.",
    description:
      "Que vous receviez en salon ou que vous vous deplaciez chez la cliente, le systeme gere zones, disponibilites et consignes de reservation.",
  },
  {
    eyebrow: "Upsell",
    title: "Il propose aussi vos produits complementaires.",
    description:
      "Shampoings, soins, masques, coiffants ou kits d'entretien peuvent etre suggeres au bon moment apres la prise de rendez-vous.",
  },
  {
    eyebrow: "Atendimento general",
    title: "Il repond a toutes les demandes courantes.",
    description:
      "Horaires, tarifs, adresse, politique d'annulation, type de coiffure, disponibilite et informations pratiques sont pris en charge 24h/24.",
  },
];

const operations = [
  "Coupe femme, homme, barbe, brushing, coloration et soins",
  "Disponibilites par coiffeur, cabine ou plage horaire",
  "Prestations a domicile avec zone de deplacement",
  "Questions avant rendez-vous et suivi apres visite",
];

const steps = [
  {
    number: "01",
    title: "Connectez Google Agenda et WhatsApp",
    description:
      "Le systeme centralise vos disponibilites et repond automatiquement aux demandes entrantes.",
  },
  {
    number: "02",
    title: "Configurez services, produits et regles",
    description:
      "Vous ajoutez vos prestations, durees, prix, zones a domicile et les produits que vous voulez pousser.",
  },
  {
    number: "03",
    title: "Laissez-le gerer l'atendimento general",
    description:
      "Il confirme, replanifie, renseigne les clientes et transforme plus de conversations en rendez-vous et ventes.",
  },
];

const useCases = [
  {
    title: "Salon de coiffure fixe",
    description:
      "Ideal pour gerer plusieurs coiffeurs, les no-shows, les questions frequentes et les demandes de disponibilite sans mobiliser la reception.",
  },
  {
    title: "Coiffeur ou coiffeuse a domicile",
    description:
      "Le systeme qualifie la zone, confirme l'adresse, propose les bons creneaux et clarifie les frais de deplacement.",
  },
  {
    title: "Revente de produits",
    description:
      "Apres une coloration ou un soin, il peut suggerer les produits adaptes et preparer une commande complementaire.",
  },
];

const faqs = [
  {
    question: "Est-ce que les rendez-vous arrivent vraiment dans Google Agenda ?",
    answer:
      "Oui. La promesse de la page est claire : le systeme gere la prise de rendez-vous directement sur votre Google Agenda pour eviter la double saisie.",
  },
  {
    question: "La page convient-elle a un salon fixe et a une activite a domicile ?",
    answer:
      "Oui. Le message de la page couvre les deux cas : salon de coiffure fixe ou prestations at home, avec disponibilites et informations adaptees.",
  },
  {
    question: "Peut-on vendre des produits complementaires ?",
    answer:
      "Oui. Le systeme peut proposer des produits complementaires pendant ou apres l'echange, selon le service reserve et le besoin de la cliente.",
  },
  {
    question: "Que couvre l'atendimento general ?",
    answer:
      "Horaires, prix, types de prestations, conditions, adresse, zones desservies, preparation avant rendez-vous et reponses usuelles du salon.",
  },
];

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

export default function CoiffeurPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="coiffeur-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Work+Sans:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        body {
          margin: 0;
          background:
            radial-gradient(circle at top left, rgba(221, 181, 141, 0.20), transparent 28%),
            radial-gradient(circle at top right, rgba(124, 58, 237, 0.08), transparent 24%),
            #fffaf6;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          font: inherit;
        }

        .coiffeur-page {
          color: #221817;
          font-family: "Work Sans", system-ui, sans-serif;
          min-height: 100vh;
        }

        .page-shell {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          border: 1px solid rgba(137, 90, 68, 0.16);
          background: rgba(255, 246, 239, 0.88);
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #8f4f31;
        }

        .site-nav {
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(16px);
          background: rgba(255, 250, 246, 0.85);
          border-bottom: 1px solid rgba(137, 90, 68, 0.08);
        }

        .site-nav__inner {
          align-items: center;
          display: flex;
          gap: 24px;
          justify-content: space-between;
          min-height: 76px;
        }

        .site-nav__links {
          display: flex;
          gap: 24px;
          color: #6d5b56;
          font-size: 15px;
          font-weight: 500;
        }

        .nav-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 12px 18px;
          background: #241512;
          color: #fffaf6;
          font-size: 14px;
          font-weight: 700;
          box-shadow: 0 14px 28px rgba(36, 21, 18, 0.16);
        }

        .hero {
          padding: 72px 0 32px;
        }

        .hero__grid {
          align-items: center;
          display: grid;
          gap: 40px;
          grid-template-columns: minmax(0, 1.05fr) minmax(340px, 0.95fr);
        }

        .hero h1,
        .section-title,
        .cta-panel h2 {
          font-family: "DM Serif Display", serif;
          font-weight: 400;
          letter-spacing: -0.03em;
        }

        .hero h1 {
          font-size: clamp(3.2rem, 7vw, 5.8rem);
          line-height: 0.95;
          margin: 20px 0 24px;
        }

        .hero h1 em,
        .section-title em,
        .cta-panel h2 em {
          color: #a45732;
          font-style: italic;
        }

        .hero-copy {
          max-width: 620px;
          font-size: 1.12rem;
          line-height: 1.7;
          color: #5e4c47;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin: 30px 0 18px;
        }

        .button-primary,
        .button-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          padding: 0 24px;
          border-radius: 999px;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }

        .button-primary:hover,
        .button-secondary:hover,
        .faq-item button:hover {
          transform: translateY(-1px);
        }

        .button-primary {
          background: linear-gradient(135deg, #b6633a, #7f3b26);
          box-shadow: 0 18px 34px rgba(166, 87, 50, 0.26);
          color: white;
          font-weight: 700;
        }

        .button-secondary {
          border: 1px solid rgba(109, 91, 86, 0.18);
          background: rgba(255, 255, 255, 0.72);
          color: #241512;
          font-weight: 600;
        }

        .hero-meta {
          color: #7b6964;
          font-size: 0.95rem;
        }

        .hero-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(137, 90, 68, 0.1);
          border-radius: 32px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.94), rgba(250,236,229,0.96)),
            #fff;
          box-shadow: 0 32px 70px rgba(110, 72, 47, 0.14);
          padding: 28px;
        }

        .hero-card::before {
          content: "";
          position: absolute;
          inset: 18px;
          border-radius: 24px;
          border: 1px solid rgba(137, 90, 68, 0.07);
          pointer-events: none;
        }

        .hero-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 22px;
        }

        .status-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: #f7e6da;
          color: #83472b;
          font-size: 13px;
          font-weight: 700;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #1f9d67;
          box-shadow: 0 0 0 6px rgba(31, 157, 103, 0.12);
        }

        .chat-stack,
        .agenda-stack {
          display: grid;
          gap: 14px;
        }

        .bubble,
        .agenda-card,
        .feature-card,
        .mini-panel,
        .step-card,
        .use-case-card,
        .faq-item {
          border: 1px solid rgba(137, 90, 68, 0.1);
          background: rgba(255, 255, 255, 0.88);
          border-radius: 24px;
          box-shadow: 0 18px 34px rgba(92, 60, 49, 0.06);
        }

        .bubble {
          padding: 16px 18px;
        }

        .bubble--accent {
          background: linear-gradient(135deg, #2e1d1a, #573026);
          color: white;
        }

        .bubble small,
        .agenda-card small,
        .feature-card__eyebrow,
        .step-card__number {
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 11px;
          font-weight: 800;
        }

        .bubble strong,
        .agenda-card strong {
          display: block;
          margin: 7px 0 4px;
          font-size: 1rem;
        }

        .bubble p,
        .agenda-card p,
        .feature-card p,
        .step-card p,
        .use-case-card p,
        .faq-answer,
        .section-copy {
          margin: 0;
          color: #61504b;
          line-height: 1.65;
        }

        .bubble--accent p {
          color: rgba(255, 255, 255, 0.82);
        }

        .hero-card__columns {
          display: grid;
          gap: 14px;
          grid-template-columns: 1.1fr 0.9fr;
        }

        .agenda-card {
          padding: 18px;
        }

        .agenda-card strong {
          color: #221817;
        }

        .agenda-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(137, 90, 68, 0.1);
          font-size: 14px;
          color: #3f302c;
        }

        .highlights {
          padding: 26px 0 12px;
        }

        .highlight-grid,
        .feature-grid,
        .steps-grid,
        .use-cases-grid {
          display: grid;
          gap: 18px;
        }

        .highlight-grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .mini-panel {
          padding: 18px 20px;
          min-height: 100%;
        }

        .mini-panel strong {
          display: block;
          font-size: 1.05rem;
          margin-bottom: 8px;
        }

        .section {
          padding: 88px 0;
        }

        .section--soft {
          background: rgba(255, 246, 239, 0.6);
          border-top: 1px solid rgba(137, 90, 68, 0.08);
          border-bottom: 1px solid rgba(137, 90, 68, 0.08);
        }

        .section-header {
          max-width: 720px;
          margin-bottom: 36px;
        }

        .section-title {
          font-size: clamp(2.2rem, 5vw, 4.4rem);
          line-height: 0.98;
          margin: 18px 0 14px;
        }

        .feature-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .feature-card,
        .step-card,
        .use-case-card {
          padding: 28px;
        }

        .feature-card__eyebrow,
        .step-card__number {
          color: #a45732;
          margin-bottom: 14px;
        }

        .feature-card h3,
        .step-card h3,
        .use-case-card h3 {
          margin: 0 0 12px;
          font-size: 1.35rem;
          line-height: 1.2;
        }

        .operations-grid {
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          margin-top: 28px;
        }

        .operation-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 16px 18px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(137, 90, 68, 0.08);
        }

        .operation-item span {
          width: 28px;
          height: 28px;
          flex: 0 0 auto;
          border-radius: 999px;
          background: #f3d8c7;
          color: #8a4b2e;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }

        .steps-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .use-cases-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .faq-list {
          display: grid;
          gap: 14px;
        }

        .faq-item {
          overflow: hidden;
        }

        .faq-item button {
          width: 100%;
          border: 0;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          text-align: left;
          padding: 22px 24px;
          cursor: pointer;
          color: #221817;
          font-weight: 700;
        }

        .faq-answer {
          padding: 0 24px 24px;
        }

        .cta-panel {
          position: relative;
          overflow: hidden;
          border-radius: 36px;
          padding: 42px;
          background: linear-gradient(135deg, #2d1915, #6a3725 68%, #a85733);
          color: white;
          box-shadow: 0 30px 70px rgba(73, 36, 24, 0.24);
        }

        .cta-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.16), transparent 24%),
            radial-gradient(circle at 80% 30%, rgba(255,255,255,0.10), transparent 22%);
          pointer-events: none;
        }

        .cta-panel h2 {
          position: relative;
          z-index: 1;
          margin: 18px 0 12px;
          font-size: clamp(2.2rem, 5vw, 4.2rem);
          line-height: 0.98;
        }

        .cta-panel p {
          position: relative;
          z-index: 1;
          max-width: 720px;
          color: rgba(255,255,255,0.82);
          line-height: 1.7;
          margin: 0 0 28px;
        }

        .cta-panel .button-primary {
          position: relative;
          z-index: 1;
          background: white;
          color: #7e3d28;
          box-shadow: none;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
          padding: 28px 0 40px;
          color: #7b6964;
          font-size: 14px;
        }

        @media (max-width: 1080px) {
          .hero__grid,
          .feature-grid,
          .steps-grid,
          .use-cases-grid,
          .highlight-grid,
          .hero-card__columns,
          .operations-grid {
            grid-template-columns: 1fr;
          }

          .site-nav__links {
            display: none;
          }
        }

        @media (max-width: 720px) {
          .hero {
            padding-top: 48px;
          }

          .page-shell {
            padding: 0 18px;
          }

          .hero-card,
          .feature-card,
          .step-card,
          .use-case-card,
          .cta-panel {
            padding: 22px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .button-primary,
          .button-secondary,
          .nav-cta {
            width: 100%;
          }

          .site-nav__inner {
            min-height: 68px;
          }

          .section {
            padding: 68px 0;
          }
        }
      `}</style>

      <nav className="site-nav">
        <div className="page-shell site-nav__inner">
          <a href="#top" aria-label="DiscutAI_BR">
            <img src={LOGO} alt="DiscutAI_BR" style={{ height: 30, filter: "brightness(0)" }} />
          </a>
          <div className="site-nav__links">
            <a href="#fonctionnement">Fonctionnement</a>
            <a href="#cas-usage">Cas d'usage</a>
            <a href="#faq">FAQ</a>
          </div>
          <a className="nav-cta" href="#contact">
            Demander une demo
          </a>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="page-shell hero__grid">
            <div>
              <Pill>Page sectorielle - Coiffeur</Pill>
              <h1>
                La page <em>Coiffeur</em> qui remplace
                <br />
                Salon de beaute.
              </h1>
              <p className="hero-copy">
                Le systeme gere la prise de rendez-vous directement sur votre Google Agenda.
                Il fonctionne pour un salon de coiffure fixe ou at home, gere aussi la vente
                de produits complementaires et tout l&apos;atendimento general de votre activite.
              </p>
              <div className="hero-actions">
                <a className="button-primary" href="#contact">
                  Voir une demo pour coiffeur
                </a>
                <a className="button-secondary" href="#fonctionnement">
                  Comprendre le fonctionnement
                </a>
              </div>
              <p className="hero-meta">
                Reponses automatiques, agenda synchronise, upsell produit et suivi client dans une seule experience.
              </p>
            </div>

            <div className="hero-card" aria-label="Apercu du systeme coiffeur">
              <div className="hero-card__top">
                <Pill>WhatsApp + Google Agenda</Pill>
                <div className="status-chip">
                  <span className="status-dot" />
                  Systeme actif
                </div>
              </div>

              <div className="hero-card__columns">
                <div className="chat-stack">
                  <div className="bubble">
                    <small>Cliente</small>
                    <strong>Bonjour, vous avez une place demain pour couleur + brushing ?</strong>
                    <p>Je peux venir au salon ou demander un rendez-vous a domicile.</p>
                  </div>
                  <div className="bubble bubble--accent">
                    <small>Assistant Coiffeur</small>
                    <strong>Oui, 14h30 au salon ou 16h30 a domicile.</strong>
                    <p>
                      Je bloque le rendez-vous dans Google Agenda et je peux aussi vous
                      conseiller le soin post-coloration adapte.
                    </p>
                  </div>
                </div>

                <div className="agenda-stack">
                  <div className="agenda-card">
                    <small>Google Agenda</small>
                    <strong>Couleur + brushing confirme</strong>
                    <p>Vendredi - 14h30 - Salon centre ville</p>
                    <div className="agenda-row">
                      <span>Duree</span>
                      <strong>1h30</strong>
                    </div>
                    <div className="agenda-row">
                      <span>Produit suggere</span>
                      <strong>Masque protecteur</strong>
                    </div>
                  </div>

                  <div className="agenda-card">
                    <small>Atendimento general</small>
                    <strong>Questions gerees automatiquement</strong>
                    <p>Tarifs, horaires, politique d'annulation, adresse, zone domicile.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="highlights">
          <div className="page-shell highlight-grid">
            {highlights.map((item) => (
              <div key={item} className="mini-panel">
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="page-shell">
            <div className="section-header">
              <Pill>Pourquoi cette page convertit mieux</Pill>
              <h2 className="section-title">
                Une promesse claire pour les <em>coiffeurs</em>.
              </h2>
              <p className="section-copy">
                Au lieu d'une page trop large "Salon de beaute", cette version parle
                directement au metier, aux objections et aux flux operationnels d'un salon de coiffure.
              </p>
            </div>

            <div className="feature-grid">
              {featureCards.map((card) => (
                <article key={card.title} className="feature-card">
                  <span className="feature-card__eyebrow">{card.eyebrow}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </article>
              ))}
            </div>

            <div className="operations-grid">
              {operations.map((item, index) => (
                <div key={item} className="operation-item">
                  <span>{index + 1}</span>
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--soft" id="fonctionnement">
          <div className="page-shell">
            <div className="section-header">
              <Pill>Fonctionnement</Pill>
              <h2 className="section-title">
                Connecte, configure, <em>laisse tourner</em>.
              </h2>
              <p className="section-copy">
                La page explique un parcours simple, sans jargon, avec une CTA unique.
                C'est plus lisible pour des visites issues du paid, du social ou du bouche-a-oreille.
              </p>
            </div>

            <div className="steps-grid">
              {steps.map((step) => (
                <article key={step.number} className="step-card">
                  <span className="step-card__number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="cas-usage">
          <div className="page-shell">
            <div className="section-header">
              <Pill>Cas d'usage</Pill>
              <h2 className="section-title">
                Concu pour le <em>salon fixe</em>, le domicile et l'upsell.
              </h2>
              <p className="section-copy">
                Chaque bloc repond a un cas d'activite concret, ce qui aide le visiteur a se projeter rapidement.
              </p>
            </div>

            <div className="use-cases-grid">
              {useCases.map((item) => (
                <article key={item.title} className="use-case-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--soft" id="faq">
          <div className="page-shell">
            <div className="section-header">
              <Pill>FAQ</Pill>
              <h2 className="section-title">
                Les objections sont traitees <em>sur la page</em>.
              </h2>
              <p className="section-copy">
                La FAQ reprend exactement les points que vous vouliez faire passer :
                Google Agenda, salon fixe ou at home, produits complementaires et atendimento general.
              </p>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <article key={faq.question} className="faq-item">
                    <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)}>
                      <span>{faq.question}</span>
                      <span>{isOpen ? "-" : "+"}</span>
                    </button>
                    {isOpen ? <div className="faq-answer">{faq.answer}</div> : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="page-shell">
            <div className="cta-panel">
              <Pill>CTA finale</Pill>
              <h2>
                Remplacez <em>Salon de beaute</em> par une page Coiffeur qui vend.
              </h2>
              <p>
                Message central : le systeme gere la prise de rendez-vous directement sur votre Google Agenda,
                fonctionne pour un salon fixe ou a domicile, gere la vente de produits complementaires
                et prend en charge l'atendimento general du salon.
              </p>
              <a className="button-primary" href="mailto:contacto@discutai.com.br">
                Demander la mise en ligne
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="page-shell footer">
        <img src={LOGO} alt="DiscutAI_BR" style={{ height: 28, filter: "brightness(0)" }} />
        <span>© 2026 DiscutAI_BR - Landing verticale pour coiffeurs</span>
        <span>contacto@discutai.com.br</span>
      </footer>
    </div>
  );
}
