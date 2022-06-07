import { useEffect, useState, useContext } from "react";
import BlogSearch from "../components/blogSearch";
import Navbar from "../components/navBar";
import Post from "../components/post";
import checkUser from "../context/checkUser";
import { LoggedInContext } from "../context/loggedInContext";

export default function BlogPage() {
  let { setLoggedInState, loggedInState } = useContext(LoggedInContext);
  useEffect(() => {}, [loggedInState]);
  useEffect(async () => {
    setLoggedInState(await checkUser());
  }, []);
  //
  const [result, setResult] = useState([]);
  useEffect(() => {}, [result]);
  useEffect(async () => {
    //
    const res = await fetch(`http://localhost:4000/posts`);
    const result = await res.json();
    // console.log(result);
    setResult(result);
    //
  }, []);
  //
  return (
    <>
      <Navbar />
      <BlogSearch result={result} setResult={setResult} />
      {/*  */}
      <div className="container my-5 mx-auto row">
        {result.map((e) => {
          return <Post post={e} key={e.id} />;
        })}
      </div>
      {/*  */}
    </>
  );
}
