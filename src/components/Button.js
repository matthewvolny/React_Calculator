import React from "react";

export const Button = (props) => {
  if (
    // props.button === "AC" ||
    // props.button === "( )" ||
    // props.button === "\u02C4" ||
    props.button === "\u00F7" ||
    props.button === "x" ||
    props.button === "-" ||
    props.button === "+"
  ) {
    return (
      <button
        className="purple-button"
        value={props.button}
        onClick={() => props.updateCalculation(props.button)}
      >
        {props.button}
      </button>
    );
  }
  //   else if (props.button === "=" || props.button === "Del") {
  //     return (
  //       <button
  //         className="shaded-button"
  //         value={props.button}
  //         onClick={() => props.updateCalculation(props.button)}
  //       >
  //         {props.button}
  //       </button>
  //     );
  //   }
  else {
    return (
      <button
        value={props.button}
        onClick={() => props.updateCalculation(props.button)}
      >
        {props.button}
      </button>
    );
  }
};
