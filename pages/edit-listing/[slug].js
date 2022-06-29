import Navbar from "../../components/navBar";
import EditForm from "./editForm";

export default function EditListing({ result }) {
  //
  return (
    <>
      <Navbar />
      {result == "Error" ? (
        <>
          <div className="conatiner d-flex flex-column align-items-center justify-content-center">
            <h1>An Error occured</h1>
            <h3>
              Either you are not the owner of this listing or you have poor
              internet connection
            </h3>
          </div>
        </>
      ) : (
        <div className="conatiner d-flex align-items-center justify-content-between flex-column mt-3">
          <h2>Edit Listing</h2>
          <EditForm result={result} />
        </div>
      )}
    </>
  );
}

export async function getServerSideProps({ req, params }) {
  //
  try {
    const res = await fetch(
      `http://localhost:4000/listing/?slug=${params.slug}`,
      {
        method: "get",
        credentials: "include",
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    );
    const result = await res.json();
    if (result.message == "not-this-user") {
      return { props: { result: result.result } };
    }
    return { props: { result: "Error" } };
  } catch (error) {
    return { props: { result: "Error" } };
  }
  //
}
