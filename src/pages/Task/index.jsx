import { useEffect, useRef, useState } from "react";
import { useBrowser } from "../../browser-context";

export const Task = () => {
  const { name, time, message, task, browserDispatch } = useBrowser();
  const lastTimeRef = useRef("");

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const getTime = setInterval(() => {
      const today = new Date();
      const hours = today.getHours();
      const minutes = today.getMinutes();

      const hour = hours < 10 ? `0${hours}` : hours;
      const minute = minutes < 10 ? `0${minutes}` : minutes;

      const currentTime = `${hour}:${minute}`;

      if (currentTime !== lastTimeRef.current) {
        lastTimeRef.current = currentTime;

        browserDispatch({ type: "SET_TIME", payload: currentTime });
        browserDispatch({ type: "SET_MESSAGE", payload: hours });
      }
    }, 1000);

    return () => clearInterval(getTime);
  }, []);

  useEffect(() => {
    const storedTask = localStorage.getItem("task");
    browserDispatch({
      type: "SET_TASK",
      payload: storedTask,
    });
  }, []);

  useEffect(() => {
    const checkedTask = localStorage.getItem("checkedTask");
    checkedTask === "true" ? setIsChecked(true) : setIsChecked(false);
  }, []);

  const handleTaskChange = (e) => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      browserDispatch({
        type: "SET_TASK",
        payload: e.target.value,
      });
      localStorage.setItem("task", e.target.value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleTaskCompleteChange = (e) => {
    if (e.target.checked) {
      setIsChecked((isChecked) => !isChecked);
    } else {
      setIsChecked((isChecked) => !isChecked);
    }
    localStorage.setItem("checkedTask", !isChecked);
  };

  const handleCloseClick = () => {
    browserDispatch({
      type: "REMOVE_TASK"
    })
    localStorage.removeItem("task")
    localStorage.removeItem("checkedTask");
    setIsChecked(false);
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-white">
      <span className="text-8xl text-gray-100">{time}</span>
      <h1 className="text-4xl m-5 text-gray-100">
        {message}, {name}!
      </h1>

      {!task ? (
        <>
          <h2 className="text-4xl m-5 text-gray-100">
            What is your main focus for today?
          </h2>
          <form onSubmit={handleFormSubmit}>
            <input
              onKeyDown={handleTaskChange}
              type="text"
              className="bg-transparent border-b-2 border-white focus:outline-none text-white placeholder-gray-300 p-2 w-[700px] text-center"
            />
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl m-5 text-gray-100">Today's Focus</h2>
          <label className="flex gap-2">
            <input
              type="checkbox"
              className="gap-2 cursor-pointer"
              onChange={handleTaskCompleteChange}
              checked={isChecked}
            />
            <span className={isChecked ? "line-through text-gray-200" : ""}>
              {task}
            </span>
          </label>
          <button onClick={handleCloseClick}>
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
