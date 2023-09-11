import { useState, useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { valtioState, editState } from "../state";
import classnames from "classnames";
export function EditTask() {
  const snapshot = useSnapshot(valtioState);
  const snapshotEdit = useSnapshot(editState);
  const drawerRef = useRef(null);
  const [title, setTitle] = useState(undefined);
  const currentItem = snapshot.todo.find(
    (item) => item.id === snapshot.selectTodoListId
  );
  useEffect(() => {
    // 在useEffect中更新title状态
    setTitle(currentItem.title);
  }, [currentItem.title]);
  useEffect(() => {
    // 点击编辑抽屉面板之外
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        editState.showEdit = false;
      }
    };
    // 添加事件监听器
    document.addEventListener("mousedown", handleClickOutside);
    // 卸载组件时移除事件监听器
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleChange = (event) => {
    const changeItem = valtioState.todo.find(
      (item) => item.id === valtioState.selectTodoListId
    );
    changeItem.title = event.target.value;
    setTitle(event.target.value);
  };
  const onChangeCheck = (event) => {
    const changeItem = valtioState.todo.find(
      (item) => item.id === valtioState.selectTodoListId
    );
    changeItem.check = event.target.checked;
    if (event.target.checked) {
      changeItem.type = 999; // type = 999 已完成勾选
    } else {
      changeItem.type = 888; // type = 888 重新创建未分组的todolist
    }
  };
  return (
    <div
      ref={drawerRef}
      className={classnames(
        "w-96 rounded-3xl p-10 bg-stone-50 fixed right-2 bottom-2 top-2 text-sm z-10 transform transition-transform",
        {
          "translate-x-0": snapshotEdit.showEdit,
          "translate-x-full": !snapshotEdit.showEdit,
        }
      )}
    >
      <button
        onClick={() => (editState.showEdit = false)}
        className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-md"
      >
        ✖️
      </button>
      <div className="flex pt-6">
        <input
          className="w-6 h-6 mr-2 relative "
          type="checkbox"
          checked={currentItem.check}
          onChange={onChangeCheck}
        />
        <input
          className="focus:outline-none text-lg font-medium bg-stone-50"
          type="text"
          value={title || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
