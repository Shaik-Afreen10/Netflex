import { useState } from "react";
import axios from "axios";
import netflix_bg from "../../assets/netflix_bg.jpg" ;

export default function ChangePassword({ adminId }) {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!newPass || !confirmPass) {
      setError("Both fields are required.");
      setMessage("");
      return;
    }

    if (newPass !== confirmPass) {
      setError("Passwords do not match.");
      setMessage("");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken"); // or wherever you store JWT
      const response = await axios.put(
        `http://localhost:8060/api/admin/changePass/${adminId}`,
        { newPass },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        setMessage(response.data.message);
        setError("");
        setNewPass("");
        setConfirmPass("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      setMessage("");
    }
  };

  return (
    <div className="p-4 relative bg-cover bg-center "
                            style={{
                                backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6) ),url(${netflix_bg})`,
                                height: "100vh",
                            }}>
      <h2 className="text-2xl text-white text-center font-semibold mb-4">Change Password</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {message && <p className="text-green-500 mb-3">{message}</p>}

      <form onSubmit={handleChangePassword} className="flex items-center flex-col gap-4">
        <input
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="border p-2 text-black  max-w-md rounded-md focus:outline-none bg-white focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          className="border p-2 rounded-md text-black max-w-md focus:outline-none bg-white focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md max-w-md  hover:bg-blue-600 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
