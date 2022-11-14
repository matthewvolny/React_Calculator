import "./App.css";
import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { deleteVal } from "./utils/deleteVal";

function App() {
  const [calc, setCalc] = useState("");
  const [formattedCalc, setFormattedCalc] = useState("");
  const [displayedResult, setDisplayedResult] = useState("");
  const [operatorCount, setOperatorCount] = useState(0);
  const [parenthesesCount, setParenthesesCount] = useState(0);

  const updateCalculation = (value) => {
    let operators = ["\u00F7", "\u02C4", "\u00D7", "+", "-", "."];

    if (operators.slice(0, 5).includes(value)) {
      setOperatorCount(operatorCount + 1);
    }

    //cannot have two operators in a row
    // cannot have an operator as the first value
    if (
      (value !== "." &&
        operators.includes(value) &&
        operators.includes(calc[calc.length - 1])) ||
      (operators.slice(0, 4).includes(value) && calc.length === 0)
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

    //parentheses handling
    // cannot have (), )(, or 2(
    if (
      (value === "( )" && calc[calc.length - 1] === "(") ||
      (value === "( )" && calc[calc.length - 1] === ")") ||
      (value === "( )" &&
        parenthesesCount % 2 === 0 &&
        digits.includes(calc[calc.length - 1]))
    ) {
      return;
    } else if (
      value === "( )" &&
      parenthesesCount % 2 !== 0 &&
      calc.includes("(")
    ) {
      value = ")";
      parenthesesCounter++;
      setParenthesesCount(parenthesesCounter);
    } else if (value === "( )") {
      value = "(";
      parenthesesCounter++;
      setParenthesesCount(parenthesesCounter);
    }

    setCalc(calc + value);

    //format calculation
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

    //if no operators in calc, do not evaluate
    //if # of parentheses not even, do not evaluate
    if (operatorCount === 0) {
      return;
    } else if (
      (operatorCount === 0 &&
        parenthesesCount === 0 &&
        !formattedCalc.includes("**")) ||
      parenthesesCount % 2 !== 0
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
    setOperatorCount(0);
  };

  //sets displayed calculation to current total
  const moveResult = () => {
    if (displayedResult) {
      setCalc(displayedResult);
      setFormattedCalc(displayedResult);
      setDisplayedResult("");
      setOperatorCount(0);
    }
  };

  //delete last value from current calculation
  const deleteCalculation = () => {
    //update # of operators in calculation
    let calcOperators = ["\u00F7", "\u02C4", "\u00D7", "+", "-", "."];

    if (calcOperators.slice(0, 5).includes(calc[calc.length - 1])) {
      setOperatorCount(operatorCount - 1);
    }

    setCalc(deleteVal(calc));

    if (formattedCalc[formattedCalc.length - 1] === ")") {
      setParenthesesCount(parenthesesCount - 1);
    }

    const newResultString = deleteVal(formattedCalc);
    setFormattedCalc(newResultString);

    let operators = ["/", "*", "-", "+", "."];

    //if deleting value reveals odd number of parentheses, do not evaluate
    //if deleting value reveals ** at the end, omit them in evaluation
    //if deleting value reveals an operator at the end, omit it in evaluation
    if (parenthesesCount % 2 !== 0) {
      return;
    } else if (newResultString[newResultString.length - 1] === "*") {
      setDisplayedResult(
        eval(newResultString.slice(0, newResultString.length - 2)).toString()
      );
    } else if (
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
