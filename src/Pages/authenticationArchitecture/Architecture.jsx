import FlowChart from "../../components/FlowChart";
import Header from "../../components/Header";
import "./Architecture.css";
const ServletFilter = [
  {
    name: "DelegatingFilterProxy",
  },
  {
    name: "FilterChainProxy(SecurityFilterChain)",
  },
];
const SecurityContextHolder = [
  {
    name: "SecurityContextHolder",
    content: "SecurityContext, Authentication, UserDetails",
  },
];
const Authentication = [
  {
    name: "AuthenticationFilter",
  },
  {
    name: "Authentication",
  },
  {
    name: "AuthenticationManager",
  },
  {
    name: "AuthenticationProvider",
  },
];
const Authorization = [
  {
    name: "AuthorizationFilter",
  },
  {
    name: "AuthorizationManager",
  },
  {
    name: "AuthorizationDecision",
  },
];
const springMVC = [
  {
    name: "Contorller",
  },
  {
    name: "Service",
  },
  {
    name: "Repository",
  },
];
const Architecture = () => {
  return (
    <div>
      <Header text={"Security 인증/ 인가 흐름도"} />
      <div className="archi ">
        <FlowChart title={"ServletFilter"} arry={ServletFilter} />
        <li>여러 필터를거쳐 DelegationgFilterProxy로 들어오게되면</li>
        <li>
          SecurityFilterChain의 이름을 가진 빈을 찾게되고 그빈을찾게되면 스프링시큐리티의 보안장치를 이용하게된다.
        </li>
      </div>
      <div className="archi ">
        <div
          style={{
            display: "flex",
            gap: "24px",
          }}
        >
          <FlowChart title={"SecurityContextHolder"} arry={SecurityContextHolder} />
          <FlowChart title={"Authentication"} arry={Authentication} />
        </div>
        <li>AuthenticationFilter를 호출하게되고 Authentication객체를만든다.</li>
        <li>Authentication 을 AuthenticationManager에게넘겨주게되고 </li>
        <li>AuthenticationManager는 AuthenticationProvider에게 사용자의 아이디가맞는지 pw가 맞는지 인증을 위임한다</li>

        <li>AuthenticationProvider 는 UserDetailsService 를통해서 사용자의 정보를 가저와 조회한다.</li>
        <li>UserDetailsService는 UserDetails 타입의 객체를만들어 Provider에게 반환을한다.</li>
        <li>
          AuthenticationProvider는 사용자정보가 null이라면 인증이되지않았기때문에 더이상처리를하지않고 다음필터로
          넘긴다.
        </li>
        <li>그렇지않다면 유저정보를가져와 passwordEncoder를통해 비밀번호 검증을하게되고 성공한다면</li>
        <li>
          AuthenticationProvider 에서는 인증을마치면 user 객체와 권한정보를 를 Authentiaction에 넣고
          AuthenticationManager 에게 위임한다
        </li>
        <li>AuthenticationManager 에서 AuthenticationFilter 까지넘겨주게된다.</li>
        <li>
          최종적으로 AuthenticationFilter는 가져온 최종정보를 SecurityContextHolder 를통해 유저객체를 SecurityContext에
          저장하게된다.
        </li>
      </div>
      <FlowChart title={"Authorization"} arry={Authorization} />
      <FlowChart title={"springMVC"} arry={springMVC} />
    </div>
  );
};

export default Architecture;
