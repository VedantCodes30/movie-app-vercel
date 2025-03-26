import { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper.jsx";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import { useDebounce } from "react-use";
import { updateSearchCount } from "../appwrite.js";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
  },
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/trending/movie/week`,
        API_OPTIONS
      );
      const data = await response.json();
      setTrendingMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <PageWrapper>
      <main>
        <div className="pattern">
          <div className="wrapper">
            <header>
              <img src="./hero.png" alt="Hero Banner" />
              <h1>
                Movie <span className="text-gradient">Binge!</span> <br />
                <span className="text-base text-indigo-200">
                  Search, explore, and discover your next obsession.
                </span>
              </h1>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>

            {trendingMovies.length > 0 && (
              <section className="trending">
                <h2>Trending Movies</h2>
                <ul>
                  {trendingMovies.map((movie, index) => (
                    <li key={movie.id}>
                      <p>{index + 1}</p>
                      <Link to={`/movie/${movie.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="all-movies">
              <h2>All Movies</h2>
              {isLoading ? (
                <Spinner />
              ) : errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
              ) : (
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {movieList.map((movie, index) => (
                    <MovieCard key={movie.id || index} movie={movie} />
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
};

export default Home;
