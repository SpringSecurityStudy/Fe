import Button from "./Button";
import "./FlowChart.css";
import Header from "./Header";

const FlowChart = ({ title, arry }) => {
  return (
    <div>
      <Header text={title} />
      <div className="Flow">
        {arry.map((item, index) => (
          <div className="FlowBox" key={index}>
            <div style={{ textAlign: "center" }}>{item.content}</div>
            <div className="arrow">
              <Button navi={`/${item.name}`} text={item.name} />
              {index < arry.length - 1 && <span>▶</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowChart;
