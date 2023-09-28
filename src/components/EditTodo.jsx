import { useState, useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { valtioState, editState } from "../state";
import classnames from "classnames";
export function EditTodo() {
  const snapshot = useSnapshot(valtioState);
  const snapshotEdit = useSnapshot(editState);
  const drawerRef = useRef(null);
  const [title, setTitle] = useState("");
  const currentItem = valtioState.selectSide;
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
        editState.showEditTodo = false;
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
    currentItem.title = event.target.value;
    valtioState.category.map((item) => {
      if (item.id === valtioState.current) {
        item.title = event.target.value;
      }
    });
    setTitle(event.target.value);
  };
  const onRemoveList = () => {
    if (valtioState.current === 0) {
      valtioState.todo = valtioState.todo.filter((item) => !item.check);
    } else {
      valtioState.todo = valtioState.todo.filter(
        (item) => item.categoryId !== valtioState.current
      );
    }
    editState.showEditTodo = false;
  };
  const onRemoveTodo = () => {
    valtioState.category = valtioState.category.filter((item) => {
      if (item.id !== valtioState.current) return item;
    });
    valtioState.current = 0;
    valtioState.selectTodoListId = null;
    valtioState.selectSide = valtioState.category[0];
    editState.showEditTodo = false;
  };
  return (
    <div
      ref={drawerRef}
      className={classnames(
        "w-1/5 rounded-3xl p-10 text-center bg-stone-50 fixed right-2 bottom-2 top-2 text-sm z-10 ",
        {
          hidden: !snapshotEdit.showEditTodo,
          block: snapshotEdit.showEditTodo,
        }
      )}
    >
      <div className="h-full relative">
        <button
          onClick={() => (editState.showEditTodo = false)}
          className="absolute -top-5 -right-5 p-2 hover:bg-gray-100 rounded-lg"
        >
          ✖️
        </button>
        <div>
          <div className="pt-6 mb-4 flex items-center">
            <div>标题：</div>
            <input
              className="focus:outline-none text-lg font-medium bg-stone-50"
              type="text"
              value={currentItem ? currentItem.title : title}
              onChange={onChange}
            />
          </div>
          <button
            onClick={onRemoveList}
            className="bottom-0 inset-x-1 w-full p-2 mb-4 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg"
          >
            🔙 Remove all tasks
          </button>
          <button
            onClick={onRemoveTodo}
            className={classnames(
              "bottom-0 inset-x-1 w-full p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg",
              { hidden: valtioState.current === 0 }
            )}
          >
            🚮 Delete
          </button>
        </div>
      </div>
    </div>
  );
}
