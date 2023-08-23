import "./App.css";
import Side from "./components/Side.jsx";
import Tasks from "./components/Tasks.jsx";

function App() {
  return (
    <>
      <div className="board h-screen flex">
        <Side />
        <Tasks />
      </div>
    </>
  );
}

export default App;
