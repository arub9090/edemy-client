import React from "react";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import UserRoute from "../../component/routes/UserRoute";

import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(AuthContext);

  if (user == null) {
    console.log("I got NO user");
  } else {
    // console.log("There is User", user);
  }

  const becomeInstructor = () => {
    console.log("become a inctructor");
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast("Stripe Onboarding Failed, Try again");
        setLoading(false);
      });
  };

  return (
    <>
      <div className="jumbotron text-center square display-6">
        <p> Become an eDemy Instructor {user && user.name}</p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pt-4">
              <UserSwitchOutlined className="display-1 pb-3" />
              <br />
              <h2>Setup payout to publish courses on Edemy</h2>
              <p className="lead text-warning">
                Edemy partners with stripe to transfer earnings to your bank
                account
              </p>

              <Button
                className="mb-3"
                type="primary"
                block
                shape="round"
                icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size="large"
                onClick={becomeInstructor}
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
              >
                {loading ? "Processing..." : "Payout Setup"}
              </Button>

              <p className="lead">
                You will be redirected to stripe to complete onboarding process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
