import React, { useCallback, useContext, useState } from "react";
import ToastContainer, { ToastContainerProps } from "./Toaster";
import { Truncate } from "./ToastMessage";

export type ToastProviderProps = {
  children: React.ReactNode;
} & ToastContainerProps;

type TostMessageType = "Info" | "Success" | "Warning" | "Error";

export type Toast = {
  id: string;
  lifetime: number;
  message: string | React.ReactNode;
  type?: TostMessageType;
  truncate?: Truncate;
  //   icon?: IconProp;
  header?: string;
};

export type ToastContextType = {
  data: Array<Toast>;
  pushError(message: string, lifetime?: number, truncate?: Truncate): void;
  pushWarning(message: string, lifetime?: number, truncate?: Truncate): void;
  pushSuccess(message: string, lifetime?: number, truncate?: Truncate): void;
  pushInfo(message: string, lifetime?: number, truncate?: Truncate): void;
  push(message: string, type: TostMessageType, lifetime?: number, truncate?: Truncate): void;
  pushCustom(message: string | React.ReactNode, lifetime: number, truncate?: Truncate): void;
  remove(id: string): void;
};

export const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

const uniqueId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
export const useToast = () => useContext(ToastContext);

const DEFAULT_INTERVAL = 5000;

export default function ToastProvider({ children, variant }: ToastProviderProps) {
  const [data, setData] = useState<Array<Toast>>([]);

  const Push = useCallback((message: string, type: TostMessageType, lifetime?: number, truncate?: Truncate) => {
    if (message) {
      const new_item: Toast = {
        id: uniqueId(),
        message: message,
        type: type,
        lifetime: lifetime ? lifetime : DEFAULT_INTERVAL,
        truncate: truncate,
      };

      setData((prevState) => [...prevState, new_item]);
    }
  }, []);

  const PushCustom = useCallback(
    (message: string | React.ReactNode, lifetime?: number, truncate?: Truncate) => {
      if (message) {
        const new_item: Toast = {
          id: uniqueId(),
          message: message,
          lifetime: lifetime ? lifetime : DEFAULT_INTERVAL,
          truncate: truncate,
          type: undefined,
        };

        setData((prevState) => [...prevState, new_item]);
      }
    },
    [setData]
  );

  const PushError = useCallback(
    (message: string, lifetime?: number, truncate?: Truncate) => Push(message, "Error", lifetime, truncate),
    [Push]
  );
  const PushWarning = useCallback(
    (message: string, lifetime?: number, truncate?: Truncate) => Push(message, "Warning", lifetime, truncate),
    [Push]
  );
  const PushSuccess = useCallback(
    (message: string, lifetime?: number, truncate?: Truncate) => Push(message, "Success", lifetime, truncate),
    [Push]
  );
  const PushInfo = useCallback(
    (message: string, lifetime?: number, truncate?: Truncate) => Push(message, "Info", lifetime, truncate),
    [Push]
  );

  const ToastContexd = useCallback(() => {
    return {
      data: data,
      pushError: PushError,
      pushWarning: PushWarning,
      pushSuccess: PushSuccess,
      pushInfo: PushInfo,
      push: Push,
      pushCustom: PushCustom,

      async remove(id: string) {
        setData((prevState) => prevState.filter((e) => e.id != id));
      },
    };
  }, [data, setData, PushError, PushWarning, PushSuccess, PushInfo, Push, PushCustom]);

  return (
    <ToastContext.Provider value={ToastContexd()}>
      <ToastContainer variant={variant} />
      {children}
    </ToastContext.Provider>
  );
}
