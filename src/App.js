import "./App.css";
import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { deleteVal } from "./utils/deleteVal";

function App() {
  const [calc, setCalc] = useState("");
  const [formattedCalc, setFormattedCalc] = useState("");
  const [displayedResult, setDisplayedResult] = useState("");
  const [operatorUsed, setOperatorUsed] = useState(false);
  const [parenthesesCount, setParenthesesCount] = useState(0);

  const updateCalculation = (value) => {
    let operators = ["\u00F7", "\u02C4", "\u00D7", "-", "+", ".", "("];
    if (operators.slice(0, 5).includes(value)) {
      setOperatorUsed(true);
    }
    if (
      operators.includes(value) &&
      operators.includes(calc[calc.length - 1])
    ) {
      return;
    }

    let parenthesesCounter = 0;
    for (const value of calc) {
      if (value === "(" || value === ")") {
        parenthesesCounter++;
      }
    }

    let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

    if (
      (value === "( )" && calc[calc.length - 1] === "(") ||
      (value === "( )" &&
        parenthesesCount % 2 === 0 &&
        digits.includes(calc[calc.length - 1]))
    ) {
      return;
    } else if (value === "( )" && calc.includes("(")) {
      value = ")";
      setParenthesesCount(parenthesesCounter++);
    } else if (value === "( )") {
      value = "(";
      setParenthesesCount(parenthesesCounter++);
    }

    setCalc(calc + value);

    if (value === "\u00F7") {
      value = "/";
    } else if (value === "\u00D7") {
      value = "*";
    } else if (value === "\u02C4") {
      value = "**";
    }

    setFormattedCalc(formattedCalc + value);
  };

  useEffect(() => {
    let operators = ["/", "*", "-", "+", "."];

    if (
      (!operatorUsed &&
        parenthesesCount === 0 &&
        !formattedCalc.includes("**")) ||
      formattedCalc[formattedCalc.length - 1] === "("
    ) {
      return;
    } else if (
      formattedCalc.length >= 3 &&
      !operators.includes(formattedCalc[formattedCalc.length - 1]) &&
      parenthesesCount % 2 === 0
    ) {
      setDisplayedResult(eval(formattedCalc).toString());
    }
  }, [formattedCalc]);

  //clears calculator
  const clearCalculator = () => {
    setCalc("");
    setFormattedCalc("");
    setDisplayedResult("");
  };

  //sets displayed calculation to current total
  const moveResult = () => {
    if (displayedResult) {
      setCalc(displayedResult);
      setFormattedCalc(displayedResult);
      setDisplayedResult("");
    }
  };

  //delete last value from current calculation
  const deleteCalculation = () => {
    setCalc(deleteVal(calc));

    const newResultString = deleteVal(formattedCalc);
    setFormattedCalc(newResultString);

    let operators = ["/", "*", "-", "+", "."];

    //if deleting value reveals an operator at the end, omit it in evaluation
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
    "( )",
    "\u02C4",
    "\u00F7",
    7,
    8,
    9,
    "\u00D7",
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
            onClick={() => clearCalculator("AC")}
          >
            AC
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
          <button className="shaded-button" onClick={() => moveResult("=")}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
