import React, { useState, useEffect } from 'react';
import * as math from './math';

function App() {
  const [randomNoteAndInterval, setRandomNoteAndInterval] = useState({});

  // Placeholder function to simulate fetching data
  const resetRandomNoteAndInterval = () => {
    setRandomNoteAndInterval({
      note: math.randomNote(),
      interval: math.randomInterval(),
    });
  };

  useEffect(() => {
    resetRandomNoteAndInterval();
  }, []);

  return (
    <div>
      {randomNoteAndInterval && (
        <p>Note: {randomNoteAndInterval.note} Interval: {randomNoteAndInterval.interval}</p>
      )}
    </div>
  );
}

export default App;
