import "./App.css";
import { css } from "@emotion/css";
import Side from "./components/Side.jsx";
import Tasks from "./components/Tasks.jsx";
const board = css`
  background: #ebecef;
  border-radius: 8px;
  display: flex;
  color: #333;
  margin: 20px;
  padding: 8px;
`;

function App() {
  return (
    <>
      <h1>Hello React</h1>
      <div className={board}>
        <Side />
        <Tasks />
      </div>
    </>
  );
}

export default App;
