import "../assets/style/side.css";
import { useSnapshot } from "valtio";
import state from "../state";
import { useState, useRef } from "react";
import classNames from "classnames";

function SideItems() {
  const [showRemove, setShowRemove] = useState(null);
  const onMouseEnter = (index) => {
    setShowRemove(index);
  };
  const onMouseLeaves = () => {
    setShowRemove(null);
  };
  const snapshot = useSnapshot(state);
  const listItems = snapshot.category.map((item, index) => (
    <li
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeaves}
      key={item.id}
      className={classNames("flex justify-between items-stretch mb-2.5", {
        active: snapshot.current === index,
      })}
    >
      <div
        className="w-full flex justify-between"
        onClick={() => {
          state.current = index;
          state.selectItem = item;
        }}
      >
        <div>
          <span className="mr-2.5">{item.icon}</span>
          <span className="truncate w-52">{item.title}</span>
        </div>
        <div className="flex">
          {/* <div className="listBadge">{item.badge > 99 ? "99+" : item.badge}</div> */}
          {item.id !== 888 && item.id !== 999 ? (
            <div
              className={classNames({ hidden: index !== showRemove })}
              onClick={() => {
                state.category.splice(index, 1);
              }}
            >
              删除
            </div>
          ) : (
            ""
          )}
          <div className="listBadge">
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
      };
      state.category.push(newCategory);
      setInputVisible(false);
    }
  };
  return (
    <div className="addSide">
      {!inputVisible ? (
        <button onClick={handleToggleInput} className="addBtn flex">
          <span className="mr-2.5 addIcon">➕</span>
          <span>Create</span>
        </button>
      ) : (
        <div className="pl-4 ">
          <span className="text-lg">🆕</span>
          <input
            type="text"
            className="pl-4 todoInput"
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
      <div className="left">
        <SideItems />
        <AddTodo />
      </div>
    </>
  );
}
