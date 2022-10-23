import { ReactNode } from "react";

interface Props {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export const Sidebar: React.FC<Props> = ({ showSidebar, setShowSidebar, children }) => {
  return (
    <>
      {showSidebar && (
        <button
          className="flex text-4xl text-gray-700 items-center cursor-pointer fixed right-7 top-4 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      )}

      <div
        className={`top-0 right-0 w-full sm:w-[60vw] sm:max-w-md  bg-slate-200  p-10 text-gray-700 fixed h-full z-40 ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <div className="mt-5">{children}</div>
      </div>
    </>
  );
};
