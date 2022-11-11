import "./App.css";

function App() {
  const generateButtons = () => {
    let buttons = [];
    const buttonValues = [
      "AC",
      "()",
      "x**y",
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
      "x",
      0,
      ".",
      "Del",
      "=",
    ];

    for (let i = 0; i < buttonValues.length; i++) {
      buttons.push(<button key={i + 1}>{buttonValues[i]}</button>);
    }
    return buttons;
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <span>0</span>
        </div>
        <div className="buttons-container">{generateButtons()}</div>
      </div>
    </div>
  );
}

export default App;
