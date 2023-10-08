import { useEffect } from "react";
const Modal = ({ title, content, isVisible, onClose, buttonTitle, onOk }) => {
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (isVisible && event.target.classList.contains("modal-overlay")) {
  //       onClose();
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="relative z-10 "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-2xl p-6 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white p-6 pt-5 sm:p-6 sm:pb-4">
              <h3
                className="text-base font-semibold leading-6 text-gray-900"
                id="modal-title"
              >
                {title}
              </h3>
              <div className="mt-2 flex">
                <div className="text-2xl">{content}</div>
                <div
                  onClick={onClose}
                  className="cursor-pointer mt-2 w-7 h-7 text-right text-gray-400"
                >
                  ✕
                </div>
              </div>
            </div>
            <div className="px-4 py-3 mt-7 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={onOk}
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                {buttonTitle ?? "Yes"}
              </button>
              <button
                onClick={onClose}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
