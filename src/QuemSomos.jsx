import Nav from "./Nav";
import { assetUrl } from "./assetUrl";

const LOGO = assetUrl("images/logo.webp");

const VALUES = [
  { icon: "◆", title: "Simplicidade primeiro", desc: "Configuração em minutos, sem linha de código. Se for complicado, ainda não acabamos.", accent: "#4F46E5", bg: "#EEF2FF" },
  { icon: "◈", title: "Resultado acima de tudo", desc: "Cada colaborador existe para gerar impacto real: menos trabalho manual, mais vendas, mais clientes atendidos.", accent: "#14B8A6", bg: "#CCFBF1" },
  { icon: "◉", title: "Construído para o Brasil", desc: "Pix, WhatsApp, Google Agenda, PT-BR, conformidade LGPD. Feito para a realidade das PMEs brasileiras.", accent: "#F59E0B", bg: "#FEF3C7" },
  { icon: "◎", title: "Humano quando importa", desc: "A IA assume o volume — mas quando o cliente precisa de uma pessoa, o colaborador passa o contexto completo.", accent: "#F43F5E", bg: "#FFE4E6" },
];

export default function QuemSomos() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: '"Work Sans", system-ui, sans-serif', background: "#FCFCFD", color: "#0A0A14", margin: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Work+Sans:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .qs-btn{transition:all .18s;cursor:pointer;}
        .qs-btn:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(79,70,229,.38)!important;}
        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-thumb{background:#D1D5E8;border-radius:99px;}
      `}</style>

      <Nav activePage="quemsomos" />

      {/* HERO */}
      <section style={{ padding: "96px 0 80px", background: "linear-gradient(135deg,#FCFCFD 0%,#EEF2FF 100%)", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, border: "1px solid rgba(79,70,229,.18)", background: "rgba(238,242,255,.88)", color: "#4F46E5", padding: "8px 16px", fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 32 }}>
            ✦ Nossa História
          </div>
          <h1 style={{ fontFamily: '"DM Serif Display", serif', fontSize: "clamp(36px,5vw,72px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 24 }}>
            Criamos o colaborador<br /><em style={{ color: "#4F46E5" }}>que sua empresa precisa.</em>
          </h1>
          <p style={{ fontSize: 19, color: "#6B7280", lineHeight: 1.65, maxWidth: 600, margin: "0 auto" }}>
            DiscutAI_BR nasceu de uma pergunta simples: por que pequenas empresas brasileiras ainda perdem vendas por falta de resposta rápida? A resposta virou produto.
          </p>
        </div>
      </section>

      {/* MISSÃO */}
      <section style={{ padding: "88px 0", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#4F46E5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Nossa Missão</div>
            <h2 style={{ fontFamily: '"DM Serif Display", serif', fontSize: "clamp(28px,3vw,44px)", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 24 }}>
              Democratizar a IA para<br /><em style={{ color: "#4F46E5" }}>toda PME brasileira.</em>
            </h2>
            <p style={{ fontSize: 17, color: "#6B7280", lineHeight: 1.7, marginBottom: 20 }}>
              Grandes empresas têm times inteiros de atendimento. PMEs têm o dono respondendo WhatsApp às 23h. Isso não é justo — e tem solução.
            </p>
            <p style={{ fontSize: 17, color: "#6B7280", lineHeight: 1.7 }}>
              O DiscutAI_BR coloca um colaborador virtual treinado para o seu setor, disponível 24h, nos canais que seus clientes já usam — com o mesmo nível de qualidade de grandes operações.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { num: "24h", label: "Atendimento contínuo, todos os dias" },
              { num: "5 min", label: "Setup e colaborador funcionando" },
              { num: "99,9%", label: "Uptime garantido na plataforma" },
              { num: "🔒", label: "Conformidade LGPD" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#F9FAFB", borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#4F46E5", lineHeight: 1, marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.45 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE FAZEMOS */}
      <section style={{ padding: "88px 0", background: "#F9FAFB" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#4F46E5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>O que fazemos</div>
            <h2 style={{ fontFamily: '"DM Serif Display", serif', fontSize: "clamp(28px,3vw,44px)", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Um colaborador para cada<br /><em style={{ color: "#4F46E5" }}>tipo de negócio.</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { icon: "💬", title: "Atendimento 24h", desc: "Seu colaborador responde clientes no WhatsApp, Instagram, Messenger ou no seu site — sem pausas, sem feriado, sem segunda via." },
              { icon: "📅", title: "Agendamentos e pedidos", desc: "Agenda consultas, confirma reservas, recebe pedidos e registra compras — tudo de forma automática e integrada." },
              { icon: "💳", title: "Pagamento e confirmação", desc: "Cobra via Pix no chat, envia comprovante, confirma o horário. Zero trabalho manual para o seu time." },
              { icon: "🎯", title: "Qualificação de leads", desc: "Filtra e organiza os contatos antes do seu time entrar — só os leads quentes chegam até você." },
              { icon: "🔄", title: "Follow-up automático", desc: "Lembra, confirma, reagenda e mantém o cliente aquecido — sem ninguém precisar fazer isso manualmente." },
              { icon: "🔧", title: "Escalation configurável", desc: "Você define quando o colaborador passa o controle. O contexto completo é entregue para sua equipe entrar preparada." },
            ].map((item, i) => (
              <div key={i} style={{ background: "white", borderRadius: 16, padding: "28px 24px", border: "1px solid #F1F3F9" }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: "#0A0A14" }}>{item.title}</div>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section style={{ padding: "88px 0", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#4F46E5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Nossos Valores</div>
            <h2 style={{ fontFamily: '"DM Serif Display", serif', fontSize: "clamp(28px,3vw,44px)", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              O que guia cada<br /><em style={{ color: "#4F46E5" }}>decisão que tomamos.</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{ background: v.bg, borderRadius: 20, padding: "32px 28px", display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ fontSize: 22, color: v.accent, flexShrink: 0, marginTop: 2 }}>{v.icon}</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#0A0A14", marginBottom: 8 }}>{v.title}</div>
                  <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#4F46E5", padding: "96px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ position: "relative", padding: "0 40px" }}>
          <h2 style={{ fontFamily: '"DM Serif Display", serif', fontSize: "clamp(30px,5vw,56px)", color: "white", marginBottom: 20, fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Pronto para o seu<br /><em style={{ color: "rgba(255,255,255,.75)" }}>colaborador virtual?</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,.6)", fontSize: 18, marginBottom: 44, lineHeight: 1.6 }}>Configure hoje. Resultado amanhã.</p>
          <a className="qs-btn" href="#/solucoes" style={{ display: "inline-flex", alignItems: "center", padding: "18px 44px", borderRadius: 14, background: "white", color: "#4F46E5", fontSize: 18, fontWeight: 700, boxShadow: "0 8px 32px rgba(0,0,0,.22)", textDecoration: "none", letterSpacing: "-0.01em" }}>
            Ver soluções por setor →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0A0A14", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <img src={LOGO} alt="DiscutAI_BR" style={{ height: 28, filter: "brightness(2) saturate(0.4)" }} />
        <span style={{ color: "rgba(255,255,255,.35)", fontSize: 13 }}>© 2026 DiscutAI_BR — Colaboradores virtuais para PMEs brasileiras</span>
        <span style={{ color: "rgba(255,255,255,.35)", fontSize: 13 }}>contacto@discutai.com.br</span>
      </footer>
    </div>
  );
}
