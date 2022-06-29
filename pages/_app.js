import "../bootstrap-5.1.3-dist/bootstrap-5.1.3-dist/css/bootstrap.min.css";
import { LoggedInContextProvider } from "../context/loggedInContext";
import LoadingAnimation from "../components/loadingAnimation";
import "../styles/style.css";
import "../fontawesome/css/all.min.css";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import Router from "next/router";

function MyApp({ Component, pageProps }) {
  const [loadingState, setLoadingState] = useState(true);
  useEffect(() => {}, [loadingState]);
  useEffect(() => {
    setLoadingState(false);
  }, []);

  function handleLoading(state) {
    setLoadingState(state);
  }

  //
  Router.events.on("routeChangeStart", () => {
    handleLoading(true);
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    handleLoading(false);
    NProgress.done();
  });
  Router.events.on("routeChangeComplete", () => {
    handleLoading(false);
    NProgress.done();
  });

  return (
    <>
      {loadingState && <LoadingAnimation />}
      <LoggedInContextProvider>
        <Component {...pageProps} />
      </LoggedInContextProvider>
    </>
  );
}

export default MyApp;
