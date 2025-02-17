import { useState } from "react";
import { NavBar } from "./NavBar";
import { Box, MoviesList } from "./Box";
import { Logo } from "./NavBar";
import { NumResults } from "./NavBar";
import { Search } from "./NavBar";
import { Summary } from "./Summary";
import { SummaryList } from "./SummaryList";
import { MovieDetails } from "./MovieDetails";
import { useMovie } from "./useMovie";
import { useLocalStorageState } from "./useLocalStorageState";

/*
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];*/
export const KEY = "fa154d1a";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isloading, error } = useMovie(query);
  const [watched, setWatched] = useLocalStorageState([],"watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleMovieWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeletWtached(id) {
    setWatched((watched) => watched.filter((movie) => movie.imbdId !== id));
  }


  //fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`).then((res)=> res.json()).then(data=>console.log(data.Search))
  return (
    <>
      <NavBar movies={movies}>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/*isloading ? <Loader /> : <MoviesList movies={movies} />*/}

          {isloading && <Loader />}
          {!isloading && !error && (
            <MoviesList movies={movies} OnSelectedMovie={handleSelectMovie} />
          )}
          {error && <ErrorMsg msg={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddMoviesWatched={handleMovieWatched}
              Watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <SummaryList
                watched={watched}
                onDeleteWtached={handleDeletWtached}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}

export function ErrorMsg({ msg }) {
  return <p className="error">⛔{msg}</p>;
}
export function Loader() {
  return <p className="loader">Loading...</p>;
}
