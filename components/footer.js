import { Fragment } from "react/cjs/react.production.min";
import Link from "next/link";

// Footer
export default function Footer() {
  //
  return (
    <Fragment>
      <footer>
        <div className="patternBg mt-4">
          <div className="footer-overlay d-flex flex-column align-items-center justify-content-evenly py-4">
            <ul className="d-flex flex-column align-items-center justify-content-between nav-list">
              <li>
                <Link href="/">
                  <span className="nav-links pointer text-light">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/categories">
                  <span className="nav-links pointer text-light">
                    Categories
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="nav-links pointer text-light">Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/delivery">
                  <span className="nav-links pointer text-light">
                    Mx Delivery
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/FAQ">
                  <span className="nav-links pointer text-light">FAQ</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-dark d-flex align-items-center justify-content-center">
          <p className="text-light d-flex align-items-center flex-column">
            Copyright &copy; 2022 MX market | Powered by{" "}
            <a href="https:cgiinc.site" className="plain-link">
              CGI INC
            </a>
          </p>
        </div>
      </footer>
    </Fragment>
  );
}
