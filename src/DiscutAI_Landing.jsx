import { useEffect, useState } from "react";
import Nav from "./Nav";
import { assetUrl } from "./assetUrl";

const VIDEO_EMBED_URL = "https://www.youtube.com/embed/oVdsVNZMF-I?autoplay=1&rel=0";

const IMGS = {
  LOGO: assetUrl("images/logo inverse.png"),
  HERO: assetUrl("images/hero.webp"),
  POS: assetUrl("images/pos.webp"),
  LEARN: assetUrl("images/2 characters whatsapp.jpeg"),
  BADGE: assetUrl("images/2 badges - unsurautre.png"),
};

function Pill({ children, style = {} }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 16px", borderRadius: 99, background: "#EEF2FF", color: "#4F46E5", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", ...style }}>
      {children}
    </span>
  );
}

const JOBS = [
  { name: "Ana", emoji: "💇‍♀️", role: "Recepcionista", sector: "Cabeleireiro", tasks: "Agenda serviços, confirma horários e organiza pagamentos via Pix.", accent: "#6D5FFF", bg: "#EEF2FF", slug: "cabeleireiro" },
  { name: "Lucas", emoji: "🦷", role: "Assistente", sector: "Clínica / Dentista", tasks: "Filtra pacientes, orienta e reduz ligações repetitivas.", accent: "#14B8A6", bg: "#CCFBF1", slug: "clinica-dentista" },
  { name: "Carla", emoji: "🍽", role: "Atendente", sector: "Restaurante", tasks: "Responde cardápio, reservas e pedidos sem fila de espera.", accent: "#F59E0B", bg: "#FEF3C7", slug: "restaurante" },
  { name: "Rafael", emoji: "🏠", role: "Consultor", sector: "Imobiliária", tasks: "Qualifica leads, agenda visitas e acelera o corretor.", accent: "#F43F5E", bg: "#FFE4E6", slug: "imobiliaria" },
  { name: "Bianca", emoji: "👔", role: "Vendedora", sector: "Loja de Roupas", tasks: "Mostra catálogo, promoções e responde dúvidas de compra.", accent: "#6D5FFF", bg: "#EEF2FF", slug: "loja-de-roupas" },
  { name: "Paula", emoji: "🏥", role: "Triagem", sector: "Clínica Médica", tasks: "Organiza agendamentos e orienta pacientes com clareza.", accent: "#14B8A6", bg: "#CCFBF1" },
  { name: "Eduardo", emoji: "💰", role: "Assistente", sector: "Assessor Financeiro", tasks: "Qualifica interesse e encaminha oportunidades quentes.", accent: "#F59E0B", bg: "#FEF3C7" },
  { name: "Fernanda", emoji: "🛍️", role: "Vendedora", sector: "E-commerce", tasks: "Atende pedidos, pós-venda e dúvidas de entrega.", accent: "#F97316", bg: "#FFF7ED", slug: "ecommerce" },
];

const STEPS = [
  { num: "01", icon: "🎯", title: "Escolha seu colaborador", desc: "Navegue pela biblioteca e escolha o perfil ideal para seu negócio.", img: IMGS.BADGE, accent: "#6D5FFF", bg: "#EEF2FF" },
  { num: "02", icon: "🔗", title: "Conecte seus canais", desc: "WhatsApp, Instagram, Messenger. Sem código e sem técnico.", img: IMGS.LEARN, accent: "#14B8A6", bg: "#CCFBF1" },
  { num: "03", icon: "⚡", title: "Comece a atender", desc: "Seu colaborador entra em ação imediatamente e responde em segundos.", img: IMGS.POS, accent: "#F59E0B", bg: "#FEF3C7" },
];

const TESTIMONIALS = [
  { quote: "Em menos de uma semana parei de perder leads no WhatsApp. O cliente recebe resposta na hora, mesmo à noite.", name: "Ana Lima", location: "Salão Vila Madalena, SP", metric: "+R$ 15 mil/mês em oportunidades recuperadas", accent: "#6D5FFF" },
  { quote: "Minha recepcionista virtual agenda consultas, confirma horário e ainda filtra o que realmente precisa chegar no time humano.", name: "Dr. Marcos", location: "Clínica Odontológica, RJ", metric: "−62% em mensagens repetitivas", accent: "#14B8A6" },
  { quote: "Hoje meu restaurante responde reservas às 23h como se tivesse equipe completa. Antes isso virava mesa vazia.", name: "Carlos Mendes", location: "Restaurante Bem-Vindo, BH", metric: "+35% em mensagens atendidas", accent: "#F59E0B" },
];

