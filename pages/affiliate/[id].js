import Navbar from "../../components/navBar";
import Footer from "../../components/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick/lib/slider";
import { useContext, useEffect, useState } from "react";
import Affiliate from "../../components/affiliate";
import checkUser from "../../context/checkUser";
import Router from "next/router";
import { LoggedInContext } from "../../context/loggedInContext";

export default function AfiiliateProduct({ result }) {
  let { setLoggedInState, loggedInState } = useContext(LoggedInContext);
  useEffect(async () => {
    setLoggedInState(await checkUser());
  }, []);

  const [affiliate, setAffiliate] = useState([]);
  useEffect(() => {}, [loggedInState, affiliate]);
  useEffect(async () => {
    let res = await fetch(`http://localhost:4000/affiliate`, {
      method: "get",
      credentials: "include",
    });
    res = await res.json();
    let index = res.findIndex((ele, index) => {
      if (ele.id == result.id) {
        return ele;
      }
    });
    // console.log(index);
    res.splice(index, 1);
    setAffiliate(res);
  }, []);
  //
  const deleteAffiliate = async (e) => {
    if (confirm("Are you sure you want to delete this?")) {
      //
      const res = await (
        await fetch(
          `http://localhost:4000/affiliate/?` +
            new URLSearchParams({ id: result.id }),
          {
            method: "delete",
            credentials: "include",
          }
        )
      ).json();

      if (res == 1) {
        alert("deleted successfully");
        Router.replace("/");
        return;
      }
      alert("deletion failed");
      //
    }
  };
  //
  return (
    <>
      <Navbar />
      <div>
        <PageSlider pictures={result.pictures} />
        <div className="d-flex align-items-center justify-content-center p-3 shadow-lg bg-light my-4">
          <h3>{result.title}</h3>
        </div>
        <div className="container">
          <h4>
            {/* <strong>Starts at: </strong> */}
            <strike>N</strike>
            {result.price}
          </h4>
          <div
            className="d-flex align-items-center justify-content-evenly my-3"
            style={{ width: "100%" }}
          >
            <a
              target={"_blank"}
              href={result.link}
              className="btn btn-md btn-purple col-12"
            >
              Buy
            </a>
          </div>
          <p>
            <strong>Description:</strong> {result.description}
          </p>
          {loggedInState.user.userType == "admin" && (
            <button className="btn btn-danger btn-md" onClick={deleteAffiliate}>
              Delete Affiliate Post
            </button>
          )}
        </div>
        <div className="d-flex align-items-center justify-content-center p-3 shadow-lg bg-light my-4">
          <h3>More Affiliate Products</h3>
        </div>
        <Affiliate affiliate={affiliate} />
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ req, params }) {
  //
  const res = await fetch(
    "http://localhost:4000/affiliateProduct/?id=" + params.id,
    {
      method: "get",
      credentials: "include",
    }
  );
  const result = await res.json();
  //   console.log(result``);
  //
  return {
    props: { result },
  };
  //
}
export function PageSlider({ pictures }) {
  const settings = {
    dots: true,
    autoplay: true,
    easing: "linear",
    autoplaySpeed: 4000,
  };
  //
  return (
    <div className="container my-4">
      <Slider {...settings}>
        {JSON.parse(pictures).map((e) => {
          return (
            <div key={e} style={{ width: "100%", height: "100%" }}>
              <img src={e} alt="" style={{ width: "100%", height: "100%" }} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
