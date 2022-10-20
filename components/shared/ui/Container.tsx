import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => (
  <section className="md:h-full flex items-center text-gray-600">
    <div className="max-w-7xl px-5 py-24 mx-auto w-full">{children}</div>
  </section>
);
