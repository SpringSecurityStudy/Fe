import { useNavigate } from "react-router-dom";
import "./Button.css";

const Button = ({ navi, text }) => {
  const nav = useNavigate();
  return (
    <div
      className="dependencies"
      onClick={() => {
        nav(`${navi}`);
      }}
    >
      {text}
    </div>
  );
};

export default Button;
