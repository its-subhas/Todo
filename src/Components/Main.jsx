import { useContext } from "react";
import "./Main.css";
import TodoContext from "../Store/TodoContext";
const Main = () => {
  const { inputTask, inputDate, addHandle, editValue, editUpdateHandle } =
    useContext(TodoContext);

  const submitHandler = (event) => {
    if (editValue === null) {
      addHandle(event);
    } else {
      editUpdateHandle(event);
    }
  };

  return (
    <>
      <form className="main" onSubmit={submitHandler}>
        <input
          type="text"
          className="inputContainer"
          placeholder="Add Todo"
          required
          ref={inputTask}
        />
        <input
          type="date"
          className="inputDateContainer"
          required
          ref={inputDate}
        />
        <button type="submit" className="btn btn-success addContainer">
          {editValue === null ? "ADD" : "UPDATE"}
        </button>
      </form>
    </>
  );
};
export default Main;
