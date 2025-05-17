import axios from "axios";
// export const rootApiUrl = "https://api.techtitan.madagascar.webcup.hodi.host/api" // "http://localhost:9002/api"; // 
export const rootApiUrl = "http://localhost:9002/api" // "http://localhost:9002/api"; // 
export const aiUrl = "https://royal-tilapia.com/face";
export const imgUrl = "https://api.techtitan.madagascar.webcup.hodi.host/public" // "http://localhost:9002/public"; // 

const useHttps = () => {
  const http = axios.create({
    baseURL: rootApiUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fileHttp = axios.create({
    baseURL: rootApiUrl,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const aiFileHttp = axios.create({
    baseURL: aiUrl,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return {
    http,
    fileHttp,
    aiFileHttp,
  };
};

export default useHttps;
