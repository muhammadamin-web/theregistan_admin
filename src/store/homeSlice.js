import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    isShow: false,
    posts: [],
    categories: [],
    postBody: {},
    isLogged: false,
    loadingRefresh: false,
    currentId: "",
    currentImgId: "",
    warningPopUp: false,
    currentImgUrl: "",
    bannerData: {},
    topBanner: {},
    postsWithAllInfos: {},
    pageNumber: 1,
    pageData: [],
    menu: [],
  },
  reducers: {
    putPosts: (state, action) => {
      state.posts = action.payload;
    },
    putCategories: (state, action) => {
      state.categories = action.payload;
    },
    putBody: (state, action) => {
      state.postBody = action.payload;
    },
    changeShow: (state, action) => {
      state.isShow = action.payload;
    },
    changeIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    changeLoadingRefresh: (state, action) => {
      state.loadingRefresh = action.payload;
    },
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
    setCurrentImgId: (state, action) => {
      state.currentImgId = action.payload;
    },
    setWarningPopUp: (state, action) => {
      state.warningPopUp = action.payload;
    },
    setCurrentImgUrl: (state, action) => {
      state.currentImgUrl = action.payload;
    },
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setPageData: (state, action) => {
      state.pageData = action.payload;
    },
    setTopBanner: (state, action) => {
      state.topBanner = action.payload;
    },
    setAllPosts: (state, action) => {
      state.postsWithAllInfos = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
});
export const {
  putPosts,
  putCategories,
  putBody,
  changeShow,
  changeIsLogged,
  changeLoadingRefresh,
  setCurrentId,
  setWarningPopUp,
  setCurrentImgId,
  setCurrentImgUrl,
  setBannerData,
  setTopBanner,
  setAllPosts,
  setPageNumber,
  setMenu,
  setPageData,
} = homeSlice.actions;

export default homeSlice.reducer;
