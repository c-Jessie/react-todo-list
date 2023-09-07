import { useState } from "react";
import { useSnapshot } from "valtio";
import state from "../state";
import classnames from "classnames";
// 具名导出
export function TaskItems() {
  const snapshot = useSnapshot(state);
  const [hoveredIndex, setIsHovered] = useState(null);
  const handleMouseEnter = (index) => {
    setIsHovered(index);
  };
  const handleMouseLeave = () => {
    setIsHovered(null);
  };
  const selectSide = snapshot.todo.filter((item) => {
    return snapshot.selectItem.id === item.type;
  });
  const onChangeCheck = (e, item) => {
    const todo = state.todo.find((t) => t.id === item.id);
    todo.check = e.target.checked;
    if (e.target.checked) {
      todo.type = 999; // type = 999 已完成勾选
    } else {
      todo.type = 888; // type = 888 重新创建未分组的todolist
    }
    state.todo;
  };

  return (
    <ul>
      {selectSide.reverse().map((item, index) => (
        <li
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          key={item.id}
          className={classnames(
            "relative px-4 py-3.5 mb-1.5 rounded-xl  flex items-center bg-white",
            { "line-through": item.check }
          )}
        >
          <input
            // className={
            //   ("w-6 h-6 mr-2 relative appearance-none bg-gray-300 rounded-md checked:bg-slate-900 before:absolute before:top-2/4 before:left-2/4 before:-translate-y-1/2 before:-translate-x-1/2  checked:text-white",
            //   classnames({ 'before:content-["*"]': item.check }))
            // }
            className="w-6 h-6 mr-2 relative "
            type="checkbox"
            checked={item.check}
            onChange={(e) => onChangeCheck(e, item, index)}
          />
          <div className="text-xl truncate w-auto">{item.title}</div>
          <div className={classnames({ hidden: index !== hoveredIndex })}>
            {snapshot.selectItem.icon}
          </div>
        </li>
      ))}
    </ul>
  );
}
