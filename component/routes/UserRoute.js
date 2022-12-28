import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";

// making a Protected Route
function UserRoute({ children, showNav = true }) {
  const [ok, setOk] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      if (data.ok) {
        console.log("YOU GOT ok");
        setOk(true);
      }
    } catch (error) {
      console.log(error);
      setOk(false);
      router.push("/login");
    }
  };
  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">{showNav && <UserNav />}</div>

              <div className="col-md-10">{children}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserRoute;
