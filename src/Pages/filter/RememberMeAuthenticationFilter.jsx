import FlowChart from "../../components/FlowChart";
import Header from "../../components/Header";
const basicAuthenticationFilter = [
  {
    name: "client",
    content: "Get/user",
  },
  {
    name: "RememberMeAuthenticationFilter",
    content: "",
  },
  {
    name: "Authentication",
    content: "Authentication != null",
  },
];
const notNull = [
  {
    name: "chain.doFilter",
    content: "인증을이미 받았기때문에 chain.doFilter",
  },
];
const nully = [
  {
    name: "RememberMeServices.autologin()",
    content: "메서드를 호출해서 자동로그인처리를한다",
  },
  {
    name: "RememberMeAuthenticationToken",
    content: "(UserDetails + Authorities)",
  },
  {
    name: "AuthenticationManager",
    content: "(UserDetails + Authorities)",
  },
];

const failed = [
  {
    name: "RememberMeServices",
    content: "",
  },

  {
    name: "loginFail()",
    content: "쿠키를 지운다.",
  },
];
const success = [
  {
    name: "RememberMeAuthenticationToken",
    content: "",
  },

  {
    name: "SecurityContextHolder",
    content: "Authentication 을 SecurityContext에 설정한다",
  },
  {
    name: "SecurityContextRepository",
    content: "세션에 SecurityContext가 저장된다",
  },
  {
    name: "ApplicationEventPublisher",
    content: "인증 성공 이벤트를 게시한다.",
  },
];
const RememberMeAuthenticationFilter = () => {
  return (
    <div>
      <Header text={"RememberMeAuthenticationFilter"} />

      <h3>RememberMeAuthentiactionFilter</h3>
      <li>SecurityContextHolder에 Authentication이 포함되지 않은경우 실행되는 필터</li>
      <li>세션이 만료되ㅏ었거나 어플리케이션 종료료인해 인증상태가 소멸된 경우</li>
      <FlowChart title={"basicAuthenticationFilter"} arry={basicAuthenticationFilter} />
      <div style={{ display: "flex", gap: "12px" }}>
        <FlowChart title={"null이 아닌경우"} arry={notNull} />

        <FlowChart title={"null 인경우"} arry={nully} />
      </div>
      <FlowChart title={"success"} arry={success} />
      <FlowChart title={"failed"} arry={failed} />
    </div>
  );
};

export default RememberMeAuthenticationFilter;
