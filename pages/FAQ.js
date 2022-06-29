import Navbar from "../components/navBar";
import Footer from "../components/footer";
import { useEffect, useRef, useState } from "react";
import Router from "next/router";

export default function FAQ() {
  //
  const Form = useRef();
  const [attemptState, setAttemptState] = useState("none");
  useEffect(() => {}, [attemptState]);
  //
  async function handleSubmit(e) {
    //
    e.preventDefault();
    //
    //
    const formData = new FormData(Form.current);
    let name = formData.get("name");
    let content = formData.get("content");
    if (name == "" || name == undefined) {
      setAttemptState("Name cannot be empty");
      return;
    }
    if (content == "" || content == undefined) {
      setAttemptState("Content cannot be empty");
      return;
    }

    //
    const data = { name, content };
    const res = await fetch("http://localhost:4000/reviews", {
      method: "post",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.message == "success") {
      setAttemptState("Success");
      Router.replace("/");
    }
  }
  //
  return (
    <>
      <Navbar />
      {/*  */}
      <div className="container d-flex flex-column align-items-center justify-content-center mt-3">
        <h2>
          The site is currently on beta testing stage. Please help us with
          observations, reports, reviews and any error expericed while using the
          site.
        </h2>
      </div>
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <form ref={Form}>
          <input
            type="text"
            name="name"
            className="form-control mb-2"
            placeholder="Input your name"
          />
          <textarea
            name="content"
            className="form-control col-12"
            placeholder="Insert review here"
            cols="30"
            rows="10"
          ></textarea>
          <button
            className="btn btn-md btn-purple col-12 mt-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
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
              <span>{attemptState}; Thanks for the feed back</span>
            </div>
          )}
        </form>
      </div>
      {/*  */}
      <Footer />
    </>
  );
}
