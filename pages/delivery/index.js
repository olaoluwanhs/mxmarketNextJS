import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navBar";

export default function MXdevlivery() {
  //
  const Form = useRef();
  const [attemptState, setAttemptState] = useState("none");
  //
  useEffect(() => {}, [attemptState]);
  //
  async function handleDeliverySubmit(e) {
    //
    e.preventDefault();
    const formData = new FormData(Form.current);
    let data = {};
    let inputList = document.querySelectorAll("#deliveryForm > input");
    inputList.forEach((e, index) => {
      data[e.name] = e.value;
    });
    data["description"] = formData.get("description");
    // console.log(data);
    //
    const res = await fetch("http://localhost:4000/delivery", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.error) {
      setAttemptState(result.error.errors[0].message);
      return;
    }
    setAttemptState("Success");
    Router.replace(`/delivery/${result.id}`);
  }
  //
  //
  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };
  const idInput = useRef();
  //
  async function handleTrack(e) {
    //
    Router.push(`/delivery/${idInput.current.value}`);
    //
  }
  //
  const [promptState, setPromptState] = useState(false);
  //
  return (
    <>
      <Navbar />
      <SubmitDelieveryPrompt
        promptState={promptState}
        setPromptState={setPromptState}
        handleDeliverySubmit={handleDeliverySubmit}
      />
      <>
        <div
          className="container d-flex flex-column align-items-center justify-content-center my-5"
          style={{ height: "fit-content" }}
        >
          <h2>
            Deliever products to wherever you want within Minna at an affordable
            price
          </h2>
          <img src="/deliveryImage.png" alt="" style={imageStyle} />
          <br />
          <h5>Track your delivery request and see how far it has gone</h5>
          <input
            type="text"
            className="form-control my-2 col-12"
            placeholder="Insert the request id"
            ref={idInput}
          />
          <button
            className="btn btn-md btn-purple col-12"
            onClick={handleTrack}
          >
            Track
          </button>
        </div>
      </>
      <div className="container my-4">
        <form
          className="d-flex flex-column align-items-center justify-content-evenly"
          id="deliveryForm"
          ref={Form}
        >
          <h3>Create an order request</h3>
          <strong>Sender's information</strong>
          <label htmlFor="s_name">Name</label>
          <input
            type="text"
            className="form-control my-1 col-12"
            name="s_name"
            placeholder="Name of the sender"
          />
          <label htmlFor="s_address">Address</label>
          <input
            type="text"
            className="form-control my-1 col-12"
            name="s_address"
            placeholder="Address of the sender"
          />
          <label htmlFor="s_email">Email</label>
          <input
            type="email"
            className="form-control my-1 col-12"
            placeholder="Email of the sender"
            name="s_email"
          />
          <label htmlFor="s_phone_number">Phone number</label>
          <input
            type="text"
            placeholder="Preferably your whatsapp number"
            className="form-control my-1 col-12"
            name="s_phone_number"
          />
          <br />
          <strong>Reciever's information</strong>
          <label htmlFor="r_name">Name</label>
          <input
            type="text"
            placeholder="Name of the Reciever"
            className="form-control my-1 col-12"
            name="r_name"
          />
          <label htmlFor="r_address">Address</label>
          <input
            type="text"
            placeholder="Address of the Reciever"
            className="form-control my-1 col-12"
            name="r_address"
          />
          <label htmlFor="r_email">Email</label>
          <input
            type="email"
            placeholder="Email of the Reciever"
            className="form-control my-1 col-12"
            name="r_email"
          />
          <label htmlFor="r_phone_number">Phone number</label>
          <input
            type="text"
            placeholder="Preferably your whatsapp number"
            className="form-control my-1 col-12"
            name="r_phone_number"
          />
          <br />
          <strong>Product's information</strong>
          <label htmlFor="p_title">Title</label>
          <input
            type="text"
            placeholder="Name of the product"
            className="form-control my-1 col-12"
            name="title"
          />
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control my-1 col-12"
            placeholder="Describe the product adding important details like the size, weight, type of product and so on."
            name="description"
            cols="30"
            rows="10"
          ></textarea>
          <button
            className="btn btn-purple btn-md my-2 col-12"
            onClick={(e) => {
              e.preventDefault();
              setPromptState(true);
            }}
          >
            Submit
          </button>
          {/*  */}
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
      </div>
    </>
  );
}

function SubmitDelieveryPrompt({
  promptState,
  setPromptState,
  handleDeliverySubmit,
}) {
  //
  const style = {
    container: {
      //
      width: "80vw",
      padding: "2rem",
      borderRadius: "2rem",
      overflow: "hidden",
      //
    },
    background: {
      //
      position: "fixed",
      top: "0",
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#212529c9",
      //
      transform: (() => {
        if (promptState == false) {
          return "translateY(200%)";
        }
        return "translateY(0%)";
      })(),
    },
  };
  //
  return (
    <div style={style.background}>
      <div style={style.container} className="shadow-lg bg-light">
        <strong
          onClick={() => {
            setPromptState(false);
          }}
        >
          X
        </strong>
        <br />
        <br />
        <p>
          Your delivery request will be sent on confirmation, An agent will
          contact you very soon concerning the details of the delivery service
          and time for pick-up
        </p>
        <button
          className="btn btn-md btn-purple"
          onClick={handleDeliverySubmit}
        >
          Confirm submition
        </button>
      </div>
    </div>
  );
}
// submit delivery prompt
// track delivery
// delivery details page
