import { useRef } from "react";

export default function BlogSearch({ result, setResult }) {
  //

  const form = useRef();
  async function handleSearch(e) {
    //
    e.preventDefault();
    const res = await fetch(
      `http://localhost:4000/searchPost/?term=${new FormData(form.current).get(
        "term"
      )}`
    );
    const result = await res.json();
    console.log(result);
    setResult(result);
    //
  }
  //
  return (
    <>
      <div className="container my-2 pt-5">
        <form
          action="#"
          className="d-flex align-items-center justify-content-center"
          ref={form}
        >
          <input
            type="text"
            name="term"
            className="form-control"
            placeholder="Search posts"
            style={{
              width: "70%",
            }}
          />
          <button
            className="btn btn-md btn-purple"
            onClick={(e) => {
              handleSearch(e);
            }}
          >
            <i className="fa fa-md fa-search"></i>
          </button>
        </form>
      </div>
    </>
  );
}
