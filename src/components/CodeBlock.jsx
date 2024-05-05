import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ text }) => {
  return (
    <div>
      <SyntaxHighlighter language="java" style={vscDarkPlus}>
        {text}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
