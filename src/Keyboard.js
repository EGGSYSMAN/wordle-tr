import { useEffect } from "react";
import cx from "classnames";
import Key from "./Key";
import Backspace from "./icons/Backspace";

const KEYS = `
qwertyuiop
asdfghjklñ
zxcvbnm
`
  .trim()
  .split("\n")
  .map((x) => x.split(""));

function isLastRow(row) {
  return row === KEYS[KEYS.length - 1];
}

export default function Keyboard({
  onKeyPressed,
  onEnter,
  onBackspace,
  letters = [],
}) {
  useEffect(() => {
    function onKeyup(e) {
      if (e.key === "Enter") onEnter();
      if (e.key === "Backspace") onBackspace();
      if (KEYS.flat().includes(e.key)) onKeyPressed(e.key);
    }
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
  });
  return (
    <div className="w-full px-4 mb-8">
      {KEYS.map((row) => {
        return (
          <div className="flex w-full gap-1">
            {isLastRow(row) && (
              <Key className="grow-[1.5]" onClick={onEnter}>
                ⏎
              </Key>
            )}
            {row.map((key) => {
              const status = letters
                .filter(({ letter }) => letter === key)
                .map(({ status }) => status)
                .sort()[0];
              console.log({ key, status }, status === "missplaced");

              return (
                <Key
                  key={key}
                  onClick={() => onKeyPressed(key)}
                  className={cx({
                    "bg-green-500": status === "correct",
                    "bg-yellow-600": status === "missplaced",
                    "bg-gray-500": status === "wrong",
                    "text-white": !!status,
                  })}
                >
                  {key}
                </Key>
              );
            })}
            {isLastRow(row) && (
              <Key className="grow-[1.5]" onClick={onBackspace}>
                <Backspace />
              </Key>
            )}
          </div>
        );
      })}
    </div>
  );
}
