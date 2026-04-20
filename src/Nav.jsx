import { useState, useEffect } from "react";
const SECTOR_LINKS = [
  { label: "Cabeleireiro",        href: "#/solucoes/cabeleireiro" },
  { label: "Restaurante",         href: "#/solucoes/restaurante" },
  { label: "Imobili\u00e1ria",        href: "#/solucoes/imobiliaria" },
  { label: "Cl\u00ednica / Dentista",  href: "#/solucoes/clinica-dentista" },
  { label: "Escrit\u00f3rio Cont\u00e1bil", href: "#/solucoes/escritorio-contabil" },
  { label: "Outros setores \u2192",   href: "#/solucoes/outros", highlight: true },
];

const NAV_LINKS = [
  { label: "Produto",  href: "#produto" },
  { label: "Pre\u00e7os",   href: "#precos" },
  { label: "FAQ",      href: "#faq" },
];

const S = `
  .nav-root {
    position: sticky; top: 0; z-index: 200;
    background: rgba(10,10,20,.97);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(255,255,255,.08);
    height: 68px;
  }
  .nav-inner {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 clamp(20px,4vw,48px);
    height: 100%;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-brand {
    display: inline-flex;
    align-items: center;
    flex: 0 0 auto;
    text-decoration: none;
  }
  .nav-brand__wordmark {
    font-family: "Manrope", system-ui, sans-serif;
    font-size: 23px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.055em;
    color: #FFFFFF;
    display: inline-flex;
    align-items: baseline;
    white-space: nowrap;
  }
  .nav-brand__accent {
    color: #7C7BFF;
  }
  .nav-links {
    display: flex; gap: 26px; align-items: center;
  }
  .nav-link {
    font-size: 15px; color: rgba(255,255,255,.6); font-weight: 500;
    text-decoration: none; transition: color .15s; font-family: inherit;
  }
  .nav-link:hover { color: #FFFFFF; }
  .nav-link--active { color: #7C7BFF; font-weight: 600; }
  .nav-dd { position: relative; }
  .nav-dd__trigger {
    font-size: 15px; color: rgba(255,255,255,.6); font-weight: 500;
    text-decoration: none; cursor: pointer; font-family: inherit;
    transition: color .15s;
  }
  .nav-dd:hover .nav-dd__trigger { color: #FFFFFF; }
  .nav-dd__menu {
    display: none;
    position: absolute; top: 100%; left: 50%;
    transform: translateX(-50%);
    padding-top: 12px;
    min-width: 210px; z-index: 300;
  }
  .nav-dd:hover .nav-dd__menu { display: flex; flex-direction: column; }
  .nav-dd__menu__inner {
    background: #1A1A2E; border: 1px solid rgba(255,255,255,.1);
    border-radius: 14px; padding: 8px;
    box-shadow: 0 12px 40px rgba(0,0,0,.4);
    display: flex; flex-direction: column;
  }
  .nav-dd__menu a {
    padding: 10px 14px; border-radius: 8px;
    font-size: 14px; font-weight: 500; color: rgba(255,255,255,.75);
    text-decoration: none; transition: background .12s;
  }
  .nav-dd__menu a:hover { background: rgba(255,255,255,.08); color: #FFFFFF; }
  .nav-dd__menu a.nav-dd__highlight { color: #7C7BFF; font-weight: 700; border-top: 1px solid rgba(255,255,255,.08); margin-top: 4px; padding-top: 14px; }
  .nav-cta-wrap { display: flex; gap: 10px; align-items: center; }
  .nav-btn-ghost {
    padding: 10px 18px; border-radius: 12px;
    border: 1px solid rgba(255,255,255,.2); background: transparent;
    font-size: 14px; font-weight: 600; color: #FFFFFF;
    cursor: pointer; font-family: inherit;
    transition: background .15s; text-decoration: none;
    display: inline-flex; align-items: center;
  }
  .nav-btn-ghost:hover { background: rgba(255,255,255,.1); }
  .nav-btn-cta {
    padding: 11px 20px; border-radius: 12px;
    background: #6D5FFF; color: white; border: none;
    font-size: 14px; font-weight: 700;
    box-shadow: 0 10px 26px rgba(109,95,255,.34);
    cursor: pointer; font-family: inherit; text-decoration: none;
    display: inline-flex; align-items: center;
    transition: transform .18s, box-shadow .18s;
    animation: navPulse 2.2s ease-in-out infinite;
    white-space: nowrap;
  }
  .nav-btn-cta:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(109,95,255,.42); }
  @keyframes navPulse {
    0%, 100% { transform: scale(1); box-shadow: 0 10px 26px rgba(109,95,255,.34); }
    50% { transform: scale(1.02); box-shadow: 0 14px 32px rgba(109,95,255,.42); }
  }

  /* ── Hamburger ── */
  .nav-burger {
    display: none;
    flex-direction: column; justify-content: center; align-items: center;
    gap: 5px; width: 40px; height: 40px;
    border: none; background: transparent; cursor: pointer;
    padding: 4px; border-radius: 10px;
    transition: background .15s;
  }
  .nav-burger:hover { background: rgba(255,255,255,.1); }
  .nav-burger span {
    display: block; width: 22px; height: 2px;
    background: rgba(255,255,255,.8); border-radius: 2px;
    transition: transform .22s, opacity .22s;
    transform-origin: center;
  }
  .nav-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ── Mobile drawer ── */
  .nav-drawer {
    position: fixed; top: 68px; left: 0; right: 0;
    z-index: 199;
    background: #0A0A14;
    border-bottom: 1px solid rgba(255,255,255,.08);
    box-shadow: 0 20px 50px rgba(0,0,0,.4);
    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition: transform .24s cubic-bezier(.4,0,.2,1), opacity .2s;
    max-height: calc(100vh - 68px);
    overflow-y: auto;
  }
  .nav-drawer.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  .nav-drawer__inner {
    padding: 20px 24px 28px;
    display: flex; flex-direction: column; gap: 6px;
  }
  .nav-drawer__link {
    display: flex; align-items: center;
    padding: 13px 16px; border-radius: 12px;
    font-size: 16px; font-weight: 600; color: rgba(255,255,255,.85);
    text-decoration: none; transition: background .12s;
  }
  .nav-drawer__link:hover, .nav-drawer__link:active { background: rgba(255,255,255,.08); }
  .nav-drawer__sep {
    height: 1px; background: rgba(255,255,255,.08); margin: 8px 0;
  }
  .nav-drawer__section-label {
    font-size: 11px; font-weight: 700; color: rgba(255,255,255,.35);
    letter-spacing: .07em; text-transform: uppercase;
    padding: 8px 16px 4px;
  }
  .nav-drawer__sector-link {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 16px; border-radius: 10px;
    font-size: 15px; font-weight: 500; color: rgba(255,255,255,.65);
    text-decoration: none; transition: background .12s;
  }
  .nav-drawer__sector-link:hover { background: rgba(255,255,255,.08); color: #FFFFFF; }
  .nav-drawer__cta-row {
    display: flex; flex-direction: column; gap: 10px;
    margin-top: 16px;
  }
  .nav-drawer__btn-ghost {
    display: flex; align-items: center; justify-content: center;
    padding: 14px; border-radius: 12px;
    border: 1.5px solid rgba(255,255,255,.2); background: transparent;
    font-size: 15px; font-weight: 600; color: #FFFFFF;
    text-decoration: none; font-family: inherit;
  }
  .nav-drawer__btn-cta {
    display: flex; align-items: center; justify-content: center;
    padding: 15px; border-radius: 12px;
    background: #6D5FFF; color: white; border: none;
    font-size: 15px; font-weight: 700;
    box-shadow: 0 8px 24px rgba(109,95,255,.34);
    text-decoration: none; font-family: inherit;
  }

  /* ── Overlay ── */
  .nav-overlay {
    display: none;
    position: fixed; inset: 0; z-index: 198;
    background: rgba(10,10,20,.35);
    backdrop-filter: blur(2px);
  }
  .nav-overlay.open { display: block; }

  @media(max-width:900px) {
    .nav-links { display: none !important; }
    .nav-btn-ghost { display: none; }
    .nav-btn-cta { display: none; }
    .nav-burger { display: flex; }
  }
`;

