import Header from "../../components/Header";

const UsernamePasswordAuthenticationFilter = () => {
  return (
    <div>
      <Header text={"UsernamePasswordAuthenticationFilter"} />
      <h4>AbstractAuthenticationProcessingFilter</h4>
      <li>
        스프링 시큐리티는 AbstractAuthenticationProcessingFilter 클래스를 사용자의 자격증명을 인증하는 기본필터로
        사용한다.
      </li>
      <li>UsernamePasswordAuthenticationFilter 는 AbstractAuthenticationProcessingFilter 를 확장한 클래스이다.</li>
      <li>attemptAuthentication() 메서드를 제정의해서* 사용한다.</li>
    </div>
  );
};

export default UsernamePasswordAuthenticationFilter;
