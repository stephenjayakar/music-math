import React, { useState, useEffect } from 'react';
import * as music from './music';
import './App.css';

function App() {
  const [randomNoteAndInterval, setRandomNoteAndInterval] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    setRandomNoteAndInterval({
      note: music.randomNote(),
      interval: music.randomInterval(),
    });
  }, []);

  const submitAnswer = (answer) => {
    const expected = music.intervalNote(
      randomNoteAndInterval.note,
      randomNoteAndInterval.interval,
    );
    setMessage(music.notesEqual(answer, expected) ? "Got it!" : `Oops, it was supposed to be ${expected}`);
  };

  const resetRandomNoteAndInterval = () => {
    setRandomNoteAndInterval({
      note: music.randomNote(),
      interval: music.randomInterval(),
    });
    setMessage('');
  };

  return (
    <div className="app">
      <header>
        <button onClick={resetRandomNoteAndInterval}>Next</button>
      </header>
      <main>
        <div className="display">
          <div className="note">{music.noteRepr(randomNoteAndInterval.note, false)}</div>
          <div className="interval">{randomNoteAndInterval.interval}</div>
        </div>
        <div className="answer-buttons">
          {music.notes.map((note, index) => (
            <button key={index} onClick={() => submitAnswer(note)}>{music.noteRepr(note, true)}</button>
          ))}
        </div>
      </main>
      {message && <footer className="message">{message}</footer>}
    </div>
  );
}

export default App;
