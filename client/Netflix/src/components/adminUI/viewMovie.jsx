import { useState, useEffect } from "react";
import axios from "axios";

function MovieCard({ movie }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img
        className="w-full h-48 object-cover"
        src={movie.bannerUrl}
        alt={movie.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {movie.title} ({movie.year})
        </div>
        <p className="text-gray-700 text-base">{movie.desc}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a
          href={movie.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Watch Movie
        </a>
      </div>
    </div>
  );
}

export default function ViewMovies() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [message, setMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [yearFilter, setYearFilter] = useState(""); // New state for year filter
    const [genreFilter, setGenreFilter] = useState(""); // New state for genre filter

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8060/api/admin/viewMovies",
          {
            headers: { Authorization: `${document.cookie.split("=")[1]}` },
          }
        );
        if (response.data.status) {
          setMovies(response.data.data);
          setFilteredMovies(response.data.data); // initialize filtered list
        }
      } catch (err) {
        setMessage(err.message);
      }
    };
    fetchMovies();
  }, []);

  // Filter movies based on search and year
  useEffect(() => {
    const tempMovies = movies.filter((movie) => {
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesYear =
        yearFilter === "" || String(movie.year) === String(yearFilter);
        
      const matchesGenre =
  genreFilter === "" ||
  (movie.genre && movie.genre.name.toLowerCase() === genreFilter.toLowerCase());


      return matchesTitle && matchesYear && matchesGenre;
    });
    setFilteredMovies(tempMovies);
  }, [searchText, yearFilter,genreFilter, movies]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Movies</h2>

      {/* Search and Year Filter */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded w-full md:w-64"
        />
        <input
          type="number"
          placeholder="Filter by year..."
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-40"
        />
        <input
          type="text"
          placeholder="Filter by Genre..."
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-40"
        />
      </div>
      

      {message && <p className="text-red-500 mb-4">{message}</p>}

      <div className="flex flex-wrap">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id || movie._id} movie={movie} />
          ))
        ) : (
          <p className="text-gray-500">No movies found.</p>
        )}
      </div>
    </div>
  );
}