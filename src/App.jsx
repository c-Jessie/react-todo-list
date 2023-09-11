import "./App.css";
import { EditTask } from "./components/EditTask";
import Side from "./components/Side";
import Tasks from "./components/Tasks";
function App() {
  return (
    <>
      <div className="board h-screen flex">
        <Side />
        <Tasks />
        <EditTask />
      </div>
    </>
  );
}

export default App;
