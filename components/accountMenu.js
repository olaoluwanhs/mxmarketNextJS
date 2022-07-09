import { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
// import Router from "next/router";

export default function AccountMenu({
  accountMenuState,
  setLoggedInState,
  loggedInState,
}) {
  let accountMenu = useRef();
  useEffect(() => {
    // console.log(loggedInState);
    if (accountMenuState == "hidden") {
      accountMenu.current.style.display = "none";
    } else if (accountMenuState == "shown") {
      accountMenu.current.style.display = "flex";
    }
    // console.log(loggedInState)
  }, [accountMenuState]);
  //

  async function logOut() {
    // Clear local storage
    const loggedOut = await fetch("http://localhost:4000/logout", {
      method: "get",
      credentials: "include",
    });
    const response = await loggedOut.json();
    if (response.message == "logged Out") {
      // Set logged in state  to false
      setLoggedInState({
        loggedIn: false,
        user: {},
      });
    }
  }

  switch (loggedInState.loggedIn) {
    case false:
      return (
        <div className="shadow account-menu py-2 bg-light" ref={accountMenu}>
          <Link href="/login">
            <span className="btn-hover-orange pointer account-menu-link">
              Login
            </span>
          </Link>
          <Link href="/login/sign-up">
            <span className="btn-hover-orange pointer account-menu-link">
              Sign Up
            </span>
          </Link>
        </div>
      );
      break;
    case true:
      return (
        <div className="shadow account-menu py-2 bg-light" ref={accountMenu}>
          <Link
            href={`http://localhost:3000/profile/${loggedInState.user.user_name}`}
          >
            <span className="btn-hover-orange pointer account-menu-link">
              Overview
            </span>
          </Link>
          <Link href="/profile/createListing">
            <span className="btn-hover-orange pointer account-menu-link">
              Create Listing
            </span>
          </Link>
          <Link href="/account-details">
            <span className="btn-hover-orange pointer account-menu-link">
              Account Details
            </span>
          </Link>
          <Link href="/">
            <span
              onClick={() => {
                logOut();
              }}
              className="btn-hover-orange pointer account-menu-link"
            >
              Log out
            </span>
          </Link>
        </div>
      );
      break;

    default:
      return (
        <div className="shadow account-menu py-2 bg-light" ref={accountMenu}>
          <h5>An error has occured</h5>
        </div>
      );
      break;
  }
}
