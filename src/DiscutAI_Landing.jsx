import { useState, useEffect, useRef } from "react";

const IMGS = {
  LOGO: "/images/logo.webp",
  HERO: "/images/hero.webp",
  POS: "/images/pos.webp",
  LEARN: "/images/learn.webp",
  BADGE: "/images/badge.webp",
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
  { emoji:"💇‍♀️", role:"Recepcionista", sector:"Salão de Beleza",     tasks:"Agendamentos, serviços e preços",   accent:"#4F46E5", bg:"#EEF2FF" },
  { emoji:"🦷",   role:"Assistente",    sector:"Clínica / Dentista",  tasks:"Consultas e orientações",           accent:"#14B8A6", bg:"#CCFBF1" },
  { emoji:"🍽",   role:"Atendente",     sector:"Restaurante",          tasks:"Reservas, cardápio e pedidos",      accent:"#F59E0B", bg:"#FEF3C7" },
  { emoji:"🏠",   role:"Consultor",     sector:"Imobiliária",          tasks:"Leads, visitas e informações",      accent:"#F43F5E", bg:"#FFE4E6" },
  { emoji:"👔",   role:"Vendedor",      sector:"Loja de Roupas",       tasks:"Catálogo, promoções e vendas",      accent:"#4F46E5", bg:"#EEF2FF" },
  { emoji:"🏥",   role:"Triagem",       sector:"Clínica Médica",       tasks:"Agendamentos e orientações",        accent:"#14B8A6", bg:"#CCFBF1" },
  { emoji:"💰",   role:"Assistente",    sector:"Assessor Financeiro",  tasks:"Qualificação e produtos",           accent:"#F59E0B", bg:"#FEF3C7" },
  { emoji:"📊",   role:"Atendente",     sector:"Escritório Contábil",  tasks:"Dúvidas e reuniões",                accent:"#F43F5E", bg:"#FFE4E6" },
];

const STEPS = [
  { num:"01", title:"Escolha seu colaborador", desc:"Navegue pela biblioteca e escolha o perfil ideal para o seu negócio.", img:IMGS.BADGE, accent:"#4F46E5", bg:"#EEF2FF" },
  { num:"02", title:"Conecte o WhatsApp",      desc:"Integração direta com WhatsApp Business. Nenhuma linha de código.", img:IMGS.LEARN, accent:"#14B8A6", bg:"#CCFBF1" },
  { num:"03", title:"Comece a atender",        desc:"Seu colaborador entra em ação imediatamente. Você foca no que importa.", img:IMGS.POS,   accent:"#F59E0B", bg:"#FEF3C7" },
];


