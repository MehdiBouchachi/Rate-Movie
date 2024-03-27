/*import { useState } from "react";
import { SummaryList } from "./SummaryList";
import { Summary } from "./Summary";

export function MoviesWatched({ tempWatchedData }) {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <Summary watched={watched} />
          <SummaryList watched={watched} />
        </>
      )}
    </div>
  );
}
*/