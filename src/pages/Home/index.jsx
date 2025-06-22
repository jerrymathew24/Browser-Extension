import { useBrowser } from "../../browser-context/index.jsx";

export const Home = () => {
  const { name, browserDispatch } = useBrowser();

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleNameChange = (e) => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      browserDispatch({
        type: "SET_NAME",
        payload: e.target.value,
      });
      localStorage.setItem( "name", e.target.value );
    }
  };

  return (
    <div>
      <div className="h-full w-full flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl text-gray-100 mt-40">Browser Extension</h1>
        <h2 className="text-4xl m-5 text-gray-100">Hello, what's your name?</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            onKeyDown={handleNameChange}
            type="text"
            className="bg-transparent border-b-2 border-white focus:outline-none text-white placeholder-gray-300 p-2 w-[450px] text-center"
          />
        </form>
      </div>
    </div>
  );
};
