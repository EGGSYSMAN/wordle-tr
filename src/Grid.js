import cx from "classnames";

const invalidWordAnimation = "animate__animated animate__shakeX";

export default function Grid({ letters = [] }) {
  return (
    <div className="grid grid-cols-5 gap-1 w-full h-full max-w-[350px] max-h-[430px]">
      {Array.from(new Array(5 * 6), (_, idx) => {
        const hasStatus = ["correct", "missplaced", "wrong"].includes(
          letters[idx]?.status
        );
        return (
          <div
            className={cx(
              "border-2 border-neutral-300 w-full h-full inline-flex justify-center items-center font-bold text-3xl select-none leading-[0px] uppercase",
              {
                "border-black": !!letters[idx],
                "bg-green-600": letters[idx]?.status === "correct",
                "bg-yellow-500": letters[idx]?.status === "missplaced",
                "bg-neutral-500": letters[idx]?.status === "wrong",
                "border-green-600": letters[idx]?.status === "correct",
                "border-yellow-500": letters[idx]?.status === "missplaced",
                "border-neutral-500": letters[idx]?.status === "wrong",
                [invalidWordAnimation]: letters[idx]?.status === "invalid",
                "text-white": hasStatus,
                "animate__animated animate__flipInX": [
                  "correct",
                  "missplaced",
                  "wrong",
                ].includes(letters[idx]?.status),
              }
            )}
            style={{ animationDelay: hasStatus ? `${(idx % 5) / 4}s` : "0s" }}
            key={idx}
          >
            {letters[idx]?.letter}
          </div>
        );
      })}
    </div>
  );
}
