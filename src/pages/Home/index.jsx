import { images } from "../../assets/images/index.js";
import { useBrowser } from "../../browser-context/index.jsx";

export const Home = () => {

  const { name, browserDispatch } = useBrowser();
  console.log(name,"--namee---");
  

  const randomImage = images[Math.floor(Math.random() * images.length)];

  const handleFormSubmit = (e) => {
    e.preventDefault()
  }

  const handleNameChange = (e) => {
    if(e.key === "Enter" && e.target.value.length > 0){
      browserDispatch({
        type: "SET_NAME",
        payload: e.target.value
      })
    }
  }


  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${randomImage})` }}
    >
      <div className="h-full w-full flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl text-gray-100">Browser Extension</h1>
        <h2 className="text-4xl m-5 text-gray-100">Hello, what's your name?</h2>
        <form onSubmit={ handleFormSubmit }>
          <input
            onKeyDown={ handleNameChange }
            type="text"
            className="p-2 rounded text-gray-100"
            placeholder="Enter your name"
          />
        </form>
      </div>
    </div>
  );
};