const FAQS = [
  {
    cat: "Configuração",
    accent: "#4F46E5",
    bg: "#EEF2FF",
    items: [
      { q: "Quanto tempo leva para configurar?", a: "Menos de 5 minutos. Você escolhe o colaborador, conecta seu canal e ele já começa a atender." },
      { q: "Preciso de conhecimentos técnicos?", a: "Não. A interface é intuitiva e o suporte ajuda no que for necessário." },
    ],
  },
  {
    cat: "WhatsApp",
    accent: "#22C55E",
    bg: "#DCFCE7",
    items: [
      { q: "Vocês precisam de acesso ao meu celular?", a: "Não. Usamos a API oficial do WhatsApp Business, sem depender do seu aparelho." },
      { q: "Posso usar meu número atual?", a: "Sim. A equipe acompanha o processo de portabilidade para a API oficial." },
      { q: "Vou perder histórico?", a: "Não. O histórico antigo continua no celular e as novas conversas ficam no painel." },
    ],
  },
  {
    cat: "IA",
    accent: "#F59E0B",
    bg: "#FEF3C7",
    items: [
      { q: "O colaborador virtual entende meus clientes?", a: "Sim. Ele é treinado com seus documentos, serviços, produtos e perguntas frequentes." },
      { q: "E se ele não souber responder?", a: "Ele transfere para um humano com o histórico completo da conversa." },
      { q: "Ele pode fazer agendamentos?", a: "Sim. Dependendo do plano e das integrações, ele agenda, confirma, cancela e lembra o cliente." },
      { q: "Qual a diferença para o ChatGPT?", a: "O ChatGPT é uma ferramenta genérica — você precisa configurar tudo do zero e ele não está conectado ao seu WhatsApp, Instagram ou agenda. O DiscutAI_BR já vem treinado para o seu setor, integrado aos seus canais, e atende seus clientes automaticamente sem você precisar fazer nada." },
    ],
  },
  {
    cat: "Segurança e Dados",
    accent: "#14B8A6",
    bg: "#CCFBF1",
    items: [
      { q: "Meus dados estão seguros?", a: "Sim. Os dados são criptografados, criptografados e tratados conforme a LGPD." },
      { q: "Posso cancelar quando quiser?", a: "Sim. Sem fidelidade, sem multa e sem burocracia." },
    ],
  },
];

