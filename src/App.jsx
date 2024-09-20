// External Dependencies
import { lazy, useEffect, useState } from "react";

// CSS import
import "./App.css";

//React Router imports
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Custom component imports
import MainLayout from "./layouts/MainLayout.jsx";
import RegisterLayout from "./layouts/registerLayout/RegisterLayout.jsx";
import Login from "./pages/login/Login.jsx";
import { useSelector } from "react-redux";
import { fetchDataFromApi } from "./utils/api.js";

// Lazy-loaded component imports
const Posts = lazy(() => import("./pages/posts/Posts.jsx"));
const Category = lazy(() => import("./pages/category/Category.jsx"));
const Banner = lazy(() => import("./pages/banner/Banner.jsx"));
const Menu = lazy(() => import("./pages/menu/Menu.jsx"));
const AddPost = lazy(() => import("./pages/addPost/AddPost.jsx"));
const About = lazy(() => import("./pages/about/About.jsx"));
const Advertisers = lazy(() => import("./pages/advertisers/Advertisers.jsx"));

function App() {
  const { isLogged } = useSelector((state) => state.home);
  const [isToken, setIsToken] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetchDataFromApi("/users").then((res) => {
      if (!res.success) {
        setIsToken(false);
      } else {
        setIsToken(true);
      }
    });
  }, [isLogged]);
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        {isToken ? (
          <Route
            path='/'
            element={<MainLayout setLoading={setLoading} loading={loading} />}
          >
            <Route index element={<Posts />} />
            <Route path='/category' element={<Category />} />
            <Route path='/addPost' element={<AddPost />} />
            <Route path='/editPost' element={<AddPost />} />
            <Route path='/banner' element={<Banner />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/about' element={<About />} />
            <Route path='/advertisers' element={<Advertisers />} />
            <Route path='*' element={<Navigate to={"/"} />} />
          </Route>
        ) : (
          <Route path='/' element={<RegisterLayout />}>
            <Route index element={<Login />} />
            <Route path='*' element={<Navigate to={"/"} />} />
          </Route>
        )}
      </>
    )
  );
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
