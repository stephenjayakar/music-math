import React, { useState, useEffect } from "react";
import * as music from "./music";
import "./App.css";

interface RandomNoteAndInterval {
  note: string;
  interval: number;
}

const App: React.FC = () => {
  const [randomNoteAndInterval, setRandomNoteAndInterval] =
    useState<RandomNoteAndInterval>({ note: "", interval: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [seed, setSeed] = useState<number>(0);

  useEffect(() => {
    setRandomNoteAndInterval({
      note: music.randomNote(),
      interval: music.randomInterval(),
    });
    // Use an effect to set a seed for consistent rendering of enharmonics
    setSeed(Math.random());
  }, []);

  const submitAnswer = (answer: string) => {
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

  const getButtonClass = (note: string) => {
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
};

export default App;
