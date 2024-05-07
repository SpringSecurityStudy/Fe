import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";
import Toggle from "../../components/Toggle";

const SecurityBuilder = `
public interface SecurityBuilder<O> {
    O build() throws Exception;
}
public interface ProviderManagerBuilder<> extends SecurityBuilder<AuthenticationManager> {
    B authenticationProvider(AuthenticationProvider authenticationProvider);
}
public class AuthenticationManagerBuilder implements ProviderManagerBuilder{
  //AuthenticationManagerBuilder 는 최종적으로 ProviderManager를 생산한다.
  protected ProviderManager performBuild() throws Exception {
        ...
    }
}
`;

const providerManger = `
//AuthenticationManager 의 구현체로서 ProviderManager를 많이사용한다 
public class ProviderManager implements AuthenticationManager, MessageSourceAware, InitializingBean {
  private static final Log logger = LogFactory.getLog(ProviderManager.class);
  private AuthenticationEventPublisher eventPublisher;
  //List타입으로 여러개의 AuthenticationProvider객체을 담을수있다
  //ProviderManager는 AuthenticationProvider를 관리한다.
  private List<AuthenticationProvider> providers;
  protected MessageSourceAccessor messages;
  //또하나의 AuthenticationManager타입을 가지고있으며 부모역할을 할 수 있다.
  private AuthenticationManager parent;
  private boolean eraseCredentialsAfterAuthentication;
  //authenticate메서드를통해서 인증처리를 하게되는데 
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        ...
        Iterator var9 = this.getProviders().iterator();

        while(var9.hasNext()) {
            //적절한 AuthenticationProvider를 선택을한다.
            AuthenticationProvider provider = (AuthenticationProvider)var9.next();
            if (provider.supports(toTest)) {
                if (logger.isTraceEnabled()) {
                    Log var10000 = logger;
                    String var10002 = provider.getClass().getSimpleName();
                    ++currentPosition;
                    var10000.trace(LogMessage.format("Authenticating request with %s (%d/%d)", var10002, currentPosition, size));
                }

                try {
                    //가저온 AuthenticationProvider에게 authenticate 인증을 위임한다.
                    result = provider.authenticate(authentication);
                     //결과가 null이 아니면
                    if (result != null) {
                        this.copyDetails(authentication, result);
                        //브레이크하며 반복문을 종료한다. 즉 인증이되면 더이상 인증을 시도하지않는다.
                        break;
                    }
                } catch (InternalAuthenticationServiceException | AccountStatusException var14) {
                    this.prepareException(var14, authentication);
                    throw var14;
                } catch (AuthenticationException var15) {
                    AuthenticationException ex = var15;
                    lastException = ex;
                }
            }
        }
        //결과가 null이라면 부모격의 providerManger에게 요청을한다.
        if (result == null && this.parent != null) {
            try {
                parentResult = this.parent.authenticate(authentication);
                result = parentResult;
            } catch (ProviderNotFoundException var12) {
            } catch (AuthenticationException var13) {
                parentException = var13;
                lastException = var13;
            }
        }
    }
  }
`;
const SecurityFilterChain = `
@EnableWebSecurity
@Configuration
@Slf4j
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {


        //http.getSharedObject http 안에AuthenticationManagerBuilder 가 이미 있다.
        AuthenticationManagerBuilder builder = http.getSharedObject(AuthenticationManagerBuilder.class);
        //AuthenticationManager 클래스를 생성한다.
        //build() 는 최초 한번만 호출해야한다
        AuthenticationManager authManager = builder.build();
        //build() 후에는 getObject() 로 참조해야한다.
        AuthenticationManager authenticationManager = builder.getObject();



        http
                .authorizeHttpRequests(auth ->auth
                        .requestMatchers("/").permitAll()
                        .anyRequest()
                        .authenticated())
                .formLogin(Customizer.withDefaults())
                .authenticationManager(authenticationManager)//httpSecurity 에서 생성한 AuthenticationManger를 저장한다.
                .addFilterBefore(customFilter(http), UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(new CustomAuthenticationProvider())
        ;


        return http.build();
    }
    // @Bean 으로 선언하면 안된다. AuthenticationManager 는 Bean이 아니기때문에 주입받지못한다.
    public CustomAuthenticationFilter customFilter (AuthenticationManager authenticationManager)throws {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter();
        customAuthenticationFilter.setAuthenticationManger(authenticationManager);
        return customAuthenticationFilter;
    }
    `;

