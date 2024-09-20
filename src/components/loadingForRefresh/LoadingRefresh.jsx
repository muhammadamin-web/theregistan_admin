import "./style.scss";

function LoadingRefresh() {
  return (
    <section className="loading-refresh">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
}

export default LoadingRefresh;
