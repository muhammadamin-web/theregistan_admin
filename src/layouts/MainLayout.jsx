// External Dependencies
import { Suspense, lazy, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Space } from "antd";

// Style
import "./style.scss";
// Redux Action
import {
  changeLoadingRefresh,
  changeShow,
  putCategories,
  putPosts,
  setAllPosts,
  setBannerData,
  setMenu,
  setTopBanner,
  setPageData,
} from "../store/homeSlice.js";
import Loading from "../components/loading/Loading.jsx";
import { fetchDataFromApi } from "../utils/api.js";

// Lazy-loaded components
const LazySideBar = lazy(() => import("../components/sideBar/SideBar.jsx"));

function MainLayout({ loading, setLoading }) {
  const { isShow, pageNumber } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const [errorTrue, setErrorTrue] = useState(false);

  useEffect(() => {
    if (isShow) {
      const handleClick = (e) => {
        if (e.target.tagName === "A" || e.target.tagName === "IMG") {
          dispatch(changeShow(false));
        }
      };

      const handleResize = () => {
        dispatch(changeShow(false));
      };

      window.addEventListener("click", handleClick);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("click", handleClick);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isShow]);
  const getPostWithInfos = () => {
    fetchDataFromApi(`/news?page=${1}`).then((res) => {
      dispatch(setAllPosts(res));
    });
  };

  useEffect(() => {
    dispatch(changeLoadingRefresh(true));
    fetchDataFromApi(`/news?page=${pageNumber}`).then((res) => {
      dispatch(setAllPosts(res));
      dispatch(changeLoadingRefresh(false));
    });
  }, [pageNumber]);

  useEffect(() => {
    getPostWithInfos();
    Promise.all([
      fetchDataFromApi("/news"),
      fetchDataFromApi("/category"),
      fetchDataFromApi("/banner"),
      fetchDataFromApi("/topBanner"),
      fetchDataFromApi("/menu"),
      fetchDataFromApi("/page"),
    ]).then(([posts, categories, banner, topBanner, menu, page]) => {
      if (posts?.name == "AxiosError") {
        setErrorTrue(true);
      } else {
        dispatch(putPosts(posts.news));
        dispatch(putCategories(categories.data));
        dispatch(setBannerData(banner.data[0]));
        dispatch(setTopBanner(topBanner.data[0]));
        dispatch(setPageData(page));
        dispatch(setMenu(menu.data));
        setErrorTrue(false);
        setLoading(false);
      }
    });
  }, []);
  return (
    <section className="main-section">
      {loading && <Loading />}
      <Suspense fallback={<Loading />}>
        <LazySideBar />
      </Suspense>
      {errorTrue && (
        <Space
          direction="vertical"
          style={{
            minWidth: "25%",
            position: "absolute",
            zIndex: "11111",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Alert
            message="Axios Error"
            description="Something went wrong!. Please refresh it!"
            type="error"
            showIcon
            // closable
          />
        </Space>
      )}
      {!loading && (
        <div className="main">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </section>
  );
}

export default MainLayout;
