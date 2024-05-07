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

import HttpBasic from "./Pages/authentication/HttpBasic";
import BasicAuthenticationFilter from "./Pages/filter/BasicAuthenticationFilter";
import RememberMe from "./Pages/authentication/RememberMe";
import RememberMeAuthenticationFilter from "./Pages/filter/RememberMeAuthenticationFilter";
import RememberMeAuthenticationToken from "./Pages/Token/RememberMeAuthenticationToken";
import Architecture from "./Pages/authenticationArchitecture/Architecture";
import Authentication from "./Pages/authenticationArchitecture/Authentication";
import SuccessfulAuthentication from "./Pages/method/SuccessfulAuthentication";
import SecurityContext from "./Pages/authenticationArchitecture/SecurityContext";
import AbstractAuthenticationProcessingFilter from "./Pages/filter/AbstractAuthenticationProcessingFilter";

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
        <Route path="/httpBasic" element={<HttpBasic />}></Route>
        <Route path="/basicAuthenticationFilter" element={<BasicAuthenticationFilter />}></Route>
        <Route path="/rememberMe" element={<RememberMe />}></Route>
        <Route path="/rememberMeAuthenticationFilter" element={<RememberMeAuthenticationFilter />}></Route>
        <Route path="/rememberMeAuthenticationToken" element={<RememberMeAuthenticationToken />}></Route>
        <Route path="/architecture" element={<Architecture />}></Route>
        <Route path="/authentication" element={<Authentication />}></Route>
        <Route path="/securityContext" element={<SecurityContext />}></Route>
        <Route path="/securityContextHolder" element={<SecurityContext />}></Route>
        <Route path="/SuccessfulAuthentication" element={<SuccessfulAuthentication />}></Route>
        <Route
          path="/abstractAuthenticationProcessingFilter"
          element={<AbstractAuthenticationProcessingFilter />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
