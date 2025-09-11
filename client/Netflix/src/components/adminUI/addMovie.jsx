import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddMovie() {
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

  // Fetch genres for dropdown
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoadingGenres(true);
        const token = document.cookie.split("=")[1]; // adjust if cookie name is different
        const res = await axios.get("http://localhost:8060/api/admin/viewGenre", {
          headers: { Authorization: token },
        });

        // Check the actual data structure
        const genreList = res.data.data || res.data.genres || [];
        setGenres(genreList);
      } catch (err) {
        console.error("Failed to fetch genres:", err.response?.data || err.message);
        setMessage("Failed to load genres.");
      } finally {
        setLoadingGenres(false);
      }
    };

    fetchGenres();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleAddMovie = async () => {
    try {
      const token = document.cookie.split("=")[1];
      await axios.post("http://localhost:8060/api/admin/addMovies", formData, {
        headers: { Authorization: token },
      });
      setMessage("Movie added successfully!");
      setFormData({
        genre: "",
        title: "",
        description: "",
        year: "",
        url: "",
        bannerUrl: ""
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("Failed to add movie. Check console.");
    }
  };

  return (
    <div className="p-4  max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Add Movie</h1>
      {message && <span className="text-red-500 block mb-2">{message}</span>}
      <div className="flex flex-col gap-3">
        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="border p-2 rounded"
          disabled={loadingGenres || genres.length === 0}
        >
          <option value="">
            {loadingGenres ? "Loading genres..." : "Select Genre"}
          </option>
          {genres.map((g) => (
            <option key={g.id || g._id} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="url"
          placeholder="Video URL"
          value={formData.url}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="bannerUrl"
          placeholder="Banner URL"
          value={formData.bannerUrl}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddMovie}
          className="bg-blue-500 text-white py-2 rounded mt-2 hover:bg-red-600"
        >
          Add Movie
        </button>
      </div>
    </div>
  );
}