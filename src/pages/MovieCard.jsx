import { Link } from "react-router-dom";
const MovieCard = ({ movie }) => {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.poster_url;
  return (
    <li>
      <Link
        to={`/movie/${movie.movie_id || movie.id}`}
        className="block hover:scale-105 transition-transform cursor-pointer"
      >
        <img
          src={poster}
          alt={movie.title}
          className="rounded-lg shadow-lg w-full object-cover"
        />
        <h3 className="text-center mt-2 text-base font-semibold text-gray-800 dark:text-white">
          {movie.title}
        </h3>
      </Link>
    </li>
  );
};

export default MovieCard;
