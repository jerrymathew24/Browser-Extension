import { useEffect } from "react";
import { useBrowser } from "../../browser-context";

export const Task = () => {
  const { name, time, message, browserDispatch } = useBrowser();

  useEffect(() => {
    getTimeOfDay();
  }, [time]);

  const getTimeOfDay = () => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();

    const hour = hours < 10 ? `0${hours}` : hours;
    const minute = minutes < 10 ? `0${minutes}` : minutes;

    const currentTime = `${hour}:${minute}`;
    setTimeout(getTimeOfDay, 1000);

    browserDispatch({
      type: "SET_TIME",
      payload: currentTime,
    });
    browserDispatch({
      type: "SET_MESSAGE",
      payload: hours,
    });
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-white">
      <span className="text-8xl text-gray-100">{time}</span>
      <h1 className="text-4xl m-5 text-gray-100">
        {message}, {name}!
      </h1>
    </div>
  );
};
