import Navbar from "../../components/navBar";
import Footer from "../../components/footer";
import ReactHtmlParser from "react-html-parser";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import checkUser from "../../context/checkUser";
import { useContext } from "react";
import { LoggedInContext } from "../../context/loggedInContext";

export default function Post({ post }) {
  //
  let { setLoggedInState, loggedInState } = useContext(LoggedInContext);
  const [morePost, setMorePost] = useState([]);
  useEffect(() => {}, [morePost, loggedInState]);
  useEffect(async () => {
    setLoggedInState(await checkUser());
  }, []);
  //
  useEffect(async () => {
    //
    const res = await fetch("http://localhost:4000/posts");
    let result = await res.json();
    //
    let index = result.findIndex((ele, index) => {
      if (ele.id == post.id) {
        return ele;
      }
    });
    // console.log(index);
    result.splice(index, 1);
    //
    setMorePost(result);
    //
  }, []);
  //
  return (
    <>
      <Navbar />
      <div className="container d-flex flex-column align-items-center justify-content-evenly">
        <h1 className="mt-5"> {post.title} </h1>
        <div className="jumbotron my-3" style={{ width: "95%" }}>
          {post.image != null && (
            <img
              src={post.image}
              alt={post.slug}
              style={{ width: "100%", height: "25rem", objectFit: "cover " }}
            />
          )}
        </div>
        <div
          className="text-dark"
          style={{
            wordWrap: "break-word",
            width: "90%",
            fontSize: "150%",
          }}
        >
          {ReactHtmlParser(post.content)}
          {/*  */}
        </div>
        <h3
          className="py-3 shadow d-flex align-items-center justify-content-center mb-4"
          style={{ width: "100%" }}
        >
          Read more
        </h3>
        {morePost.map((e) => {
          return (
            <Fragment key={e.id}>
              <MorePosts e={e} />
            </Fragment>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

//
export async function getServerSideProps({ params, req }) {
  //
  let res = await fetch(`http://localhost:4000/post?slug=${params.slug}`, {
    method: "get",
    credentials: "include",
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  const post = await res.json();
  //
  return { props: { post } };
}

export function MorePosts({ e }) {
  return (
    <div
      className="row my-2 shadow rounded d-flex align-items-center mobile-100"
      style={{ width: "100%" }}
    >
      <Link href={`/post/${e.slug}`}>
        <>
          <img
            src={e.image}
            alt=""
            className="col-4"
            style={{ height: "100%" }}
          />
          <div className="col-8 d-flex align-items-center justify-content-center">
            <h5>{e.title}</h5>
          </div>
        </>
      </Link>
    </div>
  );
}
