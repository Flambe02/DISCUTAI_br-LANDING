const LOGO = "/images/logo.webp";

const SECTOR_LINKS = [
  { label: "Cabeleireiro",     href: "#/solucoes/cabeleireiro" },
  { label: "Restaurante",      href: "#/solucoes/restaurante" },
  { label: "Imobiliária",      href: "#/solucoes/imobiliaria" },
  { label: "Clínica / Dentista", href: "#/solucoes/clinica-dentista" },
  { label: "E-commerce",       href: "#/solucoes/ecommerce" },
];

const NAV_LINKS = [
  { label: "Produto",        href: "#produto" },
  { label: "Colaboradores",  href: "#colaboradores" },
  { label: "Preços",         href: "#precos" },
];

const S = `
  .nav-root {
    position: sticky; top: 0; z-index: 200;
    background: rgba(255,255,255,.94);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid #EAECF4;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 68px;
  }
  .nav-links {
    display: flex; gap: 32px; align-items: center;
  }
  .nav-link {
    font-size: 15px; color: #6B7280; font-weight: 500;
    text-decoration: none; transition: color .15s; font-family: inherit;
  }
  .nav-link:hover { color: #0A0A14; }
  .nav-link--active { color: #4F46E5; font-weight: 600; }
  .nav-dd { position: relative; }
  .nav-dd__trigger {
    font-size: 15px; color: #6B7280; font-weight: 500;
    text-decoration: none; cursor: pointer; font-family: inherit;
    transition: color .15s;
  }
  .nav-dd:hover .nav-dd__trigger { color: #0A0A14; }
  .nav-dd__menu {
    display: none;
    position: absolute; top: 100%; left: 50%;
    transform: translateX(-50%);
    padding-top: 12px;
    min-width: 210px; z-index: 300;
  }
  .nav-dd:hover .nav-dd__menu { display: flex; flex-direction: column; }
  .nav-dd__menu__inner {
    background: white; border: 1px solid #EAECF4;
    border-radius: 14px; padding: 8px;
    box-shadow: 0 12px 40px rgba(0,0,0,.12);
    display: flex; flex-direction: column;
  }
  .nav-dd__menu a {
    padding: 10px 14px; border-radius: 8px;
    font-size: 14px; font-weight: 500; color: #374151;
    text-decoration: none; transition: background .12s;
  }
  .nav-dd__menu a:hover { background: #F5F5FA; color: #0A0A14; }
  .nav-cta-wrap { display: flex; gap: 10px; align-items: center; }
  .nav-btn-ghost {
    padding: 10px 20px; border-radius: 10px;
    border: 1px solid #E5E7EB; background: white;
    font-size: 14px; font-weight: 600; color: #374151;
    cursor: pointer; font-family: inherit;
    transition: background .15s;
  }
  .nav-btn-ghost:hover { background: #F5F5FA; }
  .nav-btn-cta {
    padding: 10px 22px; border-radius: 10px;
    background: #4F46E5; color: white; border: none;
    font-size: 14px; font-weight: 700;
    box-shadow: 0 4px 16px rgba(79,70,229,.28);
    cursor: pointer; font-family: inherit; text-decoration: none;
    display: inline-flex; align-items: center;
    transition: transform .18s, box-shadow .18s;
  }
  .nav-btn-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(79,70,229,.38); }
  @media(max-width:900px) { .nav-links { display: none !important; } .nav-btn-ghost { display: none; } }
`;

export default function Nav({ activePage }) {
  const hash = typeof window !== "undefined" ? window.location.hash : "";

  return (
    <>
      <style>{S}</style>
      <nav className="nav-root">
        <a href="#" aria-label="DiscutAI_BR">
          <img src={LOGO} alt="DiscutAI_BR" style={{ height: 32, filter: "none", display: "block" }} />
        </a>

        <div className="nav-links">
          {NAV_LINKS.map(n => (
            <a key={n.label} href={n.href} className="nav-link">{n.label}</a>
          ))}

          <div className="nav-dd">
            <a href="#/solucoes" className="nav-dd__trigger">Soluções ▾</a>
            <div className="nav-dd__menu">
              <div className="nav-dd__menu__inner">
                {SECTOR_LINKS.map(s => (
                  <a key={s.href} href={s.href}>{s.label}</a>
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

        <div className="nav-cta-wrap">
          <button className="nav-btn-ghost">Entrar</button>
          <a href="https://wa.me/5511976458933?text=Ol%C3%A1%2C%20quero%20testar%20o%20DiscutAI_BR%21" className="nav-btn-cta" target="_blank" rel="noopener noreferrer">Testar grátis →</a>
        </div>
      </nav>
    </>
  );
}
