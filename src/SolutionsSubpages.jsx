import { useEffect, useMemo, useState } from "react";
import { getSolutionBySlug, solutions } from "./solutionsDataPt";
import Nav from "./Nav";
import { assetUrl } from "./assetUrl";

const LOGO = assetUrl("images/logo.webp");

const TOOLS = {
  whatsapp: {
    label: "WhatsApp",
    color: "#25D366",
    bg: "#F0FDF4",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366" style={{ flexShrink: 0 }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.355A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
      </svg>
    ),
  },
  pix: {
    label: "Pix",
    color: "#32BCAD",
    bg: "#F0FDFB",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <path d="M6.5 6.5L10 10l-3.5 3.5L3 10zM10 3l3.5 3.5L10 10 6.5 6.5zM13.5 6.5L17 10l-3.5 3.5L10 10zM10 10l3.5 3.5L10 17l-3.5-3.5zM13.5 13.5L17 10l3.5 3.5L17 17z" stroke="#32BCAD" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M10 10l3.5-3.5 3.5 3.5-3.5 3.5z" fill="#32BCAD"/>
      </svg>
    ),
  },
  "google-agenda": {
    label: "Google Agenda",
    color: "#4285F4",
    bg: "#EFF6FF",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <rect x="3" y="4" width="18" height="17" rx="2" fill="white" stroke="#4285F4" strokeWidth="1.5"/>
        <path d="M3 9h18" stroke="#4285F4" strokeWidth="1.5"/>
        <line x1="8" y1="2" x2="8" y2="6" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="2" x2="16" y2="6" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="6.5" y="12" width="3" height="3" rx="0.5" fill="#EA4335"/>
        <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#34A853"/>
        <rect x="14.5" y="12" width="3" height="3" rx="0.5" fill="#FBBC05"/>
        <rect x="6.5" y="16" width="3" height="2" rx="0.5" fill="#4285F4"/>
      </svg>
    ),
  },
  instagram: {
    label: "Instagram",
    color: "#E1306C",
    bg: "#FFF0F5",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4.5" stroke="#E1306C" strokeWidth="1.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="#E1306C"/>
      </svg>
    ),
  },
};

