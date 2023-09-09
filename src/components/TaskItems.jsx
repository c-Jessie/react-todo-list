import { useState } from "react";
import { useSnapshot } from "valtio";
import valtioState from "../state";
import classnames from "classnames";
// 具名导出
export function TaskItems() {
  const snapshot = useSnapshot(valtioState);
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
    const todo = valtioState.todo.find((t) => t.id === item.id);
    todo.check = e.target.checked;
    if (e.target.checked) {
      todo.type = 999; // type = 999 已完成勾选
    } else {
      todo.type = 888; // type = 888 重新创建未分组的todolist
    }
    valtioState.todo;
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
