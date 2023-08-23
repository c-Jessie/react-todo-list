import "../assets/style/tasks.css";
import { useSnapshot } from "valtio";
import state from "../state";
import { useState, useRef } from "react";
import classnames from "classnames";

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
      ref={inputRef}
      value={inputValue}
      onChange={handleChange}
      onKeyDown={(e) => onKeyDownchange(e)}
      placeholder="📝 Create new task"
      className={classnames("tasksInput", { "drop-shadow-xl": isFocused })}
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
  const onChangeCheck = (e, item, index) => {
    const todo = state.todo.find((t) => t.id === item.id);
    todo.check = e.target.checked;
    if (e.target.checked) {
      todo.type = 999; // type = 999 已完成勾选
    } else {
      todo.type = 888; // type = 888 重新创建未分组的todolist
    }
    state.todo;
    console.log(state.todo);
  };

  return (
    <ul>
      {selectSide.reverse().map((item, index) => (
        <li
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          key={item.id}
          className={classnames("todoList", "relative", "flex", "items-center")}
        >
          <input
            className="listCheck relative appearance-none "
            type="checkbox"
            checked={item.check}
            onChange={(e) => onChangeCheck(e, item, index)}
          />
          <div className="listTitle truncate w-auto">{item.title}</div>
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
  return (
    <>
      <div className="right">
        <div className="content relative flex flex-col">
          <div className="selectTitle sticky">
            <div className="text relative">{snapshot.selectItem.title}</div>
          </div>
          <AddTodo />
          <TaskItems />
        </div>
      </div>
    </>
  );
}
