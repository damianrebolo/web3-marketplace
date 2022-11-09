import React, { useEffect } from "react";
import { Toast } from "./ToasterProvider";
import clsx from "clsx";

const VARIANTS = {
  Info: {
    base: "bg-white border-blue-500",
    iconstyle: "text-blue-500 ",
    name: "Info",
  },

  Error: {
    base: "bg-white border-red-500 ",
    iconstyle: "text-red-500 ",
    name: "Error",
  },

  Warning: {
    base: "bg-white border-yellow-500",
    iconstyle: "text-yellow-500 ",
    name: "Warning",
  },

  Success: {
    base: "bg-white border-green-500",
    iconstyle: "text-green-500 ",
    name: "Success",
  },
};

export type Truncate = "truncate-1-lines" | "truncate-2-lines" | "truncate-3-lines";

export type ToastMessage = {
  id: string;
  lifetime?: number;
  variant?: keyof typeof VARIANTS | undefined;
  onRemove?: (id: string) => void;
  truncate?: Truncate;
} & Toast;

export default function ToastMessage({
  id,
  header,
  message,
  lifetime,
  onRemove,
  truncate = "truncate-3-lines",
  //   icon,
  type,
}: ToastMessage) {
  const Var = type
    ? VARIANTS[type]
    : {
        base: "bg-white border-gray-600 ",
        iconstyle: "",
        name: header,
      };

  useEffect(() => {
    if (lifetime && onRemove) {
      setTimeout(() => {
        onRemove(id);
      }, lifetime);
    }
  }, [lifetime, id, onRemove]);

  return (
    <div
      className={clsx(
        "flex w-full visible flex-row shadow-lg",
        "border-l-4 rounded-md duration-100 cursor-pointer",
        "transform transition-all hover:scale-102",
        Var.base,
        type && "max-h-40"
      )}
    >
      <div className="flex flex-row p-2 flex-no-wrap w-full">
        <div className="flex flex-col flex-no-wrap px-1 w-full">
          <div className="flex my-auto font-bold select-none">{Var.name}</div>
          <p
            className={clsx(
              "-mt-0.5 my-auto break-all flex",
              "text-gray-600 text-sm",
              typeof message === "string" && truncate
            )}
          >
            {message}
          </p>
        </div>
        <div onClick={() => onRemove && onRemove(id)} className="flex justify-center items center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={clsx(
              "mx-auto my-auto h-full text-center text-gray-600",
              "cursor-pointer hover:scale-105 transform",
              "w-6 h-6"
            )}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </div>
  );
}
