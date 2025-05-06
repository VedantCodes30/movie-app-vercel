import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
// import MovieTrailer from "../components/MovieTrailer";
import TrailerPlayer from "../components/TrailerPlayer";

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
    if (movie?.title) {
      document.title = `${movie.title} `;
    }

    return () => {
      document.title = "Movie App";
    };
  }, [movie?.title]);

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
      <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 movie-details">
        <div className=" details-card rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
          {/* Poster */}
          <div className="md:w-1/2">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gradient rounded-2xl   mb-2">
                {movie.title}{" "}
                <span className="text-sm text-gray-500">
                  ({movie.origin_country?.join(", ")})
                </span>
              </h1>
              <p className="text-gray-300 text-sm">{movie.overview}</p>
            </div>
            {/* Youtube Trailer */}
            <div>
              <TrailerPlayer movieId={movie.id} />
            </div>

            <div className="text-sm text-gray-100 capitalize  space-y-1">
              <p className="text-white ">
                <span className="font-semibold text-gradient">
                  Release Date:
                </span>{" "}
                {movie.release_date}
              </p>
              <p className="text-white ">
                <span className="font-semibold text-gradient">Rating:</span>{" "}
                {movie.vote_average}
              </p>
              <p className="text-white ">
                <span className="font-semibold text-gradient">Language:</span>{" "}
                {movie.original_language}
              </p>
              <p className="text-white ">
                <span className="font-semibold text-gradient">
                  Original Title:
                </span>{" "}
                {movie.original_title}
              </p>
            </div>

            <Link
              to="/"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-center px-4 py-2 rounded-xl shadow transition"
            >
              Go Back!
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>

    // <PageWrapper>
    //   <div className="mx-auto p-4 movie-details flex flex-wrap justify-evenly items-center  h-svh ">
    //     <div className="details-container max-w-3xl"></div>
    //     <img
    //       className="max-w-50 border-2 object-cover mb-4 mx-auto"
    //       src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    //       alt={movie.title}
    //     />

    //     <h1>
    //       {movie.title} {movie.origin_country}
    //     </h1>
    //     <TrailerPlayer movieId={movie.id} />

    //     <p>{movie.overview}</p>

    //     <div className="movie-content">
    //       <p>
    //         <span>Release Date:</span> {movie.release_date}
    //       </p>
    //       <p>Rating: {movie.vote_average}</p>
    //       <p>Original Language: {movie.original_language}</p>
    //       <p>Original Title: {movie.original_title}</p>
    //       <Link
    //         to="/"
    //         className="bg-purple-600 rounded-2xl p-2 hover:bg-purple-700 text-white px-4  shadow-md transition inline-block  text-center  size-fit"
    //       >
    //         Go Back!
    //       </Link>
    //     </div>
    //   </div>
    // </PageWrapper>
  );
};

export default MovieDetails;
