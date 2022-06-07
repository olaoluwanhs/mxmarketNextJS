import Router from "next/router";
import { Fragment, useContext, useRef, useState } from "react";
import checkUser from "../../context/checkUser";
import {
  LoggedInContext,
  LoggedInContextProvider,
} from "../../context/loggedInContext";
import Contact from "./lisintingForm2/contact";
import Pricing from "./lisintingForm2/pricing";
import ProductImages from "./lisintingForm2/uploadImages";

export default function ListingForm2({
  setFormState,
  setListingPostObj,
  listingPostObj,
}) {
  //
  let { loggedInState, setLoggedInState } = useContext(LoggedInContext);
  //
  let priceType = useRef();
  let form2 = useRef();
  let [priceTypeState, setPriceTypeState] = useState("price");
  let [imageError, setImageError] = useState(false);
  let [successState, setSuccessState] = useState(false);
  const [attemptState, setAttemptState] = useState("none");

  function returnToChangeCategory() {
    setFormState(1);
  }
  function handlePriceTypeChange() {
    setPriceTypeState(priceType.current.value);
  }
  function handleListingCreation(e) {
    e.preventDefault();
    e.target.disabled = true;
    //
    let formData = new FormData(form2.current);
    let listingsObj = {
      category: listingPostObj.category,
      sub_category: listingPostObj.subCategory,
      title: formData.get("title"),
      slug: formData.get("title").toLocaleLowerCase().replace(/ /g, "-"),
      author: loggedInState.user.id,
      price_type: formData.get("pricingType"),
      price: formData.get("price"),
      description: formData.get("description"),
      // images: formData.get("images"),
    };
    //   Router.push("/");
    (async () => {
      //
      //
      let result = await submitFormData(listingsObj);
      if (result.error) {
        e.target.disabled = false;
        return setAttemptState(result.error.errors[0].message);
      }
      setAttemptState("Success");
      console.log(result);
      Router.replace(`/listing/${result.slug}`);
      // }
    })();
  }

  async function submitFormData(obj) {
    let result = new Promise(async (resolve, reject) => {
      try {
        let response = await fetch("http://localhost:4000/listing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(obj),
        });
        // Post request to submit form
        response = await response.json();
        //

        resolve(response);
      } catch (error) {
        resolve(error);
      }
    });
    return result;
  }

  return (
    <Fragment>
      <div className="d-flex flex-column align-items-center justify-content-evenly">
        <span
          className="plain-link pointer text-orange my-4"
          onClick={returnToChangeCategory}
        >
          {" "}
          Change Selected Category
        </span>
        {/* Listing details form */}
        <form className="listing-form-2" action="" ref={form2}>
          {/*  */}
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Listing Title"
            maxLength="60"
          />
          <small>Limit to 60 Characters</small>
          <hr />
          <label htmlFor="pricingType">Pricing Type</label>
          <select
            name="pricingType"
            className="form-control"
            ref={priceType}
            onChange={handlePriceTypeChange}
          >
            <option value="price">Price</option>
            <option value="on-call">On call</option>
          </select>
          {/*  */}
          <Pricing priceTypeState={priceTypeState} />
          {/*  */}
          <label htmlFor="description">Listing description</label>
          <textarea
            name="description"
            cols="30"
            rows="10"
            className="form-control"
            placeholder="Add relevant descriptions of your product or service here"
          ></textarea>
          {/*  */}
          <hr />
          <ProductImages
            imageError={imageError}
            setImageError={setImageError}
          />
          <hr />
          {/*  */}
          <LoggedInContextProvider>{/* <Contact /> */}</LoggedInContextProvider>
          {/*  */}
          <button
            onClick={(e) => {
              handleListingCreation(e);
            }}
            className="btn-purple px-3 py-2 rounded my-4"
          >
            Submit
          </button>
          {successState == true && (
            <p className="alert alert-success">Added successfully</p>
          )}
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
        </form>
        {/*  */}
      </div>
    </Fragment>
  );
}
