import "./SpringSecurity.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import NavigateSpan from "../components/NavigateSpan.jsx";
import Button from "../components/Button.jsx";
const SpringSecurity = () => {
  const nav = useNavigate();
  return (
    <div className="SpirngSecurity">
      <Header text={"SpringSecurity"} />
      <div style={{ display: "flex", gap: "20px" }}>
        <Button navi={"/dependencies"} text={" 의존성 추가"} />
        <Button navi={"/springSecurityInit"} text={"초기화"} />
      </div>
      <div className="Architecture">
        <div className="Client">client</div>
        <div className="Was">
          Was
          <div className="Servlet">
            <Button navi={"/dependencies"} text={"Filter"} />
            <Button navi={"/dependencies"} text={"DelegatingFilterProxy"} />
            <Button navi={"/dependencies"} text={"Servlet"} />
          </div>
          <div>
            <div className="SpringSecurity">SpringSecurity</div>
            <div className="SpringMVC">SpringMVC</div>
          </div>
        </div>

        {/* <div className="FilterChain">
          <Button text={"FilterChain"} />
        </div>
        <div>
          <Button text={"Filter"} />
          ↓
          <Button text={"DelegatingFilterProxy"} />
          ↓
          <Button text={"Servlet"} />
        </div> */}
      </div>
    </div>
  );
};

export default SpringSecurity;
