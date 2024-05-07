import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";
import NavigateSpan from "../../components/NavigateSpan";
const abstractAuthenticationProcessingFilter = `public abstract class AbstractAuthenticationProcessingFilter{
    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (!this.requiresAuthentication(request, response)) {
            chain.doFilter(request, response);
        } else {
            try {
                //인증결과를 반환받음
                Authentication authenticationResult = this.attemptAuthentication(request, response);
                if (authenticationResult == null) {
                    return;
                }
               
                this.sessionStrategy.onAuthentication(authenticationResult, request, response);
                if (this.continueChainBeforeSuccessfulAuthentication) {
                    chain.doFilter(request, response);
                }
                 //결과를 (SecurityContext)에 저장한다
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
const AbstractAuthenticationProcessingFilter = () => {
  return (
    <div>
      <Header text={"AbstractAuthenticationProcessingFilter"} />
      <CodeBlock text={abstractAuthenticationProcessingFilter} />
      <li>username 과 password를 가져와서 UsernamePasswordAuthenticationToken에 저장한다. </li>
      <li>인증전이기때문에 unauthenticated </li>
      <li>인증처리를 하기위해서 AuthenticationManager 로 위임한다.</li>
      <li>sessionStrategy 세션에 저장하고</li>
      <li>
        <NavigateSpan navi={"/successfulAuthentication"} text={"successfulAuthentication"} /> SecurityContext에
        유저정보를 저장한다.
      </li>
    </div>
  );
};

export default AbstractAuthenticationProcessingFilter;