export default function Nav({ activePage }) {
  const [open, setOpen] = useState(false);

  // Close drawer on hash change (navigation)
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <style>{S}</style>

      {/* Overlay */}
      <div className={`nav-overlay${open ? " open" : ""}`} onClick={close} />

      <nav className="nav-root">
        <div className="nav-inner">
          <a href="#" aria-label="DiscutAI_BR" className="nav-brand" onClick={close}>
            <span className="nav-brand__wordmark">
              Discut<span className="nav-brand__accent">AI</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="nav-links">
            {NAV_LINKS.map(n => (
              <a key={n.label} href={n.href} className="nav-link">{n.label}</a>
            ))}
            <div className="nav-dd">
              <a href="#/solucoes" className="nav-dd__trigger">Soluções ▾</a>
              <div className="nav-dd__menu">
                <div className="nav-dd__menu__inner">
                  {SECTOR_LINKS.map(s => (
                    <a key={s.href} href={s.href} className={s.highlight ? "nav-dd__highlight" : ""}>{s.label}</a>
                  ))}
                </div>
              </div>
            </div>
            <a
              href="#/quem-somos"
              className={`nav-link${activePage === "quemsomos" ? " nav-link--active" : ""}`}
            >
              Quem Somos
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="nav-cta-wrap">
            <a className="nav-btn-ghost" href="https://v2.discutai.com/" target="_blank" rel="noopener noreferrer">Entrar</a>
            <a href="https://wa.me/5511919493562?text=Ol%C3%A1%2C%20quero%20testar%20gr%C3%A1tis%20o%20DiscutAI_BR%20por%207%20dias%21" className="nav-btn-cta" target="_blank" rel="noopener noreferrer">Testar Gratis Agora (7 dias)</a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`nav-burger${open ? " open" : ""}`}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="nav-drawer__inner">
          {/* Main nav links */}
          {NAV_LINKS.map(n => (
            <a key={n.label} href={n.href} className="nav-drawer__link" onClick={close}>
              {n.label}
            </a>
          ))}
          <a href="#/quem-somos" className="nav-drawer__link" onClick={close}>Quem Somos</a>

          <div className="nav-drawer__sep" />

          {/* Solutions sector links */}
          <div className="nav-drawer__section-label">Soluções por setor</div>
          <a href="#/solucoes" className="nav-drawer__link" style={{ color: "#6D5FFF" }} onClick={close}>
            Ver todos os setores →
          </a>
          {SECTOR_LINKS.filter(s => !s.highlight).map(s => (
            <a key={s.href} href={s.href} className="nav-drawer__sector-link" onClick={close}>
              {s.label}
            </a>
          ))}
          <a href="#/solucoes/outros" className="nav-drawer__sector-link" style={{ color: "#6D5FFF", fontWeight: 700 }} onClick={close}>
            Outros setores →
          </a>

          <div className="nav-drawer__sep" />

          {/* CTA buttons */}
          <div className="nav-drawer__cta-row">
            <a className="nav-drawer__btn-ghost" href="https://v2.discutai.com/" target="_blank" rel="noopener noreferrer" onClick={close}>
              Entrar na plataforma
            </a>
            <a
              className="nav-drawer__btn-cta"
              href="https://wa.me/5511919493562?text=Ol%C3%A1%2C%20quero%20testar%20gr%C3%A1tis%20o%20DiscutAI_BR%20por%207%20dias%21"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
            >
              Testar Grátis Agora — 7 dias
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
