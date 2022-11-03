import React from "react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { OffCanvasBody } from "./OffCanvas.Body";
import { OffCanvasHeader } from "./OffCanvas.Header";
import { OffCanvasTitle } from "./OffCanvas.Title";

interface Props {
  children: ReactNode;
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}

const OffCanvas: React.FC<Props> = ({ children, toggle, setToggle }) => {
  const childrenWithProps = React.Children.toArray(children).map((child) =>
    React.isValidElement<{ setToggle: Dispatch<SetStateAction<boolean>> }>(child)
      ? React.cloneElement(child, { setToggle })
      : child
  );
  return (
    <>
      {toggle && (
        <div
          className={`top-0 right-0 w-full sm:w-[60vw] sm:max-w-md  bg-gray-700 text-white fixed h-full z-40 ease-in-out duration-1000 ${
            toggle ? "translate-x-0 " : "translate-x-full"
          }`}
        >
          {childrenWithProps}
        </div>
      )}
    </>
  );
};

export default Object.assign(OffCanvas, {
  Header: OffCanvasHeader,
  Title: OffCanvasTitle,
  Body: OffCanvasBody,
});