export default function App() {
  const [faqOpen, setFaqOpen] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [annual, setAnnual] = useState(true);

  useEffect(() => {
    if (!videoOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (e) => { if (e.key === "Escape") setVideoOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [videoOpen]);

  return (
    <div style={{ fontFamily: '"Work Sans","Outfit",system-ui,sans-serif', color: "#0A0A14", overflowX: "hidden", background: "#FCFCFD" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Work+Sans:wght@400;500;600;700;800;900&family=Outfit:wght@400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        a,button{outline:none;}
        a:focus-visible,button:focus-visible{outline:2px solid #6D5FFF;outline-offset:3px;}
        .lp-section{padding:clamp(76px,8vw,108px) 0;}
        .lp-container{max-width:1280px;margin:0 auto;padding:0 clamp(20px,4vw,48px);}
        .lp-container--narrow{max-width:1160px;}
        .lp-container--compact{max-width:920px;}

        /* ── Hero ── */
        .hero-section{
          padding:clamp(72px,9vw,116px) 0 88px;
          background:linear-gradient(135deg,#0A0A14 0%,#130D2A 55%,#0F172A 100%);
          position:relative;overflow:hidden;
        }
        .hero-bg-layer{
          position:absolute;inset:0;pointer-events:none;
          background-image:
            radial-gradient(ellipse 55% 60% at 75% 50%,rgba(109,95,255,.16) 0%,transparent 70%),
            radial-gradient(ellipse 35% 45% at 12% 65%,rgba(20,184,166,.08) 0%,transparent 70%),
            linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);
          background-size:auto,auto,60px 60px,60px 60px;
        }
        .hero-grid{display:grid;grid-template-columns:minmax(0,.94fr) minmax(0,1.06fr);gap:clamp(32px,5vw,72px);align-items:center;}
        .hero-copy{max-width:560px;padding:18px 0 10px;}
        .meta-micro{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:#A5B4FC;margin-bottom:22px;}
        .micro-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 20px;max-width:440px;margin:0 0 28px;}
        .micro-item{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:rgba(255,255,255,.55);line-height:1.45;}
        .btn-row{display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap;margin:10px 0 0;}
        .cta-stack{display:flex;flex-direction:column;gap:6px;}
        .cta-micro{font-size:12px;color:rgba(255,255,255,.3);font-weight:500;}
        .hero-media{
          position:relative;border-radius:24px;overflow:hidden;
          box-shadow:0 0 0 1px rgba(109,95,255,.25),0 32px 80px rgba(109,95,255,.22);
          max-width:580px;width:100%;justify-self:end;
        }
        .hero-photo{display:block;width:100%;height:auto;aspect-ratio:1/1.06;object-fit:cover;object-position:center;}

        /* ── Buttons ── */
        .btn-p{transition:transform .18s,box-shadow .18s;cursor:pointer;}
        .btn-p:hover{transform:translateY(-2px);box-shadow:0 20px 44px rgba(109,95,255,.3)!important;}
        .btn-g{transition:background .15s,transform .15s;cursor:pointer;}
        .btn-g:hover{background:rgba(255,255,255,.12)!important;transform:translateY(-2px);}
        .btn-urgent{animation:urgentPulse 2.4s ease-in-out infinite;}
        @keyframes urgentPulse{
          0%,100%{transform:scale(1);box-shadow:0 14px 34px rgba(109,95,255,.36);}
          50%{transform:scale(1.025);box-shadow:0 20px 44px rgba(109,95,255,.46);}
        }

        /* ── Results ── */
        .results-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;background:#FFF;border:1px solid #EAECF4;border-radius:24px;padding:18px;margin:0 auto;}
        .results-item{text-align:center;padding:18px 14px;border-radius:18px;transition:transform .2s,background .2s;}
        .results-item:hover{transform:scale(1.05);background:rgba(245,245,252,.7);}
        .results-number{font-size:26px;font-weight:800;color:#6D5FFF;margin:10px 0 6px;}

        /* ── Trust bar ── */
        .trust-row{display:flex;justify-content:center;align-items:center;gap:18px 28px;flex-wrap:wrap;max-width:1120px;margin:0 auto;}
        .trust-item{display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:600;color:#4B5563;}

        /* ── Compare ── */
        .compare-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px;max-width:1040px;margin:0 auto;}
        .compare-card{border-radius:24px;padding:36px 32px;}
        .compare-card ul{list-style:none;display:flex;flex-direction:column;gap:16px;margin-top:24px;}
        .compare-card li{font-size:15px;line-height:1.55;display:flex;gap:10px;}

        /* ── Pain ── */
        .pain-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;max-width:1120px;margin:0 auto;}
        .pain-card{padding:28px 24px;border-radius:22px;background:#FFF;border:1px solid #ECEFF5;box-shadow:0 10px 30px rgba(15,23,42,.04);}

        /* ── Testimonials ── */
        .testimonials-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;}
        .testimonial-card{
          min-width:0;border-radius:20px;padding:28px;
          border:1px solid #EAECF4;border-left-width:4px;
          box-shadow:0 12px 40px rgba(0,0,0,.06);background:#FFFFFF;
          transition:transform .3s,box-shadow .3s;
        }
        .testimonial-card:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(79,70,229,.12);}

        /* ── Jobs ── */
        .jobs-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;}
        .jcard{transition:all .25s cubic-bezier(.34,1.56,.64,1);}
        .jcard:hover{transform:translateY(-5px);box-shadow:0 24px 60px rgba(79,70,229,.13)!important;}

        /* ── Steps ── */
        .steps-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;}
        .scard img{transition:transform .4s;}
        .scard:hover img{transform:scale(1.04);}

        /* ── Pricing ── */
        .pricing-shell{padding:0 clamp(20px,4vw,48px);}
        .pricing-cards-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;align-items:stretch;max-width:900px;margin:0 auto;}
        .pricing-pro-card{transform:translateY(-10px);}
        .pricing-toggle{display:flex;justify-content:center;margin-bottom:48px;}
        .pricing-toggle__inner{display:inline-flex;background:#E5E7EB;border-radius:99px;padding:4px;gap:4px;}

        /* ── CTA / modal ── */
        .cta-panel{max-width:900px;margin:0 auto;padding:0 clamp(20px,4vw,48px);}
        .video-modal{position:fixed;inset:0;z-index:260;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(10,10,20,.76);backdrop-filter:blur(10px);}
        .video-modal__card{position:relative;width:min(100%,1040px);background:#07070c;border-radius:24px;overflow:hidden;box-shadow:0 28px 90px rgba(0,0,0,.4);}
        .video-modal__frame{display:block;width:100%;aspect-ratio:16/9;border:0;background:#000;}
        .video-modal__close{position:absolute;top:14px;right:14px;z-index:2;width:42px;height:42px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:rgba(17,24,39,.74);color:white;font-size:22px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;}
        .video-modal__close:hover{background:rgba(31,41,55,.92);}

        /* ── Mobile CTA bar ── */
        .mobile-cta-bar{
          display:none;position:fixed;bottom:0;left:0;right:0;z-index:190;
          padding:12px 16px;background:rgba(255,255,255,.97);
          backdrop-filter:blur(16px);border-top:1px solid #EAECF4;
          box-shadow:0 -8px 30px rgba(0,0,0,.08);gap:10px;align-items:center;
        }
        .mobile-cta-bar__main{
          flex:1;display:flex;align-items:center;justify-content:center;
          padding:14px 16px;border-radius:12px;background:#6D5FFF;color:white;
          font-size:15px;font-weight:700;text-decoration:none;
          box-shadow:0 6px 20px rgba(109,95,255,.36);
          animation:urgentPulse 2.5s ease-in-out infinite;
        }
        .mobile-cta-bar__secondary{
          display:flex;align-items:center;justify-content:center;
          padding:14px 16px;border-radius:12px;border:1.5px solid #E5E7EB;
          background:white;font-size:14px;font-weight:600;color:#374151;
          text-decoration:none;white-space:nowrap;cursor:pointer;
        }

        /* ── Responsive ── */
        @media(max-width:1100px){
          .hero-grid{grid-template-columns:1fr;gap:34px;}
          .hero-media{justify-self:start;max-width:min(100%,620px);}
          .steps-grid,.jobs-grid,.pain-grid,.testimonials-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
        }
        @media(max-width:900px){
          .mobile-cta-bar{display:flex;}
          body{padding-bottom:80px;}
          .results-grid,.compare-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
          .pricing-cards-grid{grid-template-columns:1fr;max-width:420px;}
          .pricing-pro-card{transform:none;}
        }
        @media(max-width:768px){
          .hero-section{padding-top:52px;padding-bottom:48px;}
          .hero-grid{grid-template-columns:1fr;min-height:auto;gap:24px;}
          .hero-media{order:-1;justify-self:stretch;border-radius:18px;max-width:100%;}
          .hero-copy{order:0;max-width:none;padding-top:0;}
          .micro-list{grid-template-columns:repeat(2,1fr);max-width:none;gap:10px 12px;}
          .btn-row{flex-direction:column;align-items:stretch;gap:12px;}
          .btn-p,.btn-g{width:100%!important;justify-content:center!important;}
          .results-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px;}
          .compare-grid,.pain-grid,.steps-grid{grid-template-columns:1fr!important;}
          .jobs-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;}
          .testimonials-grid{display:flex;overflow-x:auto;padding-bottom:8px;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;gap:14px;}
          .testimonial-card{min-width:85vw;scroll-snap-align:start;flex-shrink:0;}
          .lp-section{padding:56px 0;}
          .compare-card{padding:28px 22px;}
          .pricing-shell{padding:0 16px;}
          .pricing-toggle{margin-bottom:32px;}
          .trust-item{font-size:12px;}
        }
        @media(max-width:480px){
          .jobs-grid{grid-template-columns:1fr!important;}
          .micro-list{grid-template-columns:1fr;gap:8px;}
          .results-grid{grid-template-columns:repeat(2,1fr)!important;}
          .pricing-shell{padding:0 12px;}
          .pricing-cards-grid{max-width:100%;}
        }
      `}</style>

      <Nav />

      {/* ── HERO (dark gradient) ── */}
      <section id="produto" className="hero-section">
        <div className="hero-bg-layer" aria-hidden="true" />
        <div className="lp-container lp-container--narrow" style={{ position: "relative" }}>
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="meta-micro">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" fill="#0866FF" />
                </svg>
                Meta Business Partner Oficial
              </div>
              <h1 style={{ fontFamily: '"DM Serif Display",serif', fontSize: "clamp(40px,5vw,64px)", lineHeight: 1.07, fontWeight: 700, color: "#FFFFFF", marginBottom: 20, maxWidth: 520, letterSpacing: "-0.025em" }}>
                Seu assistente que<br />nunca dorme
              </h1>
              <p style={{ fontSize: 18, color: "rgba(255,255,255,.65)", lineHeight: 1.65, marginBottom: 28, maxWidth: 500 }}>
                Responde no WhatsApp, Instagram e Messenger 24/7 — em 10 segundos. Configurado em 5 minutos.
              </p>
              <div className="micro-list">
                {["Configurado em 5 minutos", "Sem código, sem técnico", "Conformidade LGPD", "7 dias grátis — sem cartão"].map((item) => (
                  <div key={item} className="micro-item">
                    <span style={{ color: "#4ADE80", fontWeight: 800 }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="btn-row">
                <div className="cta-stack">
                  <a
                    className="btn-p btn-urgent"
                    href="https://wa.me/5511919493562?text=Ol%C3%A1%2C%20quero%20testar%20gr%C3%A1tis%20o%20DiscutAI_BR%20por%207%20dias%21"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 32px", height: 50, borderRadius: 10, background: "#6D5FFF", color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 14px 34px rgba(109,95,255,.4)" }}
                  >
                    Começar Grátis
                  </a>
                  <span className="cta-micro">7 dias, sem cartão de crédito</span>
                </div>
                <div className="cta-stack">
                  <button
                    className="btn-g"
                    onClick={() => setVideoOpen(true)}
                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 28px", height: 50, borderRadius: 10, border: "1.5px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,.06)", color: "white", fontWeight: 600, fontSize: 15, cursor: "pointer" }}
                  >
                    <span style={{ fontSize: 16 }}>▶</span> Ver em 2 min
                  </button>
                  <span className="cta-micro">vídeo demonstrativo</span>
                </div>
              </div>
            </div>

            <div className="hero-media">
              <img
                src={IMGS.HERO}
                alt="Colaboradora virtual respondendo mensagens no WhatsApp 24h"
                className="hero-photo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS METRICS ── */}
      <section style={{ background: "#FFF", padding: "32px 0" }}>
        <div className="lp-container lp-container--narrow">
          <div className="results-grid" aria-label="Resultados reais">
            {[
              { icon: "⚡", value: "10s", label: "tempo de resposta" },
              { icon: "📊", value: "+35%", label: "mensagens atendidas" },
              { icon: "⏱️", value: "5 min", label: "para configurar" },
              { icon: "💰", value: "3h", label: "economizadas por dia" },
            ].map((item) => (
              <div key={item.label} className="results-item">
                <div style={{ fontSize: 32 }}>{item.icon}</div>
                <div className="results-number">{item.value}</div>
                <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div style={{ background: "#F9FAFB", borderTop: "1px solid #F1F3F9", borderBottom: "1px solid #F1F3F9", padding: "22px 0" }}>
        <div className="lp-container lp-container--narrow">
          <div className="trust-row">
            {[
              { icon: "🟢", label: "WhatsApp · Instagram · Messenger · Site" },
              { icon: "🔒", label: "Conformidade LGPD" },
              { icon: "⭐", label: "98% de satisfação dos clientes" },
              { icon: "🔒", label: "Cancele quando quiser — sem fidelidade" },
            ].map((t) => (
              <span key={t.label} className="trust-item">
                <span>{t.icon}</span>
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── COMPARE ── */}
      <section className="lp-section" style={{ background: "#FFFFFF" }}>
        <div className="lp-container">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <Pill>Colaborador vs Chatbot</Pill>
          </div>
          <h2 style={{ textAlign: "center", fontFamily: '"DM Serif Display",serif', fontSize: "clamp(30px,4vw,42px)", fontWeight: 700, color: "#0A0A14", margin: "0 auto 18px", maxWidth: 640, letterSpacing: "-0.02em" }}>
            Por que não é um chatbot comum?
          </h2>
          <p style={{ textAlign: "center", fontSize: 16, color: "#6B7280", lineHeight: 1.6, maxWidth: 620, margin: "0 auto 48px" }}>
            Colaborador Virtual é um agente IA que simula um funcionário real: respostas personalizadas, contexto do seu negócio e nenhuma sensação de menu engessado.
          </p>
          <div className="compare-grid">
            <div className="compare-card" style={{ background: "#F5F5FA", border: "1px solid #EAECF4" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#6B7280" }}>❌ CHATBOT COMUM</div>
              <ul>
                {["Respostas robóticas", '"Menu 1, 2, 3, ou 0 para sair"', "Sem contexto do seu negócio", "Fluxos travados e pouco naturais", "Gera frustração e abandono", "Resposta genérica em 30–60 seg"].map((item) => (
                  <li key={item}><span style={{ color: "#DC2626" }}>❌</span><span style={{ color: "#6B7280" }}>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="compare-card" style={{ background: "linear-gradient(135deg,#6D5FFF 0%,#4F46E5 100%)", boxShadow: "0 16px 40px rgba(109,95,255,.2)" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "white" }}>✓ SEU COLABORADOR</div>
              <ul>
                {["Respostas personalizadas", "Conversação fluida e natural", "Conhece seu setor, preços e serviços", "Funciona 24/7, nunca falha", "Gera confiança e faz o cliente voltar", "Resposta em 10 segundos"].map((item) => (
                  <li key={item}><span style={{ color: "#A7F3D0" }}>✓</span><span style={{ color: "white" }}>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="lp-section" style={{ background: "#F9FAFB", paddingTop: 0 }}>
        <div className="lp-container">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}><Pill>Depoimentos reais</Pill></div>
          <h2 style={{ textAlign: "center", fontFamily: '"DM Serif Display",serif', fontSize: "clamp(28px,4vw,44px)", lineHeight: 1.15, marginBottom: 16, fontWeight: 700, letterSpacing: "-0.02em" }}>
            PMEs entendem o conceito<br /><em style={{ color: "#6D5FFF" }}>quando veem o resultado.</em>
          </h2>
          <p style={{ textAlign: "center", color: "#6B7280", fontSize: 16, margin: "0 auto 40px", maxWidth: 580, lineHeight: 1.6 }}>
            Resultados reais de negócios que já usam o DiscutAI_BR.
          </p>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testimonial-card" style={{ borderLeftColor: t.accent }}>
                <div style={{ color: "#F59E0B", fontSize: 14, marginBottom: 14, letterSpacing: 2 }}>★★★★★</div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#1F2937", marginBottom: 18, lineHeight: 1.75 }}>&quot;{t.quote}&quot;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: t.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 15 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{t.location}</div>
                  </div>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: t.accent, background: t.accent + "18", padding: "5px 12px", borderRadius: 99 }}>
                  {t.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN ── */}
      <section className="lp-section" style={{ background: "#FFFFFF", paddingTop: 0 }}>
        <div className="lp-container">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <Pill style={{ background: "#FEF2F2", color: "#DC2626" }}>Você já passou por isso?</Pill>
          </div>
          <h2 style={{ textAlign: "center", fontFamily: '"DM Serif Display",serif', fontSize: "clamp(28px,4vw,50px)", lineHeight: 1.1, marginBottom: 16, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Cada mensagem sem resposta<br />é um cliente perdido.
          </h2>
          <p style={{ textAlign: "center", color: "#6B7280", fontSize: 17, maxWidth: 560, margin: "0 auto 52px", lineHeight: 1.65 }}>
            O problema não é o volume de mensagens. É depender de um atendimento que para quando sua equipe para.
          </p>
          <div className="pain-grid">
            {[
              { icon: "💬", title: "Clientes sem resposta = vendas perdidas", sub: "Cada mensagem ignorada é um cliente que foi ao concorrente." },
              { icon: "🔁", title: "Respostas repetitivas consomem seu tempo", sub: "Horários, preços e disponibilidade — centenas de vezes por dia." },
              { icon: "💸", title: "Escalar custa muito", sub: "Mais recepcionistas significa custo fixo para sempre." },
            ].map((item) => (
              <div key={item.title} className="pain-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 18 }}>{item.icon}</div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#0A0A14", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.65 }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOBS (todos os 8 setores) ── */}
      <section id="colaboradores" className="lp-section" style={{ background: "#F9FAFB" }}>
        <div className="lp-container">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}><Pill>Casos concretos</Pill></div>
          <h2 style={{ textAlign: "center", fontFamily: '"DM Serif Display",serif', fontSize: "clamp(30px,4vw,52px)", marginBottom: 16, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Um colaborador para cada setor.
          </h2>
          <p style={{ textAlign: "center", color: "#6B7280", fontSize: 17, marginBottom: 46, lineHeight: 1.6, maxWidth: 680, marginInline: "auto" }}>
            Reconheça rapidamente o seu cenário — e veja como o DiscutAI_BR já opera no seu setor.
          </p>
          <div className="jobs-grid">
            {JOBS.map((j) => (
              <div key={j.sector} className="jcard" style={{ background: "white", border: "1px solid #F1F3F9", borderRadius: 18, padding: 22, boxShadow: "0 10px 30px rgba(15,23,42,.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: j.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{j.emoji}</div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: j.accent, background: j.bg, padding: "3px 9px", borderRadius: 99 }}>{j.role}</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#0A0A14", marginBottom: 2 }}>{j.name}</div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#9CA3AF", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>{j.sector}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65, marginBottom: 16 }}>{j.tasks}</p>
                <a href={j.slug ? `#/solucoes/${j.slug}` : "#/solucoes"} style={{ fontSize: 13, fontWeight: 700, color: j.accent, textDecoration: "none" }}>Ver detalhes →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="lp-section" style={{ background: "#FFFFFF" }}>
        <div className="lp-container lp-container--narrow">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}><Pill>Como funciona</Pill></div>
          <h2 style={{ textAlign: "center", fontFamily: '"DM Serif Display",serif', fontSize: "clamp(30px,4vw,52px)", marginBottom: 16, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Pronto em 3 passos simples.
          </h2>
          <p style={{ textAlign: "center", color: "#6B7280", fontSize: 17, marginBottom: 56, maxWidth: 640, marginInline: "auto" }}>
            Sem técnico, sem código, sem burocracia. Seu colaborador começa a atender hoje.
          </p>
          <div className="steps-grid">
            {STEPS.map((s) => (
              <div key={s.num} className="scard" style={{ background: "white", border: "1px solid #F1F3F9", borderRadius: 20, overflow: "hidden", boxShadow: "0 10px 30px rgba(15,23,42,.05)" }}>
                <div style={{ height: 220, overflow: "hidden", background: "#F9FAFB" }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
                </div>
                <div style={{ padding: "24px 24px 28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ background: s.bg, color: s.accent, fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 99, letterSpacing: "0.04em" }}>{s.num}</div>
                    <div style={{ fontSize: 36 }}>{s.icon}</div>
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEGRAÇÕES ── */}
      <section style={{ background: "#FFFFFF", padding: "64px 0", borderTop: "1px solid #F1F3F9" }}>
        <div className="lp-container lp-container--narrow">
          <p style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 32 }}>
            Conecta com as ferramentas que você já usa
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            {[
              { label: "WhatsApp Business API", color: "#25D366", bg: "#F0FDF4" },
              { label: "Instagram Direct", color: "#E1306C", bg: "#FFF0F5" },
              { label: "Messenger", color: "#0084FF", bg: "#EFF6FF" },
              { label: "Google Agenda", color: "#4285F4", bg: "#EFF6FF" },
              { label: "Pix", color: "#32BCAD", bg: "#F0FDFA" },
              { label: "Meta Ads", color: "#1877F2", bg: "#EFF6FF" },
              { label: "Site / Widget", color: "#6D5FFF", bg: "#EEF2FF" },
            ].map((i) => (
              <div key={i.label} style={{ display: "flex", alignItems: "center", gap: 8, background: i.bg, border: `1px solid ${i.color}22`, borderRadius: 99, padding: "10px 18px" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: i.color, flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{i.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="precos" style={{ background: "#F9FAFB", padding: "clamp(60px,8vw,100px) 0" }}>
        <div className="lp-container lp-container--narrow pricing-shell">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}><Pill>Preços</Pill></div>
          <h2 style={{ textAlign: "center", fontFamily: '"DM Serif Display",serif', fontSize: "clamp(30px,4vw,58px)", marginBottom: 16, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Três planos.<br /><em style={{ color: "#4F46E5" }}>Sem complicação.</em>
          </h2>
          <p style={{ textAlign: "center", color: "#6B7280", fontSize: 17, marginBottom: 32, lineHeight: 1.65, maxWidth: 520, marginInline: "auto" }}>
            Escolha o plano que se encaixa no seu negócio. Sem contrato, sem fidelidade — cancele quando quiser.
          </p>

          {/* Toggle mensal / anual */}
          <div className="pricing-toggle">
            <div className="pricing-toggle__inner">
              <button onClick={() => setAnnual(false)} style={{ padding: "8px 22px", borderRadius: 99, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, background: annual ? "transparent" : "white", color: annual ? "#6B7280" : "#0A0A14", boxShadow: annual ? "none" : "0 1px 4px rgba(0,0,0,.12)", transition: "all .2s" }}>
                Mensal
              </button>
              <button onClick={() => setAnnual(true)} style={{ padding: "8px 22px", borderRadius: 99, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8, background: annual ? "white" : "transparent", color: annual ? "#0A0A14" : "#6B7280", boxShadow: annual ? "0 1px 4px rgba(0,0,0,.12)" : "none", transition: "all .2s" }}>
                Anual
                <span style={{ background: "#4F46E5", color: "white", fontSize: 11, fontWeight: 800, padding: "2px 8px", borderRadius: 99 }}>-20%</span>
              </button>
            </div>
          </div>

          <div className="pricing-cards-grid">

            {/* Essencial */}
            <div style={{ background: "white", border: "1px solid #F1F3F9", borderRadius: 24, padding: 32, boxShadow: "0 10px 30px rgba(15,23,42,.05)", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Essencial</div>
              <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1, marginBottom: 4, color: "#0A0A14" }}>R$ {annual ? "319" : "399"}</div>
              <div style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 6 }}>/mês{annual && <span style={{ color: "#4F46E5", fontWeight: 700, marginLeft: 6 }}>· cobrado anualmente</span>}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#6D5FFF", background: "#EEF2FF", padding: "4px 10px", borderRadius: 99, display: "inline-block", marginBottom: 20 }}>
                Ideal para MEI e autônomos
              </div>
              <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24, lineHeight: 1.6 }}>
                Responda seus clientes 24h sem precisar contratar mais ninguém.
              </p>
              <div style={{ borderTop: "1px solid #F1F3F9", paddingTop: 20, marginBottom: 28, flex: 1 }}>
                {[
                  "1 agente IA configurado para o seu setor",
                  "1 canal conectado (WhatsApp ou Instagram)",
                  "Até ~500 conversas por mês",
                  "Transferência para humano com contexto",
                  "Suporte por e-mail",
                ].map((f) => (
                  <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 11 }}>
                    <span style={{ color: "#22C55E", fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/5511919493562?text=Ol%C3%A1%2C%20quero%20testar%20gr%C3%A1tis%20o%20plano%20Essencial%20do%20DiscutAI_BR%21" className="btn-p" target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", padding: "14px 0", borderRadius: 10, background: "#6D5FFF", color: "white", fontWeight: 800, fontSize: 15, textDecoration: "none" }}>
                Começar Grátis — 7 dias
              </a>
            </div>

            {/* Pro — destaque */}
            <div className="pricing-pro-card" style={{ background: "#4F46E5", border: "1px solid #4F46E5", borderRadius: 24, padding: 32, boxShadow: "0 20px 60px rgba(79,70,229,.28)", display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#F59E0B", color: "white", fontSize: 11, fontWeight: 800, padding: "5px 16px", borderRadius: 99, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>MAIS POPULAR</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.7)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Pro</div>
              <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1, marginBottom: 4, color: "white" }}>R$ {annual ? "959" : "1.199"}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,.6)", marginBottom: 6 }}>/mês{annual && <span style={{ color: "#A5F3FC", fontWeight: 700, marginLeft: 6 }}>· cobrado anualmente</span>}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#A5B4FC", background: "rgba(255,255,255,.12)", padding: "4px 10px", borderRadius: 99, display: "inline-block", marginBottom: 20 }}>
                Ideal para equipes em crescimento
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.8)", marginBottom: 24, lineHeight: 1.6 }}>
                Múltiplos canais, mais volume, integração com suas ferramentas.
              </p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,.2)", paddingTop: 20, marginBottom: 28, flex: 1 }}>
                {[
                  "3 agentes IA configurados",
                  "3 canais conectados (WhatsApp + Instagram + Messenger)",
                  "Até ~1.250 conversas por mês",
                  "Transferência para humano com contexto",
                  "Integração via API (Google Agenda, etc.)",
                  "Suporte prioritário",
                ].map((f) => (
                  <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 11 }}>
                    <span style={{ color: "#A5F3FC", fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,.9)", lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/5511919493562?text=Ol%C3%A1%2C%20quero%20testar%20gr%C3%A1tis%20o%20plano%20Pro%20do%20DiscutAI_BR%21" className="btn-p" target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", padding: "14px 0", borderRadius: 10, background: "white", color: "#4F46E5", fontWeight: 800, fontSize: 15, textDecoration: "none" }}>
                Começar Grátis — 7 dias
              </a>
            </div>

            {/* Scale */}
            <div style={{ background: "#0A0A14", border: "1px solid #2D2D44", borderRadius: 24, padding: 32, boxShadow: "0 10px 30px rgba(0,0,0,.2)", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.7)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Scale</div>
              <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.1, marginBottom: 4, color: "white" }}>Sob consulta</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,.4)", marginBottom: 6 }}>preço personalizado</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#A5B4FC", background: "rgba(109,95,255,.2)", padding: "4px 10px", borderRadius: 99, display: "inline-block", marginBottom: 20 }}>
                Para operações em expansão
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.65)", marginBottom: 24, lineHeight: 1.6 }}>
                Volume personalizado, SLA dedicado e integração sob medida.
              </p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 20, marginBottom: 28, flex: 1 }}>
                {[
                  "Agentes IA ilimitados",
                  "Volume de conversas personalizado",
                  "Todos os canais conectados",
                  "Integrações sob medida",
                  "SLA e suporte dedicado",
                ].map((f) => (
                  <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 11 }}>
                    <span style={{ color: "#818CF8", fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,.75)", lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/5511919493562?text=Ol%C3%A1%2C%20quero%20saber%20sobre%20o%20plano%20Scale%20do%20DiscutAI_BR%21" className="btn-p" target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", padding: "14px 0", borderRadius: 10, background: "rgba(109,95,255,.25)", color: "#C4B5FD", fontWeight: 800, fontSize: 15, textDecoration: "none", border: "1px solid rgba(109,95,255,.4)" }}>
                Falar com a equipe →
              </a>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: "#9CA3AF", marginTop: 36 }}>
            7 dias grátis · Sem cartão de crédito · Cancele quando quiser
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ background: "#FFFFFF", padding: "100px 0" }}>
        <div className="lp-container lp-container--compact">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}><Pill>Dúvidas frequentes</Pill></div>
          <h2 style={{ textAlign: "center", fontFamily: '"DM Serif Display",serif', fontSize: "clamp(30px,4vw,54px)", marginBottom: 16, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Tem dúvidas?<br /><em style={{ color: "#4F46E5" }}>A gente responde.</em>
          </h2>
          <p style={{ textAlign: "center", color: "#6B7280", fontSize: 17, marginBottom: 56, lineHeight: 1.6 }}>
            Não encontrou o que procura? Fale pelo{" "}
            <a href="mailto:contacto@discutai.com.br" style={{ color: "#4F46E5", fontWeight: 600, textDecoration: "none" }}>contacto@discutai.com.br</a>{" "}
            ou no <a href="https://wa.me/5511919493562" style={{ color: "#4F46E5", fontWeight: 600, textDecoration: "none" }}>WhatsApp →</a>
          </p>
          {FAQS.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: 32 }}>
              <div style={{ marginBottom: 12 }}>
                <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 99, background: cat.bg, color: cat.accent, fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>{cat.cat}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {cat.items.map((item, ii) => {
                  const key = `${ci}-${ii}`;
                  const open = faqOpen === key;
                  return (
                    <div key={ii} style={{ background: "white", border: `1px solid ${open ? cat.accent + "44" : "#F1F3F9"}`, borderRadius: 14, overflow: "hidden", transition: "border-color .2s" }}>
                      <button onClick={() => setFaqOpen(open ? null : key)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}>
                        <span style={{ fontSize: 16, fontWeight: 600, color: "#111827", lineHeight: 1.4 }}>{item.q}</span>
                        <span style={{ fontSize: 20, color: cat.accent, flexShrink: 0, fontWeight: 300, transform: open ? "rotate(45deg)" : "none", transition: "transform .2s" }}>+</span>
                      </button>
                      {open && (
                        <div style={{ padding: "0 24px 20px", fontSize: 15, color: "#6B7280", lineHeight: 1.7, borderTop: "1px solid #F1F3F9" }}>
                          <div style={{ paddingTop: 16 }}>{item.a}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL (dark) ── */}
      <section style={{ background: "#0A0A14", padding: "108px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 50% 60% at 50% 50%,rgba(109,95,255,.18) 0%,transparent 70%),linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "auto,60px 60px,60px 60px" }} />
        <div className="cta-panel" style={{ position: "relative", textAlign: "center" }}>
          <h2 style={{ fontFamily: '"DM Serif Display",serif', fontSize: "clamp(34px,5vw,64px)", color: "white", marginBottom: 20, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Pronto para o seu<br /><em style={{ color: "rgba(255,255,255,.55)" }}>colaborador virtual?</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 18, marginBottom: 36, lineHeight: 1.6, maxWidth: 500, marginInline: "auto" }}>
            Configure hoje. Resultado amanhã.
          </p>
          <a
            className="btn-p btn-urgent"
            href="https://wa.me/5511919493562?text=Ol%C3%A1%2C%20quero%20testar%20gr%C3%A1tis%20o%20DiscutAI_BR%20por%207%20dias%21"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "18px 48px", borderRadius: 14, background: "#6D5FFF", color: "white", border: "none", fontSize: 18, fontWeight: 800, boxShadow: "0 8px 32px rgba(109,95,255,.4)", letterSpacing: "-0.01em", textDecoration: "none" }}
          >
            Começar Grátis — 7 dias
          </a>
          <p style={{ color: "rgba(255,255,255,.22)", fontSize: 13, marginTop: 20 }}>Sem cartão de crédito · Cancele quando quiser</p>
          <p style={{ color: "rgba(255,255,255,.16)", fontSize: 12, marginTop: 8 }}>Imobiliária · Salão · Dentista · Restaurante · E-commerce · Loja · Médico</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#070710", padding: "48px 0 32px" }}>
        <div className="lp-container">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 36, marginBottom: 36 }}>
            <div>
              <img src={IMGS.LOGO} alt="DiscutAI_BR" style={{ height: 26, filter: "brightness(2) saturate(0.4)", marginBottom: 14 }} />
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.28)", maxWidth: 240, lineHeight: 1.65 }}>Plataforma de colaboradores virtuais para PMEs brasileiras.</p>
            </div>
            <div style={{ display: "flex", gap: 52, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.22)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Produto</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[["#produto", "Como funciona"], ["#precos", "Preços"], ["#faq", "FAQ"], ["#/solucoes", "Soluções por setor"]].map(([href, label]) => (
                    <a key={href} href={href} style={{ fontSize: 13, color: "rgba(255,255,255,.42)", textDecoration: "none" }}>{label}</a>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.22)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Contato</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="mailto:contacto@discutai.com.br" style={{ fontSize: 13, color: "rgba(255,255,255,.42)", textDecoration: "none" }}>contacto@discutai.com.br</a>
                  <a href="https://wa.me/5511919493562" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "rgba(255,255,255,.42)", textDecoration: "none" }}>WhatsApp →</a>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.22)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Legal</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="#" style={{ fontSize: 13, color: "rgba(255,255,255,.42)", textDecoration: "none" }}>Política de Privacidade</a>
                  <a href="#" style={{ fontSize: 13, color: "rgba(255,255,255,.42)", textDecoration: "none" }}>Termos de Uso</a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.18)" }}>© 2026 DiscutAI_BR — Todos os direitos reservados</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.14)" }}>Dados protegidos conforme LGPD</p>
          </div>
        </div>
      </footer>

      {/* ── VIDEO MODAL ── */}
      {videoOpen && (
        <div className="video-modal" onClick={() => setVideoOpen(false)} role="dialog" aria-modal="true" aria-label="Vídeo Discutai em 2 minutos">
          <div className="video-modal__card" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal__close" onClick={() => setVideoOpen(false)} aria-label="Fechar vídeo">×</button>
            <iframe
              className="video-modal__frame"
              src={VIDEO_EMBED_URL}
              title="Discutai em 2 minutos"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ── MOBILE CTA BAR ── */}
      <div className="mobile-cta-bar" aria-label="Ação rápida">
        <a
          className="mobile-cta-bar__main"
          href="https://wa.me/5511919493562?text=Ol%C3%A1%2C%20quero%20testar%20gr%C3%A1tis%20o%20DiscutAI_BR%20por%207%20dias%21"
          target="_blank"
          rel="noopener noreferrer"
        >
          Testar Grátis — 7 dias
        </a>
        <button className="mobile-cta-bar__secondary" type="button" onClick={() => setVideoOpen(true)}>
          Ver demo
        </button>
      </div>
    </div>
  );
}
