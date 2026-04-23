import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const BASE_URL = "https://lost-found-project-tq4w.onrender.com";

  const handleRegister = async () => {
    try {
      await axios.post(`${BASE_URL}/api/register`, data);
      alert("Registered Successfully");
      window.location.href = "/";
    } catch {
      alert("Email already exists");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <div className="card p-4 shadow">
        <h3 className="text-center mb-3">Register</h3>

        <input
          className="form-control mb-2"
          placeholder="Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="btn btn-success w-100" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}
