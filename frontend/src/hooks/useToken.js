const useToken = () => {
  const getToken = () => {
    if (localStorage) {
      let token = localStorage.getItem("token");
      if (token) return JSON.parse(token);
    }

    return null;
  };
  const setToken = (token) => {
    localStorage.token = JSON.stringify(token);
  };
  const clearToken = () => {
    localStorage.removeItem("token");
  };

  return { token: getToken(), setToken, clearToken };
};

export default useToken;