import { useState, useCallback } from "react";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import "animate.css";

import WORD_LIST from "./words";
// import Help from "./icons/Help";
// import Chart from "./icons/Chart";
// import Settings from "./icons/Settings";
import Github from "./icons/Github";

function withoutTime(dateTime = new Date()) {
  var date = new Date(dateTime.getTime());
  date.setHours(0, 0, 0, 0);
  return date;
}

const WORD_LENGTH = 5;

const FINDING_WORD = WORD_LIST[withoutTime().getTime() % WORD_LIST.length];

function App() {
  const [letters, setLetters] = useState([]);
  const [word, setWord] = useState("");
  const [status, setStatus] = useState(null);

  const addLetter = useCallback(
    (letter) => {
      setStatus(null);
      if (word.length === WORD_LENGTH) return;

      setWord(word + letter.toLowerCase());
    },
    [word]
  );

  const validateWord = useCallback(() => {
    if (!WORD_LIST.includes(word)) {
      setStatus("invalid");
    } else if (word === FINDING_WORD) {
      setLetters([
        ...letters,
        ...word.split("").map((letter) => ({ status: "correct", letter })),
      ]);
      setWord("");
    } else {
      setLetters([
        ...letters,
        ...word.split("").map((letter, idx) => {
          if (FINDING_WORD[idx] === letter) {
            return { status: "correct", letter };
          }
          if (
            FINDING_WORD.indexOf(letter) >= 0 &&
            word[FINDING_WORD.indexOf(letter)] !== letter
          ) {
            return { status: "missplaced", letter };
          }
          return { status: "wrong", letter };
        }),
      ]);
      setWord("");
    }
  }, [word, letters]);

  return (
    <>
      <main className="flex flex-col justify-between items-center h-[100vh] max-w-[500px] m-auto">
        <header className="flex flex-row justify-center items-center p-1 min-w-full border-b border-neutral-300">
          {/* <Help className="text-neutral-500" /> */}
          <h1 className="uppercase font-bold text-4xl tracking-wider">
            WORDLE (TR)
          </h1>
          {/* <div className="flex gap-1">
          <Chart className="text-neutral-500" />
          <Settings className="text-neutral-500" />
        </div> */}
        </header>
        <Grid
          letters={[
            ...letters,
            ...word.split("").map((letter) => ({ status, letter })),
          ]}
        />

        <Keyboard
          onKeyPressed={addLetter}
          onEnter={validateWord}
          onBackspace={() => setWord(word.slice(0, -1))}
          letters={letters}
        />
      </main>
      <a
        href="https://github.com/MRSteeLion"
        title="Source code"
        target="_blank"
        rel="noreferrer"
      >
        <Github className="absolute right-2 top-2" />
      </a>
    </>
  );
}

export default App;
