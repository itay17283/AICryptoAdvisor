import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Onboarding() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [cryptoAssets, setCryptoAssets] = useState([]);
  const [investorType, setInvestorType] = useState("");
  const [contentTypes, setContentTypes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    return <div>Unauthorized</div>;
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  const coins = ["BTC", "ETH", "SOL"];
  const investorOptions = ["HODLer", "DayTrader", "NFTCollector"];
  const contentOptions = ["Prices", "News", "Fun", "AI"];

  function toggleArrayItem(value, currentArray, setter) {
    if (currentArray.includes(value)) {
      setter(currentArray.filter((v) => v !== value));
    } else {
      setter([...currentArray, value]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!investorType) {
      setError("Please select investor type");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          cryptoAssets,
          investorType,
          contentTypes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error saving preferences");
        setLoading(false);
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Server error");
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <>
      
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="onb-container">
        <div className="onb-card">
          <h1 className="onb-title">
            Hello investor! <br /> Let's personalize your feed
          </h1>

          <form onSubmit={handleSubmit} className="onb-form">
            {/* CRYPTO ASSETS */}
            <div className="onb-section">
              <h2 className="onb-subtitle">1. Which crypto assets interest you?</h2>

              {coins.map((coin) => (
                <label key={coin} className="onb-checkbox-row">
                  <input
                    type="checkbox"
                    checked={cryptoAssets.includes(coin)}
                    onChange={() =>
                      toggleArrayItem(coin, cryptoAssets, setCryptoAssets)
                    }
                  />
                  {coin}
                </label>
              ))}
            </div>

            {/* INVESTOR TYPE */}
            <div className="onb-section">
              <h2 className="onb-subtitle">2. What type of investor are you?</h2>

              {investorOptions.map((type) => (
                <label key={type} className="onb-radio-row">
                  <input
                    type="radio"
                    name="investorType"
                    value={type}
                    checked={investorType === type}
                    onChange={(e) => setInvestorType(e.target.value)}
                  />
                  {type}
                </label>
              ))}
            </div>

            {/* CONTENT TYPES */}
            <div className="onb-section">
              <h2 className="onb-subtitle">3. What content would you like to see?</h2>

              {contentOptions.map((ct) => (
                <label key={ct} className="onb-checkbox-row">
                  <input
                    type="checkbox"
                    checked={contentTypes.includes(ct)}
                    onChange={() =>
                      toggleArrayItem(ct, contentTypes, setContentTypes)
                    }
                  />
                  {ct}
                </label>
              ))}
            </div>

            {error && <p className="onb-error">{error}</p>}

            <button type="submit" className="onb-button" disabled={loading}>
              {loading ? "Saving..." : "Save Preferences"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .onb-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 28px;
        }

        .onb-card {
          width: 100%;
          max-width: 550px;
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          box-sizing: border-box;
        }

        .logout-btn {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #dc2626;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.95rem;
          z-index: 9999;
          transition: 0.2s;
        }

        .logout-btn:hover {
          background: #b91c1c;
        }

        .onb-title {
          text-align: center;
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          margin-bottom: 25px;
          color: #1e293b;
        }

        .onb-section {
          margin-bottom: 25px;
        }

        .onb-subtitle {
          font-size: 1.2rem;
          margin-bottom: 12px;
          color: #1e293b;
        }

        .onb-checkbox-row,
        .onb-radio-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          margin-bottom: 8px;
        }

        .onb-error {
          color: #dc2626;
          margin-top: 10px;
          text-align: center;
        }

        .onb-button {
          width: 100%;
          padding: 14px;
          background: #2563eb;
          color: white;
          border-radius: 8px;
          border: none;
          font-size: 1.1rem;
          cursor: pointer;
          transition: 0.2s;
        }

        .onb-button:hover {
          background: #1e40af;
        }

        .onb-button:disabled {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
}
