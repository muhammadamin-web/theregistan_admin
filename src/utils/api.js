import axios from "axios";

const BASE_URL = "https://api.theregistan.uz/v1/api";
export const BASE_IMG_URL = "https://api.theregistan.uz/upload/";

export const fetchDataFromApi = async (url, params) => {
  const TMDB_TOKEN = localStorage.getItem("token");
  const headers = {
    Authorization: `${TMDB_TOKEN}`,
  };
  try {
    const { data } = await axios.get(BASE_URL + url, { headers });
    return data;
  } catch (err) {
    return err;
  }
};
export const postDataFromApi = async (url, body) => {
  const TMDB_TOKEN = localStorage.getItem("token");
  const headers = {
    Authorization: `${TMDB_TOKEN}`,
  };
  try {
    const { data } = await axios.post(BASE_URL + url, body, { headers });
    return data;
  } catch ({ response }) {
    return response;
  }
};

export const putDataFromApi = async (url, body) => {
  const TMDB_TOKEN = localStorage.getItem("token");
  const headers = {
    Authorization: `${TMDB_TOKEN}`,
  };
  try {
    const { data } = await axios.put(BASE_URL + url, body, { headers });
    return data;
  } catch ({ response }) {
    return response;
  }
};

export const deleteDataFromApi = async (url) => {
  const TMDB_TOKEN = localStorage.getItem("token");
  const headers = {
    Authorization: `${TMDB_TOKEN}`,
  };
  try {
    const { data } = await axios.delete(BASE_URL + url, { headers });
    return data;
  } catch ({ response }) {
    return response;
  }
};
