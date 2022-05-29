import { useEffect, useState } from "react";

export default function ProfileOrders({ profilePageState }) {
  //
  const [orders, setOrders] = useState([]);
  const [orderType, setOrderType] = useState("from");
  //
  useEffect(async () => {
    const res = await fetch(`http://localhost:4000/orders/?type=${orderType}`, {
      method: "get",
      credentials: "include",
    });
    const result = await res.json();
    console.log(result);
    setOrders(result);
  }, [orderType]);
  //
  return (
    <div
      // style={{ height: "200vh" }}
      className="container my-3 d-flex flex-column align-items-center"
    >
      <h1>{profilePageState}</h1>
      <Order orders={orders} />
    </div>
  );
}

export function Order({ orders }) {
  //
  return orders.map((e) => {
    return (
      <div
        className="bg-light shadow rounded py-1 px-2 d-flex align-items-center justify-content-around order-details"
        style={{ width: "100%" }}
        key={e.uuid}
      >
        {/* Price */}
        <div>
          <strike>N</strike>
          {e.price} |
        </div>
        {/* The name of the product */}
        <div className="d-flex flex-column">
          <span className="mt-1">{e.product_name} |</span>
        </div>
        {/* Username of sender */}
        <div>{e.from} |</div>
        {/* Username of reciver */}
        <div>{e.to} |</div>
        {/* Description */}
        <div>{e.description} |</div>
        {/* date of sending */}
        <div>
          {(() => {
            const date = new Date(e.updatedAt);
            const fullDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
            return fullDate;
          })()}{" "}
          |
        </div>
        {/* Icon represnting the state */}
        <div>
          <i
            className="fa fa-solid fa-check fa-lg"
            style={{ color: "green" }}
          ></i>
        </div>
      </div>
    );
  });
}
