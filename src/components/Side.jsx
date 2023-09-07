import SideItems from "./SideItems";
import AddTodo from "./AddTodo";
export default function Side() {
  return (
    <>
      <div className="w-96 rounded-3xl p-10 bg-stone-50  fixed left-2  bottom-2 top-2 text-sm z-10">
        <SideItems />
        <AddTodo />
      </div>
    </>
  );
}
