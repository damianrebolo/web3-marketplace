import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Error: React.FC<Props> = ({ children }) => (
  <div className="flex justify-center items-center h-screen">
    <div role="alert">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        Danger
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        {children}
      </div>
    </div>
  </div>
);
