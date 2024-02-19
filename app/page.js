"use client";
import React, { useReducer } from "react";

const initialState = {
  username: "",
  password: "",
  loggedIn: false,
  isError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FORM_USERNAME_CHANGE":
      return { ...state, username: action.payload };
    case "FORM_PASSWORD_CHANGE":
      return { ...state, password: action.payload };
    case "LOGIN":
      if (!state.password || !state.username) {
        return { ...state, isError: true, loggedIn: false };
      } else {
        return { ...state, isError: false, loggedIn: true };
      }
    case "LOGOUT":
      return { ...state, username: "", password: "", loggedIn: false };
    default:
      return { ...state };
  }
};

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onUsernameChange = (e) => {
    const action = {
      type: "FORM_USERNAME_CHANGE",
      payload: e.target.value,
    };
    dispatch(action);
  };
  const onPasswordChange = (e) => {
    const action = {
      type: "FORM_PASSWORD_CHANGE",
      payload: e.target.value,
    };
    dispatch(action);
  };

  const onLoginClick = () => {
    dispatch({ type: "LOGIN" });
  };
  const onLogoutClick = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div id="main">
      {state.loggedIn ? (
        <section className="logout-section">
          <h2>Logged in successfully!</h2>
          <p>Welcome {state.username}!</p>
          <button onClick={onLogoutClick} className="logout-btn">
            Logout
          </button>
        </section>
      ) : (
        <form className="login-form">
          {state.isError && (
            <p className="invalid-error">Invalid username or password!</p>
          )}
          <section className="username-input">
            <label>Username: </label>
            <input
              onChange={onUsernameChange}
              value={state.username}
              type="text"
              placeholder="Username"
              className="username"
            />
          </section>
          <section className="password-input">
            <label>Password: </label>
            <input
              onChange={onPasswordChange}
              value={state.password}
              type="password"
              placeholder="Password"
              className="password"
            />
          </section>
          <button type="button" onClick={onLoginClick} className="login-btn">
            Login
          </button>
        </form>
      )}
    </div>
  );
}

export default Home;
