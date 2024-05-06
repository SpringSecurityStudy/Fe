import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";
const successfulAuthentication = `
public abstract class AbstractAuthenticationProcessingFilter{
        protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        SecurityContext context = this.securityContextHolderStrategy.createEmptyContext();
        context.setAuthentication(authResult);
        this.securityContextHolderStrategy.setContext(context);
        this.securityContextRepository.saveContext(context, request, response);
        if (this.logger.isDebugEnabled()) {
            this.logger.debug(LogMessage.format("Set SecurityContextHolder to %s", authResult));
        }

        this.rememberMeServices.loginSuccess(request, response, authResult);
        if (this.eventPublisher != null) {
            this.eventPublisher.publishEvent(new InteractiveAuthenticationSuccessEvent(authResult, this.getClass()));
        }

        this.successHandler.onAuthenticationSuccess(request, response, authResult);
    }
}
`;

const SecurityContext = () => {
  return (
    <div>
      <Header text={"SecurityContext"} />
      <CodeBlock text={successfulAuthentication} />
      <li>.createEmptyContext() 빈 Context를 하나 생성하고</li>
      <li>context.setAuthentication(authResult) 인증된 객체를 저장한다.</li>
      <li>securityContextHolderStrategy.setContext(context) context홀더에 다시저장하고 인증상태를 유지한다.</li>
    </div>
  );
};

export default SecurityContext;
