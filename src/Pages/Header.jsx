import "./Header.css";
const Header = ({ text }) => {
  return (
    <div className="Header">
      <h2>{text}</h2>
    </div>
  );
};

export default Header;
