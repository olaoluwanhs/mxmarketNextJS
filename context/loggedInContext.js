import { Children, Fragment, useEffect, useState } from "react";
import { createContext } from "react/cjs/react.development";

export let LoggedInContext = createContext();

export function LoggedInContextProvider({ children }) {
  //
  let [loggedInState, setLoggedInState] = useState({
    loggedIn: false,
    user: {},
  });

  //
  return (
    <Fragment>
      <LoggedInContext.Provider value={{ loggedInState, setLoggedInState }}>
        {children}
      </LoggedInContext.Provider>
    </Fragment>
  );
}
export async function loginFunction(obj) {
  // console.log("working");
  let res = await fetch(
    "http://localhost:4000/login/?" + new URLSearchParams(obj),
    {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  let result = await res.json();
  localStorage.setItem("mxLoggedInUser", JSON.stringify(result));
  // console.log(result);
  return result;
}
