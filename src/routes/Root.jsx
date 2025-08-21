import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { GlobalStyles } from "../styles/GlobalStyles";

export default function Root() {
  return (
    <>
      <GlobalStyles />
      <header>
        <Navbar />
      </header>
      <Outlet />
    </>
  );
}