export default function App() {
  const [activeJob, setActiveJob] = useState(null);

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
      `}</style>

      {/* NAV */}
      <nav style={{ position:"sticky",top:0,zIndex:100,background:"rgba(255,255,255,.94)",backdropFilter:"blur(18px)",borderBottom:"1px solid #EAECF4",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 48px",height:68 }}>
        <img src={IMGS.LOGO} alt="DiscutAI_BR" style={{ height:32,filter:"brightness(0)" }} />
        <div style={{ display:"flex",gap:36 }}>
          {["Produto","Colaboradores","Preços","Blog"].map(n => (
            <a key={n} href="#" style={{ fontSize:15,color:"#6B7280",fontWeight:500,textDecoration:"none",transition:"color .15s" }}
               onMouseEnter={e=>e.target.style.color="#0A0A14"} onMouseLeave={e=>e.target.style.color="#6B7280"}>{n}</a>
          ))}
        </div>
        <div style={{ display:"flex",gap:12 }}>
          <button className="btn-g" style={{ padding:"10px 22px",borderRadius:10,border:"1px solid #E5E7EB",background:"white",fontSize:14,fontWeight:600,color:"#374151" }}>Entrar</button>
          <button className="btn-p" style={{ padding:"10px 22px",borderRadius:10,background:"#4F46E5",color:"white",border:"none",fontSize:14,fontWeight:700,boxShadow:"0 4px 16px rgba(79,70,229,.28)" }}>Começar grátis</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding:"96px 0 0",background:"#FCFCFD" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 40px" }}>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:32 }}>
            <Pill>✦  Colaboradores virtuais para PMEs brasileiras</Pill>
          </div>
          <h1 style={{ textAlign:"center",fontFamily:'"DM Serif Display",serif',fontSize:"clamp(48px,6.5vw,92px)",lineHeight:1.06,letterSpacing:"-0.02em",marginBottom:28,fontWeight:400 }}>
            Seu colaborador virtual<br />
            <em style={{ color:"#4F46E5" }}>favorito já trabalha aqui.</em>
          </h1>
          <p style={{ textAlign:"center",fontSize:19,color:"#6B7280",maxWidth:540,margin:"0 auto 40px",lineHeight:1.65 }}>
            Configure em 5 minutos. Atende 24h. Especializado no seu setor e conectado ao seu WhatsApp Business.
          </p>
          <div style={{ display:"flex",justifyContent:"center",gap:12,marginBottom:18 }}>
            <button className="btn-p" style={{ padding:"16px 32px",borderRadius:14,background:"#4F46E5",color:"white",border:"none",fontSize:17,fontWeight:700,boxShadow:"0 8px 24px rgba(79,70,229,.28)",letterSpacing:"-0.01em" }}>Escolher meu colaborador →</button>
            <button className="btn-g" style={{ padding:"16px 32px",borderRadius:14,border:"1px solid #E5E7EB",background:"white",fontSize:17,fontWeight:600,color:"#374151" }}>Ver demonstração</button>
          </div>
          <p style={{ textAlign:"center",fontSize:13,color:"#9CA3AF",marginBottom:64 }}>✓ Sem cartão de crédito &nbsp;·&nbsp; ✓ Setup em 5 minutos &nbsp;·&nbsp; ✓ Cancele quando quiser</p>

          {/* Hero image with floating badges */}
          <div style={{ position:"relative",borderRadius:28,overflow:"hidden",aspectRatio:"16/7",boxShadow:"0 40px 120px rgba(0,0,0,.12)" }}>
            <img src={IMGS.HERO} alt="Colaborador virtual DiscutAI_BR" style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 18%" }} />
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(to right, rgba(0,0,0,.22) 0%, transparent 35%, transparent 65%, rgba(0,0,0,.18) 100%)" }} />
            {[
              { top:32,  left:32,  value:"24/7",  label:"sem interrupção",   accent:"#22C55E" },
              { top:32,  right:32, value:"3×",    label:"mais conversões",   accent:"#4F46E5" },
              { bottom:32, left:32,  value:"5 min", label:"para configurar", accent:"#F59E0B" },
              { bottom:32, right:32, value:"80%",   label:"menos trabalho",  accent:"#14B8A6" },
            ].map((b,i) => (
              <div key={i} style={{ position:"absolute",...b, background:"rgba(255,255,255,.95)",backdropFilter:"blur(12px)",borderRadius:16,padding:"14px 20px",minWidth:150,boxShadow:"0 8px 32px rgba(0,0,0,.12)" }}>
                <div style={{ fontSize:30,fontWeight:900,color:b.accent,lineHeight:1,marginBottom:5 }}>{b.value}</div>
                <div style={{ fontSize:12,color:"#6B7280",fontWeight:500 }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <div style={{ background:"#F9FAFB",borderTop:"1px solid #F1F3F9",borderBottom:"1px solid #F1F3F9",padding:"20px 0" }}>
        <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:48,flexWrap:"wrap",padding:"0 40px" }}>
          {["WhatsApp Business API","SOC 2 Type 2","HIPAA Compliant","Dados no Brasil","99.9% Uptime"].map(t => (
            <span key={t} style={{ fontSize:11,fontWeight:600,color:"#9CA3AF",letterSpacing:"0.06em",textTransform:"uppercase",fontFamily:"monospace" }}>{t}</span>
          ))}
        </div>
      </div>

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
              { title:"Disponível 24/7",     desc:"Nunca cansa. Nunca falta. Atende enquanto você descansa ou trabalha.",         accent:"#F59E0B",bg:"#FEF3C7",icon:"◉" },
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
      <section style={{ background:"#F9FAFB",padding:"100px 0" }}>
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
                <span style={{ fontSize:13,fontWeight:600,color:j.accent }}>Selecionar →</span>
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
            { v:3,   s:"×",    l:"mais conversões",       a:"#818CF8" },
            { v:80,  s:"%",    l:"menos trabalho manual", a:"#2DD4BF" },
            { v:5,   s:" min", l:"para configurar",       a:"#FCD34D" },
            { v:24,  s:"/7",   l:"sem interrupção",       a:"#FB7185" },
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
              { q:'"Em 5 minutos meu colaborador já estava respondendo clientes. Nunca mais perdi um lead."', a:"Ana Lima", b:"Salão Vila Madalena, SP", c:"#4F46E5" },
              { q:'"Minha recepcionista virtual agenda consultas, manda confirmações e nunca reclama."',      a:"Dr. Marcos", b:"Clínica Odontológica, RJ", c:"#14B8A6" },
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

      {/* CTA */}
      <section style={{ background:"#4F46E5",padding:"108px 0",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",backgroundSize:"60px 60px" }} />
        <div style={{ position:"relative",textAlign:"center",padding:"0 40px" }}>
          <h2 style={{ fontFamily:'"DM Serif Display",serif',fontSize:"clamp(30px,5vw,64px)",color:"white",marginBottom:20,fontWeight:400,lineHeight:1.15,letterSpacing:"-0.02em" }}>
            Pronto para o seu<br /><em style={{ color:"rgba(255,255,255,.75)" }}>colaborador virtual?</em>
          </h2>
          <p style={{ color:"rgba(255,255,255,.6)",fontSize:18,marginBottom:44,lineHeight:1.6 }}>Configure hoje. Resultado amanhã.</p>
          <button className="btn-p" style={{ padding:"18px 44px",borderRadius:14,background:"white",color:"#4F46E5",border:"none",fontSize:18,fontWeight:700,boxShadow:"0 8px 32px rgba(0,0,0,.22)",letterSpacing:"-0.01em" }}>
            Escolher meu colaborador virtual →
          </button>
          <p style={{ color:"rgba(255,255,255,.35)",fontSize:13,marginTop:28 }}>Imobiliária · Salão · Dentista · Restaurante · Loja · Médico · Contador</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#0A0A14",padding:"36px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16 }}>
        <img src={IMGS.LOGO} alt="DiscutAI_BR" style={{ height:28,filter:"brightness(10)" }} />
        <p style={{ fontSize:13,color:"rgba(255,255,255,.25)" }}>© 2026 DiscutAI_BR — Plataforma de colaboradores virtuais para PMEs</p>
        <p style={{ fontSize:13,color:"rgba(255,255,255,.3)" }}>contato@discutai.br</p>
      </footer>
    </div>
  );
}
