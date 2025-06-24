import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
export const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");
    setTodoList(storedTodoList ? JSON.parse(storedTodoList) : []);
  }, []);

  const handleTodoInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleTodoEnterKey = (e) => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      const updatedTodoList = [
        ...todoList,
        { _id: uuid(), todo, isCompleted: false },
      ];
      setTodoList(updatedTodoList);
      setTodo("");
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    }
  };

  const handleTodoCheckChange = (todoId) => {
    const updatedTodoList = todoList.map((todo) =>
      todo._id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodoList(updatedTodoList);
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
  };

  const handleDeleteClick = (todoId) => {
    const todoToDelete = todoList.find((todo) => todo._id === todoId);

    if (todoToDelete && todoToDelete.isCompleted) {
      const updatedTodoList = todoList.filter((todo) => todo._id !== todoId);
      setTodoList(updatedTodoList);
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    } else {
      alert("Only completed tasks can be deleted.");
    }
  };

  console.log("toolist -", todoList);

  return (
    <div className="absolute bg-gray-200 right-5 bottom-28 w-80 h-auto p-5 rounded-2xl shadow-lg">
      <input
        value={todo}
        placeholder="Add a new task and press Enter"
        onChange={handleTodoInputChange}
        onKeyDown={handleTodoEnterKey}
        className="bg-transparent border-b-1 border-b-gray-500 focus:outline-none text-black p-2 w-full text-center"
      />
      <div className="mt-4 max-h-40 overflow-y-auto">
        {todoList &&
          todoList.map(({ _id, todo, isCompleted }) => {
            return (
              <div
                key={_id}
                className="my-2 bg-gray-400 p-2 rounded-lg flex justify-between items-center"
              >
                <label
                  className={
                    isCompleted ? "line-through text-gray-200" : "text-black"
                  }
                >
                  <input
                    type="checkbox"
                    className="mr-2 cursor-pointer"
                    checked={isCompleted}
                    onChange={() => handleTodoCheckChange(_id)}
                  />
                  {todo}
                </label>
                <button onClick={() => handleDeleteClick(_id)}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
