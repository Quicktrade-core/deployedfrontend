import Scrolltotop from "./components/scrolltotop"
import Footer from "./components/footer"
import { Outlet } from "react-router"

const RootLayout = () => {
  return (
    <>
      <Scrolltotop />
      <Outlet />
      <Footer />
    </>
  )
}

export default RootLayout