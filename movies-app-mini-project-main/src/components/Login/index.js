import { useState } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";

import "./index.css";

const Login = (props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeInput = (event) => {
    const { id, value } = event.target;
    if (id === "username") {
      setUserName(value);
    } else {
      setPassword(value);
    }
  };

  const onLoginSuccess = (jwtToken) => {
    const { history } = props;
    Cookies.set("jwt_token", jwtToken, { expires: 1 });
    history.replace("/");
  };

  const onLoginFailure = (errorMsg) => {
    setErrorMessage(errorMsg);
    setIsLoading(false);
  };

  const onLoginEvent = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const userDetails = { username, password };
    const apiUrl = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();

    if (response.ok) {
      onLoginSuccess(data.jwt_token);
    } else {
      onLoginFailure(data.error_msg);
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-page-background">
      <img
        src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1698042823/Movies-app/movies-logo.svg"
        alt="login website logo"
        className="movie-logo"
      />
      <div className="login-form-container">
        <form className="login-form" onSubmit={onLoginEvent}>
          <h1 className="login-form-heading">Login</h1>
          <label htmlFor="username">USERNAME</label>
          <input id="username" onChange={onChangeInput} value={username} />
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            onChange={onChangeInput}
            value={password}
          />

          {errorMessage !== "" && <p className="error-msg">{errorMessage}</p>}

          <button type="submit" className="login-btn">
            {isLoading ? (
              <Loader
                type="circles"
                height="20"
                width="20"
                color="#fff"
                wrapperClass="circles-loader"
                ariaLabel="circles-loading"
              />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
