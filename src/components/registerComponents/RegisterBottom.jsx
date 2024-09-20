import "./style.scss";
import { Link } from "react-router-dom";

function RegisterBottom({ text, link, path }) {
  return (
    <div className="reg-bottom text-center">
      {text} <Link to={path}>{link}</Link>
    </div>
  );
}

export default RegisterBottom;
