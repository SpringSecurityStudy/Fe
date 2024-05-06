import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";

const httpBasic = `
@EnableWebSecurity
@Configuration
@Slf4j
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth ->auth.anyRequest().authenticated())
                 //authenticationEntryPoint 인증실패시 호출되는 메서드
                .httpBasic(basic ->basic.authenticationEntryPoint(new CustomAuthenticationEntryPoint()));

        return http.build();
    }

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
@Override
public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
    response.setHeader("WWW-Authenticate", "Basic realm=security");
    response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase());
}}
`;

const HttpBasic = () => {
  return (
    <div>
      <Header text={"HttpBasic"} />
      <li>클라이언트에서 요청이 들어온후</li>
      <li>인증이되지 않은 사용자는 헤더에 WWW-Authenticate 추가해서보내주고 사용자의 인증을 요청한다</li>
      <li>클라이언트는 인증요청을 WWW-Authenticate 에 담아서보낸다</li>
      <li>정보는base64로 인코딩이 되기때문에 디코딩이가능하다</li>
      <li>HTTPS 나 TLS 에서 사용해야 그나마 안전하다</li>
      <CodeBlock text={httpBasic} />
    </div>
  );
};

export default HttpBasic;
