// External Dependencies
import React, { useEffect, useState } from "react";
import { Alert, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// Style
import "./style.scss";

// Custom Components
import UniversalHead from "../../components/UniversalHead.jsx";
import UniversalBody from "../../components/UniversalBody.jsx";
import PopUpCategory from "../../components/popUpCategory/PopUpCategory.jsx";
import WarningPopUp from "../../components/warningPopUp/WarningPopUp.jsx";
import CategoryTableData from "./../../components/categoryTableData/CategoryTableData";
import Thead from "./../../components/tableDatas/Thead";

// Utility functions
import {
  deleteDataFromApi,
  fetchDataFromApi,
  postDataFromApi,
  putDataFromApi,
} from "../../utils/api.js";

// Redux Actions
import {
  changeLoadingRefresh,
  putCategories,
  setCurrentImgId,
  setWarningPopUp,
} from "../../store/homeSlice.js";

// Constants
const warningDatas = {
  type: "delete this category",
  warning: "This may cause some error!",
};
const theadDatas = ["IMAGE", "name", "ACTIONS"];
const data = { title: "Category", btn: "Add Category", link: "" };
const popUpData = {
  addData: {
    btntext: "Upload Photo",
    finalBtn: "Add",
  },
  editData: {
    btntext: "Change Photo",
    finalBtn: "Change",
  },
};

function Category() {
  const dispatch = useDispatch();
  const { categories, warningPopUp, currentId, currentImgId } = useSelector(
    (state) => state.home
  );
  const [popUp, setPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const [body, setBody] = useState({});
  const [errorTrue, setErrorTrue] = useState(false);
  const [errorInfos, setErrorInfos] = useState({ status: "", message: "" });
  const [imgData, setImgData] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const refreshFunc = () => {
    fetchDataFromApi("/category").then((res) => {
      dispatch(putCategories(res.data));
      dispatch(changeLoadingRefresh(false));
    });
  };

  const postFunc = () => {
    setPopUp(false);
    dispatch(changeLoadingRefresh(true));

    postDataFromApi("/image/upload", imgData)
      .then((res) => {
        const categoryData = imgData
          ? { ...body, image: res.data._id }
          : { ...body };

        return postDataFromApi("/category", categoryData);
      })
      .then((res) => {
        if (res.success) {
          refreshFunc();
        } else {
          setErrorInfos({ status: res?.status, message: res?.data?.message });
          dispatch(changeLoadingRefresh(false));
          setErrorTrue(true);
          setTimeout(() => {
            setErrorTrue(false);
          }, 5000);
        }
      })
      .finally(() => {
        setBody({});
        setImgData("");
        setImgUrl("");
      });
  };

  const putFunc = async () => {
    try {
      setEditPopUp(false);
      dispatch(changeLoadingRefresh(true));

      const hasImg = !!imgData;
      const hasImgId = !!currentImgId;
      if (imgUrl && hasImg && hasImgId) {
        await deleteDataFromApi(`/image/${currentImgId}`);
      } else if (!imgUrl && hasImgId) {
        await deleteDataFromApi(`/image/${currentImgId}`);
      }

      const categoryData = hasImg
        ? {
            ...body,
            image: (await postDataFromApi("/image/upload", imgData)).data._id,
          }
        : body;

      await putDataFromApi(`/category/${currentId}`, categoryData);
      refreshFunc();
    } catch (error) {
      setErrorInfos({ status: error.status, message: error.data?.message });
      dispatch(changeLoadingRefresh(false));
      setErrorTrue(true);
    } finally {
      setBody({});
      setImgData("");
      dispatch(setCurrentImgId(""));
    }
  };

  const deleteItem = async () => {
    dispatch(setWarningPopUp(false));
    dispatch(changeLoadingRefresh(true));

    try {
      const res = await deleteDataFromApi(`/category/${currentId}`);

      if (res.success) {
        refreshFunc();
      } else {
        setErrorInfos({ status: res?.status, message: res?.data?.message });
        setErrorTrue(true);
        setTimeout(() => setErrorTrue(false), 3000);
      }
    } finally {
      dispatch(changeLoadingRefresh(false));
    }
  };

  useEffect(() => {
    refreshFunc();
  }, []);

  return (
    <div className="category_section">
      <UniversalHead setPopUp={setPopUp} data={data} />
      <UniversalBody>
        <div className="category_body">
          <table>
            <Thead theadDatas={theadDatas} />
            <tbody>
              {categories.map((singleData) => (
                <CategoryTableData
                  setEditPopUp={setEditPopUp}
                  setBody={setBody}
                  key={uuidv4()}
                  setImgUrl={setImgUrl}
                  singleData={singleData}
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
                zIndex: "0",
                left: "50%",
                transform: "translateX(-40%)",
                top: "1%",
              }}
            >
              <Alert
                message={`Error Code ${errorInfos.status}`}
                description={`${errorInfos.message}`}
                type="error"
                showIcon
                closable
                onClose={() => {
                  setErrorTrue(false);
                }}
              />
            </Space>
          )}
        </div>
        {popUp && (
          <PopUpCategory
            setImgUrl={setImgUrl}
            imgUrl={imgUrl}
            setPopUp={setPopUp}
            infos={popUpData.addData}
            setBody={setBody}
            body={body}
            submitFunc={postFunc}
            setImgData={setImgData}
          />
        )}
        {editPopUp && (
          <PopUpCategory
            setImgUrl={setImgUrl}
            imgUrl={imgUrl}
            submitFunc={putFunc}
            setPopUp={setEditPopUp}
            infos={popUpData.editData}
            setBody={setBody}
            body={body}
            setImgData={setImgData}
          />
        )}
      </UniversalBody>
      {warningPopUp && (
        <WarningPopUp warningDatas={warningDatas} deleteItem={deleteItem} />
      )}
    </div>
  );
}

export default Category;
