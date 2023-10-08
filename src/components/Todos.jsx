import { useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { valtioState, editState } from "../state";
import classNames from "classnames";
export default function CategoryList() {
  const snapshot = useSnapshot(valtioState);
  const showMoreRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const onCategoryClick = (event, item, index) => {
    event.stopPropagation();
    editState.showEditTodo = true;
    valtioState.current = item.id;
    valtioState.selectSide = item;
    setCurrentIndex(index);
  };
  const TodoLength = ({ itemId }) => {
    return snapshot.todo.filter((todo) => {
      if (!todo.check) return itemId === todo.categoryId;
      if (todo.check) return itemId === 0;
    }).length;
  };
  return (
    <div>
      {snapshot.category.map((item, index) => (
        <div
          ref={showMoreRef}
          key={item.id}
          className={classNames(
            "flex justify-between items-center relative h-14 box-content font-medium rounded-lg cursor-pointer hover:bg-slate-100",
            {
              "bg-slate-100": index === currentIndex,
            }
          )}
        >
          <div
            className="w-full flex justify-between items-center text-xl p-2 h-12 "
            onClick={(e) => onCategoryClick(e, item, index)}
          >
            <div className="mr-2.5 w-8">{item.icon}</div>
            <div className={classNames("ftruncate w-3/4 -ml-6")}>
              {item.title}
            </div>
            <div className="relative w-fit px-2 py-1 text-gray-500  rounded-md bg-gray-200 font-semibold">
              <TodoLength itemId={item.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
