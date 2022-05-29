import "../bootstrap-5.1.3-dist/bootstrap-5.1.3-dist/css/bootstrap.min.css";
import { LoggedInContextProvider } from "../context/loggedInContext";
import "../styles/style.css";
import "../fontawesome/css/all.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <LoggedInContextProvider>
      <Component {...pageProps} />
    </LoggedInContextProvider>
  );
}

export default MyApp;
