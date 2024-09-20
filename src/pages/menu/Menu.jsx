import React, { useState } from "react";
import UniversalHead from "../../components/UniversalHead.jsx";
import UniversalBody from "./../../components/UniversalBody";
import { useDispatch, useSelector } from "react-redux";
import Thead from "./../../components/tableDatas/Thead";
import { Alert, Space } from "antd";
import "./style.scss";
import WarningPopUp from "../../components/warningPopUp/WarningPopUp.jsx";
import {
  changeLoadingRefresh,
  setMenu,
  setWarningPopUp,
} from "../../store/homeSlice.js";
import { deleteDataFromApi, fetchDataFromApi } from "../../utils/api.js";
import MenuPopUp from "../../components/menuPopUp/MenuPopUp.jsx";
import MenuSingle from "../../components/menuSingle/MenuSingle.jsx";
function Menu() {
  const { menu, warningPopUp, currentId } = useSelector((state) => state.home);
  const data = { title: "Menu", btn: "Add Menu", link: "" };
  const dispatch = useDispatch();
  const [errorTrue, setErrorTrue] = useState(false);
  const [errorInfos, setErrorInfos] = useState({
    status: "",
    message: "",
    type: "",
  });
  const [editPopUp, setEditPopUp] = useState(false);
  const [isPost, setIsPost] = useState(true);
  const theadDatas = ["Order", "Name", "Action"];
  const [body, setBody] = useState({});
  const warningDatas = {
    type: "delete this menu",
    warning: "This may cause some error!",
  };

  const refreshFunc = () => {
    fetchDataFromApi("/menu").then((res) => {
      dispatch(setMenu(res.data));
      dispatch(changeLoadingRefresh(false));
    });
  };
  const deleteItem = async () => {
    dispatch(setWarningPopUp(false));
    dispatch(changeLoadingRefresh(true));

    try {
      const res = await deleteDataFromApi(`/menu/${currentId}`);

      if (res.success) {
        refreshFunc();
        setErrorInfos({
          status: "",
          message: res?.message,
          type: "success",
        });
        setErrorTrue(true);
      } else {
        setErrorInfos({
          status: `Error Code ${res?.status}`,
          message: res?.data?.message,
          type: "error",
        });
        setErrorTrue(true);
        setTimeout(() => setErrorTrue(false), 3000);
      }
    } finally {
      dispatch(changeLoadingRefresh(false));
    }
  };

  return (
    <div className="menu-section">
      <UniversalHead data={data} setPopUp={setEditPopUp} />
      <UniversalBody>
        <div className="menu-body">
          <table>
            <Thead theadDatas={theadDatas} />
            <tbody>
              {[...menu]
                .sort(
                  (a, b) => parseInt(a.OrderNumber) - parseInt(b.OrderNumber)
                )
                .map((menuSingle, i) => (
                  <MenuSingle
                    menuSingle={menuSingle}
                    setEditPopUp={setEditPopUp}
                    setBody={setBody}
                    setIsPost={setIsPost}
                    key={i}
                  />
                ))}
            </tbody>
          </table>
          {errorTrue && (
            <Space
              direction="vertical"
              style={{
                minWidth: "25%",
                position: "fixed",
                zIndex: "1",
                left: "50%",
                transform: "translateX(-40%)",
                top: "1%",
              }}
            >
              <Alert
                message={`${errorInfos.status}`}
                description={`${errorInfos.message}`}
                type={errorInfos.type}
                showIcon
                closable
                onClose={() => {
                  setErrorTrue(false);
                }}
              />
            </Space>
          )}
        </div>
        {editPopUp && (
          <MenuPopUp
            setErrorInfos={setErrorInfos}
            setErrorTrue={setErrorTrue}
            body={body}
            setBody={setBody}
            setEditPopUp={setEditPopUp}
            editPopUp={editPopUp}
            isPost={isPost}
            setIsPost={setIsPost}
            refreshFunc={refreshFunc}
          />
        )}
      </UniversalBody>
      {warningPopUp && (
        <WarningPopUp warningDatas={warningDatas} deleteItem={deleteItem} />
      )}
    </div>
  );
}

export default Menu;
