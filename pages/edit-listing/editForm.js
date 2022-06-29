import { useRef, useState } from "react";
import Pricing from "../../components/listingForms/lisintingForm2/pricing";
import Router from "next/router";

export default function EditForm({ result }) {
  //
  let priceType = useRef();
  const Form = useRef();
  //
  let [priceTypeState, setPriceTypeState] = useState("price");
  const [attemptState, setAttemptState] = useState("none");
  //
  function handlePriceTypeChange() {
    setPriceTypeState(priceType.current.value);
  }
  async function handleSave(e) {
    //
    try {
      //
      e.preventDefault();
      e.target.disabled = true;
      //
      let formData = new FormData(Form.current);
      //
      let listingsObj = {
        title: formData.get("title"),
        price_type: formData.get("pricingType"),
        price: formData.get("price"),
        description: formData.get("description"),
        // constants
        author: result.author,
        slug: result.title.toLocaleLowerCase().replace(/ /g, "-"),
        id: result.id,
      };
      (async () => {
        //
        const res = await fetch(`http://localhost:4000/listing`, {
          method: "put",
          credentials: "include",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(listingsObj),
        });
        const updateResult = await res.json();
        //   console.log(updateResult);
        if (updateResult[0] == 1) {
          setAttemptState("Success");
          Router.replace(`/listing/${updateResult[1][0].slug}`);
          return;
        }
        setAttemptState("Failed: " + updateResult.error);
        e.target.disabled = false;
        //
      })();
    } catch (error) {
      console.log(error.message);
      setAttemptState(error.message);
    }
    //
  }
  //
  return (
    <>
      {/* Title, description, pricetype, price */}
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
      <form className="listing-form-2" ref={Form}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          className="form-control my-2"
          placeholder="Title"
          defaultValue={result.title}
        />
        <label htmlFor="pricingType">Price Type</label>
        <select
          name="pricingType"
          className="form-control"
          ref={priceType}
          onChange={handlePriceTypeChange}
        >
          <option value="price">Price</option>
          <option value="on-call">On call</option>
        </select>
        <Pricing priceTypeState={priceTypeState} DefaultValue={result.price} />
        {/* description */}
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          className="form-control"
          rows={"10"}
          placeholder="Description"
          defaultValue={result.description}
        ></textarea>
        <p className="mt-3">
          <small>
            The purpose of editing is make small corrections and fix little
            errors. To change anything else we recommend creating another (free)
            listing.
          </small>
        </p>
        <button
          className="btn btn-md btn-purple col-12 mb-5"
          onClick={handleSave}
        >
          Save
        </button>
      </form>
      {/* image edit */}
    </>
  );
}
