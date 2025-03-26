import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
  },
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          API_OPTIONS
        );
        const data = await response.json();

        if (!data || data.success === false) {
          navigate("/not-found", { replace: true });
        } else {
          setMovie(data);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        navigate("/not-found", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, navigate]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <PageWrapper>
        <div className="mx-auto p-4 movie-details flex flex-wrap justify-evenly items-center gap-3 h-dvh content-center">
        <div className="max-w-[800px] flex flex-col">
          <img
            className="max-w-50 border-2 object-cover mb-4 mx-auto"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h1 className="text-gradient mb-3">{movie.title}</h1>
          <p className="text-gradient mb-2">{movie.overview}</p>
          <p className="text-xs">
            <span className="text-gradient">Release Date:</span>{" "}
            {movie.release_date}
          </p>
          <p className="text-xs">Rating: {movie.vote_average}</p>
          <Link
            to="/"
            className="bg-purple-600 rounded-2xl p-2 hover:bg-purple-700 text-white px-4 py-2 shadow-md transition inline-block mt-4 text-center  size-fit"
          >
            Go Back!
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MovieDetails;
