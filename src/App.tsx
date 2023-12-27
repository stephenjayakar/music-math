import React, { useState, useEffect } from "react";
import * as music from "./music";
import "./App.css";

interface RandomNoteAndInterval {
  note: string;
  interval: number;
}

type AnswerState =
  | { type: "AWAITING_ANSWER" }
  | { type: "CORRECT"; correctAnswer: string }
  | { type: "INCORRECT"; correctAnswer: string };

const App: React.FC = () => {
  const [randomNoteAndInterval, setRandomNoteAndInterval] =
    useState<RandomNoteAndInterval>({ note: "", interval: 0 });
  const [answerState, setAnswerState] = useState<AnswerState>({
    type: "AWAITING_ANSWER",
  });
  const [seed, setSeed] = useState<number>(Math.random());

  useEffect(() => {
    resetRandomNoteAndInterval();
  }, []);

  const submitAnswer = (answer: string) => {
    const expected = music.intervalNote(
      randomNoteAndInterval.note,
      randomNoteAndInterval.interval
    );

    if (music.notesEqual(answer, expected)) {
      setAnswerState({ type: "CORRECT", correctAnswer: expected });
    } else {
      setAnswerState({ type: "INCORRECT", correctAnswer: expected });
    }
  };

  const resetRandomNoteAndInterval = () => {
    setRandomNoteAndInterval({
      note: music.randomNote(),
      interval: music.randomInterval(),
    });
    setAnswerState({ type: "AWAITING_ANSWER" });
    setSeed(Math.random());
  };

  const getButtonClass = (note: string) => {
    switch (answerState.type) {
      case "CORRECT": {
        if (answerState.correctAnswer === note) {
          return "answer-button correct";
        } else {
          return "answer-button";
        }
      }
      case "INCORRECT": {
        if (answerState.correctAnswer === note) {
          return "answer-button correct";
        } else {
          return "answer-button incorrect";
        }
      }
      case "AWAITING_ANSWER": {
        return "answer-button";
      }
    }
  };

  return (
    <div className="app">
      <main>
        {answerState.type !== "AWAITING_ANSWER" && (
          <div
            className={`message ${
              answerState.type === "CORRECT" ? "correct" : "incorrect"
            }`}
          >
            {answerState.type === "CORRECT"
              ? "Correct!"
              : `Oops! It was supposed to be ${answerState.correctAnswer}`}
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
              disabled={answerState.type !== "AWAITING_ANSWER"}
            >
              {music.noteRepr(note, true, seed)}
            </button>
          ))}
        </div>
      </main>
      {answerState.type !== "AWAITING_ANSWER" && (
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
