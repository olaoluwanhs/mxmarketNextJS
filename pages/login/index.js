import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import checkUser from "../../context/checkUser";
import { LoggedInContext, loginFunction } from "../../context/loggedInContext";

export default function Login() {
  //
  let loginForm = useRef();
  let router = useRouter();
  let { loggedInState, setLoggedInState } = useContext(LoggedInContext);
  let [credentialsState, setCredentialState] = useState("empty");
  //
  useEffect(() => {}, [credentialsState]);
  function login(e) {
    //
    e.preventDefault();
    let userInfo = new FormData(loginForm.current),
      userObj = {
        user_name: userInfo.get("user-id"),
        password: userInfo.get("password"),
      };
    loginFunction(userObj).then(async (result) => {
      //
      if (result.id == undefined) {
        setCredentialState([null, result.message]);
        return;
      }
      setLoggedInState(await checkUser());
      setCredentialState([1, `logged in as ${result.user_name}`]);
      router.replace(`./profile/${result.user_name}`);
    });
    //
  }
  //
  return (
    <div className="bodyDiv patternBg">
      {/* Bootstrap error */}
      {credentialsState[0] == null && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <span>{credentialsState[1]}</span>
        </div>
      )}
      {/*  */}
      {/* Bootstrap success */}
      {credentialsState[0] == 1 && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <span>{credentialsState[1]}</span>
        </div>
      )}
      {/*  */}
      <div className="d-flex container flex-column rounded py-3 align-items-center">
        <img src="./logo.png" alt="" className="form-logo" />
        <form ref={loginForm} className="d-flex flex-column my-5">
          <input
            type="text"
            name="user-id"
            className=" form-control my-1"
            placeholder="Username or Email"
          />
          <input
            type="text"
            name="password"
            className=" form-control my-1"
            placeholder="Password"
          />
          <button
            onClick={(e) => {
              login(e);
            }}
            className="btn-purple btn btn-lg my-1 text-light"
          >
            Login
          </button>
          {/* <input type="button" value="Login"  className="btn-purple btn btn-lg my-1 text-light"/> */}
        </form>
        <Link href="/login/sign-up">
          <button className="btn-orange btn-lg text-light mb-2">
            Create an account
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
}
