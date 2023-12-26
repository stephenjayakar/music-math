import React, { useState, useEffect } from 'react';
import * as music from './math';

function App() {
  const [randomNoteAndInterval, setRandomNoteAndInterval] = useState({});
  const [message, setMessage] = useState(null);

  // Placeholder function to simulate fetching data
  const resetRandomNoteAndInterval = () => {
    setRandomNoteAndInterval({
      note: music.randomNote(),
      interval: music.randomInterval(),
    });
    setMessage(null)
  };

  const submitAnswer = (answer) => {
    if (!randomNoteAndInterval) {
      return;
    }
    const expected = music.intervalNote(
      randomNoteAndInterval.note,
      randomNoteAndInterval.interval,
    );
    if (music.notesEqual(answer, expected)) {
      setMessage("Got it!")
    } else {
      setMessage("Oops, it was supposed to be " + expected)
    }
  }

  useEffect(() => {
    resetRandomNoteAndInterval();
  }, []);

  return (
    <div>
      <button onClick={()=>resetRandomNoteAndInterval()}>Next</button>
      {randomNoteAndInterval && (
        <>
          <p>Note: {randomNoteAndInterval.note} Interval: {randomNoteAndInterval.interval}</p>
          <div>
            {music.notes.map((answer) =>
              <button onClick={() => submitAnswer(answer)}>{answer}</button>
            )}
          </div>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
