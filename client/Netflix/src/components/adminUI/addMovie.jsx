// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddMovie() {
//   const [genres, setGenres] = useState([]);
//   const [loadingGenres, setLoadingGenres] = useState(true);
//   const [formData, setFormData] = useState({
//     genre: "",
//     title: "",
//     description: "",
//     year: "",
//     url: "",
//     bannerUrl: ""
//   });
//   const [message, setMessage] = useState("");

//   // Fetch genres for dropdown
//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         setLoadingGenres(true);
//         const token = document.cookie.split("=")[1]; // adjust if cookie name is different
//         const res = await axios.get("http://localhost:8060/api/admin/viewGenre", {
//           headers: { Authorization: token },
//         });

//         // Check the actual data structure
//         const genreList = res.data.data || res.data.genres || [];
//         setGenres(genreList);
//       } catch (err) {
//         console.error("Failed to fetch genres:", err.response?.data || err.message);
//         setMessage("Failed to load genres.");
//       } finally {
//         setLoadingGenres(false);
//       }
//     };

//     fetchGenres();
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submit
//   const handleAddMovie = async () => {
//     try {
//       const token = document.cookie.split("=")[1];
//       await axios.post("http://localhost:8060/api/admin/addMovies", formData, {
//         headers: { Authorization: token },
//       });
//       setMessage("Movie added successfully!");
//       setFormData({
//         genre: "",
//         title: "",
//         description: "",
//         year: "",
//         url: "",
//         bannerUrl: ""
//       });
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       setMessage("Failed to add movie. Check console.");
//     }
//   };

//   return (
//     <div className="p-4  max-w-md mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Add Movie</h1>
//       {message && <span className="text-red-500 block mb-2">{message}</span>}
//       <div className="flex flex-col gap-3">
//         <select
//           name="genre"
//           value={formData.genre}
//           onChange={handleChange}
//           className="border p-2 rounded"
//           disabled={loadingGenres || genres.length === 0}
//         >
//           <option value="">
//             {loadingGenres ? "Loading genres..." : "Select Genre"}
//           </option>
//           {genres.map((g) => (
//             <option key={g.id || g._id} value={g.name}>
//               {g.name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={formData.title}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <input
//           type="number"
//           name="year"
//           placeholder="Year"
//           value={formData.year}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="url"
//           placeholder="Video URL"
//           value={formData.url}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="bannerUrl"
//           placeholder="Banner URL"
//           value={formData.bannerUrl}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <button
//           onClick={handleAddMovie}
//           className="bg-blue-500 text-white py-2 rounded mt-2 hover:bg-red-600"
//         >
//           Add Movie
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "axios";
import bg from "../../assets/netflix_bg.jpg";

export default function MovieManager() {
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [formData, setFormData] = useState({
    genre: "",
    title: "",
    description: "",
    year: "",
    url: "",
    bannerUrl: ""
  });
  const [message, setMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [editingMovieId, setEditingMovieId] = useState(null);

  const token = document.cookie.split("=")[1];

  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, []);

  const fetchGenres = async () => {
    try {
      setLoadingGenres(true);
      const res = await axios.get("http://localhost:8060/api/admin/viewGenre", {
        headers: { Authorization: token },
      });
      const genreList = res.data.data || res.data.genres || [];
      setGenres(genreList);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("Failed to load genres.");
    } finally {
      setLoadingGenres(false);
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:8060/api/admin/viewMovies", {
        headers: { Authorization: token },
      });
      setMovies(res.data.data || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("Failed to load movies.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrEditMovie = async () => {
    try {
      if (editingMovieId) {
        const payload = {
          ...(formData.year && { year: formData.year }),
          ...(formData.description && { desc: formData.description }),
        };

        await axios.patch(
          `http://localhost:8060/api/admin/editMovie/${editingMovieId}`,
          payload,
          { headers: { Authorization: token } }
        );
        setMessage("Movie updated successfully!");
        setEditingMovieId(null);
      } else {
        await axios.post(
          "http://localhost:8060/api/admin/addMovies",
          formData,
          { headers: { Authorization: token } }
        );
        setMessage("Movie added successfully!");
      }

      setFormData({
        genre: "",
        title: "",
        description: "",
        year: "",
        url: "",
        bannerUrl: ""
      });

      fetchMovies();
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("Failed to save movie. Check console.");
    }
  };

  const handleEdit = (movie) => {
    setFormData({
      genre: movie.genre?.name || movie.genre,
      title: movie.title,
      description: movie.desc,
      year: movie.year,
      url: movie.url,
      bannerUrl: movie.bannerUrl
    });
    setEditingMovieId(movie._id || movie.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 "style={{ backgroundImage: ` linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6) ), url(${bg})` }}>
      {/* Dark overlay */}
      
      
      <h1 className="text-4xl font-bold mb-6 text-center">🎬 Movie Manager</h1>

      {message && <div className="bg-red-600 p-2 rounded mb-4">{message}</div>}

      <div className="max-w-md mx-auto bg-gray-800 p-4 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          {editingMovieId ? "Edit Movie (Year & Description)" : "Add New Movie"}
        </h2>

        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full p-2 rounded mb-3 bg-gray-700 text-white"
          disabled={loadingGenres || genres.length === 0 || editingMovieId}
        >
          <option value="">
            {loadingGenres ? "Loading genres..." : "Select Genre"}
          </option>
          {genres.map((g) => (
            <option key={g.id || g._id} value={g.id || g._id}>
              {g.name}
            </option>
          ))}
        </select>

        {!editingMovieId && (
          <>
            <input
              type="text"
              name="title"
              placeholder="Movie Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 rounded mb-3 bg-gray-700 text-white"
            />
            <input
              type="text"
              name="url"
              placeholder="Video URL"
              value={formData.url}
              onChange={handleChange}
              className="w-full p-2 rounded mb-3 bg-gray-700 text-white"
            />
            <input
              type="text"
              name="bannerUrl"
              placeholder="Banner URL"
              value={formData.bannerUrl}
              onChange={handleChange}
              className="w-full p-2 rounded mb-3 bg-gray-700 text-white"
            />
          </>
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 rounded mb-3 bg-gray-700 text-white"
        />
        <input
          type="number"
          name="year"
          placeholder="Release Year"
          value={formData.year}
          onChange={handleChange}
          className="w-full p-2 rounded mb-3 bg-gray-700 text-white"
        />

        <button
          onClick={handleAddOrEditMovie}
          className="w-full bg-red-600 hover:bg-blue-500 py-2 rounded text-white"
        >
          {editingMovieId ? "Update Movie" : "Add Movie"}
        </button>
      </div>

      <h2 className="text-3xl font-semibold mt-10 mb-4 text-center">🎥 Movies in Database</h2>

      <div className="overflow-x-auto max-w-4xl mx-auto rounded-lg shadow-md">
        <table className="min-w-full bg-gray-800 rounded shadow-md text-white">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Genre</th>
              <th className="p-3">Year</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id || movie.id} className="border-t border-gray-700">
                <td className="p-3">{movie.title}</td>
                <td className="p-3">{typeof movie.genre === "object" ? movie.genre.name : movie.genre}</td>
                <td className="p-3">{movie.year}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="bg-yellow-500 text-black px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
