import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import netflix_bg from "../../assets/netflix_bg.jpg" ;
export default function AddGenre() {
  const [genreName, setGenreName] = useState("");
  const [message, setMessage] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [update, SetUpdate] = useState(-1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8060/api/admin/viewGenre",
          { headers: { Authorization: `${document.cookie.split("=")[1]}` } }
        );
        setGenreList(res.data.data);
        setTimeout(() => {
          setMessage("");
        }, 1000);
      } catch (err) {
        setMessage(err.message);
      }
    };
    fetchData();
  }, [message]);
  const handleAddGenre = async () => {
    console.log(genreName);
    try {
      let res;
      if (update!== -1) {
        //update genre
        res = await axios.patch(
          `http://localhost:8060/api/admin/genre/${genreList[update].id}`,
          { name: genreName },
          { headers: { Authorization: `${document.cookie.split("=")[1]}` } }
        );
      } else {
        //add genre
        res = await axios.post(
          "http://localhost:8060/api/admin/genre",
          { name: genreName },
          { headers: { Authorization: `${document.cookie.split("=")[1]}` } }
        );
      }
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filteredGenres = genreList.sort((genre) =>
      genre.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setGenreList(filteredGenres.reverse());
  };
  const handleDelete = async (id) => {
    try {
      const res = axios.delete(
        `http://localhost:8060/api/admin/genre/${id}`,
        { headers: { Authorization: `${document.cookie.split("=")[1]}` } }
      );
      setMessage("Deleted Successfully");
    } catch (err) {
      setMessage(res.err.message);
    }
  };
  const handleEdit = async (index) => {
    setGenreName(genreList[index].name);
    SetUpdate(index);
  };
  return (
    <div className="p-4 relative bg-gray-500 bg-cover bg-center text-white"
                            style={{
                                backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6) ),url(${netflix_bg})`,
                                height: "100vh",
                            }}>
      <div className="">
        <h1>Add Genre</h1>
        <span className="text-red-500">{message}</span>
        <div>
          <input
            type="text"
            value={genreName}
            onChange={(e) => {
              setGenreName(e.target.value);
            }}
            placeholder="Genre Name"
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={handleAddGenre}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {update !== -1 ? "Update Genre" : " Add Genre"}
          </button>
        </div>
      </div>
      <div className="mt-4 text-white bg-gray">
        <h2 className="text-xl font-bold mb-2">Existing Genres</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search Genre"
          className="border p-2 rounded mb-4 w-full"
        />

        <table className="min-w-full bg-gray-900   text-white rounded shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Genre Name</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {genreList.map((genre, index) => (
              <tr key={genre.id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{genre.name}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      handleDelete(genre.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                    onClick={() => {
                      handleEdit(index);
                    }}
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