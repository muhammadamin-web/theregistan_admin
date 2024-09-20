import { useDispatch, useSelector } from "react-redux";
import UniversalBody from "../../components/UniversalBody.jsx";
import UniversalHead from "../../components/UniversalHead.jsx";
import ReactQuillComponent from "../../components/reactQuill/ReactQuillComponent.jsx";
import "./about.scss";
import { useEffect, useRef, useState } from "react";
import Button from "./../../UI/button/Button";
import { changeLoadingRefresh, setPageData } from "../../store/homeSlice.js";
import { fetchDataFromApi, putDataFromApi } from "../../utils/api.js";
import { Alert, Space } from "antd";
const data = { title: "About" };

function About() {
  const { pageData } = useSelector((state) => state.home);
  const reactRef = useRef();
  const [errorTrue, setErrorTrue] = useState(false);
  const [errorInfos, setErrorInfos] = useState({
    status: "",
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const [body, setBody] = useState({
    content: pageData?.filter((s) => s.name === "about")[0].content,
  });
  const refreshFunc = () => {
    fetchDataFromApi("/page").then((res) => {
      dispatch(setPageData(res));
      dispatch(changeLoadingRefresh(false));
    });
  };
  const putFunc = () => {
    dispatch(changeLoadingRefresh(true));

    putDataFromApi(
      `/page/${pageData.filter((s) => s.name === "about")[0]._id}`,
      body
    ).then((res) => {
      if (res) {
        refreshFunc();
        setBody({
          content: res.content,
        });
        scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setErrorInfos({
          status: "",
          message: "Информация обновлена!",
          type: "success",
        });
        setErrorTrue(true);
        setTimeout(() => {
          setErrorTrue(false);
        }, 5000);
      } else {
        dispatch(changeLoadingRefresh(false));
        setErrorInfos({
          status: `Error Code ${1234}`,
          message: "Что-то пошло не так!",
          type: "error",
        });
        setErrorTrue(true);
        setTimeout(() => setErrorTrue(false), 3000);
        setBody({});
      }
    });
  };
  useEffect(() => {
    scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="about_section">
      <UniversalHead data={data} />
      <UniversalBody>
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
        <ReactQuillComponent
          body={body}
          reactRef={reactRef}
          setBody={setBody}
        />
        <Button onClick={putFunc}>Submit</Button>
      </UniversalBody>
    </div>
  );
}

export default About;
