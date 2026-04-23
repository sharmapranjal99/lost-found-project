import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const BASE_URL = "https://lost-found-project-tq4w.onrender.com";

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/login`, data);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <div className="card p-4 shadow">
        <h3 className="text-center mb-3">Login</h3>

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

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>

        <p className="mt-3 text-center">
          New user? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
