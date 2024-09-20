import { useSelector } from "react-redux";
import LoadingRefresh from "./loadingForRefresh/LoadingRefresh.jsx";
import "./universal.scss";

function UniversalBody({ children }) {
  const { loadingRefresh } = useSelector((state) => state.home);
  return (
    <div className="universal_body">
      {loadingRefresh && <LoadingRefresh />}
      {children}
    </div>
  );
}

export default UniversalBody;
