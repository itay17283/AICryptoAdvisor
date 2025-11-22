import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [votes, setVotes] = useState({
    prices: 0,
    news: 0,
    ai: 0,
    meme: 0,
  });

  const token = localStorage.getItem("token");

  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/dashboard", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const json = await res.json();

        if (!res.ok) {
          setError(json.message || "Error loading dashboard");
          setLoading(false);
          return;
        }

        setData(json);
      } catch (err) {
        setError("Server error");
      }

      setLoading(false);
    }

    fetchData();
  }, [token]);

  async function handleVote(section, voteValue) {
    if (!token) {
      setError("You must be logged in to vote");
      return;
    }

    if (votes[section] === voteValue) {
      return;
    }

    try {
      await fetch("/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          section,
          vote: voteValue,
        }),
      });

      setVotes((prev) => ({
        ...prev,
        [section]: voteValue,
      }));
    } catch (err) {
      console.log("Feedback error:", err);
    }
  }

  if (loading) {
    return <div className="dash-loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dash-error">{error}</div>;
  }

  return (
    <>
      
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="dash-container">
        <h1 className="dash-title">Your Personalized Crypto Dashboard</h1>

        <div className="dash-sections">
          {/* PRICES */}
          {data.prices && (
            <div className="dash-card">
              <h2 className="dash-subtitle">Crypto Prices</h2>
              {Object.keys(data.prices).map((coin) => (
                <p key={coin} className="dash-item">
                  <strong>{coin.toUpperCase()}:</strong> $
                  {data.prices[coin].usd}
                </p>
              ))}

              <p className="dash-feedback-label">Let us know if you liked it</p>
              <div className="vote-row">
                <button
                  className={
                    "vote-button" +
                    (votes.prices === 1 ? " vote-button-active" : "")
                  }
                  onClick={() => handleVote("prices", 1)}
                >
                  👍
                </button>
                <button
                  className={
                    "vote-button" +
                    (votes.prices === -1 ? " vote-button-active" : "")
                  }
                  onClick={() => handleVote("prices", -1)}
                >
                  👎
                </button>
              </div>
            </div>
          )}

          {/* NEWS */}
          {data.news && (
            <div className="dash-card">
              <h2 className="dash-subtitle">Latest News</h2>
              {data.news.map((n, i) => (
                <p key={i} className="dash-item">• {n.title}</p>
              ))}

              <p className="dash-feedback-label">Let us know if you liked it</p>
              <div className="vote-row">
                <button
                  className={
                    "vote-button" +
                    (votes.news === 1 ? " vote-button-active" : "")
                  }
                  onClick={() => handleVote("news", 1)}
                >
                  👍
                </button>
                <button
                  className={
                    "vote-button" +
                    (votes.news === -1 ? " vote-button-active" : "")
                  }
                  onClick={() => handleVote("news", -1)}
                >
                  👎
                </button>
              </div>
            </div>
          )}

          {/* AI INSIGHT */}
          {data.aiInsight && (
            <div className="dash-card">
              <h2 className="dash-subtitle">AI Market Insight</h2>
              <p className="dash-item">{data.aiInsight}</p>

              <p className="dash-feedback-label">Let us know if you liked it</p>
              <div className="vote-row">
                <button
                  className={
                    "vote-button" +
                    (votes.ai === 1 ? " vote-button-active" : "")
                  }
                  onClick={() => handleVote("ai", 1)}
                >
                  👍
                </button>
                <button
                  className={
                    "vote-button" +
                    (votes.ai === -1 ? " vote-button-active" : "")
                  }
                  onClick={() => handleVote("ai", -1)}
                >
                  👎
                </button>
              </div>
            </div>
          )}

          {/* MEME */}
          {data.meme && (
            <div className="dash-card">
              <h2 className="dash-subtitle">Crypto Meme of the Day</h2>

              {typeof data.meme === "string" ? (
                <img src={data.meme} alt="meme" className="dash-meme" />
              ) : (
                <>
                  <p className="dash-item">
                    <strong>{data.meme.title}</strong>
                  </p>
                  <img
                    src={data.meme.image}
                    alt={data.meme.title}
                    className="dash-meme"
                  />
                </>
              )}

              <p className="dash-feedback-label">Let us know if you liked it</p>
              <div className="vote-row">
                <button
                  className={
                    "vote-button" +
                    (votes.meme === 1 ? " vote-button-active" : "")
                  }
                  onClick={() => handleVote("meme", 1)}
                >
                  👍
                </button>
                <button
                  className={
                    "vote-button" +
                    (votes.meme === -1 ? " vote-button-active" : "")
                  }
                  onClick={() => handleVote("meme", -1)}
                >
                  👎
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
       
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

        .dash-container {
          padding: 20px;
          max-width: 900px;
          margin: auto;
        }

        .dash-title {
          text-align: center;
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          margin-bottom: 25px;
          color: #1e293b;
        }

        .dash-sections {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .dash-card {
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .dash-subtitle {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: #1e293b;
          padding-bottom: 6px;
          border-bottom: 2px solid #e2e8f0;
        }

        .dash-item {
          font-size: 1rem;
          margin-bottom: 8px;
        }

        .dash-meme {
          width: 100%;
          border-radius: 10px;
          margin-top: 10px;
        }

        .dash-feedback-label {
          margin-top: 14px;
          margin-bottom: 6px;
          font-size: 0.95rem;
          color: #64748b;
          padding-top: 12px;
          border-top: 2px solid #e2e8f0;
        }

        .vote-row {
          display: flex;
          gap: 10px;
        }

        .vote-button {
          padding: 6px 12px;
          font-size: 1.1rem;
          cursor: pointer;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #e2e8f0;
          transition: 0.15s;
        }

        .vote-button-active {
          background: #22c55e;
          color: white;
          border-color: #16a34a;
        }

        .dash-loading,
        .dash-error {
          text-align: center;
          font-size: 1.2rem;
          margin-top: 50px;
          color: #1e293b;
        }

        .dash-error {
          color: #dc2626;
        }
      `}</style>
    </>
  );
}
