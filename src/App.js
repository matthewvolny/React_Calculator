import "./App.css";

function App() {
  const generateDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(<button key={i}>{i}</button>);
    }
    return digits;
  };

  return (
    <>
      <div className="greeting">Hi there! Check out the calculator below.</div>
      <div className="calculator">
        <div className="display">
          <span>0</span>
        </div>
        <div className="controls">
          <button>AC</button>
          <button>(</button>
          <button>)</button>
          <button>x**y</button>
          <button>Delete</button>
          <button>=</button>
        </div>
        <div className="operators">
          <button>/</button>
          <button>*</button>
          <button>-</button>
          <button>+</button>
        </div>
        <div className="digits">
          <button>0</button>
          <button>.</button>
          {generateDigits()}
        </div>
      </div>
    </>
  );
}

export default App;
