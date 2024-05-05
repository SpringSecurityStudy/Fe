import { useNavigate } from "react-router-dom";

const NavigateSpan = ({ navi, text }) => {
  const nav = useNavigate();
  return (
    <span
      onClick={() => {
        nav(`${navi}`);
      }}
      style={{ cursor: "pointer", textDecoration: "underline" }}
    >
      {text}
    </span>
  );
};

export default NavigateSpan;
