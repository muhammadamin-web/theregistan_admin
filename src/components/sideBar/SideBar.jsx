// External Dependencies
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

// Redux Action
import { changeIsLogged, changeShow } from "../../store/homeSlice.js";

// Style
import "./style.scss";

// Custom Component
import NavItem from "../navItem/NavItem.jsx";

// Icons
import {
  BiCategory,
  BiNews,
  BiMenu,
  BiImage,
  BiInfoCircle,
} from "react-icons/bi";
import { TbSpeakerphone } from "react-icons/tb";

// Image
import logo from "../../assets/images/TheRegistan1.png";
import Button from "./../../UI/button/Button";
import WarningPopUp from "../warningPopUp/WarningPopUp.jsx";

// Data for Navigation Items
const navItemData = [
  { name: "posts", path: "/", Icon: BiNews },
  { name: "category", path: "/category", Icon: BiCategory },
  { name: "banner", path: "/banner", Icon: BiImage },
  { name: "menu", path: "/menu", Icon: BiMenu },
  { name: "about", path: "/about", Icon: BiInfoCircle },
  { name: "Advertisers", path: "/advertisers", Icon: TbSpeakerphone },
];

function SideBar() {
  const { isShow, isLogged } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const handleLogout = () => {
    setIsTrue(true);
  };
  const [isTrue, setIsTrue] = useState(false);
  const warningDatas = {
    type: "log out!",
    warning: "",
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsTrue(false);
    dispatch(changeIsLogged(!isLogged));
  };
  return (
    <>
      <div
        className={isShow ? "sideBar_bg" : ""}
        onClick={() => {
          dispatch(changeShow(false));
        }}
      ></div>
      <div
        className={`sideBar`}
        style={isShow ? { transform: "translateX(0)" } : {}}
      >
        <div className="sideBar-head">
          <Link>
            <img src={logo} alt="" />
          </Link>
        </div>
        <ul className="sideBar_nav">
          {navItemData.map((item, i) => (
            <NavItem data={item} key={i} />
          ))}
          <Button onClick={handleLogout} className={"martinTop"}>
            Log Out
          </Button>
        </ul>
      </div>
      {isTrue && (
        <WarningPopUp
          warningDatas={warningDatas}
          setIsTrue={setIsTrue}
          logout={logout}
        />
      )}
    </>
  );
}

export default SideBar;
