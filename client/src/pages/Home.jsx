import React from "react";
import { useNavigate } from "react-router-dom";
import bitcoinGif from "../assets/bitcoin.gif";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-container">
        <img src={bitcoinGif} alt="bitcoin" className="btc-gif left" />

        <div className="home-card">
          <h1 className="home-title">
            Welcome to <br /> AI Crypto Advisor
          </h1>

          <button
            className="home-button"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>

          <p className="home-text">
            Already have an account?{" "}
            <span className="home-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>

        <img src={bitcoinGif} alt="bitcoin" className="btc-gif right" />
      </div>

      <style>{`
        .home-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          position: relative;
        }

        /* GIF both sides */
        .btc-gif {
          width: 150px;
          height: 150px;
          object-fit: contain;
          position: absolute;
          top: 40%;
          transform: translateY(-50%);
        }

        .btc-gif.left {
          left: 10%;
        }

        .btc-gif.right {
          right: 12%;
        }

        .home-card {
          width: 100%;
          max-width: 400px;
          padding: 30px 25px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          text-align: center;
          box-sizing: border-box;
          z-index: 10; 
        }

        .home-title {
          font-size: clamp(1.8rem, 4vw, 2.3rem);
          margin-bottom: 24px;
          color: #1e293b;
        }

        .home-button {
          width: 100%;
          padding: 14px;
          font-size: 1.1rem;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.2s;
        }

        .home-button:hover {
          background: #1e40af;
        }

        .home-text {
          margin-top: 18px;
          font-size: 1rem;
          color: #475569;
        }

        .home-link {
          color: #2563eb;
          cursor: pointer;
          text-decoration: underline;
        }

        .home-link:hover {
          color: #1e40af;
        }

        /* 📱 Responsive fix for small screens */
        @media (max-width: 600px) {
          .btc-gif {
            width: 90px;
            height: 90px;
            top: 50%;
          }

          .btc-gif.left {
            left: 2%;
          }

          .btc-gif.right {
            right: 2%;
          }

          .home-card {
            max-width: 300px;
            padding: 22px 18px;
          }

          .home-title {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </>
  );
}
