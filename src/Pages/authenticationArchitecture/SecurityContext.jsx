import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";
const SecurityContextHolder = `
public class SecurityContextHolder {
    //기본모드로, 각스레드가 독립적인 보안컨텍스트를가진다. 대부분의 서버환경에 적합
    public static final String MODE_THREADLOCAL = "MODE_THREADLOCAL";
    //부모스레드로부터 자식스레드로 보안컨텍스트가 상속되며 작업을 스레드 간 분산실행하는경우 유용
    public static final String MODE_INHERITABLETHREADLOCAL = "MODE_INHERITABLETHREADLOCAL";
    //전역적으로 단일 보안컨텍스트를 사용하며 서버환경에서는 부적합. 간단한 애플리케이션에 적합
    public static final String MODE_GLOBAL = "MODE_GLOBAL";
}
`;
const SecurityContextHolderStrategy = `
public interface SecurityContextHolderStrategy {
    //컨텍스트 삭제
    void clearContext();
    //현재 컨텍스트를 얻는다
    SecurityContext getContext();
    //현재 컨텍스트를 반환하는 Supplier 를 얻는다
    default Supplier<SecurityContext> getDeferredContext() {
        return this::getContext;
    }
    //현재 컨텍스트를 저장한다
    void setContext(SecurityContext context);
    //현재 컨텍스트를 반환하는 Supplier를 저장한다
    default void setDeferredContext(Supplier<SecurityContext> deferredContext) {
        this.setContext((SecurityContext)deferredContext.get());
    }
    //새롭고 비어있는 컨텍스트를 생성한다.
    SecurityContext createEmptyContext();
}
`;

const context = `
    @GetMapping("/")
    public String index() {
        SecurityContext context = SecurityContextHolder.getContextHolderStrategy().getContext();
        Authentication authentication = context.getAuthentication();
        log.info("{}",authentication);
        return "Hello World";
    }
`;

const contextInit = `
public final class SecurityContextConfigurer<H extends HttpSecurityBuilder<H>> extends AbstractHttpConfigurer<SecurityContextConfigurer<H>, H> {
    private boolean requireExplicitSave = true;
    ...
    public void configure(H http) {
        //초기화 과정에서 SecurityContextRepository 객체를 가저온다.
        //다른 초기화과정에서 이미 SecurityContextRepository가 만들어져있는데 이안에는
        //securityContextRepository 에는 DelegatingSecurityContextRepository가 있는데 이안에
        //HttpSessionSecurityContextRepository 와 RequestAttributeSecurityContextRepository 가있다.

        SecurityContextRepository securityContextRepository = this.getSecurityContextRepository();
        //기본값은 true
        if (this.requireExplicitSave) {
            //SecurityContextHolderFilter를 만들어서 securityContextRepository를 저장하는 작업을 수행한다.
            SecurityContextHolderFilter securityContextHolderFilter = (SecurityContextHolderFilter)this.postProcess(new SecurityContextHolderFilter(securityContextRepository));
            securityContextHolderFilter.setSecurityContextHolderStrategy(this.getSecurityContextHolderStrategy());
            http.addFilter(securityContextHolderFilter);
        } else {
            SecurityContextPersistenceFilter securityContextFilter = new SecurityContextPersistenceFilter(securityContextRepository);
            securityContextFilter.setSecurityContextHolderStrategy(this.getSecurityContextHolderStrategy());
            SessionManagementConfigurer<?> sessionManagement = (SessionManagementConfigurer)http.getConfigurer(SessionManagementConfigurer.class);
            SessionCreationPolicy sessionCreationPolicy = sessionManagement != null ? sessionManagement.getSessionCreationPolicy() : null;
            if (SessionCreationPolicy.ALWAYS == sessionCreationPolicy) {
                securityContextFilter.setForceEagerSessionCreation(true);
                http.addFilter((Filter)this.postProcess(new ForceEagerSessionCreationFilter()));
            }

            securityContextFilter = (SecurityContextPersistenceFilter)this.postProcess(securityContextFilter);
            http.addFilter(securityContextFilter);
        }

    }


}
`;

const SecurityContext = () => {
  return (
    <div>
      <Header text={"SecurityContext & SecurityContextHolder"} />
      <h3>SecurityContext</h3>
      <li>Authentiaction 저장 : 현재 인증된 사용자의 Authentication 객체를 저장한다.</li>
      <li>
        ThreadLocal 저장소사용 : SecurityContextHolder 를 통해 접근되며 ThreadLocal 저장소를 사용해 각 스레드가 자신만의
        보안컨텍스트를 유지한다.
      </li>
      <li>애플리케이션 어느 곳에서나 접근 가능하며 현재 사용자의 인증 상태나 권한을 확인하는데 사용</li>
      <h3>SecurityContextHolder</h3>
      <li>
        SecurityContext 저장 : 현재 인증된 사용자의 Authentication 객체를 담고있는 SecurityContext 객체를 저장한다.
      </li>
      <li>전략패턴사용 : 다양한 전략을 지원하기위해 SecurityContextHolderStrategy 인터페이스를 사용한다.</li>
      <CodeBlock text={SecurityContextHolderStrategy} />
      <li>기본값은 MODE_THREADLOCAL </li>
      <h3>SecurityContextHolder 저장모드</h3>
      <CodeBlock text={SecurityContextHolder} />
      <h3>SecurityContext 참조 밑 삭제</h3>
      <li>참조 - SecurityContextHolder.getContextHolderStrategy().getContext</li>
      <li>삭제 - SecurityContextHolder.getContextHolderStrategy().clearContext</li>
      <h3>SecurityContext & SecurityContextHolder 구조</h3>
      <li>스레드마다 할당되는 전용 저장소에 SecurityContext를 저장하기 때문에 동시성의 문제가 없다.</li>
      <li>
        스레드 풀에서 운용되는 스레드일 경우 새로운 요청이더라도 기본의 ThreadLocal이 재사용 될 수 있기 때문에
        클라이언트로 응답 직전에 항상 SecurityContext를 삭제 해 주고있다
      </li>
      <CodeBlock text={context} />
      <li>이런식으로 context안의 인증객체를 꺼내올 수 있다.</li>
    </div>
  );
};

export default SecurityContext;
