import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";
import Toggle from "../../components/Toggle";

const securityContextRepository = `
public interface SecurityContextRepository {
   
    @Deprecated
    //로딩을 지연시켜 필요시점에 SecurityContext를 가지고온다
    SecurityContext loadContext(HttpRequestResponseHolder requestResponseHolder);

    default DeferredSecurityContext loadDeferredContext(HttpServletRequest request) {
        Supplier<SecurityContext> supplier = () -> {
            return this.loadContext(new HttpRequestResponseHolder(request, (HttpServletResponse)null));
        };
        return new SupplierDeferredSecurityContext(SingletonSupplier.of(supplier), SecurityContextHolder.getContextHolderStrategy());
    }
    //인증요청완료시 보안컨텍스트를 저장한다
    void saveContext(SecurityContext context, HttpServletRequest request, HttpServletResponse response);
    //현재 사용자를 위한 보안컨텍스트가 저장소에 있는지 여부를 조회
    boolean containsContext(HttpServletRequest request);
}
`;

const interfacesImpl = `
public class HttpSessionSecurityContextRepository implements SecurityContextRepository {
    //요청간에 HttpSession에 보안컨텍스트를 저장한다. 후속요청시 컨텍스트 영속성을 유지한다.
}
public final class RequestAttributeSecurityContextRepository implements SecurityContextRepository {
    //ServletRequest 에 보안컨텍스트를 저장한다. 후곳 요청시 컨텍스트 영속성을 유지할 수 없다.
}
public final class NullSecurityContextRepository implements SecurityContextRepository {
    //세션을 사용하지 않는인증(JWT, OAuth2)일 경우 사용하며 컨텍스트 관련 아무런 처리를 하지않는다.
}
public final class DelegatingSecurityContextRepository implements SecurityContextRepository {
    //HttpSessionSecurityContextRepository, RequestAttributeSecurityContextRepository 를 동시에 사용할 수 있도록
    //위임된 클래스로서 초기화 시 기본으로 설정된다.
}

`;

const SecurityContextRepository = () => {
  return (
    <div>
      <Header text={"SecurityContextRepository"} />
      <li>사용자가 인증을 한 이후 요청에 대해 계속 사용자의 인증을 유지하기위해 사용되는 클래스</li>
      <li>
        인증 상태의 영속 메커니즘은 사용자가 인증을 하게되면 해당 사용자의 Authentication 이 SecurityContext 에
        저장이되고
      </li>
      <li> HttpSession 을 통해 요청 간 영속이 이루러지는 방식이다.</li>
      <li>현재 6.x 버전과 5.x 버전의 차이가 있다.</li>
      <li></li>
      <CodeBlock text={securityContextRepository} />
      <Toggle text={"인터페이스 구현체"} code={interfacesImpl} />
      <h3>인증 요청</h3>
      <div className="Flows">
        <div>
          <h3>client</h3>
          <div>get/login</div>
        </div>
        <div>
          <h3>AuthenticationFilter</h3>
          <div>사용자의 인증이완료되면 인증정보를 SecurityContext에 저장</div>
        </div>
        <div>
          <h3>SecurityContext</h3>
          <div>SecurityContext 를 명시적을 저장소에 보관</div>
        </div>
        <div>
          <h3>SecurityContextRepository</h3>
          <div>SecurityContext를 세션에 저장한다</div>
        </div>
        <div>
          <h3>HttpSession</h3>
          <div></div>
        </div>
      </div>
      <h3>인증 후</h3>
      <div className="Flows">
        <div>
          <h3>client</h3>
          <div>get/user</div>
        </div>
        <div>
          <h3>SecurityContextHolder</h3>
          <div>컨텍스트 저장소로 부터 컨텍스트를 로드한다</div>
        </div>
        <div>
          <h3>SecurityContextRepository</h3>
          <div>세션으로부터 컨텍스트 존재를 확인한다</div>
        </div>
        <div>
          <h3>HttpSession</h3>
          <div>세션으로부터 컨텍스트를 가저온다</div>
        </div>
        <div>
          <h3>SecurityContext</h3>
          <div>Authentication 을 가져온다</div>
        </div>
      </div>
    </div>
  );
};

export default SecurityContextRepository;
