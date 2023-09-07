import "../assets/style/tasks.css";
import { useSnapshot } from "valtio";
import state from "../state";
import { useState, useRef } from "react";
import classnames from "classnames";
import { css } from "@emotion/css";
function AddTodo() {
  const snapshot = useSnapshot(state);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(""); // 输入框的值存储在状态中
  // add tasks输入框聚焦时添加类名
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const onKeyDownchange = (event) => {
    if (event.keyCode === 13 && event.target.value) {
      const newTodo = {
        type: snapshot.selectItem.id,
        id: snapshot.todo.length + 1,
        title: event.target.value,
        check: false,
      };
      state.todo.push(newTodo);
      setInputValue(event.target.value);
      setTimeout(() => {
        // inputRef.current.blur();
        setInputValue(""); // 清空输入框的值
      }, 0);
    }
  };

  return (
    <input
      type="text"
      ref={inputRef}
      value={inputValue}
      onChange={handleChange}
      onKeyDown={(e) => onKeyDownchange(e)}
      placeholder="📝 Create new task"
      className={classnames(
        "focus:outline-none focus:bg-white px-4 py-3.5 mb-3.5 rounded-lg bg-gray-200",
        {
          "drop-shadow-xl": isFocused,
        }
      )}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
function TaskItems() {
  const snapshot = useSnapshot(state);
  const [hoveredIndex, setIsHovered] = useState(null);
  const handleMouseEnter = (index) => {
    setIsHovered(index);
  };
  const handleMouseLeave = () => {
    setIsHovered(null);
  };
  const selectSide = snapshot.todo.filter((item) => {
    return snapshot.selectItem.id === item.type;
  });
  const onChangeCheck = (e, item) => {
    const todo = state.todo.find((t) => t.id === item.id);
    todo.check = e.target.checked;
    if (e.target.checked) {
      todo.type = 999; // type = 999 已完成勾选
    } else {
      todo.type = 888; // type = 888 重新创建未分组的todolist
    }
    state.todo;
  };

  return (
    <ul>
      {selectSide.reverse().map((item, index) => (
        <li
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          key={item.id}
          className={classnames(
            "relative px-4 py-3.5 mb-1.5 rounded-xl  flex items-center bg-white",
            { "line-through": item.check }
          )}
        >
          <input
            // className={
            //   ("w-6 h-6 mr-2 relative appearance-none bg-gray-300 rounded-md checked:bg-slate-900 before:absolute before:top-2/4 before:left-2/4 before:-translate-y-1/2 before:-translate-x-1/2  checked:text-white",
            //   classnames({ 'before:content-["*"]': item.check }))
            // }
            className="w-6 h-6 mr-2 relative "
            type="checkbox"
            checked={item.check}
            onChange={(e) => onChangeCheck(e, item, index)}
          />
          <div className="text-xl truncate w-auto">{item.title}</div>
          <div className={classnames({ hidden: index !== hoveredIndex })}>
            {snapshot.selectItem.icon}
          </div>
        </li>
      ))}
    </ul>
  );
}
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
          <AddTodo />
          <TaskItems />
        </div>
      </div>
    </>
  );
}
