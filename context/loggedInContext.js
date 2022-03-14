import { Children, Fragment, useState } from "react";
import { createContext } from "react/cjs/react.development";

export let LoggedInContext = createContext();

export function LoggedInContextProvider({ children }) {
  //
  let [loggedInState, setLoggedInState] = useState({
    loggedIn: false,
    userId: 0,
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
  // console.log("working")
  let res = await fetch("http://localhost:4000/?" + new URLSearchParams(obj), {
    method: "get",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  let result = await res.json();
  console.log(result);
  return result;
}
