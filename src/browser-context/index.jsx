import { createContext, useContext, useReducer } from "react";
import { browserReducer } from "../reducer/browserReducer";

const BrowserContext = createContext();

const initialState = {
  name: "",
  time: "",
  message: "",

};

const BrowserProvider = ({ children }) => {
  const [{ name, time, message }, browserDispatch] = useReducer(
    browserReducer,
    initialState
  );

  return (
    <BrowserContext.Provider value={{ name, time, message, browserDispatch }}>
      {children}
    </BrowserContext.Provider>
  );
};

const useBrowser = () => useContext(BrowserContext);

export { BrowserProvider, useBrowser };
