import { useContext } from "react";
import "./Tasks.css";
import TodoContext from "../Store/TodoContext";
import NoTasks from "./NoTasks";
import { FaRegEdit } from "react-icons/fa";

function Tasks() {
  const { todoItems, delHandle, editHandle } = useContext(TodoContext);

  if (todoItems.length === 0) {
    return <NoTasks />;
  }

  return (
    <>
      <div className="tasksMainContainer">
        {todoItems.map((task, index) => {
          return (
            <div className="tasksContainer" key={index}>
              <p className="task">
                <FaRegEdit
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => editHandle(task)}
                />
                <br />
                {task.task}
              </p>
              <p className="date">{task.date}</p>
              <button
                type="button"
                className="btn btn-danger del"
                onClick={() => delHandle(task)}
              >
                DELETE
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Tasks;
