import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";
import NavigateSpan from "../../components/NavigateSpan";
import Toggle from "../../components/Toggle";

const userDetailsService = `
public interface UserDetailsService {
    //사용자의 이름을 통해 사용자 데이터를 검색하고 UserDetails 객체로 반환한다.
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}`;
const customUserDetails = `
@EnableWebSecurity
@Configuration
@Slf4j
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        AuthenticationManagerBuilder managerBuilder =http.getSharedObject(AuthenticationManagerBuilder.class);
        //첫번째 방법
        managerBuilder.userDetailsService(userDetailsService());
        //두번째 방법
        http.userDetailsService(userDetailsService());
        //일반 객채로 사용하는방법
        managerBuilder.userDetailsService(new CustomUserDetailsService());

        http
                .authorizeHttpRequests(auth ->auth
                                .anyRequest()
                                .authenticated()
                )
                .formLogin(Customizer.withDefaults())
                ;


        return http.build();
    }


    @Bean
    public UserDetailsService userDetailsService() {

        return new CustomUserDetailsService();
    }
}
//CustomUserDetailsService
public class CustomUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return User
                .withUsername("user")
                .password("{noop}1111")
                .build();
    }
}

`;

const a = `
`;
const UserDetailsService = () => {
  return (
    <div>
      <Header text={"UserDetailsService"} />

      <li>
        UserDetailsService 의 주요 기능은 사용자와 관련된 상세 데이터를 로드하는것이며 사용자의 신원 권한, 자격증명같은
        정보를 포함한다.
      </li>
      <li>
        이 인터페이스를 사용하느클래스는 주로 AuthenticationProvider 이며 사용자가 시스템에 존재하는지 여부와
        사용자데이터를검색하고 인증과정을 수행한다.
      </li>
      <CodeBlock text={userDetailsService} />
      <div className="Flows">
        <div>
          <h3>AuthenticationProvider</h3>
          <h4>loadUserByUsername</h4>
          <div>username</div>
        </div>
        <div>
          <h3>UserDetailsService</h3>
          <div>UserRepository 사용</div>
        </div>
        <div>
          <h3>UserRepository</h3>
          <div>DB로 부터 사용자정보를 가져온다.</div>
        </div>
        <div>
          <h3>UserDetailsService</h3>
          <div>UserDetails 타입으로변환후</div>
          <div>AuthenticationProvider 반환</div>
        </div>
      </div>
      <h2>UserDetailsService 사용방법</h2>
      <Toggle text={"UserDetailsService"} code={customUserDetails} />
      <h2>인증과정</h2>
      <li>사용자의 인증요청이 들어오면</li>
      <li>
        <NavigateSpan navi={"/usernamePasswordAuthenticationFilter"} text={"인증필터"} />
        에서 <NavigateSpan navi={"/AuthenticationManager"} text={"AuthenticationManager"} />
        에게 인증을 맡긴다.
      </li>
      <li>
        그후에 <NavigateSpan navi={"/AuthenticationProvider"} text={"AuthenticationProvider"} />
        에서 적절한 Provider를 찾아서 위임하는데
      </li>
      <li>
        적절한 Provider 를 찾은후에 예를들어{" "}
        <NavigateSpan navi={"/daoAuthenticationProvider"} text={"DaoAuthenticationProvider"} />에 UserDetails loadedUser
        = this.getUserDetailsService().loadUserByUsername(username) 에서 우리가만든 customUserDeatilsService를
        가저오는걸 확인할수있다.
      </li>
      <li>
        가저와서
        <NavigateSpan navi={"/UserDetails"} text={"UserDetails"} />
        타입으로 반환한다.
      </li>
      {/* <CodeBlock text={""} /> */}
    </div>
  );
};

export default UserDetailsService;
