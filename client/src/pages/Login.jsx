import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // הצלה של הטוקן לזיכרון – לקראת קריאות API בהמשך
      localStorage.setItem("token", data.access_token);

      // מעבר לעמוד Preferences (או ל-Dashboard, מה שתחליט)
      navigate("/preferences");

    } catch (err) {
      setError("Server error");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Login</h1>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="login-input"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="login-input"
            />

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .login-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          padding: 30px 25px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          text-align: center;
          box-sizing: border-box;
        }

        .login-title {
          font-size: clamp(1.8rem, 4vw, 2.2rem);
          margin-bottom: 22px;
          color: #1e293b;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .login-input {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          box-sizing: border-box;
        }

        .login-input:focus {
          outline: none;
          border-color: #2563eb;
        }

        .login-button {
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

        .login-button:hover {
          background: #1e40af;
        }

        .login-button:disabled {
          background: #94a3b8;
          cursor: not-allowed;
        }

        .login-error {
          color: #dc2626;
          font-size: 0.95rem;
        }
      `}</style>
    </>
  );
}
