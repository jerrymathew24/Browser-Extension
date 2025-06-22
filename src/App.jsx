import "./App.css";
import { useBrowser } from "./browser-context";
import { Home } from "./pages/Home";
import { Task } from "./pages/Task";
import { images } from "./assets/images";
import { useEffect } from "react";

const randomImage = images[Math.floor(Math.random() * images.length)];

function App() {
  const { name, browserDispatch } = useBrowser();

  useEffect(() => {
    const userName = localStorage.getItem("name");
    browserDispatch({
      type: "SET_NAME",
      payload: userName,
    });
  }, []);

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${randomImage})` }}
    >
      {name ? <Task /> : <Home />}
    </div>
  );
}

export default App;
