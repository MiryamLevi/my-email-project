import { RiDraftLine, RiInboxFill } from "react-icons/ri";
import { IoMdStarOutline } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { NavLink, Outlet } from "react-router-dom";

export function AsideItem({ item }) {
  var icon = null;
  switch (item.name) {
    case "Inbox":
      icon = <RiInboxFill />;
      break;
    case "Starred":
      icon = <IoMdStarOutline />;
      break;
    case "Draft":
      icon = <RiDraftLine />;
      break;
    case "Sent":
      icon = <AiOutlineSend />;
      break;
    case "Trash":
      icon = <FaRegTrashAlt />;
      break;
    default:
      break;
  }

  return (
    <article className="aside-item">
      <NavLink to={`${item.to}`}>
        {icon} {item.name} {item.count}
      </NavLink>
      <Outlet/>
    </article>
  );
}
