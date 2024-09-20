import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";
function RegisterLayout() {
  return (
    <section className="register-section">
      <Suspense fallback={<></>}>
        <Outlet />
      </Suspense>
    </section>
  );
}

export default RegisterLayout;
