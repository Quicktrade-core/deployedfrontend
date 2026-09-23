// src/context/contextProvider.jsx
import AuthProvider from "./authContext";
import CartProvider from "./cartContext";
import ThemeProvider from "./themeContext";

const ContextProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default ContextProvider;