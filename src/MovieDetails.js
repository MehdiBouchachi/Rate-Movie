import { useState, useEffect } from "react";
import { StartRating } from "./StartRating";
import { KEY, Loader, ErrorMsg } from "./App";
import { useKey } from "./useKey";

export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddMoviesWatched,
  Watched,
}) {
  const [movie, setMovie] = useState({});
  const [isloading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");
  const isWatched = Watched.map((movie) => movie.imbdId).includes(selectedId);
  const watchUserRating = Watched.find(
    (movie) => movie.imbdId === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchMovie = {
      imbdId: selectedId,
      title,
      imdbRating: Number(imdbRating),
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddMoviesWatched(newWatchMovie);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      const controller = new AbortController();
      async function getMovieDetails() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Somthing went wrong!");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovie(data);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      }
      getMovieDetails();
      return function () {
        controller.abort();
      };
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
    },
    [title]
  );

  return (
    <div className="details">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${movie.title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMBD Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p>
                  You rated this movie {watchUserRating} <span>⭐</span>
                </p>
              ) : (
                <>
                  {" "}
                  <StartRating
                    maxRating={10}
                    size={24}
                    onRating={setUserRating}
                  />
                  <button className="btn-add" onClick={handleAdd}>
                    Add to list
                  </button>
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring by {actors}</p>
            <p>Dicretored by {director}</p>
          </section>
        </>
      )}
      {error && <ErrorMsg msg={error} />}
    </div>
  );
}
