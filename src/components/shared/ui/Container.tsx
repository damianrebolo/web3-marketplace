import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => (
  <section className="md:h-full flex items-center dark:bg-gray-700">
    <div className="max-w-7xl px-5 py-5 mx-auto w-full">{children}</div>
  </section>
);
