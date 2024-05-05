import { useState } from "react";
import Header from "../Pages/Header";

const Dependencies = () => {
  const [isToggled, setIsToggled] = useState(false);

  const codeString = `dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.springframework.security:spring-security-test'
  }`;

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(codeString);
  };
  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
  };
  return (
    <div>
      <Header text={"Dependencies"} />
      <button onClick={handleToggle}>{isToggled ? "Hide" : "Show"}</button>
      {isToggled && (
        <div>
          <pre>
            <code>{codeString}</code>
          </pre>
          <button onClick={copyCodeToClipboard}>Copy Code</button>
        </div>
      )}
    </div>
  );
};

export default Dependencies;
