import React from "react";
import AuthContext from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";

const StripeCallback = () => {
    const {
        state: { user },
        dispatch,
      } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      axios.post("/api/get-account-status").then((res) => {
        // console.log(res);
        dispatch({
          type: "LOGIN_USER",
          payload: res.data,
        });
        window.localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/instructor";
      });
    }
  }, [user]);

  return (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 text-danger p-5"
    />
  );
};

export default StripeCallback;
