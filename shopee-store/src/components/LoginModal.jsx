// ================================================================
// Copyright @ TuyenPham2411. All rights reserved.
// Licensed under the zuroostudio.com license.
// Email: pthanhtuyen2411@gmail.com.
// Tel: 0373707024
// ================================================================
import React, { useState } from "react";

const LoginModal = ({ isOpen, onClose }) => {
  // Tab state: 'login' hoặc 'register'
  const [activeTab, setActiveTab] = useState("register");

  // Xử lý submit form (có thể thay bằng logic thật)
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // TODO: handle login logic
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // TODO: handle register logic
  };

  if (!isOpen) return null;

  return (
    <div
      className="dropdown login-dropdown off-canvas opened"
      style={{ display: "block" }}
    >
      <div className="canvas-overlay" onClick={onClose}></div>
      {/* End Login Toggle */}
      <div className="dropdown-box scrollable">
        <div className="login-popup">
          <div className="form-box">
            <div className="tab tab-nav-simple tab-nav-boxed form-tab">
              <ul className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5">
                <li className="nav-item">
                  <button
                    className={`nav-link border-no lh-1 ls-normal${
                      activeTab === "login" ? " active" : ""
                    }`}
                    type="button"
                    onClick={() => setActiveTab("login")}
                  >
                    Login
                  </button>
                </li>
                <li className="delimiter">or</li>
                <li className="nav-item">
                  <button
                    className={`nav-link border-no lh-1 ls-normal${
                      activeTab === "register" ? " active" : ""
                    }`}
                    type="button"
                    onClick={() => setActiveTab("register")}
                  >
                    Register
                  </button>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className={`tab-pane${
                    activeTab === "login" ? " active in" : ""
                  }`}
                  id="signin"
                >
                  <form onSubmit={handleLoginSubmit}>
                    <div className="form-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="signin-email"
                        name="signin-email"
                        placeholder="Username or Email Address *"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="signin-password"
                        name="signin-password"
                        placeholder="Password *"
                        required
                      />
                    </div>
                    <div className="form-footer">
                      <div className="form-checkbox">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          id="signin-remember"
                          name="signin-remember"
                        />
                        <label
                          className="form-control-label"
                          htmlFor="signin-remember"
                        >
                          Remember me
                        </label>
                      </div>
                      <a href="#" className="lost-link">
                        Lost your password?
                      </a>
                    </div>
                    <button
                      className="btn btn-dark btn-block btn-rounded"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                  <div className="form-choice text-center">
                    <label className="ls-m">or Login With</label>
                    <div className="social-links">
                      <a
                        href="#"
                        title=" social-link"
                        className="social-link social-google fab fa-google border-no"
                      ></a>
                      <a
                        href="#"
                        title=" social-link"
                        className="social-link social-facebook fab fa-facebook-f border-no"
                      ></a>
                      <a
                        href="#"
                        title=" social-link"
                        className="social-link social-twitter fab fa-twitter border-no"
                      ></a>
                    </div>
                  </div>
                </div>
                <div
                  className={`tab-pane${
                    activeTab === "register" ? " active in" : ""
                  }`}
                  id="register"
                >
                  <form onSubmit={handleRegisterSubmit}>
                    <div className="form-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="register-email"
                        name="register-email"
                        placeholder="Your Email Address *"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="register-password"
                        name="register-password"
                        placeholder="Password *"
                        required
                      />
                    </div>
                    <div className="form-footer">
                      <div className="form-checkbox">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          id="register-agree"
                          name="register-agree"
                          required
                        />
                        <label
                          className="form-control-label"
                          htmlFor="register-agree"
                        >
                          I agree to the privacy policy
                        </label>
                      </div>
                    </div>
                    <button
                      className="btn btn-dark btn-block btn-rounded"
                      type="submit"
                    >
                      Register
                    </button>
                  </form>
                  <div className="form-choice text-center">
                    <label className="ls-m">or Register With</label>
                    <div className="social-links">
                      <a
                        href="#"
                        title=" social-link"
                        className="social-link social-google fab fa-google border-no"
                      ></a>
                      <a
                        href="#"
                        title=" social-link"
                        className="social-link social-facebook fab fa-facebook-f border-no"
                      ></a>
                      <a
                        href="#"
                        title=" social-link"
                        className="social-link social-twitter fab fa-twitter border-no"
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            title="Close (Esc)"
            type="button"
            className="mfp-close"
            onClick={onClose}
          >
            <span>&times;</span>
          </button>
        </div>
      </div>
      {/* End Dropdown Box */}
    </div>
  );
};

export default LoginModal;
