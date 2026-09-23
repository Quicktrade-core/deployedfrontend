// src/App.jsx
import { useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider } from "react-router"
import RootLayout from "./rootLayout"
import HomePage from "./pages/homePage"
import CartPage from "./pages/cartPage"
import AccountPage from "./pages/accountPage"
import NotfoundPage from "./pages/notfoundPage"
import LoginPage from "./pages/loginPage"
import RegisterPage from "./pages/registerPage"
import VerifyOtpPage from "./pages/verifyOtpPage"
import VideosPage from "./pages/videosPage"
import ProductPage from "./pages/productPage"
import CheckoutPage from "./pages/checkoutPage"
import NotificationsPage from "./pages/notificationsPage"
import OrdersPage from "./pages/ordersPage"
import OrderPage from "./pages/orderPage"
import ProfilePage from "./pages/profilePage"
import SecurityPage from "./pages/securityPage"
import SettingsPage from "./pages/settingsPage"
import SellerPage from "./pages/sellerPage"
import Products from "./components/products"
import Reels from "./components/reels"
import Stores from "./components/stores"
import Loading from "./components/loading"
import ContextProvider from "./context/contextProvider"

function App() {
  const [load, setLoad] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const router = createBrowserRouter([
    {
      path: `/`,
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: `/account`, element: <AccountPage /> }
      ]
    },
    {
      path: `/seller`,
      element: <SellerPage />,
      children: [
        { index: true, element: <Products /> },
        { path: `reels`, element: <Reels /> },
        { path: `stores`, element: <Stores /> }
      ]
    },
    { path: `/product/:id`, element: <ProductPage /> },
    { path: `/cart`, element: <CartPage /> },
    { path: `/checkout`, element: <CheckoutPage /> },
    { path: `/videos`, element: <VideosPage /> },
    { path: `/profile`, element: <ProfilePage /> },
    { path: `/orders`, element: <OrdersPage /> },
    { path: `/order/:id`, element: <OrderPage /> },
    { path: `/notifications`, element: <NotificationsPage /> },
    { path: `/security`, element: <SecurityPage /> },
    { path: `/settings`, element: <SettingsPage /> },
    { path: `/login`, element: <LoginPage /> },
    { path: `/register`, element: <RegisterPage /> },
    { path: `/verify-otp`, element: <VerifyOtpPage /> },
    { path: `*`, element: <NotfoundPage /> }
  ])

  if (load) return <Loading />

  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  )
}

export default App