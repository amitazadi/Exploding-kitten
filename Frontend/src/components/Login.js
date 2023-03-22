import "../styling/login.css";
import Header from "./Header";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  // console.log(username.length);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:8000/api/findorcreateuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/dashboard", { state: { username: username, score: data[0].score } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-body">
      <Header />
      <div className="login-body-content">
        <div>
          <form className="login" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter username"
              required
            />
            <button type="submit" className="login-button">
              Submit
            </button>
          </form>

          {/* <Link to="/dashboard" state={{ username: username, score: score  }}> */}
          {/* {username.length > 0 ? (
              <button type="submit" className="login-button" onClick={handleSubmit}>
                Submit
              </button>
            ) : (
              <button
                disabled="disabled"
                type="submit"
                className="login-button"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )} */}

          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
