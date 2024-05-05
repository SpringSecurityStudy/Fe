import Header from "../Pages/Header";
import CodeBlock from "./CodeBlock";
import { useNavigate } from "react-router-dom";
const SecurityBuilder = () => {
  const nav = useNavigate();
  const SecurityBuilder = `public interface SecurityBuilder<O> {
        O build() throws Exception;
    }`;
  const SecurityConfigurer = `public interface SecurityConfigurer<O, B extends SecurityBuilder<O>> {
    //초기화
    void init(B builder) throws Exception;
    //설정
    void configure(B builder) throws Exception;
}`;
  return (
    <div>
      <Header text={"SecurityBuilder"} />
      <div>
        SecurityBuilder 클래스는 웹보안을 구성하는 역할을하며&nbsp;
        <span
          onClick={() => {
            nav("/webSecurity");
          }}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          WebSecurity,
        </span>
        <span>&nbsp;</span>
        <span
          onClick={() => {
            nav("/httpSecurity");
          }}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          HttpSecurity
        </span>
        가 있다.
      </div>
      <div>SecurityConfigurer 는 Http요청과 관련된 보안처리를 담당</div>
      <div>
        SecurityBuilder 는 SecurityConfigurer 를 참조하며 인증 및 인가 초기화작업은 SecurityConfigurer 에의해서 진행
      </div>
      <CodeBlock text={SecurityBuilder} />
      <CodeBlock text={SecurityConfigurer} />
    </div>
  );
};

export default SecurityBuilder;
