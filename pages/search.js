import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import Footer from "../components/footer";
import { Lisiting } from "../components/Listings";
import Navbar from "../components/navBar";
import SearchBar from "../components/searchBar";
import { LoggedInContext } from "../context/loggedInContext";
import checkUser from "../context/checkUser";

export default function Search() {
  //
  const router = useRouter();
  const params = router.query;
  const [resultState, setResultState] = useState([]);
  //
  let { setLoggedInState, loggedInState } = useContext(LoggedInContext);
  useEffect(() => {}, [loggedInState]);
  useEffect(async () => {
    setLoggedInState(await checkUser());
  }, []);
  //

  useEffect(async () => {
    const res = await fetch(
      `http://localhost:4000/search/?${new URLSearchParams(params)}`
    );
    const result = await res.json();
    setResultState(result);
  }, []);
  useEffect(() => {
    // console.log(resultState);
  }, [resultState]);

  return (
    <>
      <Navbar />
      <br />
      <SearchBar />
      <center>
        <h3 className="my-2">Results</h3>
      </center>
      {/* Results */}
      <div className="container">
        {resultState[0] != undefined && <Lisiting listings={resultState} />}
        {resultState.length <= 0 && <h3>No Results</h3>}
      </div>
      {/* Results end */}
      <Footer />
    </>
  );
}
