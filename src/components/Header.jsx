import "./Header.css";
import { useNavigate } from "react-router-dom";
const Header = ({ text }) => {
  const nav = useNavigate();
  return (
    <div className="Header">
      <h2>{text}</h2>
    </div>
  );
};

export default Header;
