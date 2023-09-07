import { useSnapshot } from "valtio";
import state from "../state";
import { useState, useRef } from "react";
import classNames from "classnames";
function SideItems() {
  const snapshot = useSnapshot(state);
  const [showRemove, setShowRemove] = useState(null);
  const onMouseEnter = (index) => {
    setShowRemove(index);
  };
  const onMouseLeaves = () => {
    setShowRemove(null);
  };
  const listItems = snapshot.category.map((item, index) => (
    <li
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeaves}
      key={item.id}
      className={classNames(
        "flex justify-between items-stretch mb-2.5 px-5 py-2 font-medium rounded-lg cursor-pointer hover:bg-slate-100",
        {
          "bg-slate-100": snapshot.current === index,
        }
      )}
    >
      <div
        className="w-full flex justify-between text-lg"
        onClick={() => {
          state.current = index;
          state.selectItem = item;
        }}
      >
        <div>
          <span className="mr-2.5">{item.icon}</span>
          <span className="truncate w-52">{item.title}</span>
        </div>
        <div className="flex items-center text-sm">
          {/* <div className="listBadge">{item.badge > 99 ? "99+" : item.badge}</div> */}
          {item.id !== 888 && item.id !== 999 ? (
            <div
              className={classNames("font-normal", {
                hidden: index !== showRemove,
              })}
              onClick={() => {
                state.category.splice(index, 1);
              }}
            >
              删除
            </div>
          ) : (
            ""
          )}
          <div className="px-1.5 py-0.5 ml-2.5 text-gray-500 font-semibold rounded-md bg-gray-200">
            {
              snapshot.todo.filter((todo) => {
                return todo.type === item.id;
              }).length
            }
          </div>
        </div>
      </div>
    </li>
  ));
  return <ul>{listItems}</ul>;
}

function AddTodo() {
  const snapshot = useSnapshot(state);
  const [inputVisible, setInputVisible] = useState(false);
  const inputRef = useRef(null);
  const handleToggleInput = () => {
    setInputVisible(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  const handleInputBlur = (event) => {
    if (!event.target.value) {
      setInputVisible(false);
    }
  };

  const handleInputKeyUp = (event) => {
    if (event.key === "Enter") {
      const newCategory = {
        id: snapshot.category.length + 1,
        title: event.target.value,
        icon: "🆕",
        badge: 0,
        bgColor: "rgb(0, 143, 253) 20px 200px 240px",
      };
      state.category.push(newCategory);
      setInputVisible(false);
    }
  };
  return (
    <div className="px-5 py-2 w-full text-lg">
      {!inputVisible ? (
        <button
          onClick={handleToggleInput}
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
            className="focus:outline-none text-lg font-medium "
            ref={inputRef}
            placeholder="List name"
            onBlur={handleInputBlur}
            onKeyUp={handleInputKeyUp}
          />
        </div>
      )}
    </div>
  );
}

export default function Side() {
  return (
    <>
      <div className="w-96 rounded-3xl p-10 bg-stone-50  fixed left-2  bottom-2 top-2 text-sm z-10">
        <SideItems />
        <AddTodo />
      </div>
    </>
  );
}
