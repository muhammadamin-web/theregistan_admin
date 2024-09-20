// External Dependencies
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
// Custom Components
import UniversalHead from "../../components/UniversalHead.jsx";
import UniversalBody from "../../components/UniversalBody.jsx";
import PostTableData from "../../components/postTableData/PostTableData.jsx";
import WarningPopUp from "../../components/warningPopUp/WarningPopUp.jsx";
import Thead from "../../components/tableDatas/Thead.jsx";

// Style
import "./style.scss";

// Utility functions
import { deleteDataFromApi, fetchDataFromApi } from "../../utils/api.js";

// Redux Actions
import {
  changeLoadingRefresh,
  // putPosts,
  setAllPosts,
  setCurrentImgId,
  setCurrentImgUrl,
  setPageNumber,
  setWarningPopUp,
} from "../../store/homeSlice.js";
import { Alert, Space } from "antd";

// Constants
const warningDatas = {
  type: "delete this news",
  warning: "This may cause some error!",
};
const theadDatas = [
  "IMAGE",
  "TITLE",
  "DATE",
  "READ TIME",
  "CATEGORIES",
  "CONTENT",
  "ACTIONS",
];
const data = { title: "Posts", btn: "Add Post", link: "/addPost" };

function Posts() {
  const dispatch = useDispatch();
  const { postsWithAllInfos, currentId, warningPopUp } = useSelector(
    (state) => state.home
  );
  const [errorTrue, setErrorTrue] = useState(false);
  const [errorInfos, setErrorInfos] = useState({ status: "", message: "" });

  const refreshFunc = () => {
    fetchDataFromApi("/news").then((res) => {
      dispatch(setAllPosts(res));
      dispatch(changeLoadingRefresh(false));
    });
  };

  const deleteItem = () => {
    dispatch(setWarningPopUp(false));
    dispatch(changeLoadingRefresh(true));
    deleteDataFromApi(`/news/${currentId}`).then((res) => {
      if (res.success) {
        refreshFunc();
      } else {
        setErrorInfos({ status: res?.status, message: res?.data?.message });
        dispatch(changeLoadingRefresh(false));
        setErrorTrue(true);
        setTimeout(() => {
          setErrorTrue(false);
        }, 3000);
      }
    });
  };

  useEffect(() => {
    refreshFunc();
    dispatch(setCurrentImgUrl(""));
    dispatch(setCurrentImgId(""));
  }, []);
  const onChange = (e) => {
    dispatch(setPageNumber(e));
  };
  return (
    <section className="posts_section">
      <UniversalHead data={data} />
      <UniversalBody>
        <div className="posts_body">
          <table>
            <Thead theadDatas={theadDatas} />
            <tbody className="post-tbody">
              {postsWithAllInfos?.news?.map((dataSingle, i) => (
                <PostTableData dataSingle={dataSingle} key={i} />
              ))}
            </tbody>
          </table>
          <div className="form-pagination">
            <Pagination
              hideOnSinglePage={true}
              defaultCurrent={1}
              total={postsWithAllInfos?.allFindedPosts}
              defaultPageSize={12}
              onChange={onChange}
            />
          </div>
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
        {postsWithAllInfos?.news?.length == 0 && (
          <h1 className="text-center">Posts not found!</h1>
        )}
      </UniversalBody>
      {warningPopUp && (
        <WarningPopUp warningDatas={warningDatas} deleteItem={deleteItem} />
      )}
    </section>
  );
}

export default Posts;
