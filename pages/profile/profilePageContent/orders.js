import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfileOrders({ profilePageState }) {
  //
  const [orders, setOrders] = useState([]);
  const [orderType, setOrderType] = useState({
    type: "to",
    message: "Things you ordered",
  });
  //
  function handleTypeChange() {
    if (orderType.type == "to") {
      setOrderType({
        type: "from",
        message: "Order for your listings",
      });
      return;
    }
    setOrderType({
      type: "to",
      message: "Things you ordered",
    });
  }
  //
  useEffect(async () => {
    const res = await fetch(
      `http://localhost:4000/orders/?type=${orderType.type}`,
      {
        method: "get",
        credentials: "include",
      }
    );
    const result = await res.json();
    // console.log(result);
    setOrders(result);
  }, [orderType]);
  //
  return (
    <div
      // style={{ height: "200vh" }}
      className="container my-3 d-flex flex-column align-items-center"
    >
      <h1>{profilePageState}</h1>
      <button className="btn btn-purple btn-md mb-3" onClick={handleTypeChange}>
        {orderType.message}
      </button>
      <Order orders={orders} orderType={orderType} setOrderType />
    </div>
  );
}

export function Order({ orders, orderType, setOrderType }) {
  //
  async function handleSetOrderState(uuid, state) {
    //
    const result = await (
      await fetch(`http://localhost:4000/order`, {
        method: "put",
        credentials: "include",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          id: uuid,
          state: state,
        }),
      })
    ).json();
    //
    // console.log(result);
    setOrderType("from");
    //
  }
  //
  return orders.map((e) => {
    return (
      <div
        className="bg-light shadow rounded py-1 px-2 d-flex align-items-center justify-content-around order-details my-1 flex-column"
        style={{ width: "100%" }}
        key={e.uuid}
      >
        {/* Price */}
        <div>
          <strike>N</strike>
          {e.price}
        </div>
        {/* The name of the product */}
        <div className="d-flex flex-column">
          <span className="mt-1">{e.product_name}</span>
        </div>
        {/* Username of sender */}
        <div>{e.to}</div>
        <div>{e.from}</div>
        <Link href={`/order/${e.uuid}`}>
          <button className="btn btn-md btn-purple mb-2">Details</button>
        </Link>
        {/* Icon represnting the state */}
        {orderType.type == "to" ? (
          <div>
            {(() => {
              if (e.state == "delivered") {
                return (
                  <i
                    className="fa fa-solid fa-check fa-lg"
                    style={{ color: "green" }}
                  >
                    delivered
                  </i>
                );
              } else if (e.state == "transit") {
                return (
                  <i
                    className="fa fa-solid fa-truck fa-lg"
                    style={{ color: "purple" }}
                  >
                    In transit
                  </i>
                );
              } else if (e.state == "sent") {
                return (
                  <i
                    className="fa fa-solid fa-paper-plane fa-lg"
                    style={{ color: "blue" }}
                  >
                    sent
                  </i>
                );
              } else if (e.state == "declined") {
                return (
                  <i
                    className="fa fa-solid fa-times fa-lg"
                    style={{ color: "red" }}
                  >
                    declined
                  </i>
                );
              }
              return (
                <i
                  className="fa fa-solid fa-question-circle fa-lg"
                  style={{ color: "green" }}
                ></i>
              );
            })()}
          </div>
        ) : (
          <>
            <button
              disabled={(() => {
                if (e.state == "sent") {
                  return false;
                }
                return true;
              })()}
              className="btn btn-success btn-md my-1"
              onClick={() => {
                handleSetOrderState(e.uuid, "transit");
              }}
            >
              Accept
            </button>
            <button
              disabled={(() => {
                if (e.state == "sent") {
                  return false;
                }
                return true;
              })()}
              className="btn btn-danger btn-md my-1"
              onClick={() => {
                handleSetOrderState(e.uuid, "declined");
              }}
            >
              {" "}
              Decline
            </button>
          </>
        )}
        {e.state != "sent" && (
          <>
            <p>{e.state}</p>
          </>
        )}
      </div>
    );
  });
}
