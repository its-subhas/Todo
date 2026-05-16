import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Tasks from "./Components/Tasks";
import TodoContextProvider from "./Store/TodoContextProvider";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <TodoContextProvider>
        <div className="mainContainer">
          <Header />
          <Main />
          <Tasks />
        </div>
      </TodoContextProvider>
      <Analytics />
    </>
  );
}

export default App;
