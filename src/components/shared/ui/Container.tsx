import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => (
  <section className="w-full dark:bg-gray-900">{children}</section>
);
