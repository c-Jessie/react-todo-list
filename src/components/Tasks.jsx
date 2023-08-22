import { useSnapshot } from "valtio";
import state from "../state";
import { css } from "@emotion/css";
import { useState } from "react";
const right = css`
  width: 70%;
  margin-left: 50px;
  padding: 30px 20px;
  li {
    display: flex;
    background: #fff;
    margin-bottom: 5px;
    padding: 10px 20px;
    border-radius: 8px;
  }
`;
const selectTitle = css`
  font-size: 20px;
  margin-bottom: 20px;
`;
const done = css`
  text-decoration: line-through;
`;
const listTitle = css`
  font-size: 14px;
`;
const listCheck = css`
  width: 16px;
  margin-right: 10px;
`;
const listIcon = css`
  margin-right: 10px;
`;
function AddTodo() {
  const snapshot = useSnapshot(state);
  const [isShow, setIsShow] = useState(true);
  function handleMoreClick() {
    setIsShow(!isShow);
  }
  function onKeyDownchange(e) {
    if (e.keyCode === 13) {
      const newTodo = {
        type: snapshot.selectItem.id,
        id: snapshot.todo.length + 1,
        title: e.target.value,
        check: false,
      };
      state.todo.push(newTodo);
      setIsShow(true);
    }
  }
  return (
    <div>
      {isShow ? (
        <div onClick={handleMoreClick}>
          <span className={listIcon}>➕</span>
          Creat
        </div>
      ) : (
        <div>
          <input onKeyDown={(e) => onKeyDownchange(e)} />
        </div>
      )}
    </div>
  );
}
function TaskItems() {
  const snapshot = useSnapshot(state);
  function onChangeCheck(e, item) {
    const todo = state.todo.find((t) => t.id === item.id);
    todo.check = e.target.checked;
  }
  const selectSide = snapshot.todo.filter((item) => {
    return snapshot.selectItem.id === item.type;
  });
  const listItems = selectSide.map((item, index) => (
    <li key={item.id} className={item.check ? done : ""}>
      <input
        className={listCheck}
        type="checkbox"
        checked={item.check}
        onChange={(e) => onChangeCheck(e, item)}
      />
      <div className={listTitle}>{item.title}</div>
    </li>
  ));
  return <ul>{listItems}</ul>;
}
export default function ListTodo() {
  const snapshot = useSnapshot(state);
  return (
    <>
      <div className={right}>
        <div className={selectTitle}>{snapshot.selectItem.title}</div>
        <AddTodo />
        <TaskItems />
      </div>
    </>
  );
}
