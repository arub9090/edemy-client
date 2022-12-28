import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
function register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {state: { user }, dispatch} = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`api/register`, {
        name,
        email,
        password,
      });
      setLoading(false);
      toast.success("Registration Successfull");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <>
      {!user && (
        <>
          <h1 className="jumbotron bg-primary squre text-center display-4">
            Register Here
          </h1>
          <div className="container col-md-4 offset-md-4 pb-5">
            <form onSubmit={onSubmitHandler}>
              <div className="form-group">
                <label for="nameHere">Name</label>
                <input
                  type="text"
                  id="nameHere"
                  className="form-control mb-4 mt-2"
                  placeholder="Name Here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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
                disabled={!name || !email || !password || loading}
              >
                {loading ? <SyncOutlined spin /> : "Submit Here"}
              </button>

              <p className="text-center p-3">
                Already Registered?{" "}
                <Link href="/login">
                  <a> Login Here </a>
                </Link>
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default register;
