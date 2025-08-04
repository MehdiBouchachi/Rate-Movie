import { useState, useEffect } from "react";
const KEY = "fa154d1a";
export function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      // callBack?.();
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Somthing went wrong!");
          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      //  handleSelectedId();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, error, isloading };
}
