import "./App.css";
import SpringSecurity from "./Pages/SpringSecurity";
import { Route, Routes } from "react-router-dom";
import Dependencies from "./components/Dependencies";
import SpringSecurityInit from "./components/SpringSecurityInit";
import BasicUserInfo from "./components/BasicUserInfo";
import SecurityBuilder from "./components/SecurityBuilder";
import Dobuild from "./Pages/Dobuild";
import HttpSecurity from "./Pages/HttpSecurity";
import WebSecurity from "./Pages/WebSecurity";
import PerFormBuild from "./Pages/PerFormBuild";
import DelegatingFilterProxy from "./Pages/DelegatingFilterProxy";
import Button from "./components/Button";
import FormLogin from "./Pages/authentication/FormLogin";
import UsernamePasswordAuthenticationFilter from "./Pages/filter/UsernamePasswordAuthenticationFilter";
import SecurityContext from "./Pages/authentication/SecurityContext";
import HttpBasic from "./Pages/authentication/HttpBasic";
import BasicAuthenticationFilter from "./Pages/filter/BasicAuthenticationFilter";

function App() {
  return (
    <>
      <Button navi={"/"} text={"SpringSecurity"} />
      <Routes>
        <Route path="/" element={<SpringSecurity />}></Route>
        <Route path="/dependencies" element={<Dependencies />}></Route>
        <Route path="/springSecurityInit" element={<SpringSecurityInit />}></Route>
        <Route path="/basicUserInfo" element={<BasicUserInfo />}></Route>
        <Route path="/securityBuilder" element={<SecurityBuilder />}></Route>
        <Route path="/doBuild" element={<Dobuild />}></Route>
        <Route path="/httpSecurity" element={<HttpSecurity />}></Route>
        <Route path="/perFormBuild" element={<PerFormBuild />}></Route>
        <Route path="/webSecurity" element={<WebSecurity />}></Route>
        <Route path="/delegatingFilterProxy" element={<DelegatingFilterProxy />}></Route>
        <Route path="/formLogin" element={<FormLogin />}></Route>
        <Route path="/usernamePasswordAuthenticationFilter" element={<UsernamePasswordAuthenticationFilter />}></Route>
        <Route path="/securityContext" element={<SecurityContext />}></Route>
        <Route path="/httpBasic" element={<HttpBasic />}></Route>
        <Route path="/basicAuthenticationFilter" element={<BasicAuthenticationFilter />}></Route>
      </Routes>
    </>
  );
}

export default App;
