import { useState, useRef } from "react";
import { useSnapshot } from "valtio";
import { valtioState } from "../state";
// 默认导出
export default function AddTodo() {
  const snapshot = useSnapshot(valtioState);
  const [inputVisible, setInputVisible] = useState(false);
  const inputRef = useRef(null);
  const onToggleInput = () => {
    setInputVisible(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  const onInputBlur = (event) => {
    if (!event.target.value) {
      setInputVisible(false);
    }
  };

  const onInputKeyUp = (event) => {
    if (event.key === "Enter") {
      const newCategory = {
        id: snapshot.category.length + 1,
        title: event.target.value,
        icon: "🆕",
        badge: 0,
        bgColor: "rgb(0, 143, 253) 20px 200px 240px",
      };
      valtioState.category.push(newCategory);
      setInputVisible(false);
    }
  };
  return (
    <div className="px-5 py-2 w-full text-lg">
      {!inputVisible ? (
        <button
          onClick={onToggleInput}
          className="w-full flex items-center mr-2.5 text-gray-500"
        >
          <span className="pr-4 addIcon">➕</span>
          <span>Create</span>
        </button>
      ) : (
        <div className="flex items-center">
          <span className="mr-2.5">🆕</span>
          <input
            type="text"
            className="focus:outline-none font-medium text-xl"
            ref={inputRef}
            placeholder="List name"
            onBlur={onInputBlur}
            onKeyUp={onInputKeyUp}
          />
        </div>
      )}
    </div>
  );
}
