import CodeBlock from "../components/CodeBlock";
import Header from "../components/Header";

const WebSecurity = () => {
  const WebSecurityConfiguration = `
    public class WebSecurityConfiguration implements ImportAware, BeanClassLoaderAware {
        public void setFilterChainProxySecurityConfigurer(ObjectPostProcessor<Object> objectPostProcessor, ConfigurableListableBeanFactory beanFactory) throws Exception {
            this.webSecurity = (WebSecurity)objectPostProcessor.postProcess(new WebSecurity(objectPostProcessor));
            if (this.debugEnabled != null) {
                this.webSecurity.debug(this.debugEnabled);
            }
            ....
        }
    }
    `;
  const setFilterChains = `
    public class WebSecurityConfiguration implements ImportAware, BeanClassLoaderAware {
         void setFilterChains(List<SecurityFilterChain> securityFilterChains) {
        this.securityFilterChains = securityFilterChains;
        }
    }
    `;
  const WebSecurity = `
    public final class WebSecurity {
        protected Filter performBuild() throws Exception {
        
        ...
        while(var4.hasNext()) {
            SecurityBuilder<? extends SecurityFilterChain> securityFilterChainBuilder = (SecurityBuilder)var4.next();
            SecurityFilterChain securityFilterChain = (SecurityFilterChain)securityFilterChainBuilder.build();
            securityFilterChains.add(securityFilterChain);
            requestMatcherPrivilegeEvaluatorsEntries.add(this.getRequestMatcherPrivilegeEvaluatorsEntry(securityFilterChain));
        }
        ...
        FilterChainProxy filterChainProxy = new FilterChainProxy(securityFilterChains);
        ... 
        return (Filter)result;

    }
    `;
  const springSecurityFilterChain = `
    public class WebSecurityConfiguration implements ImportAware, BeanClassLoaderAware {
        @Bean(name = {"springSecurityFilterChain"})
        public Filter springSecurityFilterChain() throws Exception {
          boolean hasFilterChain = !this.securityFilterChains.isEmpty();
          if (!hasFilterChain) {
            ...
          }

          Iterator var2 = this.securityFilterChains.iterator();

          while(var2.hasNext()) {
              SecurityFilterChain securityFilterChain = (SecurityFilterChain)var2.next();
              this.webSecurity.addSecurityFilterChainBuilder(() -> {
                  return securityFilterChain;
              });
          }

          var2 = this.webSecurityCustomizers.iterator();

          while(var2.hasNext()) {
              WebSecurityCustomizer customizer = (WebSecurityCustomizer)var2.next();
              customizer.customize(this.webSecurity);
          }

          return (Filter)this.webSecurity.build();
        }
    }
    `;
  return (
    <div>
      <Header text={"WebSecurity"} />
      <h4>WebSecurityConfiguration 에서 WebSecurity를 생성하고 초기화를 진행한다.</h4>
      <li>WebSecurity는 HttpSecurity 에서 생성한 SecurityFilterChanin 빈을 SecurityBuilder에 저장한다.</li>
      <li>
        WebSecurity 가 build() 를 실행하면 SecurityBuilder 에서 SecurityFilterChain 을 꺼내어 FilterChainProxy
        생성자에게 전달한다
      </li>

      <CodeBlock text={WebSecurityConfiguration} />
      <li>WebSecurity 가 만들어지고 HttpSecurity가 완성한 SecurityFilterChain 을 주입받는다 </li>
      <CodeBlock text={setFilterChains} />
      <li>List형태인 FilterChain을 받기때문에 다중보안설정도 가능하다</li>
      <CodeBlock text={springSecurityFilterChain} />
      <li>
        과정이끝나고 최종적으로 빌드하게되면 HttpSecurity와 같이 perFormBuild를 통해서 최종빌드가 되고
        FilterChainProxy를 만들게된다
      </li>
      <CodeBlock text={WebSecurity} />
      <li>이모든과정은 FilterChainProxy 객체 빈을 만들기위한 목적이다.</li>
    </div>
  );
};

export default WebSecurity;
