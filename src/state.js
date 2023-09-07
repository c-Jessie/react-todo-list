import { proxy } from "valtio";
import { category, todo } from "./api/data";
// 创建一个状态对象
const state = proxy({
  current: 0,
  selectItem: {
    id: 999,
    title: "已完成",
    icon: "✅",
    badge: 0,
    bgColor: "rgb(54 209 68) 20px 200px 240px",
  },
  category,
  todo,
});

export default state;
