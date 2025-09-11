import { useEffect, useState } from "react";
import axios from "axios";
import netflix_bg from "../../assets/netflix_bg.jpg";

export default function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

//   useEffect(() => {
//     const token = document.cookie
//       .split("; ")
//       .find(row => row.startsWith("auth_token="))
//       ?.split("=")[1];

//     if (!token) {
//       setError("You are not logged in!");
//       return;
//     }

//     axios.get("http://localhost:1573/movies", {
//       headers: { Authorization: `Bearer ${token}` },
//       withCredentials: true
//     })
//     .then(res => setMovies(res.data))
//     .catch(err => setError("Access denied! Invalid token."));
//   }, []);

//   if (error) return <h2 className="text-red-500">{error}</h2>;

useEffect(() => {
  axios.get("http://localhost:1573/movies", { withCredentials: true })
    .then(res => setMovies(res.data))
    .catch(err => setError("Access denied! You might not be logged in."));
}, []);

  return (
    <div className="p-4 relative bg-cover bg-center "
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6) ),url(${netflix_bg})`,
                            height: "100vh",
                        }}
                    >
      <h1 className="p-6 max-w-md mx-auto text-4xl  text-center text-white rounded-lg shadow-md">Movies Dashboard</h1>
      <ul className="list-disc text-white text-2xl  pl-6">
             <h1>MOVIE: "Amaram"</h1>
      </ul>
      <ul className="list-disc text-white text-2xl  pl-6">
             <h1>MOVIE: "Amaram"</h1>
      </ul>
      <ul className="list-disc text-white text-2xl  pl-6">
             <h1>MOVIE: "Amaram"</h1>
      </ul>
    </div>
  );
}






// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Dashboard() {
//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     axios.get("http://localhost:1573/api/user/viewMovies", { withCredentials: true })
//       .then(res => setMovies(res.data))
//       .catch(err => setError("Access denied! You might not be logged in."));
//   }, []);

//   if (error) return <h2 className="text-red-500 text-center mt-10">{error}</h2>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center">Movies Dashboard</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {movies.map((movie, idx) => (
//           <div
//             key={idx}
//             className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
//           >
//             <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
//             <p className="text-gray-700 mb-2">{movie.description}</p>
//             <span className="text-yellow-500 font-bold">Rating: {movie.rating}/10</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
