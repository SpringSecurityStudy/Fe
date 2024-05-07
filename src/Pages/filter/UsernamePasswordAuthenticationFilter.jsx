import CodeBlock from "../../components/CodeBlock";
import FlowChart from "../../components/FlowChart";
import Header from "../../components/Header";
import NavigateSpan from "../../components/NavigateSpan";
const usernamePassword = [
  {
    name: "client",
    content: "로그인요청",
  },
  {
    name: "UsernamePasswordAuthenticationFilter",
    content: "  ",
  },
  {
    name: "RequestMatcher",
    content: "요청청정보 매칭확인,실패하면 chain.doFilter 다음필터로 이동시킨다.",
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
    name: "SessionAuthenticationStrategy",
    content: "새로운 로그인을 알리고 세션관련 작업들을 수행한다.",
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
    name: "ApplicationEventPublisher",
    content: "인증 성공 이벤트를 게시한다.",
  },
  {
    name: "AuthenticationSuccessHandler",
    content: "인증 성공 핸들러를 호출한다",
  },
];
const failed = [
  {
    name: "SecurityContextHolder",
    content: "SecurityContextHolder가 삭제된다",
  },
  {
    name: "RememberMeService",
    content: "RememberMeService.loginFail 이 호출된다.",
  },
  {
    name: "AuthenticationFailureHandler",
    content: "인증 실패 핸들러를 호출한다",
  },
];

const attemptAuthentication = `public class UsernamePasswordAuthenticationFilter{
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
            //http method방식이 POST인지 검사한다.
        if (this.postOnly && !request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        } else {
            //username 을 가져온다 
            String username = this.obtainUsername(request);
            username = username != null ? username.trim() : "";
            //password 을 가져온다 
            String password = this.obtainPassword(request);
            password = password != null ? password : "";
            //unauthenticated 아직 인증되지않은 사용자의 아이디와 비밀번호만으로 Token을 만든다
            UsernamePasswordAuthenticationToken authRequest = UsernamePasswordAuthenticationToken.unauthenticated(username, password);
            this.setDetails(request, authRequest);
            //getAuthenticationManager 에게 인증처리를 요청
            return this.getAuthenticationManager().authenticate(authRequest);
        }
    } 
 }
`;

const UsernamePasswordAuthenticationFilter = () => {
  return (
    <div>
      <Header text={"UsernamePasswordAuthenticationFilter"} />
      <h4>AbstractAuthenticationProcessingFilter</h4>
      <li>
        스프링 시큐리티는
        <NavigateSpan
          navi={"/abstractAuthenticationProcessingFilter"}
          text={"AbstractAuthenticationProcessingFilter"}
        />
        클래스를 사용자의 자격증명을 인증하는 기본필터로 사용한다.
      </li>
      <li>UsernamePasswordAuthenticationFilter 는 AbstractAuthenticationProcessingFilter 를 확장한 클래스이다.</li>
      <li>attemptAuthentication() 메서드를 제정의해서 사용한다.</li>
      <CodeBlock text={attemptAuthentication} />
      <FlowChart title="UsernamePasswordAuthenticationFilter" arry={usernamePassword} />
      <FlowChart title="success" arry={success} />
      <FlowChart title="failed" arry={failed} />
    </div>
  );
};

export default UsernamePasswordAuthenticationFilter;
