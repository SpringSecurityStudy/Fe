import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";
import Toggle from "../../components/Toggle";

const authenticationProvider = `
public interface AuthenticationProvider {
    //AuthenticationManager 로부터 Authentication 객체를 전달받아 인증을 수행한다.
    Authentication authenticate(Authentication authentication) throws AuthenticationException;
    //인증을 수행할 수 있는 조건인지 검사한다.true가 되어야 수행한다.
    boolean supports(Class<?> authentication);
}
`;

const custom = `
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = (String)authentication.getCredentials();
        // 아이디 검증
        // 비밀번호 검증
        return new UsernamePasswordAuthenticationToken(username, password, List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }
     @Override
    public boolean supports(Class<?> authentication) {

        return authentication.isAssignableFrom(UsernamePasswordAuthenticationToken.class);
    }
    
}
    `;

const authenticationProvider2 = `
@EnableWebSecurity
@Configuration
@Slf4j
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        AuthenticationManagerBuilder managerBuilder =http.getSharedObject(AuthenticationManagerBuilder.class);
        managerBuilder.authenticationProvider(new CustomAuthenticationProvider());
        http.authenticationProvider(new CustomAuthenticationProvider());

        http
                .authorizeHttpRequests(auth ->auth.anyRequest().authenticated())
                .formLogin(Customizer.withDefaults());

        return http.build();
    }
    `;
const authenticationProvider3 = `
@EnableWebSecurity
@Configuration
@Slf4j
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .authorizeHttpRequests(auth ->auth.anyRequest().authenticated())
                .formLogin(Customizer.withDefaults());

        return http.build();
    }
    
    @Bean
    public AuthenticationProvider customAuthenticationProvider() {
        return new CustomAuthenticationProvider();
    }
    `;
const InitializeAuthenticationProviderBeanManagerConfigurer = `
    class InitializeAuthenticationProviderBeanManagerConfigurer{
        public void configure(AuthenticationManagerBuilder auth) {
            if (!auth.isConfigured()) {
                AuthenticationProvider authenticationProvider = (AuthenticationProvider)this.getBeanOrNull(AuthenticationProvider.class);
                if (authenticationProvider != null) {
                    auth.authenticationProvider(authenticationProvider);
                }
            }
        }
        //초기화 과정중에 aplicationContext중에 getBeanNamesForType 으로된 Bean이 추가되었는지확인한다
        //type AuthenticationProvider 타입을 찾게되고
        //없다면 Default 값으로 2개의 Provider가 추가된다
        private <T> T getBeanOrNull(Class<T> type) {
            String[] beanNames = InitializeAuthenticationProviderBeanManagerConfigurer.this.context.getBeanNamesForType(type);
            return beanNames.length != 1 ? null : InitializeAuthenticationProviderBeanManagerConfigurer.this.context.getBean(beanNames[0], type);
        }
    }
    }

    `;

const AuthenticationProvider = () => {
  return (
    <div>
      <Header text={"AuthenticationProvider"} />
      <li>사용자의 자격증명을 확인하고 인증 과정을 관리하는 클래스</li>
      <li>사용자가 시스템에 제공한정보가 유요한지 검증하는 과정을 포함한다.</li>
      <li>다양한 유형의 인증메커니즘이 지원된다. 예를들어 Id,Pw / 토큰기반인증/ 지문인식 등이 될 수 있다.</li>
      <li>
        성공적인 인증후에는 Authentication 객채를 반환하며 객채안에는 사용자의 신원정보와 인증된 자격증명을 포함한다.
      </li>
      <li>인증 과정중에 문제가 발생한경우 AuthenticationException 을 발생시킨다.</li>
      <CodeBlock text={authenticationProvider} />
      <li>
        초기화 과정중 아무설정도 하지않았다면 인증수단으로 DaoAuthenticationProvider, AnonymousAuthenticationProvider 가
        추가된다
      </li>
      <CodeBlock text={InitializeAuthenticationProviderBeanManagerConfigurer} />
      <br />
      <h2>인증 처리 흐름도</h2>
      <div className="Flows">
        <div>
          <h3>AuthenticationManager</h3>
          <h4 style={{ color: "rgb(220, 100, 100)" }}>Authentication</h4>
          <div>username+password</div>
        </div>
        <div>
          <h3>AuthenticationProvider</h3>
        </div>
        <div>
          <h3>authenticate()</h3>
          <h4 style={{ color: "rgb(220, 100, 100)" }}>Authentication</h4>
          <div>username+password</div>
        </div>
        <div>
          <h4>사용자 유무 검증</h4>
          <h4>비밀번호 검증</h4>
          <h4>보안강회 처리</h4>
        </div>
        <div>
          <h3>AuthenticationManager</h3>
          <div style={{ color: "rgb(107, 226, 103)" }}>success</div>
          <div style={{ color: "rgb(220, 100, 100)" }}>Authentication 반환</div>
          <div>userDetails + Authorities</div>
        </div>
        <div>
          <h3>AuthenticationManager</h3>
          <div style={{ color: "rgb(220, 100, 100)" }}>failed</div>
          <div>AuthenticationExcepion</div>
        </div>
      </div>

      <div>
        <h2>AuthenticationProvider 사용방법</h2>
        <h3>일반 객체로 생성</h3>
        <Toggle text={"customProvider"} code={custom} />
        <CodeBlock text={authenticationProvider2} />
        <h3>Bean 으로 생성</h3>
        <CodeBlock text={authenticationProvider3} />
        <li>Bean 을 한개만 정의할 경우 초기화과정에서 DaoAuthenticationProvider 를 자동으로 대체하게 된다.</li>
      </div>
    </div>
  );
};

export default AuthenticationProvider;
