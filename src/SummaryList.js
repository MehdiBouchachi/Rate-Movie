export function SummaryList({ watched ,onDeleteWtached}) {
  return (
    <ul className="list">
      {watched.map((movie) => (<>
      
        <WatchedMovie movie={movie}
        key={movie.imbdId} onDeleteWtached={onDeleteWtached}/>
      </>))}
    </ul>
  );
}
function WatchedMovie({ movie ,onDeleteWtached}) {

  return (
    <li key={movie.imbdId}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        
      </div>
      <button className="btn-delete"
        onClick={() => onDeleteWtached(movie.imbdId)}>
          X 
      </button>
      {console.log(movie)}
    </li>
  );
}
