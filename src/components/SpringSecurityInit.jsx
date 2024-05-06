import { useState } from "react";
import Header from "./Header";
import CodeBlock from "./CodeBlock";
import NavigateSpan from "./NavigateSpan";

const SpringSecurityInit = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
  };
  const SecurityFilterChainConfiguration = `class SpringBootWebSecurityConfiguration {
    @ConditionalOnDefaultWebSecurity
    static class SecurityFilterChainConfiguration {
        @Bean
        @Order()
        SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
            http.authorizeHttpRequests((requests) -> {
                ((AuthorizeHttpRequestsConfigurer.AuthorizedUrl)requests.anyRequest()).authenticated();
            });
            http.formLogin(Customizer.withDefaults());
            http.httpBasic(Customizer.withDefaults());
            return http.build()
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
        <h3>초기화 과정중</h3>
        <NavigateSpan navi={"/httpSecurity"} text={"HttpSecurity"} />
        <span> ,&nbsp;</span>
        <NavigateSpan navi={"/webSecurity"} text={"WebSecurity"} />가 만들어지며 이들은 각 SecurityFilterChain,
        FilterChainProxy를 만드는 최종목표를가지고있다
        <h3>자동 설정에 의한 기본보안</h3>
        <ul>
          <li>기본적으로 보안기능이 작동된다.</li>
          <li>로그인 페이지가 자동생성 된다.</li>
          <li>
            <NavigateSpan navi={"/basicUserInfo"} text={"기본 아이디와 비밀번호가 제공된다."} />
          </li>
        </ul>
        <CodeBlock text={SecurityFilterChainConfiguration} />
        <li>
          <NavigateSpan navi={"/doBuild"} text={"http.build"} />
        </li>
        <br />
        의존성 추가로만으로 보안이 활성화되는이유는
        <button onClick={handleToggle}>{isToggled ? "접기" : "펼처보기"}</button>
        {isToggled && (
          <div>
            <li>@ConditionalOnDefaultWebSecurity 어노테이션내용에들어가보면 조건에</li>
            <CodeBlock text={DefaultWebSecurityCondition} />
            <li>위 두조건이 만족할때에만 default 설정으로 filterChain이 생성된다</li>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpringSecurityInit;
