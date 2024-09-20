// External Dependencies
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Style
import "./style.scss";

// Custom Components
import ReactQuillComponent from "../reactQuill/ReactQuillComponent.jsx";
import { TbLoader } from "react-icons/tb";
import { getCurrentDate } from "../getCurrentDate/GetCurrentDate.jsx";
import FormImgDiv from "../formImgDiv/FormImgDiv.jsx";
import { FormInputGroup1, FormInputGroup2 } from "../blank.jsx";

// Utility functions
import {
  deleteDataFromApi,
  postDataFromApi,
  putDataFromApi,
} from "../../utils/api.js";

// Redux Actions
import {
  changeLoadingRefresh,
  // putBody,
  setCurrentImgId,
  setCurrentImgUrl,
} from "../../store/homeSlice.js";

function AddPostComp() {
  // Redux
  const dispatch = useDispatch();
  const { categories, currentId, postBody, currentImgUrl, currentImgId } =
    useSelector((state) => state.home);

  // React Router
  const location = useLocation();
  const navigate = useNavigate();

  // State
  const isEditing = location.pathname === "/editPost";
  const [imgUrl, setImgUrl] = useState(currentImgUrl);
  const [imgData, setImgData] = useState();
  const [loading, setLoading] = useState(false);
  // if (!isEditing) {
  //   dispatch(putBody(""));
  //   console.log(1);
  // }
  // Ref
  const imgRef = useRef();
  const reactRef = useRef();

  const [body, setBody] = useState(
    postBody.title
      ? { ...postBody }
      : {
          title: "",
          readTime: "",
          bgColor: "#ffffff",
          textColor: "#000000",
          isColored: false,
          category: [],
          content: { data: "" },
          image: "",
          date: getCurrentDate(),
        }
  );
  // useEffect for Editing
  useEffect(() => {
    if (isEditing) {
      if (Object.keys(postBody).length === 0) {
        navigate("/");
      } else {
        setBody({
          ...postBody,
          isColored: postBody.isColored,
          date: postBody.date.slice(0, 10),
          category: postBody.category.map((categ) => categ._id),
        });
      }
    }
  }, [isEditing, postBody, navigate]);
  // Helper Function to Change Color
  const changeColor = () => {
    setBody({
      ...body,
      bgColor: "#ffffff",
      textColor: "#000000",
      isColored: false,
    });
  };

  // API Calls
  const postFunc = () => {
    setLoading(true);
    postDataFromApi("/image/upload", imgData)
      .then((res) => {
        const categoryData = imgData
          ? {
              ...body,
              image: res.data._id,
            }
          : { ...body };
        return postDataFromApi("/news", categoryData);
      })
      .then((res) => {
        if (res.success) {
          navigate("/");
          dispatch(changeLoadingRefresh(true));
        }
      })
      .finally(() => {
        console.log(body);
        setLoading(false);
        dispatch(setCurrentImgUrl(""));
      });
  };

  const putFunc = async () => {
    setLoading(true);
    try {
      const hasImg = !!imgData;
      const hasImgId = !!currentImgId;
      if (imgUrl && hasImg && hasImgId) {
        await deleteDataFromApi(`/image/${currentImgId}`);
      } else if (!imgUrl && hasImgId) {
        await deleteDataFromApi(`/image/${currentImgId}`);
      }

      const newsData = hasImg
        ? {
            ...body,
            image: (await postDataFromApi("/image/upload", imgData)).data._id,
          }
        : body;

      await putDataFromApi(`/news/${currentId}`, newsData);
      setImgData("");
      navigate("/");
      dispatch(changeLoadingRefresh(true));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setImgUrl("");
      dispatch(setCurrentImgUrl(""));
      setCurrentImgId("");
    }
  };
  return (
    <div className="addPost_body">
      <form>
        <FormImgDiv
          imgRef={imgRef}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          setImgData={setImgData}
        />
        <div className="form_inputs_div">
          <FormInputGroup1
            body={body}
            setBody={setBody}
            categories={categories}
            changeColor={changeColor}
          />
          <FormInputGroup2
            body={body}
            setBody={setBody}
            changeColor={changeColor}
          />
        </div>
        <ReactQuillComponent
          reactRef={reactRef}
          setBody={setBody}
          body={body}
        />
        <button
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            isEditing ? putFunc() : postFunc();
          }}
        >
          {loading ? "Loading" : isEditing ? "Edit" : "Submit"}
          {loading && <TbLoader className={loading ? "loading" : ""} />}
        </button>
      </form>
    </div>
  );
}

export default AddPostComp;
