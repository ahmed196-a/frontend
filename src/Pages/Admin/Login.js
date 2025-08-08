

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // ✅ use AuthContext
import "./Login.css";

const AdminLogin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login function from context

  const handleLogin = (e) => {
    e.preventDefault();
    const adminName = "admin";
    const adminPass = "1234";

    if (name === adminName && password === adminPass) {
      login();                // ✅ set authenticated to true
      navigate("/dashboard"); // ✅ go to dashboard
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <header className="admin-header">
        <div className="admin-brand-container">
          <div className="admin-brand-text">
            <h1 className="admin-company-name">MK Audiology</h1>
            <p className="admin-company-tagline">Hear Well Center</p>
          </div>
        </div>
      </header>

      <section className="admin-login-section">
        <div className="admin-login-card">
          <h2 className="admin-login-title">Admin Portal</h2>
          <p className="admin-login-subtitle">Please enter your credentials</p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-input-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="admin-input-field"
                required
              />
            </div>

            <div className="admin-input-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input-field"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="admin-login-button">
              Sign In
            </button>
          </form>
        </div>
      </section>

      <footer className="admin-login-footer">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} MK Audiology. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a
              href="https://www.linkedin.com/in/ahmed-abbas-092385319"
              className="footer-link"
            >
              Developed by Ahmed Abbas
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;
