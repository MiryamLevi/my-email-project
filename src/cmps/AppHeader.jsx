import { Link, Outlet } from "react-router-dom";
import imgUrl from "../assets/imgs/logo.png";
import { LuPencil } from "react-icons/lu";

export function AppHeader() {
  return (
    <header className="app-header">
      <section className="container">
        <img src={imgUrl} alt="logo" className="logo" />
        <Link to="/inbox/edit">
          <button className="compose">
            <LuPencil /> Compose
          </button>
        </Link>
      </section>
      <Outlet/>
    </header>
  );
}
