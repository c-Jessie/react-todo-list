
import { proxy } from "valtio";
import { category,todo } from "./api/data";
// 创建一个状态对象
 const state = proxy({
    current: 0,
    selectItem: {
      id: 0,
      title: '水果',
      icon: '🍉',
      badge: 1,
   },
   category,
   todo
  });

export default state