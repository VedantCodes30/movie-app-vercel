import { useEffect, useState } from "react";
import { getTrendingMovies } from "../appwrite";
import { Link } from "react-router-dom";

const MostSearched = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const data = await getTrendingMovies();
      setMovies(data || []);
    };

    fetchTrending();
  }, []);

  if (movies.length === 0) return null;

  return (
    <section className="w-full">
      <h2 className="text-xl font-bold text-white mb-4 px-4">Most Searched</h2>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-purple-500 px-4 py-2">
        <div className="flex gap-4 w-max">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.movie_id}`}
              key={movie.$id}
              className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] flex-shrink-0 block rounded-lg overflow-hidden hover:scale-105 transition-transform shadow-md bg-[#1e0044]"
            >
              <img
                src={movie.poster_url || "/no-movie.png"}
                alt={movie.title || "Movie Poster"}
                className="w-full h-60 object-cover"
              />
              <div>
                <p className="text-sm font-bold truncate text-center text-white p-2">
                  {movie.title || "Untitled"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostSearched;
