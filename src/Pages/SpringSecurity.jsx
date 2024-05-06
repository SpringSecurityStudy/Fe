import "./SpringSecurity.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import NavigateSpan from "../components/NavigateSpan.jsx";
import Button from "../components/Button.jsx";
const SpringSecurity = () => {
  const nav = useNavigate();
  return (
    <div className="SpringSecurity">
      <Header text={"SpringSecurity"} />
      <div style={{ display: "flex", gap: "20px" }}>
        <Button navi={"/dependencies"} text={" 의존성 추가"} />
        <Button navi={"/springSecurityInit"} text={"초기화"} />
        <Button navi={"/formLogin"} text={"FormLogin"} />
        <Button navi={"/httpBasic"} text={"HttpBasic"} />
        <Button navi={"/rememberMe"} text={"RememberMe"} />
        <Button navi={"/architecture"} text={"Architecture"} />
      </div>
      <div>
        <Button navi={"/usernamePasswordAuthenticationFilter"} text={"UsernamePasswordAuthenticationFilter"} />
        <Button navi={"/basicAuthenticationFilter"} text={"BasicAuthenticationFilter"} />
        <Button navi={"/rememberMeAuthenticationFilter"} text={"RememberMeAuthenticationFilter"} />
      </div>
      <div className="Architecture">
        <div className="Client">client</div>
        <div className="Was">
          <span>Was</span>
          <div className="WasContainer">
            <div className="ServletContainer">
              ServletContainer
              <Button navi={"/dependencies"} text={"Filter"} />
              <span className="DelegatingFilterProxy">
                <Button navi={"/delegatingFilterProxy"} text={"DelegatingFilterProxy"} />
              </span>
              <Button navi={"/dependencies"} text={"Servlet"} />
            </div>
            <div className="SpringIOC_Container">
              SpringIOC_Container
              <div className="SpringMVC">SpringMVC</div>
              <div className="filterChainProxy">SpringSecurity(filterChainProxy)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpringSecurity;
