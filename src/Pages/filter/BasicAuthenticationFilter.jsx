import FlowChart from "../../components/FlowChart";
import Header from "../../components/Header";

const basicAuthenticationFilter = [
  {
    name: "client",
    content: "로그인요청",
  },
  {
    name: "BasicAuthenticationFilter",
    content: "  ",
  },

  {
    name: "UsernamePasswordAuthenticationToken",
    content: "(Username, Password)",
  },
  {
    name: "AuthenticationManager",
    content: "인증처리를한다 ",
  },
];
const success = [
  {
    name: "UsernamePasswordAuthenticationToken",
    content: "(UserDetails + Authorities)",
  },

  {
    name: "SecurityContextHolder",
    content: "Authentication 을 SecurityContext에 설정한다",
  },
  {
    name: "RememberMeService",
    content: "RememberMe서비스가 설정된경우 (RememberMeService.loginSuccess가 호출된다.",
  },
  {
    name: "chain.dofilter",
    content: "애플리케이션 로직을 계속 실행한다.",
  },
];

const BasicAuthenticationFilter = () => {
  return (
    <div>
      <Header text={"BasicAuthenticationFilter"} />
      <FlowChart title="basicAuthenticationFilter" arry={basicAuthenticationFilter} />
    </div>
  );
};

export default BasicAuthenticationFilter;
