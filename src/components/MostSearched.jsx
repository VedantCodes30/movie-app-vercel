// import { useEffect, useState } from "react";
// import { getTrendingMovies } from "../appwrite";
// import { Link } from "react-router-dom";

// const MostSearched = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     const fetchTrending = async () => {
//       const data = await getTrendingMovies();
//       setMovies(data || []);
//     };

//     fetchTrending();
//   }, []);

//   if (movies.length === 0) return null;

//   return (
//     <section className="p-4">
//       <h2 className="text-2xl font-semibold mb-4">Most Searched</h2>
//       <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//         {movies.map((movie) => (
//           <Link
//             to={`/movie/${movie.movie_id}`}
//             key={movie.$id}
//             className="block rounded-lg overflow-hidden hover:scale-105 transition-transform shadow-md"
//           >
//             <img
//               src={movie.poster_url || "/no-movie.png"}
//               alt={movie.searchTerm}
//               className="w-full h-60 object-cover"
//             />
//             <div className="p-2 bg-white dark:bg-gray-800">
//               <p className="text-sm font-medium truncate text-center text-white">
//                 {movie.searchTerm || "Untitled"}
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default MostSearched;

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
    <section>
      <h2>Most Searched</h2>
      <div className=" grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.movie_id}`}
            key={movie.$id}
            className="block rounded-lg overflow-hidden hover:scale-105 transition-transform shadow-md"
          >
            <img
              src={movie.poster_url || "/no-movie.png"}
              alt={movie.title || "Movie Poster"}
              className="w-full h-60 object-cover"
            />
            <div>
              <p className="text-sm font-medium truncate text-center text-white">
                {movie.title || "Untitled"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MostSearched;
