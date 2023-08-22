import { useSnapshot } from "valtio";
import state from "../state";
import { css } from "@emotion/css";
import { useState } from "react";
// import { useImmer } from "use-immer";
const left = css`
  background: #fff;
  width: 30%;
  border-radius: 8px;
  padding: 30px 20px;
  font-weight: 600;
  li {
    border-radius: 8px;
    padding: 8px 10px;
    cursor: pointer;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      background: #f8f8f8;
    }
  }
`;
const listIcon = css`
  margin-right: 10px;
`;
const listBadge = css`
  padding: 1px 2px;
  background: #edebee;
  color: #c7c5c5;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  text-align: center;
}
`;
const active = css`
  background: #f8f8f8;
`;

const itemLeft = css`
  width: 100%;
  display: flex;
  align-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
`;
const removeSelect = css`
  color: #ff5f5f;
  width: 62px;
`;
function AddTodo() {
  const snapshot = useSnapshot(state);
  const [isShow, setIsShow] = useState(true);
  function handleMoreClick() {
    setIsShow(!isShow);
  }
  function onKeyDownchange(e) {
    if (e.keyCode === 13) {
      const newCategory = {
        id: snapshot.category.length + 1,
        title: e.target.value,
        icon: "❓",
        badge: 0,
      };
      state.category.push(newCategory);
      // state.current = snapshot.category.length + 1;
      // state.selectItem = newCategory;
      setIsShow(true);
    }
  }
  return (
    <div>
      {isShow ? (
        <div onClick={handleMoreClick}>
          <span className={listIcon}>➕</span>
          <span>Creat</span>
        </div>
      ) : (
        <div>
          <input onKeyDown={(e) => onKeyDownchange(e)} />
        </div>
      )}
    </div>
  );
}
function SideItems() {
  const snapshot = useSnapshot(state);
  const listItems = snapshot.category.map((item, index) => (
    <li key={item.id} className={snapshot.current === index ? active : ""}>
      <div
        className={itemLeft}
        onClick={() => {
          state.current = index;
          state.selectItem = item;
        }}
      >
        <span className={listIcon}>{item.icon}</span>
        <span>{item.title}</span>
        <div className={listBadge}>{item.badge}</div>
      </div>
      <div
        className={removeSelect}
        onClick={() => {
          state.category.splice(index, 1);
        }}
      >
        <span className={listIcon}>🗑️</span>删除
      </div>
    </li>
  ));
  return <ul>{listItems}</ul>;
}
export default function Side() {
  return (
    <>
      <div className={left}>
        <SideItems />
        <AddTodo />
      </div>
    </>
  );
}
