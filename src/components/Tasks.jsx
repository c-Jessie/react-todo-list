import { useSnapshot } from "valtio";
import state from "../state";
import { AddTodoList } from "./AddTodoList";
import { TaskItems } from "./TaskItems";

export default function ListTodo() {
  const snapshot = useSnapshot(state);
  const boxShadow = {
    boxShadow: state.selectItem.bgColor,
    transform: "rotate(-8deg) translateY(-175%) translateZ(0px)",
  };
  const bottomShadow = {
    inset: " auto 5% 0px auto",
    boxShadow: "rgb(0, 143, 253) 0px -280px 220px",
    transform: "rotate(-6deg) translateY(200%) translateZ(0px)",
  };
  return (
    <>
      <div className="flex flex-col w-full h-full overflow-auto pl-80 bg-gray-100">
        <div
          className={"fixed -top-40 left-80 w-3/4 h-44 opacity-30"}
          style={boxShadow}
        ></div>
        <div
          className="fixed -bottom-40 left-1/4 w-3/4 h-44 opacity-20"
          style={bottomShadow}
        ></div>

        <div className="max-w-screen-sm my-0 mx-auto min-h-full w-full relative flex flex-col">
          <div className="pt-12 pb-7 sticky top-0 z-10 backdrop-blur">
            <div className="text-2xl font-medium relative">
              {snapshot.selectItem.title}
            </div>
          </div>
          <AddTodoList />
          <TaskItems />
        </div>
      </div>
    </>
  );
}
