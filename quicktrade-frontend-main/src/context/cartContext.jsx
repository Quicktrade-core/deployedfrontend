// src/context/cartContext.jsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { authContext } from "./authContext";

export const cartContext = createContext();

const CartProvider = ({ children }) => {
  const { api, isAuthenticated } = useContext(authContext);

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState("0.00");
  const [buyerFeesTotal, setBuyerFeesTotal] = useState("0.00");
  const [delivery, setDelivery] = useState("0.00");
  const [grandTotal, setGrandTotal] = useState("0.00");
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      setSubtotal("0.00");
      setBuyerFeesTotal("0.00");
      setDelivery("0.00");
      setGrandTotal("0.00");
      setCartCount(0);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/transactions/cart/");
      const data = response.data;
      if (data?.success) {
        setCartItems(data.items || []);
        setSubtotal(data.subtotal || "0.00");
        setBuyerFeesTotal(data.buyer_fees_total || "0.00");
        setDelivery(data.delivery || "0.00");
        setGrandTotal(data.grand_total || "0.00");
        setCartCount(
          (data.items || []).reduce((sum, i) => sum + (i.quantity || 0), 0)
        );
      } else {
        setError(data?.error || "Failed to load cart");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setCartItems([]);
        setSubtotal("0.00");
        setBuyerFeesTotal("0.00");
        setDelivery("0.00");
        setGrandTotal("0.00");
        setCartCount(0);
      } else {
        setError("Network error loading cart");
      }
    } finally {
      setLoading(false);
    }
  }, [api, isAuthenticated]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = async (listingId, quantity = 1) => {
    if (!isAuthenticated) {
      return {
        success: false,
        error: "Please sign in first.",
        code: "NOT_AUTHENTICATED",
      };
    }
    try {
      const response = await api.post(
        `/transactions/cart/add/${listingId}/`,
        { quantity }
      );
      if (response.data?.success) await refreshCart();
      return { success: response.data?.success, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Could not add to cart",
      };
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const response = await api.post(
        `/transactions/cart/update/${cartItemId}/`,
        { quantity }
      );
      if (response.data?.success) await refreshCart();
      return { success: response.data?.success, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Could not update quantity",
      };
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const response = await api.post(
        `/transactions/cart/remove/${cartItemId}/`
      );
      if (response.data?.success) await refreshCart();
      return { success: response.data?.success, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Could not remove item",
      };
    }
  };

  const clearCart = async () => {
    try {
      const response = await api.post("/transactions/cart/clear/");
      if (response.data?.success) await refreshCart();
      return { success: response.data?.success, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Could not clear cart",
      };
    }
  };

  return (
    <cartContext.Provider
      value={{
        cartItems,
        subtotal,
        buyerFeesTotal,
        delivery,
        grandTotal,
        cartCount,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;