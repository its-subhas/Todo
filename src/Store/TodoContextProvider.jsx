import TodoContext from "./TodoContext";
import { useReducer, useRef, useState } from "react";

const TodoContextProvider = ({ children }) => {
  let actionFunction = (currentValue, action) => {
    let todoTasks = currentValue;
    if (action.type === "ADD_TASK") {
      todoTasks = [
        { task: action.payload.task, date: action.payload.date },
        ...currentValue,
      ];
    } else if (action.type === "DEL_TASK") {
      todoTasks = currentValue.filter((items) => items !== action.payload);
    } else if (action.type === "EDIT_TASK") {
      todoTasks = currentValue.filter(
        (task) => task !== action.payload.oldTask,
      );
      todoTasks = [
        {
          task: action.payload.task,
          date: action.payload.date,
        },
        ...todoTasks,
      ];
    }
    localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
    return todoTasks;
  };

  const storedTodos = JSON.parse(localStorage.getItem("todoTasks")) || [];
  const inputTask = useRef();
  const inputDate = useRef();
  let [editValue, editMethod] = useState(null);
  let [todoValue, todoMethod] = useReducer(actionFunction, storedTodos);

  const addHandle = (event) => {
    event.preventDefault();
    const action = {
      type: "ADD_TASK",
      payload: {
        task: inputTask.current.value,
        date: inputDate.current.value,
      },
    };
    todoMethod(action);
    inputTask.current.value = "";
    inputDate.current.value = "";
  };

  const delHandle = (task) => {
    const action = {
      type: "DEL_TASK",
      payload: task,
    };
    todoMethod(action);
  };

  const editHandle = (task) => {
    inputTask.current.value = task.task;
    inputDate.current.value = task.date;
    editMethod(task);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      inputTask.current.focus();
      inputTask.current.setSelectionRange(
        inputTask.current.value.length,
        inputTask.current.value.length,
      );
    }, 300);
  };

  const editUpdateHandle = (event) => {
    event.preventDefault();
    const action = {
      type: "EDIT_TASK",
      payload: {
        oldTask: editValue,
        task: inputTask.current.value,
        date: inputDate.current.value,
      },
    };
    todoMethod(action);
    editMethod(null);
    inputTask.current.value = "";
    inputDate.current.value = "";
  };

  let todoItems = todoValue;

  return (
    <TodoContext.Provider
      value={{
        inputTask,
        inputDate,
        todoItems,
        addHandle,
        delHandle,
        editHandle,
        editValue,
        editUpdateHandle,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
export default TodoContextProvider;
