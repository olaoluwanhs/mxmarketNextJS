import Navbar from "../../components/navBar";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../../components/footer";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState, Fragment, useContext } from "react";
import { checkLocation } from "../profile/[username]";
import OrderForm from "../../components/order";
import { LoggedInContext } from "../../context/loggedInContext";
import checkUser from "../../context/checkUser";

export default function Listing({ result }) {
  //
  let { setLoggedInState, loggedInState } = useContext(LoggedInContext);
  useEffect(() => {}, [loggedInState]);
  useEffect(async () => {
    setLoggedInState(await checkUser());
  }, []);
  //
  const listing = result.result;
  const [author, setAuthor] = useState({});
  const [moreListings, setMoreListings] = useState([]);
  const [createOrderState, setCreateOrderState] = useState(false);
  useEffect(() => {
    // console.log(author);
  }, [author, moreListings, createOrderState]);
  useEffect(async () => {
    const res = await fetch(
      `http://localhost:4000/profile/?user_name=${listing.author}`,
      {
        method: "get",
        credentials: "include",
      }
    );
    const author = await res.json();
    setAuthor(author);
    //
    const object = {
      category: listing.category,
      // subcategory: listing.sub_category,
      min: listing.price - 50000,
      max: listing.price + 50000,
    };
    const temp = await fetch(
      `http://localhost:4000/search/?${new URLSearchParams(object)}`,
      { method: "get", credentials: "include" }
    );
    const extra = await temp.json();
    //
    let index = extra.findIndex((e) => {
      if (e.id == listing.id) {
        return e;
      }
    });
    extra.splice(index, 1);
    setMoreListings(extra);
  }, []);
  //
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
      Router.reload();
      return;
    }
    alert(`Failed with error: ${result.error || result.message}`);
    //
  }
  //
  return (
    <>
      <Navbar />
      {createOrderState && (
        <OrderForm
          price={listing.price}
          orderState={{ createOrderState, setCreateOrderState }}
          listing={listing}
        />
      )}
      <div className="container mx-auto my-4">
        <HomeSlider e={listing.images} />
      </div>
      <div className="d-flex align-items-center justify-content-center p-3 shadow-lg bg-light mt-5 mb-2">
        <h3>{listing.title}</h3>
      </div>
      <div className="d-flex align-items-center justify-content-center pt-3 shadow-lg bg-light mb-3">
        <p>
          <strong>
            {listing.category}/{listing.sub_category}
          </strong>
        </p>
      </div>
      {/* <h2>{JSON.stringify(result)}</h2> */}
      {/*  */}
      {loggedInState.user.user_name != listing.author ? (
        <div className="container d-flex flex-column align-items-center justify-content-center">
          <button
            className="btn btn-purple btn-md col-6 my-1"
            onClick={() => {
              setCreateOrderState(true);
            }}
          >
            Order @ <strike>N</strike>
            {listing.price}
          </button>
          <a className="btn btn-success btn-md col-6 my-1">
            <i className="fab fa-lg fa-whatsapp"></i> Contact
          </a>
        </div>
      ) : (
        <>
          <div className="container d-flex flex-column align-items-center justify-content-center">
            {listing.state == "published" ? (
              <Link href={`/edit-listing/${listing.slug}`}>
                <button className="btn btn-purple btn-md col-6 my-1">
                  Edit Listing
                </button>
              </Link>
            ) : (
              <>
                <button
                  className="btn btn-primary btn-md col-6 my-1"
                  onClick={() => handleRenewListing(listing.id)}
                >
                  Renew Listing
                </button>
              </>
            )}
            <button className="btn btn-danger btn-md col-6 my-1">
              Delete Listing
            </button>
          </div>
        </>
      )}
      {/*  */}
      <div className="container my-3 px-5">
        <p>{result.result.description}</p>
      </div>
      {/*  */}
      <div className="d-flex align-items-center justify-content-center p-3 shadow-sm bg-light my-4">
        <h3>Author Information</h3>
      </div>
      <div className="container d-flex align-items-center">
        {author.profile != undefined && (
          <>
            <div
              className="patternBg profile-header mt-2"
              style={{ width: "100%" }}
            >
              <div className="bg-dark-overlay full-width-container d-flex align-items-center justify-content-evenly px-2">
                {/* Profile picture */}
                <div className="profile-image shadow-lg">
                  <Link href={`/profile/${author.profile.user_name}`}>
                    <img
                      src={`${author.profile.image || "logo.png"}`}
                      alt="profile-img"
                    />
                  </Link>
                </div>
                {/* Profile details */}
                <div className="profile-details d-flex flex-column justify-content-center">
                  <div className="text-light">
                    <Link href={`/profile/${author.profile.user_name}`}>
                      <h2>
                        {author.profile.first_name} {author.profile.last_name}
                      </h2>
                    </Link>
                  </div>
                  <div className="text-light">
                    <i className="fa fa-solid fa-user mx-3"></i>
                    <span>{author.profile.user_name}</span>
                  </div>
                  <div className="text-light">
                    <i className="fa fa-solid fa-envelope mx-3"></i>
                    <span>{author.profile.email}</span>
                  </div>
                  <div className="text-light">
                    <i className="fa fa-solid fa-phone mx-3"></i>
                    <a href="" className="text-light">
                      {author.profile.phone_number}
                    </a>
                    <br />
                    <i className="fab fa-whatsapp fa-lg mx-3"></i>
                    <a href="" className="text-light">
                      {author.profile.whatsapp}
                    </a>
                  </div>
                  <div className="text-light">
                    <i className="fa fa-lg fa-map-marker-alt mx-3"></i>
                    <span>{checkLocation(author.profile.location)}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/*  */}
      {moreListings[0] != undefined && (
        <>
          <div className="d-flex align-items-center justify-content-center pt-3 shadow-lg bg-light mb-3">
            <p>
              <strong>Related results</strong>
            </p>
          </div>
          <More affiliate={moreListings} />
        </>
      )}
      <Footer />
    </>
  );
}
export async function getServerSideProps({ req, params }) {
  //
  let res = await fetch(`http://localhost:4000/listing/?slug=${params.slug}`, {
    method: "get",
    credentials: "include",
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  const result = await res.json();
  //
  return { props: { result, key: result.result.id } };
}

export function HomeSlider({ e }) {
  const settings = {
    adaptiveHeight: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };
  // console.log(e);
  const images = JSON.parse(e);
  let i = 0;
  return (
    <Slider {...settings}>
      {images.map((e) => {
        i = i + 1;
        return (
          <div
            key={e + "-" + i}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <img
              src={`http://localhost:4000/uploads/${e}`}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        );
      })}
    </Slider>
  );
}

function More({ affiliate }) {
  useEffect(() => {}, [affiliate]);
  return (
    <div className="d-flex flex-row overflow-scroll mx-4 shadow-lg">
      {affiliate.map((e) => {
        //
        return (
          <Fragment key={e.id}>
            <Product e={e} />
          </Fragment>
        );
        //
      })}
    </div>
  );
}

function Product({ e }) {
  return (
    <div
      className="card shadow-lg rounded overflow-hidden mx-2"
      style={{ minWidth: "15rem" }}
    >
      <img src="/unsplash.jpg" alt="" className="card-image" />
      <div className="card-body" style={{ height: "fit-content" }}>
        <h3>{e.title}</h3>
        <h5>
          <strike>N</strike>
          {e.price}
        </h5>
        <Link href={`/listing/${e.slug}`}>
          <button className="btn btn-purple col-12">
            Starting at {e.price}
          </button>
        </Link>
      </div>
    </div>
  );
}
