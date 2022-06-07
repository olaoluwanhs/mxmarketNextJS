import { Fragment, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navBar";
import Footer from "../components/footer";
import { LoggedInContext } from "../context/loggedInContext";
import checkUser from "../context/checkUser";
import { ProductListing } from "../components/ProductListing";
import SearchBar from "../components/searchBar";
import { CategorySection } from "./categories";
import Affiliate, { getAffiliateProducts } from "../components/affiliate";
import Listings from "../components/Listings";
//

export default function Home() {
  //
  const [affiliate, setAffiliate] = useState([]);
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
      <SearchBar />
      <br />
      <div className="row d-flex align-items-center justify-content-center my-4">
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
      <Listings />
      {/*  */}
      {/* Latest listings */}
      {/* <ProductListing /> */}
      {/*  */}
      <Footer />
    </Fragment>
  );
}
