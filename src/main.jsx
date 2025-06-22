import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserProvider } from "./browser-context/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserProvider value={{}}>
      <App />
    </BrowserProvider>
  </StrictMode>
);
