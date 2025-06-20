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
        <div className="flex gap-4 w-max ">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.$id}>
              <Link
                to={`/movie/${movie.movie_id}`}
                key={movie.$id}
                className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] flex-shrink-0 block  hover:scale-105 transition-transform shadow-md "
              >
                <img
                  src={movie.poster_url || "/no-movie.png"}
                  alt={movie.title || "Movie Poster"}
                  className="w-full min-h-[100%] object-cover"
                />
                <div className="content">
                  <h3 className=" font-[600] truncate text-center text-white p-2">
                    {movie.title || "Untitled"}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostSearched;
