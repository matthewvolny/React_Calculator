import React from "react";

export const Button = (props) => {
  if (
    props.button === "( )" ||
    props.button === "\u02C4" ||
    props.button === "\u00F7" ||
    props.button === "\u00D7" ||
    props.button === "-" ||
    props.button === "+"
  ) {
    return (
      <button
        className="purple-button"
        onClick={() => props.updateCalculation(props.button)}
      >
        {props.button}
      </button>
    );
  } else {
    return (
      <button onClick={() => props.updateCalculation(props.button)}>
        {props.button}
      </button>
    );
  }
};
