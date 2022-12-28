import React from "react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { state: {user}, dispatch } = useContext(AuthContext);

  const router = useRouter();
  //Link to the Context API
  useEffect(() => {
   
    if(user){
      router.push('/user')
    }
  }, [user])
  

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`api/login`, {
        email,
        password,
      });
      setLoading(false);
      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });

      window.localStorage.setItem("user", JSON.stringify(data));

      toast.success("Login Successfull");
      router.push("/");
    } catch (err) {
      setLoading(false);
      toast.error("Invalid Credentials");
    }
  };

  return (
    <>
      <h1 className="jumbotron bg-primary squre text-center display-4">
        Login Here
      </h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label for="emailHere">Email</label>
            <input
              type="email"
              id="emailHere"
              className="form-control mb-4 mt-2"
              placeholder="Email Here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="PasswordHere">Password</label>
            <input
              type="password"
              id="PasswordHere"
              className="form-control mb-4 mt-2"
              placeholder="Password Here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary"
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Login"}
          </button>

          <p className="text-center p-2">
            Not Registered Yet?{" "}
            <Link href="/register">
              <a> SignUp Here </a>
            </Link>
          </p>


          <p className="text-center">
          Forgot Password ? 
            <Link href="/forgot-password">
            <a className="text-danger">Reset Password</a>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default login;
