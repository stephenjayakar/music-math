import React, { useState, useEffect } from "react";
import * as music from "./music";
import "./App.css";

function App() {
  const [randomNoteAndInterval, setRandomNoteAndInterval] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  // Used to keep the enharmonic display consistent on rerenders
  // (before submitting).
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    setRandomNoteAndInterval({
      note: music.randomNote(),
      interval: music.randomInterval(),
    });
  }, []);

  const submitAnswer = (answer) => {
    setSelectedAnswer(answer);
    const expected = music.intervalNote(
      randomNoteAndInterval.note,
      randomNoteAndInterval.interval
    );
    setIsCorrect(music.notesEqual(answer, expected));
  };

  const resetRandomNoteAndInterval = () => {
    setRandomNoteAndInterval({
      note: music.randomNote(),
      interval: music.randomInterval(),
    });
    setSelectedAnswer(null);
    setIsCorrect(null);
    setSeed(Math.random());
  };

  const getButtonClass = (note) => {
    if (selectedAnswer === note) {
      return isCorrect ? "answer-button correct" : "answer-button incorrect";
    }
    return "answer-button";
  };

  return (
    <div className="app">
      <main>
        {isCorrect != null && (
          <div className={`message ${isCorrect ? "correct" : "incorrect"}`}>
            {isCorrect
              ? "Correct!"
              : `Oops! It was supposed to be ${music.intervalNote(
                  randomNoteAndInterval.note,
                  randomNoteAndInterval.interval
                )}`}
          </div>
        )}
        <div className="display">
          <div className="note">
            {music.noteRepr(randomNoteAndInterval.note, false, seed)}
          </div>
          <div className="interval">{randomNoteAndInterval.interval}</div>
        </div>
        <div className="answer-buttons">
          {music.notes.map((note, index) => (
            <button
              key={index}
              className={getButtonClass(note)}
              onClick={() => submitAnswer(note)}
              disabled={isCorrect != null}
            >
              {music.noteRepr(note, true, seed)}
            </button>
          ))}
        </div>
      </main>
      {isCorrect != null && (
        <footer>
          <button className="next-button" onClick={resetRandomNoteAndInterval}>
            &rarr;
          </button>
        </footer>
      )}
    </div>
  );
}

export default App;
