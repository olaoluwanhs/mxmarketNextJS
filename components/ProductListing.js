import Link from "next/link";

export function ProfileProductListing({ productArray }) {
  return (
    <>
      <div className="container card shadow profile-product">
        <div className="product-image-list">
          <img src="/unsplash.jpg" alt="" />
          <img src="/unsplash.jpg" alt="" />
          <img src="/unsplash.jpg" alt="" />
          <img src="/unsplash.jpg" alt="" />
        </div>
        <img src="/unsplash.jpg" alt="product name" />
        <div className="profile-product-details">
          {/* <h2>Title of listing</h2>
          <h3>Price of Listing</h3>
          <h3>Allowed Methods of sale</h3>
          <h4>Number of views</h4> */}
          <h4>
            <strong>Here is the title</strong>
          </h4>
          <strong>
            <strike>N</strike>2000
          </strong>
          <div>
            <ul>
              <li>
                <small>On call to seller</small>
              </li>
              <li>
                <small>Order and pay online</small>
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
            <Link href="">
              <span className="btn btn-sm btn-purple mx-1">Edit</span>
            </Link>
            <Link href="">
              <span className="btn btn-sm btn-danger">Delete</span>
            </Link>
          </div>
        </div>
      </div>
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
