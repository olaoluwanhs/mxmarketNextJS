import Navbar from "../../components/navBar";
import Footer from "../../components/footer";
import { useContext, useEffect } from "react";
import checkUser from "../../context/checkUser";
import { LoggedInContext } from "../../context/loggedInContext";
export default function OrderPage({ order }) {
  //
  let { setLoggedInState, loggedInState } = useContext(LoggedInContext);
  //
  useEffect(() => {}, [loggedInState]);
  useEffect(async () => {
    setLoggedInState(await checkUser());
  }, []);
  return (
    <>
      <Navbar />
      <div
        className="container d-flex align-items-center justify-content-evenly py-3 flex-column mt-4"
        style={{ height: "70vh" }}
      >
        <div className="d-flex align-items-center justify-content-center flex-column my-3">
          <h2>Order identfication code</h2>
          <p className="text-primary" style={{ fontSize: "90%" }}>
            {order.uuid}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-column my-3">
          <h2>Product Title</h2>
          <p className="text-primary">{order.product_name}</p>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-column my-3">
          <h4>From</h4>
          <p className="text-primary">{order.to}</p>
          <h4>To</h4>
          <p className="text-primary">{order.from}</p>
        </div>
        <strong>
          Order created:{" "}
          {(() => {
            const date = new Date(order.createdAt);
            return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
          })()}
        </strong>
        <strong className="mt-3">Description</strong>
        <p>{order.description}</p>
      </div>
      <Footer />
    </>
  );
}
export async function getServerSideProps({ req, params }) {
  //
  const order = await (
    await fetch(`http://localhost:4000/order/?id=${params.uuid}`, {
      method: "get",
      credentials: "include",
      headers: {
        Cookie: req.headers.cookie,
      },
    })
  ).json();
  //
  return { props: { order } };
}