function parseHash(hash) {
  const cleaned = (hash || "").replace(/^#\/?/, "");
  const parts = cleaned.split("/").filter(Boolean);

  if (parts[0] !== "solucoes") {
    return { page: "catalogo" };
  }

  if (parts.length === 1) {
    return { page: "catalogo" };
  }

  return { page: "detalhe", slug: parts[1] };
}

function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
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

function Styles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Work+Sans:wght@400;500;600;700;800&display=swap');

      * { box-sizing: border-box; }

      body {
        margin: 0;
        background:
          radial-gradient(circle at top left, rgba(218, 185, 159, 0.24), transparent 28%),
          radial-gradient(circle at top right, rgba(70, 111, 178, 0.08), transparent 24%),
          #fffaf7;
        color: #201816;
        font-family: "Work Sans", system-ui, sans-serif;
      }

      a { color: inherit; text-decoration: none; }
      button { font: inherit; }

      .solutions-app { min-height: 100vh; }
      .shell { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

      .solutions-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border-radius: 999px;
        border: 1px solid rgba(111, 89, 81, 0.14);
        background: rgba(255, 246, 239, 0.88);
        color: var(--accent, #92553a);
        padding: 8px 14px;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
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
        transition: transform 0.18s ease, box-shadow 0.18s ease;
      }

      .topbar__cta:hover,
      .primary-button:hover,
      .secondary-button:hover,
      .solution-card:hover,
      .faq-card__button:hover {
        transform: translateY(-1px);
      }

      .topbar__cta {
        background: #231714;
        color: #fffaf7;
        font-size: 14px;
        font-weight: 700;
        box-shadow: 0 14px 28px rgba(35, 23, 20, 0.14);
      }

      .hero,
      .detail-hero { padding: 64px 0 24px; }

      .hero__grid,
      .catalogo-grid,
      .feature-grid,
      .steps-grid,
      .usecases-grid,
      .highlights-grid,
      .other-grid,
      .detail-hero__grid {
        display: grid;
        gap: 18px;
      }

      .hero__grid { grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr); align-items: center; }
      .detail-hero__grid { grid-template-columns: minmax(0, 1fr) 360px; align-items: start; gap: 28px; }

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
        font-size: clamp(3rem, 6.3vw, 5.7rem);
        line-height: 0.95;
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
      .detail-copy { font-size: 1.08rem; max-width: 640px; }

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
      .stat-card {
        border: 1px solid rgba(111, 89, 81, 0.1);
        background: rgba(255, 255, 255, 0.88);
        border-radius: 26px;
        box-shadow: 0 18px 34px rgba(78, 56, 49, 0.06);
      }

      .hero-panel,
      .solution-card,
      .feature-card,
      .integration-showcase,
      .step-card,
      .usecase-card,
      .highlight-card,
      .stat-card { padding: 24px; }

      .hero-panel { background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(249,236,228,0.94)), white; }

      .hero-panel__stack,
      .faq-list,
      .detail-list,
      .solution-card__list { display: grid; gap: 14px; }

      .section { padding: 84px 0; }
      .section--soft {
        background: rgba(255, 245, 238, 0.62);
        border-top: 1px solid rgba(111, 89, 81, 0.08);
        border-bottom: 1px solid rgba(111, 89, 81, 0.08);
      }

      .section-header { max-width: 720px; margin-bottom: 34px; }
      .section-title { margin: 16px 0 14px; font-size: clamp(2.1rem, 5vw, 4.3rem); line-height: 0.98; }

      .catalogo-grid,
      .steps-grid,
      .usecases-grid,
      .other-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }

      .feature-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .highlights-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }

      .integration-showcase {
        display: grid;
        grid-template-columns: minmax(0, 0.92fr) minmax(380px, 1.08fr);
        gap: 26px;
        align-items: stretch;
        margin-top: 24px;
      }

      .integration-showcase__copy {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .solution-card__category,
      .feature-card small,
      .integration-showcase small,
      .step-card small,
      .stat-card small {
        display: block;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 11px;
        font-weight: 800;
        color: var(--accent, #a45732);
      }

      .solution-card__title,
      .feature-card h3,
      .integration-showcase h3,
      .step-card h3,
      .usecase-card h3,
      .highlight-card strong {
        margin: 10px 0 12px;
        display: block;
        font-size: 1.3rem;
        line-height: 1.2;
      }

      .integration-showcase__media img {
        display: block;
        width: 100%;
        height: auto;
        object-fit: contain;
        object-position: center top;
        border-radius: 14px;
        border: 1px solid rgba(111, 89, 81, 0.12);
        box-shadow: 0 18px 36px rgba(36, 24, 22, 0.12);
        background: white;
      }

      .integration-showcase__media {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 420px;
        padding: 18px;
        border-radius: 24px;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,240,234,0.92)),
          white;
        border: 1px solid rgba(111, 89, 81, 0.08);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.8);
      }

      .solution-card__item,
      .detail-list__item,
      .operation-item {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        color: #433531;
        line-height: 1.55;
      }

      .solution-card__item span,
      .detail-list__item span,
      .operation-item span {
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

      .solution-card__link { display: inline-flex; gap: 8px; font-weight: 700; color: var(--accent, #a45732); }

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
      }

      .faq-card { overflow: hidden; }
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

      .faq-card__answer { padding: 0 24px 24px; color: #5d4d48; line-height: 1.7; }

      .cta-panel {
        position: relative;
        overflow: hidden;
        border-radius: 34px;
        padding: 40px;
        background: linear-gradient(135deg, #241816, color-mix(in srgb, var(--accent, #a45732) 70%, #241816));
        color: white;
        box-shadow: 0 28px 60px rgba(60, 35, 27, 0.2);
      }

      .cta-panel p { color: rgba(255,255,255,0.82); max-width: 720px; margin: 0 0 26px; }
      .cta-panel .primary-button { background: white; color: var(--accent, #a45732); box-shadow: none; }

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
        .catalogo-grid,
        .feature-grid,
        .integration-showcase,
        .steps-grid,
        .usecases-grid,
        .highlights-grid,
        .other-grid,
        .operations-grid { grid-template-columns: 1fr; }

      }

      @media (max-width: 720px) {
        .shell { padding: 0 18px; }
        .hero, .detail-hero { padding-top: 46px; }
        .hero-actions, .detail-actions { flex-direction: column; }
        .primary-button, .secondary-button, .topbar__cta { width: 100%; }
        .section { padding: 68px 0; }
      }
    `}</style>
  );
}

function Catalogo() {
  return (
    <>
      <section className="hero" style={{ "--accent": "#a45732" }}>
        <div className="shell hero__grid">
          <div>
            <Pill>Soluções por Setor</Pill>
            <h1>
              IA especializada em <em>cada tipo de negócio</em>.
            </h1>
            <p className="hero-copy">
              Colaboradores virtuais que conhecem a operação do seu setor — disponíveis no WhatsApp, Instagram, Messenger ou no seu site. Escolha o seu segmento abaixo.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#catalogo">
                Ver todos os setores
              </a>
              <a className="secondary-button" href="#">
                Voltar para o início
              </a>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-panel__stack">
              <div className="stat-card">
                <small>Disponibilidade</small>
                <strong>Atende 24h, 7 dias por semana</strong>
                <p className="card-copy">Seu colaborador nunca cansa, nunca falta e responde em segundos no WhatsApp.</p>
              </div>
              <div className="stat-card">
                <small>Canais</small>
                <strong>WhatsApp · Instagram · Messenger · Site</strong>
                <p className="card-copy">Atende onde seus clientes já estão. Setup em 5 minutos, sem código, sem técnico.</p>
              </div>
              <div className="stat-card">
                <small>Setores</small>
                <strong>7 segmentos já cobertos</strong>
                <p className="card-copy">Beleza, saúde, alimentação, imóveis, varejo, terapia e contabilidade — e crescendo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="catalogo">
        <div className="shell">
          <div className="section-header" style={{ "--accent": "#a45732" }}>
            <Pill>Catálogo</Pill>
            <h2 className="section-title">
              Escolha o colaborador do <em>seu setor</em>.
            </h2>
            <p className="section-copy">
              Cada solução fala a linguagem operacional do mercado atendido — com casos de uso, benefícios e CTAs específicos para o seu negócio.
            </p>
          </div>

          <div className="catalogo-grid">
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
                <span className="solution-card__link">Ver solução →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Detalhe({ solution }) {
  const [openFaq, setOpenFaq] = useState(0);
  const related = useMemo(
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
              <a className="primary-button" href="https://wa.me/5511919493562?text=Ol%C3%A1%2C%20quero%20testar%20o%20DiscutAI_BR%21" target="_blank" rel="noopener noreferrer">
                Testar grátis 7 dias →
              </a>
              <a className="secondary-button" href="#/solucoes">
                Voltar para soluções
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
            <div className="stat-card">
              <small>Benefício principal</small>
              <strong>{solution.keyBenefit}</strong>
              <p className="card-copy">{solution.keyBenefitDetail}</p>
            </div>
            <div className="stat-card" style={{ marginTop: 14 }}>
              <small>O que o colaborador faz</small>
              <strong>{solution.operations[0]}</strong>
              <p className="card-copy">E muito mais — veja todos os fluxos cobertos abaixo.</p>
            </div>
            <div className="stat-card" style={{ marginTop: 14 }}>
              <small>Canais</small>
              <strong>WhatsApp · Instagram · Messenger · Site</strong>
              <p className="card-copy">Atende nos canais que seus clientes já usam. Setup em 5 minutos, sem código.</p>
            </div>
          </div>
        </div>
      </section>

      {/* === CABELEIREIRO — visual showcase === */}
      {solution.slug === "cabeleireiro" && (
        <section className="section section--soft">
          <div className="shell">
            <div className="section-header">
              <Pill>Veja na prática</Pill>
              <h2 className="section-title">
                Agenda e WhatsApp<br /><em>trabalhando juntos.</em>
              </h2>
              <p className="section-copy">
                Seu colaborador agenda no WhatsApp, confirma automaticamente e sincroniza tudo com o Google Agenda — sem você tocar em nada.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>

              {/* Calendar block */}
              <div>
                <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 18px 48px rgba(78,56,49,0.14)", background: "#fff", lineHeight: 0 }}>
                  <img
                    src={assetUrl("images/calendar.png")}
                    alt="Agenda Google com agendamentos do salão"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20, padding: "16px 20px", background: "rgba(255,255,255,0.9)", borderRadius: 16, border: "1px solid rgba(111,89,81,0.1)", boxShadow: "0 4px 16px rgba(78,56,49,0.06)" }}>
                  <img
                    src={assetUrl("images/Calendar google logo.jpg")}
                    alt="Google Calendar"
                    style={{ width: 40, height: 40, objectFit: "contain", borderRadius: 8, flexShrink: 0 }}
                  />
                  <div>
                    <strong style={{ fontSize: 14, color: "#241816", display: "block", marginBottom: 2 }}>Google Agenda integrado</strong>
                    <p style={{ fontSize: 13, color: "#5d4d48", margin: 0, lineHeight: 1.5 }}>Cada agendamento feito no WhatsApp aparece automaticamente no seu calendário.</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp chat block */}
              <div>
                <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 18px 48px rgba(78,56,49,0.14)", background: "#fff", lineHeight: 0 }}>
                  <img
                    src={assetUrl("images/ECran message intern.jpeg")}
                    alt="Exemplo de conversa no WhatsApp com o colaborador virtual"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20, padding: "16px 20px", background: "rgba(255,255,255,0.9)", borderRadius: 16, border: "1px solid rgba(111,89,81,0.1)", boxShadow: "0 4px 16px rgba(78,56,49,0.06)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.355A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
                  </div>
                  <div>
                    <strong style={{ fontSize: 14, color: "#241816", display: "block", marginBottom: 2 }}>Conversa real no WhatsApp</strong>
                    <p style={{ fontSize: 13, color: "#5d4d48", margin: 0, lineHeight: 1.5 }}>O colaborador agenda, confirma, cobra via Pix e responde dúvidas — tudo em uma só conversa.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="shell">
          <div className="highlights-grid">
            {solution.highlights.map((item) => (
              <article key={item} className="highlight-card">
                <small>{solution.category}</small>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <div className="section-header">
            <Pill>Benefícios</Pill>
            <h2 className="section-title">
              Funcionalidades pensadas para <em>{solution.name}</em>.
            </h2>
            <p className="section-copy">
              Não é um chatbot genérico. É um colaborador que conhece a operação do seu setor, fala a linguagem dos seus clientes e resolve os problemas certos.
            </p>
          </div>

          <div className="feature-grid">
            {solution.features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <small>{feature.eyebrow}</small>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                {feature.tools && feature.tools.length > 0 && (
                  <div style={{ display: "flex", gap: 6, marginTop: 16, flexWrap: "wrap" }}>
                    {feature.tools.map(toolKey => {
                      const tool = TOOLS[toolKey];
                      if (!tool) return null;
                      return (
                        <span key={toolKey} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: tool.bg, color: tool.color, borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 700, border: `1px solid ${tool.color}33` }}>
                          {tool.icon} {tool.label}
                        </span>
                      );
                    })}
                  </div>
                )}
              </article>
            ))}
          </div>

          {solution.integrationShowcase && (
            <article className="integration-showcase">
              <div className="integration-showcase__copy">
                <small>{solution.integrationShowcase.eyebrow}</small>
                <h3>{solution.integrationShowcase.title}</h3>
                <p className="card-copy">{solution.integrationShowcase.description}</p>
              </div>
              <div className="integration-showcase__media">
                <img
                  src={assetUrl(solution.integrationShowcase.image)}
                  alt={solution.integrationShowcase.imageAlt}
                />
              </div>
            </article>
          )}

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

      <section className="section">
        <div className="shell">
          <div className="section-header">
            <Pill>Como funciona</Pill>
            <h2 className="section-title">
              Configura uma vez e <em>deixa rodar</em>.
            </h2>
            <p className="section-copy">
              Setup simples, sem código, sem técnico. Em minutos, seu colaborador já está atendendo no WhatsApp e gerando resultados.
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

      <section className="section section--soft">
        <div className="shell">
          <div className="section-header">
            <Pill>Casos de uso</Pill>
            <h2 className="section-title">
              Quem usa o colaborador de <em>{solution.name}</em>?
            </h2>
            <p className="section-copy">
              Se você se reconhece em um desses cenários, seu colaborador virtual já está pronto para ajudar — hoje.
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

      <section className="section">
        <div className="shell">
          <div className="section-header">
            <Pill>Perguntas frequentes</Pill>
            <h2 className="section-title">
              Dúvidas sobre <em>{solution.name}?</em>
            </h2>
            <p className="section-copy">
              Respondemos as perguntas mais comuns antes de você precisar perguntar.
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
            <Pill>Outros setores</Pill>
            <h2 className="section-title">
              Colaboradores prontos para <em>outros negócios</em>.
            </h2>
          </div>

          <div className="other-grid">
            {related.map((item) => (
              <a
                key={item.slug}
                href={`#/solucoes/${item.slug}`}
                className="solution-card"
                style={{ "--accent": item.accent }}
              >
                <span className="solution-card__category">{item.category}</span>
                <h3 className="solution-card__title">{item.name}</h3>
                <p className="card-copy">{item.heroLead}</p>
                <span className="solution-card__link">Ver solução →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="shell">
          <div className="cta-panel">
            <Pill>Comece agora</Pill>
            <h2>
              Ative o colaborador virtual para <em>{solution.name}</em>.
            </h2>
            <p>
              Setup em 5 minutos. Sem cartão de crédito. Sem técnico. Conecte o WhatsApp, configure seu setor e comece a atender hoje.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a className="primary-button" href="https://wa.me/5511919493562?text=Ol%C3%A1%2C%20quero%20testar%20o%20DiscutAI_BR%21" target="_blank" rel="noopener noreferrer">
                Testar grátis 7 dias →
              </a>
              <a className="secondary-button" href="#/solucoes" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "white" }}>
                Ver outros setores
              </a>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginTop: 18, marginBottom: 0 }}>
              ✓ Sem cartão de crédito &nbsp;·&nbsp; ✓ Cancele quando quiser &nbsp;·&nbsp; ✓ Dados no Brasil
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const OUTROS_SECTORS = [
  { emoji: "🛍️", name: "E-commerce",           category: "Varejo Digital",    desc: "Responde pedidos, rastreia entregas e cuida do pós-venda automaticamente — sem equipe extra." },
  { emoji: "🏥", name: "Clínica Médica",        category: "Saúde",             desc: "Triagem, agendamentos e orientações de preparo respondidos 24h — liberando a recepção para o essencial." },
  { emoji: "🐾", name: "Pet Shop / Veterinário", category: "Pet",               desc: "Agenda banho, tosa e consultas, responde sobre vacinas e informa disponibilidade em tempo real." },
  { emoji: "💪", name: "Academia / Fitness",    category: "Bem-estar",         desc: "Matrículas, planos, aulas experimentais e dúvidas sobre treinos resolvidos no WhatsApp." },
  { emoji: "📚", name: "Escola / Curso",        category: "Educação",          desc: "Captação de alunos, rematrícula, dúvidas sobre grade e documentação — tudo automático." },
  { emoji: "🏨", name: "Hotel / Pousada",       category: "Hospitalidade",     desc: "Disponibilidade, reservas, check-in e perguntas sobre acomodações respondidas na hora." },
  { emoji: "💊", name: "Farmácia",              category: "Saúde",             desc: "Consulta de estoque, preço de medicamentos e orientações básicas — atendimento ágil sem fila." },
  { emoji: "⚖️", name: "Escritório de Advocacia", category: "Jurídico",        desc: "Triagem de casos, agendamento de consultas e orientações iniciais — com discrição e clareza." },
  { emoji: "🔧", name: "Mecânica / Auto Peças", category: "Automotivo",        desc: "Orçamentos, status do serviço e agenda de revisões gerenciados sem interromper a oficina." },
  { emoji: "🥖", name: "Padaria / Confeitaria", category: "Alimentação",       desc: "Encomendas, cardápio do dia, horários de retirada e promoções respondidas automaticamente." },
  { emoji: "💅", name: "Spa / Estética",        category: "Beleza",            desc: "Agenda de procedimentos, pacotes e dúvidas sobre tratamentos organizados sem esforço." },
  { emoji: "💰", name: "Assessor Financeiro",   category: "Finanças",          desc: "Qualificação de leads, briefing inicial e agendamento de reuniões — pipeline sempre ativo." },
  { emoji: "📷", name: "Fotógrafo / Videomaker", category: "Criativo",         desc: "Briefing, orçamentos e agenda de sessões captados automaticamente via WhatsApp." },
  { emoji: "🍺", name: "Bar / Pub / Delivery",  category: "Alimentação",       desc: "Cardápio, pedidos, delivery e reservas gerenciados sem acumular mensagens na equipe." },
  { emoji: "🧹", name: "Limpeza / Serviços",    category: "Serviços",          desc: "Agenda de visitas, orçamentos e confirmações de serviço — sem depender do celular do proprietário." },
  { emoji: "🎓", name: "Coaching / Mentoria",   category: "Desenvolvimento",   desc: "Primeiro contato, triagem de fit e agenda de sessões tratados com leveza e profissionalismo." },
];

function Outros() {
  return (
    <div style={{ "--accent": "#6D5FFF" }}>
      {/* Hero */}
      <section className="detail-hero">
        <div className="shell">
          <Pill>Outros Setores</Pill>
          <h1 style={{ fontFamily: '"DM Serif Display", serif', fontWeight: 400, fontSize: "clamp(2.6rem,5.5vw,5rem)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: "18px 0 20px", color: "#201816" }}>
            Seu negócio é <em style={{ color: "#6D5FFF", fontStyle: "italic" }}>diferente?</em><br />A IA se adapta.
          </h1>
          <p style={{ fontSize: "1.08rem", color: "#5d4d48", lineHeight: 1.7, maxWidth: 640, marginBottom: 32 }}>
            Além dos 7 setores com páginas dedicadas, o DiscutAI_BR atende qualquer tipo de negócio que receba mensagens de clientes. Abaixo, alguns exemplos — mas a lista é praticamente infinita.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a className="primary-button" href="https://wa.me/5511919493562?text=Ol%C3%A1%2C%20quero%20saber%20se%20o%20DiscutAI_BR%20funciona%20para%20o%20meu%20tipo%20de%20neg%C3%B3cio%21" target="_blank" rel="noopener noreferrer" style={{ background: "linear-gradient(135deg,#6D5FFF,#4F46E5)", boxShadow: "0 18px 32px rgba(109,95,255,0.28)" }}>
              Funciona para o meu negócio? →
            </a>
            <a className="secondary-button" href="#/solucoes">
              Ver setores com página dedicada
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: "rgba(255,245,238,0.62)", borderTop: "1px solid rgba(111,89,81,0.08)", borderBottom: "1px solid rgba(111,89,81,0.08)", padding: "20px 0" }}>
        <div className="shell" style={{ display: "flex", gap: "16px 40px", flexWrap: "wrap", alignItems: "center" }}>
          {[
            { v: "24h", l: "atendimento sem parar" },
            { v: "5 min", l: "para configurar" },
            { v: "10s", l: "tempo de resposta" },
            { v: "Qualquer", l: "setor, qualquer canal" },
          ].map(s => (
            <div key={s.l} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: "#6D5FFF" }}>{s.v}</span>
              <span style={{ fontSize: 13, color: "#6B7280", fontWeight: 600 }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sectors grid */}
      <section className="section">
        <div className="shell">
          <div className="section-header" style={{ "--accent": "#6D5FFF" }}>
            <Pill>Exemplos de setores</Pill>
            <h2 className="section-title" style={{ color: "#201816" }}>
              Onde o colaborador virtual <em>já funciona</em>.
            </h2>
            <p className="section-copy">
              Se o seu negócio recebe mensagens de clientes, o colaborador pode atendê-las. Veja alguns casos de uso concretos abaixo.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
            {OUTROS_SECTORS.map(s => (
              <div key={s.name} className="solution-card" style={{ "--accent": "#6D5FFF", cursor: "default" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                    {s.emoji}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: "#9CA3AF", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 2 }}>{s.category}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#201816", margin: 0, lineHeight: 1.2 }}>{s.name}</h3>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "#5d4d48", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it adapts */}
      <section className="section section--soft">
        <div className="shell">
          <div className="section-header" style={{ "--accent": "#6D5FFF" }}>
            <Pill>Como funciona</Pill>
            <h2 className="section-title" style={{ color: "#201816" }}>
              O colaborador aprende <em>o seu negócio</em>.
            </h2>
            <p className="section-copy">
              Não importa o setor: você ensina os seus serviços, preços, horários e regras — o colaborador responde como se conhecesse sua operação de cor.
            </p>
          </div>

          <div className="feature-grid">
            {[
              { icon: "📄", title: "Suba seus documentos", desc: "Cardápio, tabela de preços, FAQ, regras de atendimento — o colaborador absorve tudo em minutos." },
              { icon: "🔗", title: "Conecte seus canais", desc: "WhatsApp, Instagram, Messenger ou site. Sem código, sem técnico, sem complicação." },
              { icon: "🤖", title: "Configure o tom da marca", desc: "Formal, descontraído, técnico — você define a personalidade do atendimento." },
              { icon: "🔄", title: "Evolui com o negócio", desc: "Novos produtos, mudança de horário, promoção especial — atualiza em minutos, sem reconstruir do zero." },
            ].map(f => (
              <div key={f.title} className="feature-card" style={{ "--accent": "#6D5FFF" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{f.icon}</div>
                <small>{f.title}</small>
                <h3>{f.title}</h3>
                <p className="card-copy">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Setores com página dedicada */}
      <section className="section">
        <div className="shell">
          <div className="section-header" style={{ "--accent": "#6D5FFF" }}>
            <Pill>Páginas dedicadas</Pill>
            <h2 className="section-title" style={{ color: "#201816" }}>
              Setores com solução <em>detalhada</em>.
            </h2>
            <p className="section-copy">
              Para estes 7 setores, temos páginas completas com casos de uso, funcionalidades e integrações específicas.
            </p>
          </div>
          <div className="other-grid">
            {solutions.map(s => (
              <a key={s.slug} href={`#/solucoes/${s.slug}`} className="solution-card" style={{ "--accent": s.accent }}>
                <span className="solution-card__category">{s.category}</span>
                <h3 className="solution-card__title">{s.name}</h3>
                <p className="card-copy">{s.heroLead}</p>
                <span className="solution-card__link">Ver solução →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--soft">
        <div className="shell">
          <div className="cta-panel" style={{ "--accent": "#6D5FFF" }}>
            <Pill>Comece agora</Pill>
            <h2>
              Não viu seu setor? <em>Fale com a gente.</em>
            </h2>
            <p>
              Descrevemos em 5 minutos como o colaborador funcionaria no seu contexto específico — sem compromisso, sem enrolação.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a className="primary-button" href="https://wa.me/5511919493562?text=Ol%C3%A1%2C%20quero%20saber%20se%20o%20DiscutAI_BR%20funciona%20para%20o%20meu%20tipo%20de%20neg%C3%B3cio%21" target="_blank" rel="noopener noreferrer">
                Falar com a equipe →
              </a>
              <a className="secondary-button" href="#/solucoes" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "white" }}>
                Ver setores com página dedicada
              </a>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginTop: 18, marginBottom: 0 }}>
              ✓ Resposta em minutos &nbsp;·&nbsp; ✓ Sem compromisso &nbsp;·&nbsp; ✓ Demo gratuita
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SolutionsSubpages() {
  const route = useHashRoute();
  const solution = route.page === "detalhe" && route.slug !== "outros" ? getSolutionBySlug(route.slug) : null;

  return (
    <div className="solutions-app">
      <Styles />

      <Nav />

      {route.page === "detalhe" && route.slug === "outros"
        ? <Outros />
        : route.page === "detalhe" && solution
          ? <Detalhe key={solution.slug} solution={solution} />
          : <Catalogo />
      }

      <footer className="shell footer">
        <img src={LOGO} alt="DiscutAI_BR" style={{ height: 28, filter: "none" }} />
        <span>© 2026 DiscutAI_BR — Colaboradores virtuais para PMEs brasileiras</span>
        <span>contacto@discutai.com.br</span>
      </footer>
    </div>
  );
}
