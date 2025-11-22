import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/signup", form);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="signup-container">
        <div className="signup-card">
          <h1 className="signup-title">Create an Account</h1>

          <form onSubmit={handleSubmit} className="signup-form">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="signup-input"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="signup-input"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="signup-input"
            />

            {error && <p className="signup-error">{error}</p>}

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Creating an account..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .signup-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .signup-card {
          width: 100%;
          max-width: 420px;
          padding: 30px 25px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          text-align: center;
          box-sizing: border-box;
        }

        .signup-title {
          font-size: clamp(1.8rem, 4vw, 2.2rem);
          margin-bottom: 22px;
          color: #1e293b;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .signup-input {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          box-sizing: border-box;
        }

        .signup-input:focus {
          outline: none;
          border-color: #2563eb;
        }

        .signup-button {
          width: 100%;
          padding: 14px;
          background: #2563eb;
          color: white;
          font-size: 1.1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.2s;
          margin-top: 10px;
        }

        .signup-button:hover {
          background: #1e40af;
        }

        .signup-button:disabled {
          background: #94a3b8;
          cursor: not-allowed;
        }

        .signup-error {
          color: #dc2626;
          font-size: 0.95rem;
        }
      `}</style>
    </>
  );
}
