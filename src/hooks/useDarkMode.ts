import { useCallback, useEffect, useState } from "react";

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    darkMode
      ? document?.querySelector("html")?.classList.add("dark")
      : document?.querySelector("html")?.classList.remove("dark");
  }, [darkMode]);

  const changeDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode, setDarkMode]);

  return [darkMode, changeDarkMode] as const;
};
