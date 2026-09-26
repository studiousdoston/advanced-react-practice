import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { T } from "../libs/common.type";

const DarkModeContext = createContext<
  | {
      isDarkMode: boolean;
      toggleDarkMode: () => void;
    }
  | undefined
>(undefined);

function DarkModeProvider({ children }: T) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((isDark: boolean) => !isDark);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider ");

  return context;
}
// We can get { isDarkMode, toggleDarkMode } from useDarkMode hook as it has been enriched with useContext hook

export { DarkModeProvider, useDarkMode };
