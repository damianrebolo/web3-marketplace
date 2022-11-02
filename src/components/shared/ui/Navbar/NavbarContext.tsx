import { createContext, Dispatch, SetStateAction } from "react";

export interface NavbarContextType {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}

const context = createContext<NavbarContextType | null>(null);
context.displayName = "NavbarContext";

export default context;
