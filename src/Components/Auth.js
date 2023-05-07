import React, { useState } from 'react';
import '../CSS/menu.css'
import { Link } from 'react-router-dom';

function AuthOverlay() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const handleContinueAsGuest = () => {
    handleBack();
  };

  const handleLogin = () => {
    setShowLoginForm(true);
  };
  const handleLoginTop = () => {
    setShowOverlay(true);
  };
  const handleRegister = () => {
    setShowRegisterForm(true);
  };

  const handleBack = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };
  const handleContinueAsGuestClick = () => {
    setShowOverlay(false);
    setShowLoginButton(true);
  };
  return (
    <>
     <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/vote">Vote</Link>
        </li>
        {showLoginButton && (
          <li onClick={handleLoginTop}>
            <a>Login</a>
          </li>
        )}
      </ul>
    </nav>
    {showOverlay && (
    <div className="overlay">
      <div className="modal">
        {!showLoginForm && !showRegisterForm && (
          <>
            <h2 className="modal__title">Silk Road Swag </h2>
            <div className="modal__buttons">
              <button className="modal__button" onClick={handleContinueAsGuestClick}>
                Continue as Guest
              </button>
              <button className="modal__button" onClick={handleLogin}>
                Log In
              </button>
              <button className="modal__button" onClick={handleRegister}>
                Register
              </button>
            </div>
          </>
        )}

        {showLoginForm && (
          <>
            <form className="auth-form" action="">
  <h2 className="auth-form__title">Login</h2>
  <div className="auth-form__group">
    <label htmlFor="email" className="auth-form__label">Email:</label>
    <input type="email" id="email" className="auth-form__input" placeholder="Enter your email" />
  </div>
  <div className="auth-form__group">
    <label htmlFor="password" className="auth-form__label">Password:</label>
    <input type="password" id="password" className="auth-form__input" placeholder="Enter your password" />
  </div>
  <div className="auth-form__group">
    <button type="submit" className="auth-form__button">Login</button>
  </div>
</form>
            <button className="modal__button" onClick={handleBack}>
              Back
            </button>
          </>
        )}

        {showRegisterForm && (
          <>
            <form className="auth-form" action="">
  <h2 className="auth-form__title">Register</h2>
  <div className="auth-form__group">
    <label htmlFor="email" className="auth-form__label">Email:</label>
    <input type="email" id="email" className="auth-form__input" placeholder="Enter your email" />
  </div>
  <div className="auth-form__group">
    <label htmlFor="password" className="auth-form__label">Password:</label>
    <input type="password" id="password" className="auth-form__input" placeholder="Enter your password" />
  </div>
  <div className="auth-form__group">
    <label htmlFor="confirm-password" className="auth-form__label">Confirm Password:</label>
    <input type="password" id="confirm-password" className="auth-form__input" placeholder="Confirm your password" />
  </div>
  <div className="auth-form__group">
    <button type="submit" className="auth-form__button">Register</button>
  </div>
</form>
            <button className="modal__button" onClick={handleBack}>
              Back
            </button>
          </>
        )}
      </div>
    </div>
    )}
    </>
  );
}

export default AuthOverlay;