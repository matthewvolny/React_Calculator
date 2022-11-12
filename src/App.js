import "./App.css";
import { useState } from "react";
import { Button } from "./components/Button";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const updateCalculation = (value) => {
    let operators = ["\u00F7", "x", "-", "+", "."];
    if (
      operators.includes(value) &&
      operators.includes(calc[calc.length - 1])
    ) {
      return;
    }
    setCalc(calc + value);
  };

  const calculateResult = () => {
    setResult(calc);
    console.log(calc);
  };

  const basicValues = [
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
  ];

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <span>{calc || "0"}</span>
        </div>
        <div className="buttons-container">
          <button
            className="purple-button"
            onClick={() => updateCalculation("AC")}
          >
            AC
          </button>
          <button
            className="purple-button"
            onClick={() => updateCalculation("( )")}
          >
            ( )
          </button>
          <button
            className="purple-button"
            onClick={() => updateCalculation("\u02C4")}
          >
            {"\u02C4"}
          </button>
          {basicValues.map((button, i) => {
            return (
              <Button
                key={i}
                button={button}
                updateCalculation={updateCalculation}
              />
            );
          })}
          <button
            className="purple-button"
            onClick={() => updateCalculation("Del")}
          >
            Del
          </button>
          <button
            className="purple-button"
            onClick={() => calculateResult("=")}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
