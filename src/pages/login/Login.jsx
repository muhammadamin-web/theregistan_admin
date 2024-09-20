import { useState } from "react";
import Button from "../../UI/button/Button.jsx";
import ErrorRegisterMessage from "../../components/registerComponents/ErrorRegisterMessage.jsx";
import RegisterBottom from "../../components/registerComponents/RegisterBottom.jsx";
import RegisterHead from "../../components/registerComponents/RegisterHead.jsx";
import "./style.scss";
import { TbEye, TbEyeOff, TbLoader, TbLogin2 } from "react-icons/tb";
import { postDataFromApi } from "../../utils/api.js";
import { useDispatch, useSelector } from "react-redux";
import { changeIsLogged } from "../../store/homeSlice.js";

function Login() {
  const { isLogged } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const [body, setBody] = useState({ email: "", password: "" });
  const [isTrue, setIstrue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isBorder, setIsBorder] = useState({ email: false, password: false });
  const [userFound, setUserFound] = useState(true);
  const [errText, setErrText] = useState("");

  const handleSubmit = () => {
    setIsLoading(true); // Yuklash jarayonini ko'rsatish
    setIstrue(false); // Har safar yangi xatolarni yashirish

    // Email va parol bo'lsa so'rov yuborish
    if (body.email && body.password) {
      postDataFromApi("/users/login", body)
        .then((res) => {
          // Xatolarni boshqarish
          if (res?.data?.success === false) {
            setUserFound(false);
            setErrText(res?.data?.message || "Login yoki parol noto'g'ri");
            setIsLoading(false);
            setIstrue(true);
          } else {
            // Agar foydalanuvchi oddiy user bo'lsa va admin yoki muallif bo'lmasa
            if (res?.data?.role === "user") {
              setErrText("Access denied. You are not an author or admin.");
              setIstrue(true);
            } else {
              // Tokenni localStorage ga saqlash
              if (res.token) {
                localStorage.setItem("token", res.token);
                dispatch(changeIsLogged(!isLogged));
              } else {
                setErrText("Tokenni olishda xatolik yuz berdi");
                setIstrue(true);
              }
            }
            setIsLoading(false); // Yuklash jarayonini to'xtatish
          }
        })
        .catch((error) => {
          setErrText("Server bilan bog'lanishda xatolik yuz berdi");
          setUserFound(false);
          setIstrue(true);
          setIsLoading(false); // Yuklash jarayonini to'xtatish
        });
    } else {
      // Agar email yoki parol bo'lmasa
      setTimeout(() => {
        setUserFound(true);
        setIstrue(true);
        setIsBorder({ email: !body.email, password: !body.password });
        setIsLoading(false);
      }, 1000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="register-form"
    >
      <RegisterHead maintext={"Login"} smallText={"Enter your login details"} />

      <div className="form-input-div">
        <label htmlFor="email">Email</label>
        <input
          style={isBorder.email ? { borderColor: "#FF3535" } : {}}
          onChange={(e) => {
            setBody({ ...body, email: e.target.value });
            setIstrue(false);
            setIsBorder({ ...isBorder, email: false });
          }}
          type="email"
          placeholder="Your email"
          value={body.email}
        />
      </div>

      <div className="form-input-div">
        <label htmlFor="password">Password</label>
        <div>
          <input
            style={isBorder.password ? { borderColor: "#FF3535" } : {}}
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            value={body.password}
            onChange={(e) => {
              setBody({ ...body, password: e.target.value });
              setIsBorder({ ...isBorder, password: false });
              setIstrue(false);
            }}
          />
          {body.password &&
            (showPassword ? (
              <TbEye onClick={togglePasswordVisibility} />
            ) : (
              <TbEyeOff onClick={togglePasswordVisibility} />
            ))}
        </div>
      </div>

      <Button>
        <span className={isLoading ? "loading" : ""}>
          {isLoading ? <TbLoader /> : <TbLogin2 />}
        </span>
        {isLoading ? "Loading..." : "Login"}
      </Button>

      {isTrue && <ErrorRegisterMessage errText={errText} access={userFound} />}
    </form>
  );
}

export default Login;
