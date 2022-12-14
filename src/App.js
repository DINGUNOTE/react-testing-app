import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <div data-testid="counter">{count}</div>
      <div>
        <button
          type="button"
          data-testid="minus-button"
          onClick={() => setCount((prev) => prev - 1)}
          disabled={disabled}
        >
          -
        </button>
        <button
          type="button"
          data-testid="plus-button"
          onClick={() => setCount((prev) => prev + 1)}
          disabled={disabled}
        >
          +
        </button>
      </div>
      <div>
        <button
          style={{ backgroundColor: 'blue', color: '#fff' }}
          type="button"
          data-testid="on-off-button"
          onClick={() => setDisabled(true)}
        >
          on/off
        </button>
      </div>
    </>
  );
};

export default App;
