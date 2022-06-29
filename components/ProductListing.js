import Link from "next/link";
import Router from "next/router";
import { Fragment } from "react";

export function ProfileProductListing({ productArray, setReRenderState }) {
  const products = productArray.result;
  //
  async function handleDeleteListing(id) {
    //
    if (!confirm("Are you sure you want to delete this listing")) {
      return;
    }
    const res = await fetch(`http://localhost:4000/listing/?id=${id}`, {
      method: "delete",
      credentials: "include",
    });
    const result = await res.json();
    //
    // console.log(result);
    if (result.result == 1) {
      setReRenderState({ state: "state" });
      return;
    }
    alert(`Failed with error: ${result.error || result.message}`);
    //
  }
  //
  async function handleRenewListing(id) {
    //
    if (!confirm("Renewing listing will cost N200")) {
      return;
    }
    const res = await fetch(`http://localhost:4000/renew`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const result = await res.json();
    //
    console.log(result);
    if (result[0] == 1) {
      setReRenderState({ state: "state" });
      return;
    }
    alert(`Failed with error: ${result.error || result.message}`);
    //
  }
  //
  return (
    <>
      {/* {console.log(products)} */}
      {products.map((e) => {
        return (
          <Fragment key={e.id}>
            <div className="container card shadow profile-product my-3">
              <img
                src={`http://localhost:4000/uploads/${JSON.parse(e.images)[0]}`}
                alt="product name"
              />
              <div className="profile-product-details">
                <Link href={`/listing/${e.slug}`}>
                  <h4>
                    <strong>{e.title}</strong>
                  </h4>
                </Link>
                <strong>
                  <strike>N</strike>
                  {e.price}
                </strong>
                <div>
                  <ul>
                    <li>
                      <small>{e.category}</small> (
                      <small>{e.sub_category}</small>)
                    </li>
                    <li>
                      <small>{e.state}</small>
                      <br />
                      <small>
                        {(() => {
                          const date = new Date(e.createdAt);
                          return `${date.getDate()}/${
                            date.getUTCMonth() + 1
                          }/${date.getFullYear()}`;
                        })()}
                      </small>
                    </li>
                  </ul>
                </div>
                <p>
                  <strong>
                    Views:<small> 25</small>
                  </strong>
                </p>
                {/* Edit and delete button */}
                <div className="full-width-container">
                  <Link href={`/edit-listing/${e.slug}`}>
                    <span className="btn btn-sm btn-purple mx-1">Edit</span>
                  </Link>
                  {e.state == "published" ? (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        handleDeleteListing(e.id);
                      }}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        handleRenewListing(e.id);
                      }}
                    >
                      Renew
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/*  */}
          </Fragment>
        );
      })}
    </>
  );
}

export function ProductListing() {
  return (
    <>
      <div className="product-card">
        <div className="product-image">
          <img src="/unsplash.jpg" alt="" />
        </div>
        <div className="product-details">
          <h4>Product Name</h4>
          <h5>
            <strike>N</strike>3000
          </h5>
          <a href="#" className="btn btn-purple btn-md">
            View Details
          </a>
        </div>
      </div>
    </>
  );
}
