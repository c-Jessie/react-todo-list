import { useState, useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { valtioState, editState } from "../state";
import classnames from "classnames";
export function EditList() {
  const snapshot = useSnapshot(valtioState);
  const snapshotEdit = useSnapshot(editState);
  const drawerRef = useRef(null);
  const [title, setTitle] = useState("");
  const currentItem = snapshot.todo.find(
    (item) => item.id === snapshot.selectTodoListId
  );
  useEffect(() => {
    if (currentItem) {
      // 在useEffect中更新title状态
      setTitle(currentItem.title);
    }
  }, []);
  useEffect(() => {
    // 点击编辑抽屉面板之外
    const onClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        editState.showEditList = false;
      }
    };
    // 添加事件监听器
    document.addEventListener("mousedown", onClickOutside);
    // 卸载组件时移除事件监听器
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);
  const onChange = (event) => {
    const changeItem = valtioState.todo.find(
      (item) => item.id === valtioState.selectTodoListId
    );
    changeItem.title = event.target.value;
    setTitle(event.target.value);
  };
  const onCheckChange = (event) => {
    const changeItem = valtioState.todo.find(
      (item) => item.id === valtioState.selectTodoListId
    );
    changeItem.check = event.target.checked;
  };
  const onRemoveList = () => {
    valtioState.todo = valtioState.todo.filter(
      (item) => item.id !== valtioState.selectTodoListId
    );
    editState.showEditList = false;
  };
  return (
    <div
      ref={drawerRef}
      className={classnames(
        "w-1/5 rounded-3xl p-10 text-center bg-white fixed right-2 bottom-2 top-2 text-sm z-10 ",
        {
          hidden: !snapshotEdit.showEditList,
          block: snapshotEdit.showEditList,
        }
      )}
    >
      <div className="h-full relative">
        <button
          onClick={() => (editState.showEditList = false)}
          className="absolute -top-5 -right-5 p-2 hover:bg-gray-100 rounded-lg"
        >
          ✕
        </button>
        <div>
          <div className="flex pt-6">
            <input
              className="w-6 h-6 mr-2 relative "
              type="checkbox"
              checked={currentItem ? currentItem.check : false}
              onChange={onCheckChange}
            />
            <input
              className="focus:outline-none text-lg font-medium bg-stone-50"
              type="text"
              value={currentItem ? currentItem.title : title}
              onChange={onChange}
            />
          </div>
          <button
            onClick={onRemoveList}
            className="absolute bottom-0 inset-x-1 w-full p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
