import { useEffect, useState } from 'react'
import Spinner from './Spinner.jsx'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || import.meta.env.EXPO_PUBLIC_MOVIE_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const MovieDetails = ({ movieId, onClose }) => {
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `${API_BASE_URL}/movie/${movieId}`,
                    API_OPTIONS
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }

                const data = await response.json();
                setDetails(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching movie details:', err);
                setError('Failed to load movie details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [movieId]);

    if (isLoading) return <Spinner />;

    if (error) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-btn" onClick={onClose}>✕</button>
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    if (!details) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>

                <div className="movie-details-container">
                    <div className="details-header">
                        <img
                            src={details.poster_path
                                ? `https://image.tmdb.org/t/p/w300${details.poster_path}`
                                : '/no-movie.png'}
                            alt={details.title}
                            className="details-poster"
                        />

                        <div className="details-info">
                            <h1>{details.title}</h1>

                            <div className="details-meta">
                                <span className="badge">⭐ {details.vote_average?.toFixed(1)}</span>
                                <span className="badge">📅 {details.release_date?.split('-')[0]}</span>
                                <span className="badge">⏱️ {details.runtime} min</span>
                            </div>

                            {details.genres && details.genres.length > 0 && (
                                <div className="genres-list">
                                    {details.genres.map((genre) => (
                                        <span key={genre.id} className="genre-tag">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {details.tagline && (
                                <p className="tagline">"{details.tagline}"</p>
                            )}
                        </div>
                    </div>

                    {details.overview && (
                        <div className="details-section">
                            <h2>Overview</h2>
                            <p>{details.overview}</p>
                        </div>
                    )}

                    {details.budget > 0 && (
                        <div className="details-section">
                            <h3>Budget</h3>
                            <p>${details.budget?.toLocaleString() || 'N/A'}</p>
                        </div>
                    )}

                    {details.revenue > 0 && (
                        <div className="details-section">
                            <h3>Revenue</h3>
                            <p>${details.revenue?.toLocaleString() || 'N/A'}</p>
                        </div>
                    )}

                    {details.production_companies && details.production_companies.length > 0 && (
                        <div className="details-section">
                            <h3>Production Companies</h3>
                            <ul className="companies-list">
                                {details.production_companies.map((company) => (
                                    <li key={company.id}>{company.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
