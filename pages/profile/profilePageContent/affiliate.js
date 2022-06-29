import { useEffect, useRef, useState } from "react";
import Router from "next/dist/client/router";

export default function Affiliate({ profilePageState }) {
  //
  let form = useRef();
  const [attemptState, setAttemptState] = useState("none");
  //
  useEffect(() => {}, [attemptState]);
  //
  async function handleSubmit(e) {
    //
    e.preventDefault();
    let formData = new FormData(form.current);

    //
    try {
      const affiliatePost = {
        title: formData.get("title"),
        link: formData.get("link"),
        description: formData.get("description"),
        pictures: (() => {
          let links = formData.get("pictures");
          links = links.split(",");
          return JSON.stringify(links);
        })(),
        price: formData.get("price"),
      };
      //
      console.log(affiliatePost);
      const res = await fetch("http://localhost:4000/affiliate", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(affiliatePost),
      });
      const result = await res.json();
      //
      console.log(result);
      if (result.error) {
        throw result.error.errors[0];
      }
      setAttemptState("Success");
      Router.push(`/affiliate/${result.id}`);
      //
    } catch (error) {
      setAttemptState(error.message);
    }
  }
  //   useEffect(() => {
  //     console.log(profilePageState);
  //   }, []);
  return (
    <div>
      <div className="container mt-4">
        <h1 className="d-flex align-items-center justify-content-center">
          {profilePageState}
        </h1>
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
        <form action="" ref={form}>
          <label htmlFor="description">Title</label>
          <input
            type="text"
            name="title"
            className="form-control my-1"
            placeholder="title"
          />
          <label htmlFor="description">Affiliate link</label>
          <input
            type="text"
            name="link"
            className="form-control my-1"
            placeholder="Affiliate link"
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            className="form-control my-1"
            placeholder="(N) Price"
          />
          <label htmlFor="description">Pictures</label>
          <br />
          <a
            href="http://localhost:4000/images"
            target={"_blank"}
            className="btn btn-md btn-primary"
          >
            Upload image
          </a>
          <input
            type="text"
            name="pictures"
            className="form-control my-1"
            placeholder="Insert image links. Use comma ',' to seperate image links"
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id=""
            cols="10"
            rows="10"
            className="form-control mt-2"
          ></textarea>
          <button
            className="btn btn-lg btn-success col-12 my-2"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
