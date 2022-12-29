import { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducer/authReducer";
import axios from "axios";
import { useRouter } from "next/router";

// initial state
const initialState = {
  user: null,
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "LOGIN_USER",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  axios.interceptors.response.use(
    function (response) {
      // for any code that falls under 2xx or not the error or probematic one

      return response;
    },
    function (error) {
      // if the error code falls under 4xxx do something here
      let res = error.response;
      if (res.status === 401 && res.config && !res.config._isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then((data) => {
              console.log("/401 error here");
              dispatch({
                type: "LOGOUT_USER",
              });
              window.localStorage.removeItem("user");
              router.push("/login");
            })

            .catch((err) => {
              console.log("AXIOS enterceptor error", err);
              reject(error);
            });
        });
      }

      return Promise.reject(error);
    }
  );
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get("/api/csrf-token");
      axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
