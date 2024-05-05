import "./SpringSecurity.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
const SpringSecurity = () => {
  const nav = useNavigate();
  return (
    <div className="SpirngSecurity">
      <Header text={"SpringSecurity"} />
      <div
        className="dependencies"
        onClick={() => {
          nav("dependencies");
        }}
      >
        의존성 추가
      </div>

      <div
        className="dependencies"
        onClick={() => {
          nav("springSecurityInity");
        }}
      >
        초기화
      </div>
      <div
        className="dependencies"
        onClick={() => {
          nav("securityBuilder");
        }}
      >
        SecurityBuilder/SecurityConfigurer
      </div>
    </div>
  );
};

export default SpringSecurity;
