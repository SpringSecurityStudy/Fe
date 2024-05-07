import "./App.css";
import Button from "./components/Button";
import { Route, Routes } from "react-router-dom";

import Router from "./router/Router";

function App() {
  return (
    <>
      <Button navi={"/"} text={"SpringSecurity"} />
      <Router />
    </>
  );
}

export default App;
