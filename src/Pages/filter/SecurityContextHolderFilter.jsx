import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";
import NavigateSpan from "../../components/NavigateSpan";

const securityContextHolderFilter = `
public class SecurityContextHolderFilter extends GenericFilterBean {

  ...

  private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        if (request.getAttribute(FILTER_APPLIED) != null) {
            chain.doFilter(request, response);
        } else {
            request.setAttribute(FILTER_APPLIED, Boolean.TRUE);
            //1. 저장소로 부터(1. Session 2. 요청객채) SecurityContext 를 가져온다
            //2. HttpSessionSecurityContextRepository 와 DelegatingSecurityContextRepository 의 loadDeferredContext()메서드를통해서 가져오는데
            //3. Supplier 로 감싸서 가져온다.
            //4. deferredContext 안에는 세션과 Request로부터 감싼 Supplier가 들어있다.
            Supplier<SecurityContext> deferredContext = this.securityContextRepository.loadDeferredContext(request);

            try {
                //5.ContextHolder에 저장하고 
                this.securityContextHolderStrategy.setDeferredContext(deferredContext);
                // 다음필터로 넘긴다.
                chain.doFilter(request, response);
            } finally {
                //6. 모든 Context 초기화 시킨다.
                this.securityContextHolderStrategy.clearContext();
                request.removeAttribute(FILTER_APPLIED);
            }

        }
    }

}

`;

const SecurityContextHolderFilter = () => {
  return (
    <div>
      <Header text={"SecurityContextHolderFilter"} />
      <h2>SecurityContextHolderFilter</h2>
      <li>
        SecurityContextRepository 를 사용하여 SecurityContext 를 얻고 이를 SecurityContextHolder 에 설정하는 클래스
      </li>
      <li>
        이 필터 클래스는 SecurityContextRepository.saveContext()를 강제로 실행시키지않는다. 사용자가 명시적으로
        호출되어야한다.
      </li>
      <li>
        인증이 지속되어야 하는지를 각 인증메커니즘이 독립적으로 선택할 수 있게 하여 더나은 유연성을 제공하고
        HttpSession에 필요할때만 저장함으로써 성능을 향상시킨다.
      </li>
      <li>과거에는 무조건 세션에 저장해줬지만 현재는 명시적으로해줘야 세션에 저장이된다.</li>
      <CodeBlock text={securityContextHolderFilter} />
      <h2>SecurityContext 생성, 저장, 삭제</h2>
      <h4>1. 익명 사용자</h4>
      <li>익명 사용자는 Session에 SecurityContext객채를 저장하는 과정이없다.</li>
      <li>
        SecurityContextRepository 를 사용하여 새로운 SecurityContext 객체를 생성하여 SecurityContextHolder 에 저장 후
        다음필터로 전달
      </li>
      <li>
        <NavigateSpan navi={"/AnonymousAuthenticationFilter"} text={"AnonymousAuthenticationFilter"} /> 에서
        AnonymousAuthenticationToken 객체를 SecurityContext 에 저장
      </li>

      <h4>2. 인증 요청</h4>
      <li>
        SecurityContextRepository 를 사용하여 새로운 SecurityContext 객체를 생성하여 SecurityContextHolder 에 저장 후
        다음필터로 전달(인증전이기때문에 익명사용자와 처음은 같다.)
      </li>
      <li>
        UsernamePasswordAuthenticationFilter 에서 인증 성공후 SecurityContext 에 UsernamePasswordAuthenticationToken
        객체를 SecurityContext에 저장
      </li>
      <li>
        SecurityContextRepository 를 사용하여 HttpSession 에 SecurityContext 를 저장(Custom하게 인증필터를 만들었을경우
        세션에 저장하는 로직을 꼭 해줘야한다.)
      </li>
      <h4>3. 인증 후 요청</h4>
      <li>
        SecurityContextRepository 를 사용하여 HttpSession 에서 SecurityContext 를 꺼내어 SecurityContextHolder 에서
        저장후 다음필터로 전달
      </li>
      <li>SecurityContext 안에 Authentication 객체가 존재하면 계속 인증을 유지한다</li>
      <h4>4. 클라이언트 응답시 공통</h4>
      <li>SecurityContextHolder.clearContext()로 컨텍스트를 삭제한다(스레드풀일경우 반드시 필요_)</li>
    </div>
  );
};

export default SecurityContextHolderFilter;
