// External Dependencies
import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";

// Style
import style from "./style.module.scss";

// Custom Components
import UniversalHead from "../../components/UniversalHead.jsx";
import { useSelector } from "react-redux";
import LoadingRefresh from "../../components/loadingForRefresh/LoadingRefresh.jsx";
const AddPostComp = lazy(() =>
  import("../../components/addPostComp/AddPostComp.jsx")
);

// Constants
const postData = [
  {
    btntext: "Upload Photo",
    finalBtn: "Add",
  },
  {
    btntext: "Change Photo",
    finalBtn: "Change",
  },
];

function AddPost() {
  let locat = useLocation();
  const { loadingRefresh } = useSelector((state) => state.home);
  const bool = locat.pathname == "/addPost";
  const data = bool
    ? { title: "Add Post", btn: "Back to Posts", link: "/" }
    : { title: "Edit Post", btn: "Back to Posts", link: "/" };



  return (
    <section className={style.addPost_section}>
      <UniversalHead data={data} />
      <Suspense fallback={<div>Loading...</div>}>
        {loadingRefresh && <LoadingRefresh />}
        <AddPostComp infos={bool ? postData[0] : postData[1]} />
      </Suspense>
    </section>
  );
}

export default AddPost;
