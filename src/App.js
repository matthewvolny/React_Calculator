import "./App.css";
import { Button } from "./components/Button";

function App() {
  const buttonValues = [
    "AC",
    "( )",
    "\u02C4",
    "\u00F7",
    7,
    8,
    9,
    "x",
    4,
    5,
    6,
    "-",
    1,
    2,
    3,
    "+",
    0,
    ".",
    "Del",
    "=",
  ];

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <span>0</span>
        </div>
        <div className="buttons-container">
          {buttonValues.map((button, i) => {
            return <Button key={i} button={button} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
