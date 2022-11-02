import { useRef } from "react";

export const useRender = (cName: string) => {
  const renders = useRef(0);
  console.log(`${cName}: ${renders.current++}`);
};
