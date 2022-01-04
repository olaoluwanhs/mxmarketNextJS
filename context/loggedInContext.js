import { Children, Fragment, useState } from "react";
import { createContext } from "react/cjs/react.development";

export let loggedInContext = createContext();

export function LoggedInContextProvider({children}){
    // 
    let [loggedInState, setLoggedInState] = useState(true) 

    // 
    return(
        <Fragment>
            <loggedInContext.Provider value={{loggedInState, setLoggedInState}}>{children}</loggedInContext.Provider>
        </Fragment>
    )
}