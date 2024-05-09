import CodeBlock from "../../components/CodeBlock";
import Header from "../../components/Header";
import NavigateSpan from "../../components/NavigateSpan";
import "./Authentication.css";

const authentication = `
public interface Authentication extends Principal, Serializable {
  //인증 주체를 의미하며 인증요청의 경우 사용자의 이름을, 인증후에는 UserDetails 타입의 객체가 될 수 있다.
  Object getPrincipal();
  // 인증 주체가 올바른 것을 증명하는 자격증명으로 대개 비밀번호를 의미한다.
  Object getCredentials();
  //인증주체(principal)에게 부여된 권한을 나타낸다
  Collection<? extends GrantedAuthority> getAuthorities();
  //인증요청에 대한 추가적인 세부사항을 저장한다.(IP주소, 인증서 일련번호 등)
  Object getDetails();
  //인증상태를 반환한다.
  boolean isAuthenticated();
  //인증상태를 설정한다.
  void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException;
}
`;
const Principal = `
public interface Principal {
    boolean equals(Object another);
    String toString();
    int hashCode();
    String getName();
    default boolean implies(Subject subject) {
        if (subject == null)
            return false;
        return subject.getPrincipals().contains(this);
    }
}

`;

const Authentication = () => {
  return (
    <div>
      <Header text={"Authentication"} />
      <li>인증이란 특정 자원에 접근하려는 사람의 신원을 확인하는 방법을 의미한다.</li>
      <li>
        사용자 인증의 일반적인 방법은 Id,pw 를 입력하게 하는것으로서 인증이 수행되면 신원을 알고 권한을 부여할수 있다.
      </li>
      <li>Authentication 은 사용자의 인증정보를 저장하는 토큰개념의 객체로 활용되며</li>
      <li>인증이후에는 SecurityContext에 저장되어 전역적으로 참조가 가능하다.</li>
      <CodeBlock text={authentication} />
      <CodeBlock text={Principal} />
      <li>Principal은 java의 api에 있다.</li>
      <h3>인증 절차 흐름</h3>
      <div className="Flows">
        <div>
          <h3>client</h3>
          Get/login?id+pw
        </div>

        <div>
          <h3>AuthenticationFilter</h3>
          Authentication객체를 만든다
        </div>
        <div style={{ backgroundColor: "rgb(86, 126, 112)" }}>
          <h3>Authentication</h3>
          <div>principal : id</div>
          <div>cridentials : pw</div>
          <div>authorities:</div>
          <div>authenticated: false</div>
        </div>
        <div>
          <h3>AuthenticationManager</h3>
          인증처리수행
        </div>
        <div style={{ backgroundColor: "rgb(86, 126, 112)" }}>
          <h3>Authentication</h3>
          <div>principal : UserDetails</div>
          <div>cridentials :</div>
          <div>authorities:ROLE_USER</div>
          <div>authenticated: true</div>
        </div>
        <div>
          <h3>SecurityContextHolder</h3>
          인증처리가 완료되면 역순으로 AuthenticationFilter까지 올라간후에 Authentication객체를 SecurityContextHolder를
          통해 SecurityContext에 저장한다
        </div>
        <div>
          <h3>
            <NavigateSpan navi={"/SecurityContextRepository"} text={"SecurityContextRepository"} />
          </h3>
          SecurityContext를 Session에 저장한다
        </div>
      </div>
    </div>
  );
};

export default Authentication;
