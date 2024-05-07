import Header from "../../components/Header";

const AuthenticationManager = () => {
  return (
    <div>
      <Header text={"AuthenticationManager"} />
      <li>인증 필터로부터 Authentication 객체를 전달받아 인증을 시도한다.</li>
      <li>성공할 경우 사용자의 정보,, 권한등을 포함한 Authentication 객체를 반환한다.</li>
      <li>
        AuthenticationProvider 목록중에서 인증 처리 요건에 맞는 적절한 AuthenticationProvider 를 찾아 인증처리를
        위임한다
      </li>
      <li>AuthenticationManagerBuilder 에 의해서 객체가 생성되며 주로 사용하는 구현체로 ProviderManager가 제공된다.</li>
      <h3>AuthenticationManagerBuilder</h3>
      <li>AuthenticatonManager 객체를 생성</li>
      <li>UserDetailsService 및 AuthenticationProvider 를 추가 할 수 있다.</li>
      <li>HttpSecurity.getSharedObject(AuthenticationManagerBuilder.class) 를 통해 객체를 참조할 수 있다.</li>
    </div>
  );
};

export default AuthenticationManager;
