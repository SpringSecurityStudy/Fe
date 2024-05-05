import CodeBlock from "../components/CodeBlock";
import NavigateSpan from "../components/NavigateSpan";
import Header from "./Header";

const HttpSecurity = () => {
  const httpSecurityConfiguration = `class HttpSecurityConfiguration {
        @Bean
        @Scope("prototype")
        HttpSecurity httpSecurity() throws Exception {
            LazyPasswordEncoder passwordEncoder = new LazyPasswordEncoder(this.context);
            AuthenticationManagerBuilder authenticationBuilder = new DefaultPasswordEncoderAuthenticationManagerBuilder(this.objectPostProcessor, passwordEncoder);
            authenticationBuilder.parentAuthenticationManager(this.authenticationManager());
            authenticationBuilder.authenticationEventPublisher(this.getAuthenticationEventPublisher());
            HttpSecurity http = new HttpSecurity(this.objectPostProcessor, authenticationBuilder, this.createSharedObjects());
            WebAsyncManagerIntegrationFilter webAsyncManagerIntegrationFilter = new WebAsyncManagerIntegrationFilter();
            webAsyncManagerIntegrationFilter.setSecurityContextHolderStrategy(this.securityContextHolderStrategy);
            http
                .csrf(Customizer.withDefaults()).addFilter(webAsyncManagerIntegrationFilter)
                .exceptionHandling(Customizer.withDefaults())
                .headers(Customizer.withDefaults())
                .sessionManagement(Customizer.withDefaults())
                .securityContext(Customizer.withDefaults())
                .requestCache(Customizer.withDefaults())
                .anonymous(Customizer.withDefaults())
                .servletApi(Customizer.withDefaults())
                .apply(new DefaultLoginPageConfigurer());
            http.logout(Customizer.withDefaults());
            this.applyCorsIfAvailable(http);
            this.applyDefaultConfigurers(http);
            return http;
        }
    }
    `;

  const ConfigurerEx = `
     public HttpSecurity csrf(Customizer<CsrfConfigurer<HttpSecurity>> csrfCustomizer) throws Exception {
        ApplicationContext context = this.getContext();
        csrfCustomizer.customize((CsrfConfigurer)this.getOrApply(new CsrfConfigurer(context)));
        return this;
    }
     public HttpSecurity exceptionHandling(Customizer<ExceptionHandlingConfigurer<HttpSecurity>> exceptionHandlingCustomizer) throws Exception {
        exceptionHandlingCustomizer.customize((ExceptionHandlingConfigurer)this.getOrApply(new ExceptionHandlingConfigurer()));
        return this;
    }`;
  return (
    <div>
      <Header text={"HttpSecurity"} />
      <h3>
        HttpSecurity 는 보안에 필요한 설정 클래스와 필터들을 생성하고 최종적으로 SecurityFilterChanin 빈 을 생성한다.
      </h3>
      <CodeBlock text={httpSecurityConfiguration} />
      <li> 각 csrf, exceptionHandling 등등 초기화가되면서</li>
      <CodeBlock text={ConfigurerEx} />
      <li>
        위의 예시처럼 각 설정들은
        <NavigateSpan navi={"/securityBuilder"} text={"securityConfigurer"} />을 상속받고있다.
      </li>
      <li> 설정이 완료되면 Bean객체를 생성하게되고</li>
      <li>
        이 객체는 <NavigateSpan navi={"/springSecurityInit"} text={"SecurityFilterChainConfiguration"} />
        으로 주입된다.
      </li>
    </div>
  );
};

export default HttpSecurity;
