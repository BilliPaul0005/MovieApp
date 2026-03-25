import React from 'react'

const MovieCard = ({ movie:
  { id, title, vote_average, poster_path, release_date, original_language }
}) => {
  const movieUrl = `https://www.themoviedb.org/movie/${id}`;

  return (
    <a
      className="movie-card"
      href={movieUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${title} on TMDB`}
    >
      <img
        src={poster_path ?
          `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
        alt={title}
      />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language}</p>

          <span>•</span>
          <p className="year">
            {release_date ? release_date.split('-')[0] : 'N/A'}
          </p>
        </div>
      </div>
    </a>
  )
}
export default MovieCard
