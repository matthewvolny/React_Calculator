import "./App.css";
import { useEffect, useState } from "react";
import { Button } from "./components/Button";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [displayedResult, setDisplayedResult] = useState("");

  const updateCalculation = (value) => {
    let operators = ["\u00F7", "x", "-", "+", "."];
    if (
      operators.includes(value) &&
      operators.includes(calc[calc.length - 1])
    ) {
      return;
    }
    setCalc(calc + value);

    if (value === "\u00F7") {
      value = "/";
    } else if (value === "x") {
      value = "*";
    }
    setResult(result + value);
  };

  useEffect(() => {
    let operators = ["/", "*", "-", "+", "."];
    if (result.length >= 3 && !operators.includes(result[result.length - 1])) {
      setDisplayedResult(eval(result).toString());
    }
  }, [result]);

  const moveResult = () => {
    setCalc(displayedResult);
    setDisplayedResult("");
  };

  const deleteCalculation = () => {
    let newCalc = calc.split("");
    newCalc.pop();
    setCalc(newCalc.join(""));

    let newResult = result.split("");
    newResult.pop();
    const newResultString = newResult.join("");
    setResult(newResultString);

    let operators = ["/", "*", "-", "+", "."];
    if (
      newResultString.length >= 3 &&
      operators.includes(newResultString[newResultString.length - 1])
    ) {
      setDisplayedResult(
        eval(newResultString.slice(0, newResultString.length - 1)).toString()
      );
    } else {
      setDisplayedResult("");
    }
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
          <div>{calc || "0"}</div>
          <div className="result">{displayedResult}</div>
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
            onClick={() => deleteCalculation("Del")}
          >
            Del
          </button>
          <button className="purple-button" onClick={() => moveResult("=")}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
