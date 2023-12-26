import React, { useState, useEffect } from 'react';
import * as music from './music';
import './App.css';

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
    <div className="app-container">
      <div className="content">
        <button className="next-button" onClick={()=>resetRandomNoteAndInterval()}>Next</button>
        {randomNoteAndInterval && (
          <div className="note-interval-display">
            <p className="note-display">{randomNoteAndInterval.note}</p>
            <p className="interval-display">{randomNoteAndInterval.interval}</p>
          </div>
        )}
        <div className="answers-container">
          {music.notes.map((answer) =>
            <button className="answer-button" onClick={() => submitAnswer(answer)}>{answer}</button>
          )}
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;
