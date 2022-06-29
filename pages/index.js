import { Fragment, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navBar";
import Footer from "../components/footer";
import { LoggedInContext } from "../context/loggedInContext";
import checkUser from "../context/checkUser";
import SearchBar from "../components/searchBar";
import { CategorySection } from "./categories";
import Affiliate, { getAffiliateProducts } from "../components/affiliate";
import Listings from "../components/Listings";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//

export default function Home() {
  //
  const [affiliate, setAffiliate] = useState([]);
  const paginationSettings = {
    boundaryCount: 2,
    color: "secondary",
    count: 20,
  };
  //
  let { setLoggedInState, loggedInState } = useContext(LoggedInContext);
  useEffect(() => {}, [loggedInState, affiliate]);
  useEffect(async () => {
    setLoggedInState(await checkUser());
    getAffiliateProducts(setAffiliate);
  }, []);

  return (
    <Fragment>
      <Navbar />
      {/*  */}
      <div className="container mx-auto my-4" style={{ overflow: "hidden" }}>
        <HomeSlider />
      </div>
      <SearchBar />
      <br />
      <div className="row d-flex align-items-center justify-content-center my-4 mx-0">
        <CategorySection
          fontSizes={"2rem"}
          divClasses={
            "col-3 my-3 d-flex align-items-center justify-content-center"
          }
        />
      </div>
      {/* Affiliate products */}
      <div className="d-flex align-items-center justify-content-center p-3 shadow-lg bg-light my-4">
        <h3>Affiliate products</h3>
      </div>
      <Affiliate affiliate={affiliate} />
      <div className="d-flex align-items-center justify-content-center p-3 shadow-lg bg-light my-4">
        <h3>Latest Listings</h3>
      </div>
      {/* Latest listings */}
      <Listings />
      {/*  */}
      <Footer />
    </Fragment>
  );
}

export function HomeSlider() {
  const settings = {
    adaptiveHeight: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <Slider {...settings}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <img
          src={"/unsplash.jpg"}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        style={{ width: "100%", height: "40vh" }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <img
          src={"/logo.png"}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </Slider>
  );
}
