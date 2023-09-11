import { proxy, subscribe } from "valtio";
import { category, todo } from "./api/data";

// 1 创建一个状态对象并初始化
const valtioState = proxy({
  current: 0,
  selectSide: {
    id: 999,
    title: "已完成",
    icon: "✅",
    badge: 0,
    bgColor: "rgb(54 209 68) 20px 200px 240px",
  },
  selectTodoListId: 0,
  category,
  todo,
});
const storedData = localStorage.getItem("myValtioData");
if (storedData) {
  // 2 判断是否需要初始化
  const parsedData = JSON.parse(storedData);
  valtioState.current = parsedData.current;
  valtioState.selectSide = parsedData.selectSide;
  valtioState.selectTodoListId = parsedData.selectTodoListId;
  valtioState.category = parsedData.category;
  valtioState.todo = parsedData.todo;
}
// 3 订阅Valtio状态更改并进行更改
subscribe(valtioState, () => {
  localStorage.setItem("myValtioData", JSON.stringify(valtioState));
});
const editState = proxy({
  showEdit: false,
});
export { valtioState, editState };
