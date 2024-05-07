import { useState } from "react";
import CodeBlock from "./CodeBlock";
import "./Toggle.css";
const Toggle = ({ text, code }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
  };
  return (
    <div>
      <div className="toggle" onClick={handleToggle}>
        {isToggled ? `${text}` : `${text}`}
      </div>
      {isToggled && (
        <div>
          <CodeBlock text={code} />
        </div>
      )}
    </div>
  );
};

export default Toggle;
