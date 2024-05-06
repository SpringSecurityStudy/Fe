import { useState } from "react";
import Header from "./Header";
import CodeBlock from "./CodeBlock";

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
      <div>
        <pre>
          <CodeBlock text={codeString} />
          <button onClick={copyCodeToClipboard}>Copy Code</button>
        </pre>
      </div>
    </div>
  );
};

export default Dependencies;
