import CodeBlock from "../../components/CodeBlock";
import FlowChart from "../../components/FlowChart";
import Header from "../../components/Header";
import NavigateSpan from "../../components/NavigateSpan";

const basicAuthenticationFilter = [
  {
    name: "client",
    content: "로그인요청",
  },
  {
    name: "BasicAuthenticationFilter",
    content: "",
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
    name: "AuthenticationEntryPoint",
    content: "WWW-Authenticate 를 보내도록 호출된다",
  },
];

const basicAuthenticationFilterCode = `
public class BasicAuthenticationFilter extends OncePerRequestFilter {
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            Authentication authRequest = this.authenticationConverter.convert(request);
            if (authRequest == null) {
                this.logger.trace("Did not process authentication request since failed to find username and password in Basic Authorization header");
                chain.doFilter(request, response);
                return;
            }

            String username = authRequest.getName();
            this.logger.trace(LogMessage.format("Found username '%s' in Basic Authorization header", username));
            if (this.authenticationIsRequired(username)) {
                Authentication authResult = this.authenticationManager.authenticate(authRequest);
                SecurityContext context = this.securityContextHolderStrategy.createEmptyContext();
                context.setAuthentication(authResult);
                this.securityContextHolderStrategy.setContext(context);
                if (this.logger.isDebugEnabled()) {
                    this.logger.debug(LogMessage.format("Set SecurityContextHolder to %s", authResult));
                }

                this.rememberMeServices.loginSuccess(request, response, authResult);
                this.securityContextRepository.saveContext(context, request, response);
                this.onSuccessfulAuthentication(request, response, authResult);
            }
        } catch (AuthenticationException var8) {
            AuthenticationException ex = var8;
            this.securityContextHolderStrategy.clearContext();
            this.logger.debug("Failed to process authentication request", ex);
            this.rememberMeServices.loginFail(request, response);
            this.onUnsuccessfulAuthentication(request, response, ex);
            if (this.ignoreFailure) {
                chain.doFilter(request, response);
            } else {
                this.authenticationEntryPoint.commence(request, response, ex);
            }

            return;
        }

        chain.doFilter(request, response);
    }


}

`;
const basicAuthenticationConverter = `
public class BasicAuthenticationConverter implements AuthenticationConverter {
   public UsernamePasswordAuthenticationToken convert(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header == null) {
          ...
        if (delim == -1) {
                    throw new BadCredentialsException("Invalid basic authentication token");
                } else {
                    UsernamePasswordAuthenticationToken result = UsernamePasswordAuthenticationToken.unauthenticated(token.substring(0, delim), token.substring(delim + 1));
                    result.setDetails(this.authenticationDetailsSource.buildDetails(request));
                    return result;
        }
  }

}
`;

const BasicAuthenticationFilter = () => {
  return (
    <div>
      <li>기본인증 서비스를 제공하늗네 사용된다</li>
      <li>BasicAuthenticationConvertrer를 사용해서 요청헤더에 기술된 인증정보의 유효성을 체크하며</li>
      <li>Base64인코딩된 useranme, password를 추출한다.</li>

      <Header text={"BasicAuthenticationFilter"} />
      <FlowChart title="basicAuthenticationFilter" arry={basicAuthenticationFilter} />
      <FlowChart title="success" arry={success} />
      <FlowChart title="failed" arry={failed} />
      <CodeBlock text={basicAuthenticationFilterCode} />
      <li>Authentication authRequest = this.authenticationConverter.convert(request);부분을 들어가보면</li>
      <CodeBlock text={basicAuthenticationConverter} />
      <li>헤더에 Authorization이있는지 검사를하고 없다면 요청헤더를 실어서 요청해라고한다.</li>
      <li>요청해더가 있다면 그다음로직을 실행하게되고</li>
      <li>UsernamePasswordAuthenticationToken에 저장한다.</li>
      <li>AuthenticationManage 에게 인증처리를 위임한다.</li>
      <li>formLogin 때는 session에 저장했지만 securityContextRepository 저장한다.</li>
      <li>securityContextRepository는 세션이아니고 요청컨텍스트이다.</li>
      <li> 요청범위내에서만 유지를 하기때문에 한번더 요청이끝나고 클라이언트로가면 다시 이과정을 거쳐야한다.</li>
    </div>
  );
};

export default BasicAuthenticationFilter;
