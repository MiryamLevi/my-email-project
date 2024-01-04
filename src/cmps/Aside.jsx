import { Link, NavLink, Outlet } from "react-router-dom";
import { AsideItem } from "./AsideItem";
import { useEffect, useState } from "react";
import { LuPencil } from "react-icons/lu";

export function Aside() {
  const [asideItems, setAsideItems] = useState([
    { id: 1, to: "/inbox", name: "Inbox", count: 0 },
    { id: 2, to: "/starred", name: "Starred", count: 0 },
    { id: 3, to: "/sent", name: "Sent", count: 0 },
    { id: 4, to: "/draft", name: "Draft", count: 0 },
    { id: 5, to: "/trash", name: "Trash", count: 0 },
  ]);

  return (
    <ul className="aside">
      <Link to="/inbox/edit">
        <button className="compose">
          <LuPencil /> Compose
        </button>
      </Link>
      {asideItems.map((item) => (
        <li key={item.id}>
          <AsideItem item={item} />
        </li>
      ))}
    </ul>
  );
}
