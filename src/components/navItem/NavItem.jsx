// External Dependencies
import { NavLink } from "react-router-dom";

// Style
import "./style.scss";

function NavItem({ data }) {
  return (
    <li className="sideBar_nav-item">
      <NavLink
        className={({ isActive }) => (isActive ? "nav-active" : "")}
        to={data.path}
      >
        <data.Icon /> {data.name}
      </NavLink>
    </li>
  );
}

export default NavItem;
