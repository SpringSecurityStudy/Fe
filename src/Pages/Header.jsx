import "./Header.css";
const Header = ({ text }) => {
  return (
    <div className="Header">
      <div>{text}</div>
    </div>
  );
};

export default Header;
