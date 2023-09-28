import "./App.css";
import { EditList } from "./components/EditList";
import { EditTodo } from "./components/EditTodo";
import Side from "./components/Side";
import Tasks from "./components/Tasks";
function App() {
  return (
    <>
      <div className="board h-screen flex">
        <Side />
        <Tasks />
        <EditList />
        <EditTodo />
      </div>
    </>
  );
}

export default App;
