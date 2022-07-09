import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { LoggedInContext } from "../context/loggedInContext";
import Router from "next/router";
import Link from "next/link";

export default function OrderForm({ price, orderState, listing }) {
  const { setLoggedInState, loggedInState } = useContext(LoggedInContext);
  const [differentOrderState, setDifferentOrderState] = useState(false);
  const inputPrice = useRef();
  const textArea = useRef();
  //
  //   function
  //
  async function createOrder(price) {
    //
    let askConfirmation = confirm(`Ordering this will cost N${price}`);
    if (!askConfirmation) {
      return;
    }
    let data = JSON.stringify({
      from: listing.author,
      to: loggedInState.user.user_name,
      price: 2000,
      description: textArea.current.value,
      product_name: listing.title,
      product: listing.id,
    });
    // send post request to create order
    const result = await (
      await fetch(`http://localhost:4000/order`, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "Application/json",
        },
        body: data,
      })
    ).json();
    //
    // console.log(result);
    Router.push(`/order/${result.createdOrder.uuid}`);
    //
  }
  //
  return (
    <>
      <div
        className="bg-overlay d-flex flex-column align-items-center justify-content-evenly"
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          background: "#000000c9",
          zIndex: "100",
        }}
      >
        <div className="order card rounded-5 d-flex flex-column align-items-start justify-content-evenly p-3">
          <strong
            className="ml-3 pointer"
            onClick={() => {
              orderState.setCreateOrderState(false);
            }}
          >
            x
          </strong>
          <div
            className="order card rounded-5 d-flex flex-column align-items-center justify-content-evenly p-2"
            id="order"
          >
            <h5>Create Order for this product</h5>
            <textarea
              ref={textArea}
              placeholder="Describe what you want from the order for the seller"
              cols="30"
              rows="5"
              className="form-control mb-2"
            ></textarea>
            {(() => {
              // console.log(loggedInState);
              if (loggedInState.loggedIn) {
                return (
                  <Fragment>
                    {(() => {
                      if (differentOrderState) {
                        return (
                          <>
                            <small>
                              Ensure that you have negotiated with the owner of
                              this listing before creating another offer
                            </small>
                            <input
                              ref={inputPrice}
                              type="number"
                              className="form-control my-2"
                              placeholder="input amount here in Naira"
                            />
                            <button
                              className="btn btn-md btn-purple col-12"
                              onClick={() => {
                                const price = inputPrice.current.value;
                                createOrder(price);
                              }}
                            >
                              Submit
                            </button>
                            <button
                              className="btn btn-md btn-orange my-1 col-12"
                              onClick={() => {
                                setDifferentOrderState(false);
                              }}
                            >
                              Return
                            </button>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <button
                              className="btn btn-md btn-purple col-12"
                              onClick={() => {
                                createOrder(price);
                              }}
                            >
                              Order at <strike className="text-light">N</strike>
                              {price}
                            </button>
                            <button
                              className="btn btn-md btn-orange my-1 col-12"
                              onClick={() => {
                                setDifferentOrderState(true);
                              }}
                            >
                              Offer different amount
                            </button>
                          </>
                        );
                      }
                    })()}
                  </Fragment>
                );
              }
              return (
                <Fragment>
                  <h1>Login or sign up to create order for this product</h1>
                  <Link href={"/login"}>
                    <button className="btn btn-md btn-purple col-12">
                      Login
                    </button>
                  </Link>
                </Fragment>
              );
            })()}
          </div>
        </div>
      </div>
    </>
  );
}
