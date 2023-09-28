import { useRef } from "react";
import { useSnapshot } from "valtio";
import { valtioState, editState } from "../state";
import classNames from "classnames";
export default function CategoryList() {
  const snapshot = useSnapshot(valtioState);
  const showMoreRef = useRef(null);
  const onCategoryClick = (event, item) => {
    event.stopPropagation();
    editState.showEditTodo = true;
    valtioState.current = item.id;
    valtioState.selectSide = item;
  };
  const TodoLength = ({ itemId }) => {
    return snapshot.todo.filter((todo) => {
      if (!todo.check) return itemId === todo.categoryId;
      if (todo.check) return itemId === 0;
    }).length;
  };
  return (
    <ul>
      {snapshot.category.map((item, index) => (
        <li
          ref={showMoreRef}
          key={item.id}
          className={classNames(
            "flex justify-between items-center relative h-14 mb-2 font-medium rounded-lg cursor-pointer hover:bg-slate-100",
            {
              "bg-slate-100": snapshot.current === index,
            }
          )}
        >
          <div
            className="w-full flex justify-between items-center text-xl px-5 h-12 "
            onClick={(e) => onCategoryClick(e, item)}
          >
            <div className="mr-2.5 w-8">{item.icon}</div>
            <div className={classNames("ftruncate w-3/4 -ml-6")}>
              {item.title}
            </div>
            <div className="relative w-fit px-2 py-1 text-gray-500  rounded-md bg-gray-200 font-semibold">
              <TodoLength itemId={item.id} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