const CustomAuthenticationFilter = `
@EnableWebSecurity
@Configuration
@Slf4j
public class SecurityConfig2 {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {


        http
                .authorizeHttpRequests(auth ->auth
                        .requestMatchers("/").permitAll()
                        .anyRequest()
                        .authenticated())
                .formLogin(Customizer.withDefaults())
        ;
        http.addFilterBefore(customFilter(), UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }


    @Bean //빈으로 선언이 가능하다.
    public CustomAuthenticationFilter customFilter () {
        List<DaoAuthenticationProvider> list1 = List.of(new DaoAuthenticationProvider());
        ProviderManager providerManager = new ProviderManager((AuthenticationProvider) list1);
        List<AuthenticationProvider> list2 =  List.of(new AnonymousAuthenticationProvider("key"), new CustomAuthenticationProvider());
        //자신이 수행할수없는 인증이올때는 providerManager(parent)에서 처리를하려 시도한다.
        ProviderManager providerManager2 = new ProviderManager(list2,providerManager);

        CustomAuthenticationFilter customAuthenticationFilter =  new CustomAuthenticationFilter();
        customAuthenticationFilter.setAuthenticationManger(providerManager2);
        return customAuthenticationFilter;

    }
    `;
const authenticationManager = `public interface AuthenticationManager {
    Authentication authenticate(Authentication authentication) throws AuthenticationException;
  }`;

const AuthenticationManager = () => {
  return (
    <div>
      <Header text={"AuthenticationManager"} />
      <h3>AuthenticationManager</h3>
      <CodeBlock text={authenticationManager} />
      <Toggle text={"authenticationManager구현체 providerManger"} code={providerManger} />

      <li>인증 필터로부터 Authentication 객체를 전달받아 인증을 시도한다.</li>
      <li>성공할 경우 사용자의 정보, 권한등을 포함한 Authentication 객체를 반환한다.</li>
      <li>
        AuthenticationManager 는 여러 AuthenticationProvider들을 관리하며, AuthenticationProvider목록을 순차적으로
        순회하며 인증처리를 한다
      </li>
      <li>
        AuthenticationProvider 목록중에서 인증 처리 요건에 맞는 적절한 AuthenticationProvider 를 찾아 인증처리를
        위임한다
      </li>
      <li>AuthenticationManagerBuilder 에 의해서 객체가 생성되며 주로 사용하는 구현체로 ProviderManager가 제공된다.</li>
      <h3>AuthenticationManagerBuilder</h3>
      <li>AuthenticatonManager 객체를 생성</li>
      <li>UserDetailsService 및 AuthenticationProvider 를 추가 할 수 있다.</li>
      <li>HttpSecurity.getSharedObject(AuthenticationManagerBuilder.class) 를 통해 객체를 참조할 수 있다.</li>
      <CodeBlock text={SecurityBuilder} />
      <li>AuthenticationManagerBuilder는 SecurityBuilder의 구현체이다</li>
      <h3>각 어떤인증에 따라어떤 요청이 처리되는지 ProviderManager 가 선택한다.</h3>
      <li>Form 인증으로 들어올경우 ProviderManager 는 DaoAuthenticationProvider로 인증처리를 시도한다.</li>
      <li>HttpBasic 인증으로 들어올경우 ProviderManager 는 BasicAuthenticationProvider 인증처리를 시도한다.</li>
      <li>RememberMe 인증으로 들어올경우 ProviderManager 는 RememberMeAuthenticationProvider 인증처리를 시도한다.</li>
      <li>ProviderManager 는부모의 ProviderManager속성을 하나더 둘수있다.</li>
      <li>
        자신이 가지고있지않는 Provider가 없을때 부모격에서 찾게된다.예를들면 Oauth2 등이있다. 커스텀으로도 사용
        가능하다.
      </li>
      <Toggle text={"AuthenticationManger 사용방법 -HttpSecurity"} code={SecurityFilterChain} />
      <Toggle text={"AuthenticationManger 사용방법 -직접생성"} code={CustomAuthenticationFilter} />
    </div>
  );
};

export default AuthenticationManager;
