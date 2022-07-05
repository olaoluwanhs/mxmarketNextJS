import Navbar from "../../components/navBar";
import Footer from "../../components/footer";

export default function DeliveryDeatail({ message, result }) {
  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column mt-2 align-items-center justify-content-evenly">
        {message ? (
          <>
            <h1>{message}</h1>
            <p>Please ensure you have the correct id</p>
          </>
        ) : (
          <>
            <div className="container my-3 d-flex flex-column align-items-center justify-content-evenly">
              <h2>Title</h2>
              <h5>{result.title}</h5>
            </div>
            <hr />
            <div className="container my-3 d-flex flex-column align-items-center justify-content-evenly">
              <h2>Request state</h2>
              <h5>{result.state}</h5>
            </div>
            <hr />
            <div className="container my-3 d-flex flex-column align-items-center justify-content-evenly">
              <h2>Sender's information</h2>
              <h5>
                <strong>Name:</strong>
                {result.s_name}
              </h5>
              <h5>
                <strong>Phone Number:</strong>
                {result.s_phone_number}
              </h5>
              <h5>
                <strong>Email:</strong>
                {result.s_email}
              </h5>
              <h5>
                <strong>Address:</strong>
                {result.s_address}
              </h5>
            </div>
            <div className="container my-3 d-flex flex-column align-items-center justify-content-evenly">
              <h2>Reciever's information</h2>
              <h5>
                <strong>Name:</strong>
                {result.r_name}
              </h5>
              <h5>
                <strong>Phone Number:</strong>
                {result.r_phone_number}
              </h5>
              <h5>
                <strong>Email:</strong>
                {result.r_email}
              </h5>
              <h5>
                <strong>Address:</strong>
                {result.r_address}
              </h5>
            </div>
            <div
              className="container my-3 d-flex flex-column align-items-center justify-content-evenly"
              style={{ width: "100%" }}
            >
              <h5>Description</h5>
              <p style={{ width: "100%", wordWrap: "break-word" }}>
                {result.description}
              </p>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    //
    const res = await fetch(`http://localhost:4000/delivery/?id=${params.id}`);
    const result = await res.json();
    // console.log(result);
    if (result.id) {
      return { props: { result } };
    }
    return { props: { message: "No result found" } };
    //
  } catch (error) {
    // console.log(error.message);
    return { props: { message: "No result found" } };
  }
}
