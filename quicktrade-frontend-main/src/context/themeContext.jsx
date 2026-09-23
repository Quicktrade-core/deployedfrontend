import { createContext, useContext, useEffect, useState } from "react"

export const themeContext = createContext()

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
    document.documentElement.classList.toggle(`dark`)
  }

  return (
    <themeContext.Provider value={{ darkMode, toggleDarkMode }}>
      { children }
    </themeContext.Provider>
  )
}

export default ThemeProvider

// export function ThemeProvider({ children }) {
//   const [darkMode, setDarkMode] = useState(() => {
//     return localStorage.getItem("theme") === "dark";
//   });

//   useEffect(() => {
//     const root = document.documentElement;

//     root.classList.toggle("dark", darkMode);

//     localStorage.setItem("theme", darkMode ? "dark" : "light");
//   }, [darkMode]);

//   const toggleDarkMode = () => {
//     setDarkMode((prev) => !prev);
//   };

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   return useContext(ThemeContext);
// }