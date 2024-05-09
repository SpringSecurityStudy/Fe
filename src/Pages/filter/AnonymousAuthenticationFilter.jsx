import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";

const anonymousAuthenticationFilter = `
public class AnonymousAuthenticationFilter extends GenericFilterBean implements InitializingBean {
    private SecurityContextHolderStrategy securityContextHolderStrategy;
    private AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource;
    private String key;
    private Object principal;
    private List<GrantedAuthority> authorities;
    ...
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        //1. getDeferredContext - Supplier 로 감싸저있는값을 가저온다. deferredContext안에는 session과 request가있다.
        //2. 아직 Supplier안에 context를 꺼내지않는다
        Supplier<SecurityContext> deferredContext = this.securityContextHolderStrategy.getDeferredContext();
        //3. setDeferredContext - 설정만하고
        this.securityContextHolderStrategy.setDeferredContext(this.defaultWithAnonymous((HttpServletRequest)req, deferredContext));
        //4. 다음필터로 넘긴다.
        chain.doFilter(req, res);
    }


    protected Authentication createAuthentication(HttpServletRequest request) {
        AnonymousAuthenticationToken token = new AnonymousAuthenticationToken(this.key, this.principal, this.authorities);
        token.setDetails(this.authenticationDetailsSource.buildDetails(request));
        return token;
    }

}

`;

const AnonymousAuthenticationFilter = () => {
  return (
    <div>
      <Header text={"AnonymousAuthenticationFilter"} />
      <CodeBlock text={anonymousAuthenticationFilter} />
    </div>
  );
};

export default AnonymousAuthenticationFilter;
