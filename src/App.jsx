import "./App.css";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";

import Router from "./router/Router";

function App() {
  const history = useNavigate();
  return (
    <>
      <div style={{ display: "flex", gap: "24px", padding: "24px" }}>
        <Button navi={"/"} text={"SpringSecurity"} />
        <button
          onClick={() => {
            history(-1);
          }}
        >
          뒤로가기
        </button>
      </div>
      <Router />
    </>
  );
}

export default App;
