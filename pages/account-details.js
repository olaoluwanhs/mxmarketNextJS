import Link from "next/link";
import checkUser from "../context/checkUser";
import Router from "next/router";
import { useRef, useState, useEffect, useContext } from "react";
import { LoggedInContext } from "../context/loggedInContext";
import Navbar from "../components/navBar";

export default function AccountDetails({ user }) {
  //
  const loginForm = useRef();
  const i = useRef(0);
  const { loggedInState, setLoggedInState } = useContext(LoggedInContext);
  const [attemptState, setAttemptState] = useState("none");
  const [profile, setProfile] = useState({});
  //
  useEffect(async () => {
    if (i.current >= 1) {
      const profileObj = await getProfile();
      setProfile(profileObj);
      //   console.log(profileObj);
      if (profileObj.message !== "request-owns-profile") {
        Router.replace("/login");
      }
      //
    }
    i.current = i.current + 1;
  }, [loggedInState]);
  useEffect(checkUserLoggedIn, []);
  //
  async function checkUserLoggedIn() {
    const state = await checkUser();
    setLoggedInState(state);
  }
  //
  useEffect(() => {}, [attemptState, profile]);
  //
  async function getProfile() {
    const result = new Promise(async (resolve, reject) => {
      //
      //   console.log(loggedInState);
      const res = await fetch(
        `http://localhost:4000/profile/?user_name=${loggedInState.user.user_name}`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const user = await res.json();
      //   console.log(user);
      resolve(user);
      //
    });

    return result;
  }

  //
  async function handleUpdate(e) {
    //
    e.target.disabled = true;
    //
    let userCreateForm = new FormData(loginForm.current);
    const updateImage = async () => {
      //
      return "image name";
    };
    //
    let userData = {
      update: {
        first_name: userCreateForm.get("firstname"),
        last_name: userCreateForm.get("lastname"),
        image: await updateImage(),
        location: userCreateForm.get("location"),
        phone_number: userCreateForm.get("phone-number"),
        whatsapp: userCreateForm.get("whatsapp-number"),
      },
      passwordChange: "notAllowed",
    };

    //
    const res = await fetch(`http://localhost:4000/user`, {
      method: "put",
      credentials: "include",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(userData),
    });
    const updatedObj = await res.json();
    //
    console.log(updatedObj);
    e.target.disabled = false;
    //
    setAttemptState("Success");
    Router.replace(`/profile/${updatedObj.user_name}`);
  }
  //
  return (
    <>
      <Navbar />
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
          {profile.profile && (
            <form
              className="d-flex flex-column my-5 col-10 shadow p-5 bg-light rounded"
              ref={loginForm}
            >
              <h3>Update user information</h3>
              {/*  */}
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                className=" form-control my-1"
                defaultValue={profile.profile.first_name || ""}
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                className=" form-control my-1"
                defaultValue={profile.profile.last_name || ""}
                required
              />
              <input
                type="number"
                name="phone-number"
                placeholder="Mobile phone number"
                className=" form-control my-1"
                defaultValue={profile.profile.phone_number || ""}
              />
              <input
                type="number"
                name="whatsapp-number"
                placeholder="Whatsapp number"
                className=" form-control my-1"
                defaultValue={profile.profile.whatsapp || ""}
                required
              />
              <select
                name="location"
                id=""
                className="form-control my-1"
                required
              >
                <option value="" selected disabled>
                  Location
                </option>
                <option value="GK">Gidankwano</option>
                <option value="BS">Bosso</option>
                <option value="within-minna">Others within minna</option>
                <option value="outside-minna">Others outside Minna</option>
              </select>
              <button
                onClick={(e) => {
                  handleUpdate(e);
                }}
                className="btn-orange btn btn-lg text-light my-2"
              >
                Update Account Information
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
