import React from "react";

export const Button = (props) => {
  if (
    props.button === "AC" ||
    props.button === "( )" ||
    props.button === "\u02C4" ||
    props.button === "\u00F7" ||
    props.button === "x" ||
    props.button === "-" ||
    props.button === "+"
  ) {
    return <button className="purple-button">{props.button}</button>;
  } else if (props.button === "=" || props.button === "Del") {
    return <button className="shaded-button">{props.button}</button>;
  } else {
    return <button>{props.button}</button>;
  }
};
