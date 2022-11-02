import { Dispatch, ReactNode, SetStateAction } from "react";

interface Props {
  children: ReactNode;
  closeButton?: boolean;
  setToggle?: Dispatch<SetStateAction<boolean>>;
}

export const OffCanvasHeader: React.FC<Props> = ({ children, closeButton, setToggle }) => (
  <>
    <div className="flex justify-between items-center my-3 mx-7">
      {children}
      {closeButton && (
        <button className="text-3xl font-bold cursor-pointer" onClick={() => setToggle?.((current) => !current)}>
          x
        </button>
      )}
    </div>
    <hr />
  </>
);

OffCanvasHeader.displayName = "OffCanvas.Header";
