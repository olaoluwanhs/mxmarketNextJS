import Link from "next/link";
import { useRef } from "react/cjs/react.development";
import { LoggedInContext, loginFunction } from "../../context/loggedInContext";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";

export default function SignUp() {
  //
  const [attemptState, setAttemptState] = useState("none");
  useEffect(() => {
    // console.log(attemptState);
  }, [attemptState]);
  //
  let loginForm = useRef();
  let submitBtn = useRef();
  let loggedIn = useContext(LoggedInContext);
  //
  async function signUpFunction(e) {
    let userCreateForm = new FormData(loginForm.current);
    //
    e.preventDefault();
    submitBtn.current.disabled = true;

    let userData = {
      first_name: userCreateForm.get("firstname"),
      last_name: userCreateForm.get("lastname"),
      user_name: userCreateForm.get("username"),
      email: userCreateForm.get("email"),
      location: userCreateForm.get("location"),
      password: userCreateForm.get("password"),
      confirm_password: userCreateForm.get("confirm"),
      phone_number: userCreateForm.get("phone-number"),
      whatsapp: userCreateForm.get("whatsapp-number"),
    };
    let response = await fetch("http://localhost:4000/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    response = await response.json();
    //
    if (response.error) {
      submitBtn.current.disabled = false;
      return setAttemptState(
        response.error.message || response.error.errors[0].message
      );
    }
    // console.log(response);
    if (response.userType == "user") {
      loginFunction({
        user_name: response.user_name,
        password: userData.password,
      }).then((userInfo) => {
        setAttemptState("Success");
        loggedIn.setLoggedInState({ loggedIn: true, user: userInfo });
        // console.log(userInfo);
        Router.replace(`../profile/${userInfo.user_name}`);
      });
    }
  }

  //
  return (
    <div className="bodyDiv patternBg">
      {/* Bootstrap error */}
      {attemptState !== "none" && attemptState !== "Success" && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <span>{attemptState}</span>
        </div>
      )}
      {attemptState == "Success" && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <span>{attemptState}</span>
        </div>
      )}
      {/*  */}
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
              signUpFunction(e);
            }}
            ref={submitBtn}
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
