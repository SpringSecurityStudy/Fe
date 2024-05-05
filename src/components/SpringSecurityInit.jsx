import Header from "../Pages/Header";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNavigate } from "react-router-dom";
import CodeBlock from "./CodeBlock";
const SpringSecurityInit = () => {
  const nav = useNavigate();

  const SecurityFilterChainConfiguration = `class SpringBootWebSecurityConfiguration {
    @ConditionalOnDefaultWebSecurity
    static class SecurityFilterChainConfiguration {
        SecurityFilterChainConfiguration() {
        }
        @Bean
        @Order()
        SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
            http.authorizeHttpRequests((requests) -> {
                ((AuthorizeHttpRequestsConfigurer.AuthorizedUrl)requests.anyRequest()).authenticated();
            });
            http.formLogin(Customizer.withDefaults());
            http.httpBasic(Customizer.withDefaults());
            return (SecurityFilterChain)http.build();
        }
    }
  }`;
  const DefaultWebSecurityCondition = `class DefaultWebSecurityCondition extends AllNestedConditions {
    DefaultWebSecurityCondition() {
        super(ConfigurationPhase.REGISTER_BEAN);
    }
    //개발자가 SecurityFilterChain이라는 이름으로 빈을 생성하지않았을때
    @ConditionalOnMissingBean({SecurityFilterChain.class})
    static class Beans {
        Beans() {
        }
    }
    //애플리케이션 클래스패스에 SecurityFilterChain, HttpSecurity 존재할때에만 생성되도록 되어있다.
    @ConditionalOnClass({SecurityFilterChain.class, HttpSecurity.class})
    static class Classes {
        Classes() {
        }
    }
}`;
  return (
    <div className="SpringSecurityInit">
      <Header text={"SpringSecurityInit"} />
      <div>
        <h3>자동 설정에 의한 기본보안</h3>
        <ul>
          <li>기본적으로 보안기능이 작동된다.</li>
          <li>로그인 페이지가 자동생성 된다.</li>
          <li
            className="BasicUserInfo"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => {
              nav("/basicUserInfo");
            }}
          >
            기본 아이디와 비밀번호가 제공된다.
          </li>
        </ul>
        <CodeBlock text={SecurityFilterChainConfiguration} />
        위의 @ConditionalOnDefaultWebSecurity 어노테이션내용에들어가보면 조건에
        <CodeBlock text={DefaultWebSecurityCondition} />
      </div>
    </div>
  );
};

export default SpringSecurityInit;
