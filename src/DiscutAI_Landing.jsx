import { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import { assetUrl } from "./assetUrl";

const IMGS = {
  LOGO: assetUrl("images/logo.webp"),
  HERO: assetUrl("images/hero.webp"),
  POS: assetUrl("images/pos.webp"),
  LEARN: assetUrl("images/learn.webp"),
  BADGE: assetUrl("images/badge.webp"),
};

function Counter({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let v = 0;
        const step = target / (duration / 16);
        const tick = () => {
          v += step;
          if (v >= target) { setCount(target); return; }
          setCount(Math.floor(v));
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Pill({ children, style = {} }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"6px 16px", borderRadius:99, background:"#EEF2FF", color:"#4F46E5", fontSize:12, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", ...style }}>
      {children}
    </span>
  );
}

const JOBS = [
  { emoji:"💇‍♀️", role:"Recepcionista", sector:"Cabeleireiro",        tasks:"Agendamentos, serviços e produtos", accent:"#4F46E5", bg:"#EEF2FF", slug:"cabeleireiro" },
  { emoji:"🦷",   role:"Assistente",    sector:"Clínica / Dentista",  tasks:"Consultas e orientações",           accent:"#14B8A6", bg:"#CCFBF1", slug:"clinica-dentista" },
  { emoji:"🍽",   role:"Atendente",     sector:"Restaurante",          tasks:"Reservas, cardápio e pedidos",      accent:"#F59E0B", bg:"#FEF3C7", slug:"restaurante" },
  { emoji:"🏠",   role:"Consultor",     sector:"Imobiliária",          tasks:"Leads, visitas e informações",      accent:"#F43F5E", bg:"#FFE4E6", slug:"imobiliaria" },
  { emoji:"👔",   role:"Vendedor",      sector:"Loja de Roupas",       tasks:"Catálogo, promoções e vendas",      accent:"#4F46E5", bg:"#EEF2FF", slug:"loja-de-roupas" },
  { emoji:"🏥",   role:"Triagem",       sector:"Clínica Médica",       tasks:"Agendamentos e orientações",        accent:"#14B8A6", bg:"#CCFBF1" },
  { emoji:"💰",   role:"Assistente",    sector:"Assessor Financeiro",  tasks:"Qualificação e produtos",           accent:"#F59E0B", bg:"#FEF3C7" },
  { emoji:"🛍️",  role:"Vendedor",      sector:"E-commerce",           tasks:"Pedidos, dúvidas e pós-venda",      accent:"#F97316", bg:"#FFF7ED", slug:"ecommerce" },
];

const STEPS = [
  { num:"01", title:"Escolha seu colaborador", desc:"Navegue pela biblioteca e escolha o perfil ideal para o seu negócio.", img:IMGS.BADGE, accent:"#4F46E5", bg:"#EEF2FF" },
  { num:"02", title:"Conecte seus canais",      desc:"WhatsApp, Instagram, Messenger ou widget no site. Integração sem linha de código.", img:IMGS.LEARN, accent:"#14B8A6", bg:"#CCFBF1" },
  { num:"03", title:"Comece a atender",        desc:"Seu colaborador entra em ação imediatamente. Você foca no que importa.", img:IMGS.POS,   accent:"#F59E0B", bg:"#FEF3C7" },
];


export default function App() {
  const [activeJob, setActiveJob] = useState(null);
  const [billingAnnual, setBillingAnnual] = useState(false);

  return (
    <div style={{ fontFamily:'"Work Sans","Outfit",system-ui,sans-serif', color:"#0A0A14", overflowX:"hidden", background:"#FCFCFD" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Work+Sans:wght@400;500;600;700;800;900&family=Outfit:wght@400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .jcard{transition:all .25s cubic-bezier(.34,1.56,.64,1);cursor:pointer;}
        .jcard:hover{transform:translateY(-5px);box-shadow:0 24px 60px rgba(79,70,229,.13)!important;}
        .btn-p{transition:all .18s;cursor:pointer;}
        .btn-p:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(79,70,229,.38)!important;}
        .btn-g{transition:background .15s;cursor:pointer;}
        .btn-g:hover{background:#F5F5FA!important;}
        .scard img{transition:transform .4s;}
        .scard:hover img{transform:scale(1.04);}
        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-thumb{background:#D1D5E8;border-radius:99px;}
        @media(max-width:900px){
          nav>div:nth-child(2){display:none!important;}
        }
        @media(max-width:768px){
          nav{padding:0 20px!important;}
          section>div,div[style*="maxWidth:1200"]{padding-left:20px!important;padding-right:20px!important;}
          div[style*="gridTemplateColumns:repeat(4"]{grid-template-columns:repeat(2,1fr)!important;}
          div[style*="gridTemplateColumns:repeat(3"]{grid-template-columns:1fr!important;}
          div[style*="gridTemplateColumns:1fr 1fr"]{grid-template-columns:1fr!important;}
          div[style*="gridTemplateColumns:repeat(4,1fr)"][style*="border"]{grid-template-columns:repeat(2,1fr)!important;}
          .btn-p,.btn-g{width:100%!important;justify-content:center!important;}
          div[style*="transform:scale(1.04)"]{transform:none!important;}
        }
      `}</style>

      <Nav />

      {/* HERO */}
      <section id="produto" style={{ padding:"96px 0 0",background:"#FCFCFD" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 40px" }}>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:16 }}>
            <Pill>✦  Colaboradores virtuais para PMEs brasileiras</Pill>
          </div>

          <h1 style={{ textAlign:"center",fontFamily:'"DM Serif Display",serif',fontSize:"clamp(48px,6.5vw,92px)",lineHeight:1.06,letterSpacing:"-0.02em",marginBottom:28,fontWeight:400 }}>
            Seu colaborador virtual<br />
            <em style={{ color:"#4F46E5" }}>favorito já trabalha aqui.</em>
          </h1>
          <p style={{ textAlign:"center",fontSize:19,color:"#6B7280",maxWidth:580,margin:"0 auto 40px",lineHeight:1.65 }}>
            Configure em 5 minutos. Atende 24h. Especializado no seu setor e disponível no <strong style={{ color:"#0A0A14" }}>WhatsApp, Instagram, Messenger</strong> ou no seu site.
          </p>
          <div style={{ display:"flex",justifyContent:"center",gap:12,marginBottom:18,flexWrap:"wrap" }}>
            <a className="btn-p" href="#colaboradores" style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"16px 32px",borderRadius:14,background:"#4F46E5",color:"white",border:"none",fontSize:17,fontWeight:700,boxShadow:"0 8px 24px rgba(79,70,229,.28)",letterSpacing:"-0.01em",textDecoration:"none" }}>Escolher meu colaborador →</a>
            <a className="btn-g" href="https://wa.me/5511976458933?text=Ol%C3%A1%2C%20quero%20ver%20uma%20demo%20do%20DiscutAI_BR%21" target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,padding:"16px 32px",borderRadius:14,border:"1px solid #E5E7EB",background:"white",fontSize:17,fontWeight:600,color:"#374151",textDecoration:"none" }}>▶ Ver demo (2 min)</a>
          </div>
          <p style={{ textAlign:"center",fontSize:13,color:"#9CA3AF",marginBottom:64 }}>✓ Sem cartão de crédito &nbsp;·&nbsp; ✓ Setup em 5 minutos &nbsp;·&nbsp; ✓ Cancele quando quiser</p>

          {/* Hero image with floating badges */}
          <div style={{ position:"relative",borderRadius:28,overflow:"hidden",aspectRatio:"16/7",boxShadow:"0 40px 120px rgba(0,0,0,.12)" }}>
            <img src={IMGS.HERO} alt="Colaborador virtual DiscutAI_BR" style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 18%" }} />
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(to right, rgba(0,0,0,.22) 0%, transparent 35%, transparent 65%, rgba(0,0,0,.18) 100%)" }} />
            {[
              { top:32,  left:32,  value:"10s",   label:"tempo de resposta",   accent:"#22C55E" },
              { top:32,  right:32, value:"+35%",  label:"mensagens atendidas", accent:"#4F46E5" },
              { bottom:32, left:32,  value:"5 min", label:"para configurar",  accent:"#F59E0B" },
              { bottom:32, right:32, value:"3h",   label:"economizadas/dia",   accent:"#14B8A6" },
            ].map((b,i) => (
              <div key={i} style={{ position:"absolute",...b, background:"rgba(255,255,255,.95)",backdropFilter:"blur(12px)",borderRadius:16,padding:"14px 20px",minWidth:150,boxShadow:"0 8px 32px rgba(0,0,0,.12)" }}>
                <div style={{ fontSize:30,fontWeight:900,color:b.accent,lineHeight:1,marginBottom:5 }}>{b.value}</div>
                <div style={{ fontSize:12,color:"#6B7280",fontWeight:500 }}>{b.label}</div>
              </div>
            ))}
          </div>

          {/* Competitive callout — below hero image */}
          <div style={{ marginTop:40,marginBottom:8,textAlign:"center" }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:16,background:"#0A0A14",borderRadius:20,padding:"24px 40px",boxShadow:"0 12px 48px rgba(0,0,0,.18)" }}>
              <span style={{ fontSize:28 }}>⚡</span>
              <p style={{ fontSize:"clamp(15px,1.8vw,20px)",color:"rgba(255,255,255,.9)",fontWeight:500,lineHeight:1.5,margin:0,textAlign:"left" }}>
                Seus concorrentes demoram{" "}
                <strong style={{ color:"#FCD34D",fontWeight:800 }}>5 horas</strong>{" "}
                para responder.{" "}
                Você,{" "}
                <strong style={{ color:"#4ADE80",fontWeight:800 }}>10 segundos.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <div style={{ background:"#F9FAFB",borderTop:"1px solid #F1F3F9",borderBottom:"1px solid #F1F3F9",padding:"20px 0" }}>
        <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:40,flexWrap:"wrap",padding:"0 40px" }}>
          {[
            { icon:"✓", label:"WhatsApp · Instagram · Messenger · Site" },
            { icon:"✓", label:"Dados hospedados no Brasil" },
            { icon:"✓", label:"99,9% de uptime" },
            { icon:"✓", label:"Sem cartão de crédito" },
            { icon:"✓", label:"Setup em 5 minutos" },
          ].map(t => (
            <span key={t.label} style={{ display:"inline-flex",alignItems:"center",gap:6,fontSize:11,fontWeight:600,color:"#6B7280",letterSpacing:"0.05em",textTransform:"uppercase",fontFamily:"monospace" }}>
              <span style={{ color:"#22C55E",fontSize:13 }}>{t.icon}</span>{t.label}
            </span>
          ))}

          {/* Meta Business Partner badge */}
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,borderLeft:"1px solid #E5E7EB",paddingLeft:32 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#0866FF"/>
            </svg>
            <div>
              <div style={{ fontSize:10,fontWeight:800,color:"#0866FF",letterSpacing:"0.06em",textTransform:"uppercase",lineHeight:1 }}>Meta</div>
              <div style={{ fontSize:10,fontWeight:600,color:"#6B7280",letterSpacing:"0.04em",textTransform:"uppercase",lineHeight:1.4 }}>Business Partner</div>
            </div>
          </div>
        </div>
      </div>

      {/* PAIN */}
      <section style={{ background:"#FCFCFD",padding:"88px 0 0" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 40px" }}>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:24 }}>
            <Pill style={{ background:"#FEF2F2",color:"#DC2626",borderColor:"#FCA5A5" }}>Você já passou por isso?</Pill>
          </div>
          <h2 style={{ textAlign:"center",fontFamily:'"DM Serif Display",serif',fontSize:"clamp(28px,4vw,54px)",lineHeight:1.1,marginBottom:16,fontWeight:400,letterSpacing:"-0.02em" }}>
            Quantas mensagens no WhatsApp<br /><em style={{ color:"#DC2626" }}>você perde por dia?</em>
          </h2>
          <p style={{ textAlign:"center",color:"#6B7280",fontSize:17,maxWidth:480,margin:"0 auto 52px",lineHeight:1.65 }}>
            Cada mensagem sem resposta é um cliente que foi embora. Contratar mais gente resolve no curto prazo — mas cria custo fixo para sempre.
          </p>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20 }}>
            {[
              { icon:"📵", pain:"WhatsApp sem resposta fora do horário", sub:"Clientes decidem na hora. Silêncio é concorrência." },
              { icon:"🔄", pain:"As mesmas perguntas, o dia inteiro", sub:"Horários, preços, disponibilidade — repetidas centenas de vezes." },
              { icon:"⌛", pain:"Agendamentos perdidos por demora", sub:"Quem responde primeiro ganha o cliente. Sempre." },
              { icon:"💸", pain:"Custo alto para escalar atendimento", sub:"Mais recepcionistas não é a única saída para crescer." },
            ].map((p,i) => (
              <div key={i} style={{ background:"white",border:"1px solid #FEE2E2",borderRadius:18,padding:24,boxShadow:"0 2px 12px rgba(220,38,38,.05)" }}>
                <div style={{ fontSize:28,marginBottom:14 }}>{p.icon}</div>
                <h3 style={{ fontSize:15,fontWeight:700,marginBottom:8,color:"#111827" }}>{p.pain}</h3>
                <p style={{ fontSize:13,color:"#9CA3AF",lineHeight:1.55 }}>{p.sub}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center",marginTop:40,paddingBottom:8 }}>
            <a href="#colaboradores" style={{ display:"inline-flex",alignItems:"center",gap:10,background:"#EEF2FF",borderRadius:99,padding:"12px 24px",fontSize:14,color:"#4F46E5",fontWeight:600,textDecoration:"none" }}>
              O colaborador virtual resolve tudo isso <span style={{ fontWeight:800 }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* CONCEPT */}
      <section style={{ background:"#FCFCFD",padding:"100px 0" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 40px" }}>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:24 }}><Pill>O conceito</Pill></div>
          <h2 style={{ textAlign:"center",fontFamily:'"DM Serif Display",serif',fontSize:"clamp(34px,5vw,66px)",lineHeight:1.1,marginBottom:18,fontWeight:400,letterSpacing:"-0.02em" }}>
            Não é um chatbot.<br /><em style={{ color:"#4F46E5" }}>É um colaborador.</em>
          </h2>
          <p style={{ textAlign:"center",color:"#6B7280",fontSize:18,maxWidth:500,margin:"0 auto 64px",lineHeight:1.65 }}>Com identidade própria. Treinado para o seu setor. Pronto em minutos.</p>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }}>
            {[
              { title:"Identidade própria",  desc:"Nome, personalidade e linguagem adaptada ao seu negócio.",                     accent:"#4F46E5",bg:"#EEF2FF",icon:"◆" },
              { title:"Especialista no setor",desc:"Conhece seus serviços, preços e como falar com seus clientes.",               accent:"#14B8A6",bg:"#CCFBF1",icon:"◈" },
              { title:"Disponível 24/7",     desc:"Nunca cansa. Nunca falta. Atende no WhatsApp, Instagram, Messenger ou no seu site — enquanto você descansa.",         accent:"#F59E0B",bg:"#FEF3C7",icon:"◉" },
            ].map((c,i) => (
              <div key={i} style={{ background:"white",border:"1px solid #F1F3F9",borderRadius:20,padding:32,boxShadow:"0 2px 16px rgba(0,0,0,.04)" }}>
                <div style={{ width:48,height:48,borderRadius:12,background:c.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:c.accent,marginBottom:20 }}>{c.icon}</div>
                <div style={{ width:48,height:3,background:c.accent,borderRadius:99,marginBottom:16 }} />
                <h3 style={{ fontSize:20,fontWeight:700,marginBottom:10,letterSpacing:"-0.01em" }}>{c.title}</h3>
                <p style={{ fontSize:15,color:"#6B7280",lineHeight:1.65 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOBS GRID */}
      <section id="colaboradores" style={{ background:"#F9FAFB",padding:"100px 0" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 40px" }}>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:24 }}><Pill>Colaboradores disponíveis</Pill></div>
          <h2 style={{ textAlign:"center",fontFamily:'"DM Serif Display",serif',fontSize:"clamp(30px,4vw,58px)",marginBottom:16,fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.1 }}>Uma biblioteca inteira.</h2>
          <p style={{ textAlign:"center",color:"#6B7280",fontSize:17,marginBottom:56,lineHeight:1.6 }}>Escolha o colaborador certo para o seu negócio.</p>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:18 }}>
            {JOBS.map((j,i) => (
              <div key={i} className="jcard" onClick={() => setActiveJob(i===activeJob?null:i)}
                style={{ background:"white",border:`1.5px solid ${activeJob===i?j.accent:"#F1F3F9"}`,borderRadius:18,padding:24,boxShadow:"0 2px 12px rgba(0,0,0,.04)" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16 }}>
                  <div style={{ width:52,height:52,borderRadius:14,background:j.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24 }}>{j.emoji}</div>
                  <span style={{ fontSize:11,fontWeight:700,color:j.accent,background:j.bg,padding:"4px 10px",borderRadius:99 }}>{j.role}</span>
                </div>
                <h3 style={{ fontSize:15,fontWeight:700,marginBottom:8,letterSpacing:"-0.01em" }}>{j.sector}</h3>
                <p style={{ fontSize:13,color:"#9CA3AF",lineHeight:1.5,marginBottom:16 }}>{j.tasks}</p>
                <a href={j.slug ? `#/solucoes/${j.slug}` : "#/solucoes"} style={{ fontSize:13,fontWeight:600,color:j.accent,textDecoration:"none" }}>Ver página →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background:"#FCFCFD",padding:"100px 0" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 40px" }}>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:24 }}><Pill>Como funciona</Pill></div>
          <h2 style={{ textAlign:"center",fontFamily:'"DM Serif Display",serif',fontSize:"clamp(30px,4vw,58px)",marginBottom:16,fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.1 }}>Simples como contratar.</h2>
          <p style={{ textAlign:"center",color:"#6B7280",fontSize:17,marginBottom:60 }}>Sem código. Sem técnico. Só você e seu colaborador.</p>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }}>
            {STEPS.map((s,i) => (
              <div key={i} className="scard" style={{ background:"white",border:"1px solid #F1F3F9",borderRadius:20,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,.04)" }}>
                <div style={{ height:220,overflow:"hidden",background:"#F9FAFB" }}>
                  <img src={s.img} alt={s.title} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 20%" }} />
                </div>
                <div style={{ padding:"24px 24px 28px" }}>
                  <div style={{ display:"inline-block",background:s.bg,color:s.accent,fontSize:11,fontWeight:800,padding:"5px 12px",borderRadius:99,marginBottom:14,letterSpacing:"0.04em" }}>{s.num}</div>
                  <h3 style={{ fontSize:20,fontWeight:700,marginBottom:10,letterSpacing:"-0.01em" }}>{s.title}</h3>
                  <p style={{ fontSize:14,color:"#6B7280",lineHeight:1.65 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section style={{ background:"#0A0A14",padding:"88px 0" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 40px",display:"grid",gridTemplateColumns:"repeat(4,1fr)" }}>
          {[
            { v:35,  s:"%",    l:"mais mensagens respondidas", a:"#818CF8" },
            { v:3,   s:"h",    l:"economizadas por dia",       a:"#2DD4BF" },
            { v:5,   s:" min", l:"para configurar",            a:"#FCD34D" },
            { v:24,  s:"/7",   l:"sem interrupção",            a:"#FB7185" },
          ].map((m,i) => (
            <div key={i} style={{ textAlign:"center",padding:"20px 0",borderRight:i<3?"1px solid rgba(255,255,255,.08)":"none" }}>
              <div style={{ fontSize:"clamp(42px,5vw,70px)",fontWeight:900,color:m.a,lineHeight:1,marginBottom:10,fontFamily:'"DM Serif Display",serif' }}>
                <Counter target={m.v} suffix={m.s} />
              </div>
              <div style={{ fontSize:14,color:"rgba(255,255,255,.45)",fontWeight:500 }}>{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background:"#FCFCFD",padding:"100px 0" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 40px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center" }}>
          <div style={{ borderRadius:24,overflow:"hidden",aspectRatio:"4/5",boxShadow:"0 30px 80px rgba(0,0,0,.1)" }}>
            <img src={IMGS.POS} alt="Cliente" style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"55% 10%" }} />
          </div>
          <div>
            <div style={{ marginBottom:24 }}><Pill>Depoimentos</Pill></div>
            <h2 style={{ fontFamily:'"DM Serif Display",serif',fontSize:"clamp(26px,3.2vw,46px)",lineHeight:1.15,marginBottom:40,fontWeight:400,letterSpacing:"-0.02em" }}>
              Usado por PMEs<br /><em style={{ color:"#4F46E5" }}>em todo o Brasil.</em>
            </h2>
            {[
              { q:'"Em 5 minutos meu colaborador já estava respondendo clientes. Nunca mais perdi um lead no WhatsApp."', a:"Ana Lima", b:"Salão Vila Madalena, SP", c:"#4F46E5" },
              { q:'"Minha recepcionista virtual agenda consultas, manda confirmações e nunca reclama. Vale cada centavo."', a:"Dr. Marcos", b:"Clínica Odontológica, RJ", c:"#14B8A6" },
              { q:'"Meu colaborador responde reservas às 23h enquanto eu durmo. Receita que eu simplesmente perderia antes."', a:"Carlos Mendes", b:"Restaurante Bem-Vindo, BH", c:"#F59E0B" },
              { q:'"Reduzi 80% das mensagens repetitivas da minha imobiliária. Os corretores só entram quando o lead está quente."', a:"Patrícia Souza", b:"Imobiliária Central, Curitiba", c:"#F43F5E" },
            ].map((t,i) => (
              <div key={i} style={{ background:"#F9FAFB",border:"1px solid #F1F3F9",borderRadius:16,padding:"24px 24px 24px 28px",marginBottom:16,position:"relative" }}>
                <div style={{ position:"absolute",left:0,top:16,bottom:16,width:4,background:t.c,borderRadius:"0 4px 4px 0" }} />
                <p style={{ fontSize:15,color:"#374151",lineHeight:1.72,marginBottom:16,fontStyle:"italic" }}>{t.q}</p>
                <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                  <div style={{ width:36,height:36,borderRadius:"50%",background:t.c+"22",display:"flex",alignItems:"center",justifyContent:"center",color:t.c,fontWeight:700,fontSize:14 }}>{t.a[0]}</div>
                  <div>
                    <div style={{ fontSize:14,fontWeight:700 }}>{t.a}</div>
                    <div style={{ fontSize:12,color:"#9CA3AF" }}>{t.b}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="precos" style={{ background:"#F9FAFB",padding:"100px 0" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 40px" }}>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:24 }}><Pill>Preços</Pill></div>
          <h2 style={{ textAlign:"center",fontFamily:'"DM Serif Display",serif',fontSize:"clamp(30px,4vw,58px)",marginBottom:16,fontWeight:400,letterSpacing:"-0.02em",lineHeight:1.1 }}>
            Simples, transparente,<br /><em style={{ color:"#4F46E5" }}>sem surpresa.</em>
          </h2>
          <p style={{ textAlign:"center",color:"#6B7280",fontSize:17,marginBottom:8 }}>Escolha o plano para o seu momento. Troque ou cancele quando quiser.</p>
          <p style={{ textAlign:"center",fontSize:15,fontWeight:700,color:"#4F46E5",marginBottom:40 }}>A partir de R$ 299/mês</p>

          {/* Billing toggle */}
          <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:12,marginBottom:56 }}>
            <span style={{ fontSize:14,fontWeight:600,color:billingAnnual?"#9CA3AF":"#0A0A14" }}>Mensal</span>
            <button
              onClick={() => setBillingAnnual(v => !v)}
              style={{ width:52,height:28,borderRadius:99,border:"none",cursor:"pointer",background:billingAnnual?"#4F46E5":"#D1D5DB",position:"relative",transition:"background .2s",padding:0 }}
            >
              <span style={{ position:"absolute",top:3,left:billingAnnual?26:3,width:22,height:22,borderRadius:"50%",background:"white",transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.18)",display:"block" }} />
            </button>
            <span style={{ fontSize:14,fontWeight:600,color:billingAnnual?"#0A0A14":"#9CA3AF" }}>Anual</span>
            <span style={{ background:"#DCFCE7",color:"#16A34A",fontSize:11,fontWeight:800,padding:"3px 10px",borderRadius:99,letterSpacing:"0.04em" }}>−20%</span>
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,alignItems:"start" }}>
            {[
              {
                name:"Pro",
                priceM:"R$ 299", priceA:"R$ 239",
                desc:"Para quem quer operar com agilidade e Pix integrado.",
                highlight:false,
                cta:"Testar grátis 14 dias",
                ctaHref:"https://wa.me/5511976458933?text=Ol%C3%A1%2C%20quero%20o%20plano%20Pro%20do%20DiscutAI_BR%21",
                features:[
                  "1 agente IA",
                  "1.000 mensagens IA/mês",
                  "Modelo IA básico",
                  "1 canal conectado",
                  "3 documentos de conhecimento",
                  "3 ações IA",
                  "Transferência para humano",
                  "Suporte por e-mail",
                ],
              },
              {
                name:"Grow",
                priceM:"R$ 1.199", priceA:"R$ 959",
                desc:"Para negócios em crescimento que querem mais autonomia.",
                highlight:true,
                cta:"Testar grátis 14 dias",
                ctaHref:"https://wa.me/5511976458933?text=Ol%C3%A1%2C%20quero%20o%20plano%20Grow%20do%20DiscutAI_BR%21",
                features:[
                  "3 agentes IA",
                  "15.000 mensagens IA/mês",
                  "Modelo IA avançado",
                  "3 canais conectados",
                  "15 documentos de conhecimento",
                  "5 ações IA",
                  "Transferência para humano",
                  "API conectada às ações IA",
                  "Acesso à API Discutai",
                  "Suporte prioritário",
                ],
              },
              {
                name:"Scale",
                priceM:"A consultar", priceA:"A consultar",
                desc:"Para operações com alto volume e necessidades específicas.",
                highlight:false,
                cta:"Falar com a equipe",
                ctaHref:"https://wa.me/5511976458933?text=Ol%C3%A1%2C%20quero%20saber%20sobre%20o%20plano%20Scale%20do%20DiscutAI_BR%21",
                features:[
                  "10 agentes IA",
                  "40.000 mensagens IA/mês",
                  "Modelo IA avançado",
                  "Todos os canais",
                  "100 documentos de conhecimento",
                  "15 ações IA",
                  "Transferência para humano",
                  "API conectada às ações IA",
                  "Acesso à API Discutai",
                  "Suporte dedicado",
                ],
              },
            ].map((plan,i) => {
              const price = billingAnnual ? plan.priceA : plan.priceM;
              const isConsult = price === "A consultar";
              return (
                <div key={i} style={{ background:plan.highlight?"#4F46E5":"white",border:plan.highlight?"none":"1px solid #F1F3F9",borderRadius:24,padding:32,boxShadow:plan.highlight?"0 20px 60px rgba(79,70,229,.32)":"0 2px 16px rgba(0,0,0,.04)",color:plan.highlight?"white":"#0A0A14",transform:plan.highlight?"scale(1.04)":"none",position:"relative" }}>
                  {plan.highlight && <div style={{ position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",background:"#F59E0B",color:"white",fontSize:11,fontWeight:800,padding:"5px 16px",borderRadius:99,letterSpacing:"0.06em",whiteSpace:"nowrap" }}>MAIS POPULAR</div>}
                  <div style={{ fontSize:12,fontWeight:700,color:plan.highlight?"rgba(255,255,255,.55)":"#9CA3AF",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.06em" }}>{plan.name}</div>
                  <div style={{ fontSize:isConsult?26:42,fontWeight:900,lineHeight:1,marginBottom:4 }}>{price}</div>
                  {!isConsult && <div style={{ fontSize:14,color:plan.highlight?"rgba(255,255,255,.55)":"#9CA3AF",marginBottom:16 }}>/mês{billingAnnual?" · cobrado anualmente":""}</div>}
                  {isConsult && <div style={{ fontSize:14,color:plan.highlight?"rgba(255,255,255,.55)":"#9CA3AF",marginBottom:16 }}>personalizado</div>}
                  <p style={{ fontSize:14,color:plan.highlight?"rgba(255,255,255,.72)":"#6B7280",marginBottom:24,lineHeight:1.55 }}>{plan.desc}</p>
                  <div style={{ borderTop:plan.highlight?"1px solid rgba(255,255,255,.15)":"1px solid #F1F3F9",paddingTop:20,marginBottom:24 }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display:"flex",gap:10,alignItems:"flex-start",marginBottom:11 }}>
                        <span style={{ color:plan.highlight?"#A5F3FC":"#22C55E",fontSize:13,fontWeight:700,flexShrink:0,marginTop:1 }}>✓</span>
                        <span style={{ fontSize:13,color:plan.highlight?"rgba(255,255,255,.85)":"#374151",lineHeight:1.4 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href={plan.ctaHref} className="btn-p" target="_blank" rel="noopener noreferrer" style={{ display:"block",textAlign:"center",padding:"13px 0",borderRadius:10,background:plan.highlight?"white":"#4F46E5",color:plan.highlight?"#4F46E5":"white",fontWeight:700,fontSize:15,textDecoration:"none" }}>
                    {plan.cta}
                  </a>
                </div>
              );
            })}
          </div>
          <p style={{ textAlign:"center",fontSize:13,color:"#9CA3AF",marginTop:32 }}>✓ 14 dias grátis &nbsp;·&nbsp; ✓ Sem cartão de crédito &nbsp;·&nbsp; ✓ Cancele quando quiser</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:"#4F46E5",padding:"108px 0",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",backgroundSize:"60px 60px" }} />
        <div style={{ position:"relative",textAlign:"center",padding:"0 40px" }}>
          <h2 style={{ fontFamily:'"DM Serif Display",serif',fontSize:"clamp(30px,5vw,64px)",color:"white",marginBottom:20,fontWeight:400,lineHeight:1.15,letterSpacing:"-0.02em" }}>
            Pronto para o seu<br /><em style={{ color:"rgba(255,255,255,.75)" }}>colaborador virtual?</em>
          </h2>
          <p style={{ color:"rgba(255,255,255,.6)",fontSize:18,marginBottom:44,lineHeight:1.6 }}>Configure hoje. Resultado amanhã.</p>
          <a className="btn-p" href="#/solucoes" style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"18px 44px",borderRadius:14,background:"white",color:"#4F46E5",border:"none",fontSize:18,fontWeight:700,boxShadow:"0 8px 32px rgba(0,0,0,.22)",letterSpacing:"-0.01em",textDecoration:"none" }}>
            Ver soluções por setor →
          </a>
          <p style={{ color:"rgba(255,255,255,.35)",fontSize:13,marginTop:28 }}>Imobiliária · Salão · Dentista · Restaurante · E-commerce · Loja · Médico</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#0A0A14",padding:"36px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16 }}>
        <img src={IMGS.LOGO} alt="DiscutAI_BR" style={{ height:28,filter:"brightness(2) saturate(0.4)" }} />
        <p style={{ fontSize:13,color:"rgba(255,255,255,.25)" }}>© 2026 DiscutAI_BR — Plataforma de colaboradores virtuais para PMEs</p>
        <p style={{ fontSize:13,color:"rgba(255,255,255,.3)" }}>contato@discutai.br</p>
      </footer>
    </div>
  );
}
