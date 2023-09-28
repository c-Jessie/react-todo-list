import { useState, useRef } from "react";
import { useSnapshot } from "valtio";
import { valtioState } from "../state";
import classnames from "classnames";
// 具名导出
export function AddList() {
  const snapshot = useSnapshot(valtioState);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(""); // 输入框的值存储在状态中
  // add tasks输入框聚焦时添加类名
  const [isFocused, setIsFocused] = useState(false);
  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };
  const onChange = (event) => {
    setInputValue(event.target.value);
  };
  const onKeyDownchange = (event) => {
    if (event.keyCode === 13 && event.target.value) {
      const newTodo = {
        categoryId: snapshot.selectSide?.id,
        id: snapshot.todo.length + 1,
        title: event.target.value,
        check: false,
      };
      valtioState.todo.push(newTodo);
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
      onChange={onChange}
      onKeyDown={(e) => onKeyDownchange(e)}
      placeholder="📝 Create new task"
      className={classnames(
        "focus:outline-none focus:bg-white px-4 py-3.5 mb-3.5 rounded-lg bg-gray-200",
        {
          "drop-shadow-xl": isFocused,
          block: snapshot.selectSide?.id !== 0,
          hidden: snapshot.selectSide?.id === 0,
        }
      )}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
