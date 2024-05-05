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

function App() {
  return (
    <>
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
      </Routes>
    </>
  );
}

export default App;
