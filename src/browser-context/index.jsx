import { createContext, useContext, useReducer } from "react";
import { browserReducer } from "../reducer/browserReducer";

const BrowserContext = createContext();

const initialState = {
    name: "",
}



const BrowserProvider = ({ children}) => {
    const [{name}, browserDispatch] = useReducer(browserReducer, initialState);

    return (
        <BrowserContext.Provider value={{ name, browserDispatch }}>
            {children}
        </BrowserContext.Provider>
    )
}

const useBrowser = () => useContext(BrowserContext);

export { BrowserProvider, useBrowser };