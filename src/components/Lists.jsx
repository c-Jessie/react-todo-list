import { useState } from "react";
import { useSnapshot } from "valtio";
import { valtioState, editState } from "../state";
import classnames from "classnames";
// 具名导出
export function Lists() {
  const snapshot = useSnapshot(valtioState);
  const [hoveredIndex, setIsHovered] = useState(null);
  const onMouseEnter = (index) => {
    setIsHovered(index);
  };
  const onMouseLeave = () => {
    setIsHovered(null);
  };
  const selectSide = snapshot.todo.filter((item) => {
    if (!item.check) return item.categoryId === snapshot.selectSide?.id;
    if (item.check) return snapshot.selectSide?.id === 0;
  });
  const onCheckChange = (e, item) => {
    const todo = valtioState.todo.find((t) => t.id === item.id);
    todo.check = e.target.checked;
  };
  const onClick = (e, item, index) => {
    valtioState.selectTodoListId = item.id;
    editState.showEditList = true;
  };
  return (
    <ul>
      {selectSide.reverse().map((item, index) => (
        <li
          key={item.id}
          onClick={(e) => {
            onClick(e, item, index);
          }}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={onMouseLeave}
          className={classnames(
            "relative px-4 py-3.5 mb-1.5 rounded-xl  flex items-center bg-white",
            { "line-through": item.check }
          )}
        >
          <input
            className="w-6 h-6 mr-2 relative "
            type="checkbox"
            checked={item.check}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => onCheckChange(e, item, index)}
          />
          <div className="text-xl truncate w-auto">{item.title}</div>
          <div className={classnames({ hidden: index !== hoveredIndex })}>
            {snapshot.selectSide.icon}
          </div>
        </li>
      ))}
    </ul>
  );
}
