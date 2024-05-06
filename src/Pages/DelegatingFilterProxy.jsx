import CodeBlock from "../components/CodeBlock";
import Header from "../components/Header";
import NavigateSpan from "../components/NavigateSpan";

const DelegatingFilterProxy = () => {
  const SecurityFilterAutoConfiguration = `public class SecurityFilterAutoConfiguration {
        public DelegatingFilterProxyRegistrationBean securityFilterChainRegistration(SecurityProperties securityProperties) {
            DelegatingFilterProxyRegistrationBean registration = new DelegatingFilterProxyRegistrationBean("springSecurityFilterChain", new ServletRegistrationBean[0]);
            registration.setOrder(securityProperties.getFilter().getOrder());
            registration.setDispatcherTypes(this.getDispatcherTypes(securityProperties));
            return registration;
        }
    }`;
  const DelegatingFilterProxyRegistrationBean = `public class DelegatingFilterProxyRegistrationBean{
        private final String targetBeanName;

        public DelegatingFilterProxy getFilter() {
            return new DelegatingFilterProxy(this.targetBeanName, this.getWebApplicationContext()) {
                protected void initFilterBean() throws ServletException {
                }
            };
        }
    }
    `;
  const AbstractFilterRegistrationBean = `public abstract class AbstractFilterRegistrationBean{
        protected FilterRegistration.Dynamic addRegistration(String description, ServletContext servletContext) {
           Filter filter = this.getFilter();
           return servletContext.addFilter(this.getOrDeduceName(filter), filter);
       }
    }
  `;
  return (
    <div>
      <Header text={"DelegatingFilterProxy"} />
      <li>DelegatingFilterProxy 는 서블릿 컨테이너에서 생성이된다.</li>
      <li>DelegatingFilterProxyRegistrationBean 이 생성이되며 파라미터로 SecurityProperties 을 받는다.</li>
      <li>
        DelegatingFilterProxy 는 springSecurityFilterChain 이라는 이름을가진 Bean 으로 생성된 빈을
        ApplicationContext에서 찾아 요청을 위임한다.
      </li>
      <li>servlet 과 springSecurity 의 관계를 이어주는 역할을한다.</li>
      <li>실제 보안처리를 수행하지 않는다</li>
      <CodeBlock text={SecurityFilterAutoConfiguration} />
      <li>DelegatingFilterProxyRegistrationBean</li>
      <CodeBlock text={DelegatingFilterProxyRegistrationBean} />
      <li>targetBeanName 이 springSecurityFilterChain 이다</li>
      <li>springSecurityFilterChain의 이름을DelegatingFilterProxy의 생성자를 전달하고있다.</li>
      <CodeBlock text={AbstractFilterRegistrationBean} />
      <li>생성된 이름을DelegatingFilterProxy는 서블릿 필터에 추가가된다 </li>
      <li>
        <NavigateSpan navi={"/websecurity는"} text={"websecurity"} />는 FilterChainProxy Bean 을 생성하는데 이 빈의
        이름은 springSecurityFilterChain 이다
      </li>
    </div>
  );
};

export default DelegatingFilterProxy;
