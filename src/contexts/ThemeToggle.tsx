import { createContext, useState, ReactNode, useContext } from 'react';

type ThemeContextData = {
    isDark: boolean;
    changeTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextData);

type ThemeContextProviderProps = {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {

  const [isDark, setIsDark] = useState(false);

  function changeTheme(){
      setIsDark(!isDark);
  }

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        changeTheme
      }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext);
}