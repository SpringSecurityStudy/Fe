import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";
import NavigateSpan from "../../components/NavigateSpan";

const SecurityFilterChain = `
@EnableWebSecurity
@Configuration
@Slf4j
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .authorizeRequests(auth -> auth.anyRequest().authenticated())
                .formLogin(Customizer.withDefaults())
                .rememberMe(rememberMe -> rememberMe
                        //기억하기 매개변수가 설정되지 않았을때에도 쿠키가 항상 생성되어야 하는지 여부
                        .alwaysRemember(true)
                        //토큰이 유요한 시간을 지정할수있다.
                        .tokenValiditySeconds(3600)
                        //UserDetails를 조회하기위해 사용되는 UserDetailsService를 지정한다.
                        .userDetailsService(userDetailsService())
                        //로그인시 사용자를 기억하기위해 사용되는 매개변수이며 기본값은 remember-me 이다
                        .rememberMeCookieName("remember")
                        //토큰을 저장하는 이름이며 기본값은 remember-me 이다
                        .rememberMeParameter("remember")
                        //기억하기인증을 위해 토큰을 식별하는 키 설정
                        .key("security")

                )
        ;


        return http.build();
    }

`;

const RememberMe = () => {
  return (
    <div>
      <Header text={"RememberMe"} />
      <h3>RememberMe 인증</h3>
      <li>사용자가 웹 사이트나 애클리케이션에 로그인할때 자동으로 인증정보를 기억하는 기능이다.</li>
      <li>
        usernamePasswordAuthenticationFilter와 함께 사용되며, AbstractAuthenticationProcessingFilter 클래스에서 훅을
        통해구현된다.
      </li>
      <li>인증 성공시 RememberMeServices.loginSuccess()를 통해 RememberMe토큰을 생성하고 쿠키로 전달한다</li>
      <li>인증 실패시 RememberMeServices.loginFail() 를 통해 쿠키를 지운다.</li>
      <h3>토큰생성</h3>
      <li>
        기본적으로 <NavigateSpan navi={"/rememberMeAuthenticationToken"} text={"암호화"} />된 토큰으로 생성되며
        브라우저에 쿠키를 보내고 향우 세션에서 이 쿠키를 감지하여 자동로그인이 이러우지는 방식이다.
      </li>
      <h3>RememberMeServices 구현체</h3>
      <li>TokenBasedRememberMeServices - 쿠키기반 토큰의 보안을 위해 해싱을 사용한다 (memory방식)</li>
      <li>
        PersistentTokenBasedRememberMeServices - 토큰을 저장하기위해 데이터베이스나 다른 영구 저장매체를 사용한다.
      </li>
      <li>두 구현 모두 사용자의 정보를 검색하기위한 UserDetailsService가 필요하다</li>
      <CodeBlock text={SecurityFilterChain} />
    </div>
  );
};

export default RememberMe;
