import Link from "next/link";
import { useRef } from "react/cjs/react.development";
import { loginFunction } from "../../context/loggedInContext";
import Router from "next/router";
import { useEffect, useState } from "react";

export default function SignUp() {
  //
  const [attemptState, setAttemptState] = useState("none");
  useEffect(() => {
    console.log(attemptState);
  }, [attemptState]);
  //
  let loginForm = useRef();
  function signUp(e) {
    let userCreateForm = new FormData(loginForm.current);
    //
    e.preventDefault();
    let userData = {
      firstname: userCreateForm.get("firstname"),
      LastName: userCreateForm.get("lastname"),
      userName: userCreateForm.get("username"),
      email: userCreateForm.get("email"),
      location: userCreateForm.get("location"),
      password: userCreateForm.get("password"),
      confirm: userCreateForm.get("confirm"),
      phoneNumber: userCreateForm.get("phone-number"),
      whatsApp: userCreateForm.get("whatsapp-number"),
    };
    // console.log(userData);
    fetch("http://localhost:4000/", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        loginFunction(result)
          .then(({ message }) => {
            switch (message) {
              case "Password unconfirmed":
                setAttemptState("password-unconfirmed");
                break;

              case "Username exists":
                setAttemptState("username-exists");
                break;

              case "Email exists":
                setAttemptState("email-exists");
                break;

              case "Error addding user":
                setAttemptState("error-adding-user");
                break;

              case "Phone number exists":
                setAttemptState("phone-number-exists");
                break;

              case "Whatsapp number exists":
                setAttemptState("whatsapp-number-exists");
                break;

              case "Logged in":
                Router.replace(`profile/${userData.userName}`);
                break;

              default:
                setAttemptState("unknown-error");
                break;
            }
          })
          .catch((err) => {
            setAttemptState("unknown-error");
          });
      });
  }

  //
  return (
    <div className="bodyDiv patternBg">
      <div className="d-flex container flex-column rounded py-3 align-items-center">
        <img src="/logo.png" alt="" className="form-logo" />
        <form className="d-flex flex-column my-5" ref={loginForm}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            className=" form-control my-1"
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            className=" form-control my-1"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className=" form-control my-1"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="form-control my-1"
            required
          />
          <input
            type="number"
            name="phone-number"
            placeholder="Mobile phone number"
            className=" form-control my-1"
          />
          <input
            type="number"
            name="whatsapp-number"
            placeholder="Whatsapp number"
            className=" form-control my-1"
            required
          />
          <select name="location" id="" className="form-control my-1" required>
            <option value="" selected disabled>
              Location
            </option>
            <option value="GK">Gidankwano</option>
            <option value="BS">Bosso</option>
            <option value="within-minna">Others within minna</option>
            <option value="outside-minna">Others outside Minna</option>
          </select>
          <input
            type="password"
            name="password"
            className=" form-control my-1"
            required
            placeholder="Password"
          />
          <input
            type="password"
            name="confirm"
            className=" form-control my-1"
            required
            placeholder="Confirm your password"
          />
          <button
            onClick={(e) => {
              signUp(e);
            }}
            className="btn-orange btn btn-lg text-light my-2"
          >
            Login
          </button>
        </form>
        <Link href="./">
          <button className="btn-purple btn btn-lg text-light my-2">
            I already have an account
          </button>
        </Link>
        <Link href="/">
          <span className="h4 plain-link align-center py-3">
            Go to homepage{" "}
          </span>
        </Link>
      </div>
    </div>
  );
  //
}
