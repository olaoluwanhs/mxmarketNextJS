import Navbar from "../components/navBar";
import Footer from "../components/footer";
import Link from "next/link";
import checkUser from "../context/checkUser";
import { useContext, useEffect } from "react";
import { LoggedInContext } from "../context/loggedInContext";

export default function CategoriesPage() {
  let { setLoggedInState, loggedInState } = useContext(LoggedInContext);
  useEffect(() => {}, [loggedInState]);
  useEffect(async () => {
    setLoggedInState(await checkUser());
  }, []);
  //
  //
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="d-flex align-items-center justify-content-center my-4">
          <h3>Categories</h3>
        </div>
        <CategorySection
          fontSizes={"7rem"}
          divClasses={
            "col-lg-3 col-md-6 my-3 d-flex align-items-center justify-content-center"
          }
        />
      </div>
      <Footer />
    </>
  );
}

export function CategorySection({ fontSizes, divClasses }) {
  return (
    <>
      {/*  */}
      <div className="row">
        {/*  */}
        <div className={divClasses}>
          <Link href={"/search/?category=fashion"}>
            <div className="d-flex align-items-center justify-content-center flex-column">
              <i
                className="fa fa-lg fa-tshirt text-light btn-purple p-4 rounded mb-2"
                style={{
                  fontSize: fontSizes,
                  transition: "0.3s",
                }}
              ></i>
              <h5 style={{ fontSize: "90%", fontWeight: "bolder" }}>Fashion</h5>
            </div>
          </Link>
        </div>
        {/*  */}
        {/*  */}
        <div className={divClasses}>
          <Link href={"/search/?category=technology"}>
            <div className="d-flex align-items-center justify-content-center flex-column">
              <i
                className="fa fa-lg fa-tablet-alt text-light btn-purple p-4 rounded mb-2"
                style={{
                  fontSize: fontSizes,
                  transition: "0.3s",
                }}
              ></i>
              <h5 style={{ fontSize: "90%", fontWeight: "bolder" }}>
                Technology
              </h5>
            </div>
          </Link>
        </div>
        {/*  */}
        {/*  */}
        <div className={divClasses}>
          <Link href={"/search/?category=food"}>
            <div className="d-flex align-items-center justify-content-center flex-column">
              <i
                className="fa fa-lg fa-carrot text-light btn-purple p-4 rounded mb-2"
                style={{
                  fontSize: fontSizes,
                  transition: "0.3s",
                }}
              ></i>
              <h5 style={{ fontSize: "90%", fontWeight: "bolder" }}>Food</h5>
            </div>
          </Link>
        </div>
        {/*  */}
        {/*  */}
        <div className={divClasses}>
          <Link href={"/search/?category=furniture"}>
            <div className="d-flex align-items-center justify-content-center flex-column">
              <i
                className="fa fa-lg fa-chair text-light btn-purple p-4 rounded mb-2"
                style={{
                  fontSize: fontSizes,
                  transition: "0.3s",
                }}
              ></i>
              <h5 style={{ fontSize: "90%", fontWeight: "bolder" }}>
                Furniture
              </h5>
            </div>
          </Link>
        </div>
        {/*  */}
        {/*  */}
        <div className={divClasses}>
          <Link href={"/search/?category=housing"}>
            <div className="d-flex align-items-center justify-content-center flex-column">
              <i
                className="fa fa-lg fa-home text-light btn-purple p-4 rounded mb-2"
                style={{
                  fontSize: fontSizes,
                  transition: "0.3s",
                }}
              ></i>
              <h5 style={{ fontSize: "90%", fontWeight: "bolder" }}>Housing</h5>
            </div>
          </Link>
        </div>
        {/*  */}
        {/*  */}
        <div className={divClasses}>
          <Link href={"/search/?category=books"}>
            <div className="d-flex align-items-center justify-content-center flex-column">
              <i
                className="fa fa-lg fa-book text-light btn-purple p-4 rounded mb-2"
                style={{
                  fontSize: fontSizes,
                  transition: "0.3s",
                }}
              ></i>
              <h5 style={{ fontSize: "90%", fontWeight: "bolder" }}>Books</h5>
            </div>
          </Link>
        </div>
        {/*  */}
        {/*  */}
        <div className={divClasses}>
          <Link href={"/search/?category=services"}>
            <div className="d-flex align-items-center justify-content-center flex-column">
              <i
                className="fa fa-lg fa-cog text-light btn-purple p-4 rounded mb-2"
                style={{
                  fontSize: fontSizes,
                  transition: "0.3s",
                }}
              ></i>
              <h5 style={{ fontSize: "90%", fontWeight: "bolder" }}>
                Services
              </h5>
            </div>
          </Link>
        </div>
        {/*  */}
        {/*  */}
        <div className={divClasses}>
          <Link href={"/search/?category=academics"}>
            <div className="d-flex align-items-center justify-content-center flex-column">
              <i
                className="fa fa-lg fa-graduation-cap text-light btn-purple p-4 rounded mb-2"
                style={{
                  fontSize: fontSizes,
                  transition: "0.3s",
                }}
              ></i>
              <h5 style={{ fontSize: "90%", fontWeight: "bolder" }}>
                Academics
              </h5>
            </div>
          </Link>
        </div>
        {/*  */}
      </div>
    </>
  );
}
