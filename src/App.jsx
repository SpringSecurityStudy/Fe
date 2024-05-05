import "./App.css";
import SpringSecurity from "./Pages/SpringSecurity";
import { Route, Routes } from "react-router-dom";
import Dependencies from "./components/Dependencies";
import SpringSecurityInit from "./components/SpringSecurityInit";
import BasicUserInfo from "./components/BasicUserInfo";
import SecurityBuilder from "./components/SecurityBuilder";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SpringSecurity />}></Route>
        <Route path="/dependencies" element={<Dependencies />}></Route>
        <Route path="/springSecurityInity" element={<SpringSecurityInit />}></Route>
        <Route path="/basicUserInfo" element={<BasicUserInfo />}></Route>
        <Route path="/securityBuilder" element={<SecurityBuilder />}></Route>
      </Routes>
    </>
  );
}

export default App;
