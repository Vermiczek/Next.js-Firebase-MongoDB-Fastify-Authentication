import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { StyledHome } from "../styles/Home.styled";
import { logInUser, createUser, resetEmail } from "./api/firebase";
import { useUserContext, useUserUpdateContext } from "./ContextProvider";
import { useRouter } from "next/router";

const validateEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [lostPassword, setLostPassword] = useState(false);
  const [screen, setScreen] = useState<number>(0);
  const setUser = useUserUpdateContext();
  const User = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (User !== null) {
      router.push("/roomSelect");
    }
  }, [User, router]);

  if (screen === 0)
    return (
      <StyledHome>
        <div className="wrapper-login">
          <div>Login</div>
          <input
            type="text"
            className="text-input"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <div>Password</div>
          <input
            type="text"
            className="text-input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="buttons">
            <div
              onClick={() => {
                var payload = { username: username, password: password };
                fetch("http://localhost:3001/login", {
                  method: "POST",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  credentials: "include",
                  body: JSON.stringify(payload),
                })
                  .then((res) => res.json())
                  .then((response) => {
                    console.log(response);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              LOGIN
            </div>
            <div
              onClick={() => {
                setScreen(2);
              }}
            >
              Register new account
            </div>
          </div>
          <div className="message">{error}</div>
          <div></div>
          <div
            onClick={() => {
              setScreen(1);

              fetch("http://localhost:3001/verifycookie", {
                method: "GET",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: "include", 
              })
                .then((res) => res.json())
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          >
            Forgot your password?
          </div>
        </div>
      </StyledHome>
    );
  else if (screen === 1)
    return (
      <div className="wrapper-password">
        <div onClick={() => setScreen(0)}>BACK</div>
        <div>Enter your username</div>
        <input
          type="text"
          className="text-input"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <div
          onClick={() => {
            resetEmail(username);
          }}
        >
          Reset password
        </div>
      </div>
    );
  else if (screen === 2)
    return (
      <StyledHome>
        <div className="wrapper-register">
          <div onClick={() => setScreen(0)}>BACK</div>
          <div>Login</div>
          <input
            type="text"
            className="text-input"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <div>Password</div>
          <input
            type="text"
            className="text-input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="buttons">
            <div
              onClick={() => {
                var payload = { username: username, password: password };
                fetch("http://localhost:3001/register", {
                  method: "POST",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  credentials: "same-origin",
                  body: JSON.stringify(payload),
                })
                  .then((res) => res.json())
                  .then((response) => {
                    console.log(response);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              REGISTER
            </div>
          </div>
        </div>
      </StyledHome>
    );
};

export default Home;
