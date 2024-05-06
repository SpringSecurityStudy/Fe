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
const AbstractAuthenticationProcessingFilter = `public abstract class AbstractAuthenticationProcessingFilter{
    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (!this.requiresAuthentication(request, response)) {
            chain.doFilter(request, response);
        } else {
            try {
                Authentication authenticationResult = this.attemptAuthentication(request, response);
                if (authenticationResult == null) {
                    return;
                }

                this.sessionStrategy.onAuthentication(authenticationResult, request, response);
                if (this.continueChainBeforeSuccessfulAuthentication) {
                    chain.doFilter(request, response);
                }

                this.successfulAuthentication(request, response, chain, authenticationResult);
            } catch (InternalAuthenticationServiceException var5) {
                InternalAuthenticationServiceException failed = var5;
                this.logger.error("An internal error occurred while trying to authenticate the user.", failed);
                this.unsuccessfulAuthentication(request, response, failed);
            } catch (AuthenticationException var6) {
                AuthenticationException ex = var6;
                this.unsuccessfulAuthentication(request, response, ex);
            }

        }
    }
}
`;
const usernamePasswordAuthenticationFilter = `public class UsernamePasswordAuthenticationFilter{
   public Authentication attemptAuthentication() {
    ...
       //사용자 정보를 가져와 Token 에 저장한다.
      UsernamePasswordAuthenticationToken authRequest = UsernamePasswordAuthenticationToken.unauthenticated(username, password);
       //getAuthenticationManager 에게 인증처리를 요청
      return this.getAuthenticationManager().authenticate(authRequest);
   }
}
`;

const UsernamePasswordAuthenticationFilter = () => {
  return (
    <div>
      <Header text={"UsernamePasswordAuthenticationFilter"} />
      <h4>AbstractAuthenticationProcessingFilter</h4>
      <li>
        스프링 시큐리티는 AbstractAuthenticationProcessingFilter 클래스를 사용자의 자격증명을 인증하는 기본필터로
        사용한다.
      </li>
      <li>UsernamePasswordAuthenticationFilter 는 AbstractAuthenticationProcessingFilter 를 확장한 클래스이다.</li>
      <li>attemptAuthentication() 메서드를 제정의해서 사용한다.</li>
      <FlowChart title="UsernamePasswordAuthenticationFilter" arry={usernamePassword} />
      <FlowChart title="success" arry={success} />
      <FlowChart title="failed" arry={failed} />
      <CodeBlock text={AbstractAuthenticationProcessingFilter} />
      <li>attemptAuthentication()인증을 하기위해 시도한다.</li>
      <CodeBlock text={usernamePasswordAuthenticationFilter} />
      <li>username 과 password를 가져와서 UsernamePasswordAuthenticationToken에 저장한다. </li>
      <li>인증전이기때문에 unauthenticated </li>
      <li>인증처리를 하기위해서 getAuthenticationManager 로 위임한다.</li>
      <li>sessionStrategy 세션에 저장하고</li>
      <li>
        <NavigateSpan navi={"/securityContext"} text={"successfulAuthentication"} /> SecurityContext에 유저정보를
        저장한다.
      </li>
    </div>
  );
};

export default UsernamePasswordAuthenticationFilter;
