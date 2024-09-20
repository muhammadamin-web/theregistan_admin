// Style
import "./style.scss";

// Custom Components
import UniversalHead from "../../components/UniversalHead.jsx";
import UniversalBody from "../../components/UniversalBody.jsx";
import LeftBanner from "../../components/bannerComponents/LeftBanner.jsx";
import RightBanner from "../../components/bannerComponents/RightBanner.jsx";

// Constants
const data = { title: "Banner", btn: "" };
function Banner() {
  return (
    <div className={"banner_section"}>
      <UniversalHead data={data} />
      <UniversalBody>
        <div className={"banner_body"}>
          <LeftBanner />
          <RightBanner />
        </div>
      </UniversalBody>
    </div>
  );
}

export default Banner;
