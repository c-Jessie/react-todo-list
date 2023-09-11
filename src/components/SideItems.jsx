import { useState } from "react";
import { useSnapshot } from "valtio";
import { valtioState } from "../state";
import classNames from "classnames";
// 默认导出
export default function SideItems() {
  const snapshot = useSnapshot(valtioState);
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
          valtioState.current = index;
          valtioState.selectSide = item;
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
                valtioState.category.splice(index, 1);
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
