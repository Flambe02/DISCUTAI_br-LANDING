import { useEffect, useState } from "react";
import DiscutAiLanding from "./DiscutAI_Landing";
import SolutionsSubpages from "./SolutionsSubpages";
import QuemSomos from "./QuemSomos";

function parseHash(hash) {
  const cleaned = (hash || "").replace(/^#\/?/, "");
  if (!cleaned) return "home";
  if (cleaned.startsWith("solucoes")) return "solutions";
  if (cleaned.startsWith("quem-somos")) return "quemsomos";
  return "home";
}

export default function App() {
  const [page, setPage] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      setPage(parseHash(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const WA_HREF = "https://wa.me/5511919493562?text=Ol%C3%A1%2C%20quero%20testar%20o%20DiscutAI_BR%21";

  const floatBtn = (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      title="Fale conosco no WhatsApp"
      style={{
        position:"fixed", bottom:28, right:28, zIndex:9999,
        width:60, height:60, borderRadius:"50%",
        background:"#25D366", boxShadow:"0 6px 24px rgba(37,211,102,.5)",
        display:"flex", alignItems:"center", justifyContent:"center",
        textDecoration:"none", transition:"transform .2s, box-shadow .2s",
      }}
      onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.12)";e.currentTarget.style.boxShadow="0 10px 36px rgba(37,211,102,.65)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 6px 24px rgba(37,211,102,.5)";}}
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.493.648 4.833 1.783 6.865L2 30l7.343-1.762A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" fill="white"/>
        <path d="M22.863 19.63c-.308-.154-1.822-.899-2.104-1.001-.282-.103-.487-.154-.692.154-.205.308-.795.999-1.001 1.205-.185.205-.37.231-.677.077-.308-.154-1.3-.479-2.476-1.528-.915-.817-1.533-1.825-1.713-2.133-.18-.308-.019-.474.135-.627.138-.138.308-.359.462-.538.154-.18.205-.308.308-.513.103-.205.051-.385-.026-.538-.077-.154-.692-1.667-.948-2.282-.25-.599-.504-.518-.692-.527l-.59-.01a1.13 1.13 0 00-.82.385c-.282.308-1.077 1.052-1.077 2.565s1.103 2.976 1.257 3.181c.154.205 2.17 3.312 5.258 4.643.735.317 1.308.507 1.756.649.738.235 1.41.202 1.94.122.592-.088 1.822-.745 2.079-1.464.256-.719.256-1.335.18-1.464-.077-.128-.282-.205-.59-.359z" fill="#25D366"/>
      </svg>
    </a>
  );

  if (page === "solutions") return <>{<SolutionsSubpages />}{floatBtn}</>;
  if (page === "quemsomos") return <>{<QuemSomos />}{floatBtn}</>;
  return <>{<DiscutAiLanding />}{floatBtn}</>;
}
