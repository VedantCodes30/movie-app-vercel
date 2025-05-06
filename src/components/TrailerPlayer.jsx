import { useEffect, useState } from "react";

const TrailerPlayer = ({ movieId }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }
        );

        const data = await response.json();
        const trailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (err) {
        console.error("Failed to fetch trailer:", err);
      }
    };

    if (movieId) fetchTrailer();
  }, [movieId]);

  if (!trailerKey) return null;

  return (
    <div className="w-full flex justify-center ">
      {trailerKey ? (
        <div className="aspect-w-16 aspect-h-9 my-4 w-full max-w-3xl">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            allowFullScreen
            title="Movie Trailer"
            className="w-full h-full rounded-xl"
          ></iframe>
        </div>
      ) : (
        <div className="w-full max-w-3xl bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow text-center my-4">
          <p className="text-gray-600 dark:text-gray-300 italic">
            🚫 No trailer found for this movie.
          </p>
        </div>
      )}
    </div>
  );
};

export default TrailerPlayer;
