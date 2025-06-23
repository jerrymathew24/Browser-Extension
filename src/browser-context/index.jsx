import { createContext, useContext, useReducer } from "react";
import { browserReducer } from "../reducer/browserReducer";

const BrowserContext = createContext();

const initialState = {
  name: "",
  time: "",
  message: "",
  task: null,
};

const BrowserProvider = ({ children }) => {
  const [{ name, time, message, task }, browserDispatch] = useReducer(
    browserReducer,
    initialState
  );

  return (
    <BrowserContext.Provider
      value={{ name, time, message, task, browserDispatch }}
    >
      {children}
    </BrowserContext.Provider>
  );
};

const useBrowser = () => useContext(BrowserContext);

export { BrowserProvider, useBrowser };
