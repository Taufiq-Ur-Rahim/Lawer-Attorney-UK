import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Utils/Axios";
import { Store } from "../../Utils/Store";
import PageTitle from "./include/PageTitle";

function Login({ title }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [islawyer] = useState(false);
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { UserInfo } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { email, password };
      const response = await api.post("/auth/login", userData);
      console.log("Hitting");
      if (response.data.success) {
        const userType = response.data.userType;
        const userDocument = response.data.userDocument._doc;

        console.log("response");
        console.log(response);
        console.log("🔍 Login - userDocument:", response.data.userDocument);
        console.log("🔍 Login - userDocument._doc:", response.data.userDocument._doc);

        dispatch({
          type: "UserLoggedIn",
          payload: userDocument,
        });

        localStorage.setItem("UserInfo", JSON.stringify(userDocument));
        console.log("🔍 Login - Stored in localStorage:", localStorage.getItem("UserInfo"));

        if (response.data.userDocument._doc.isAdmin) {
          toast.success("Login Successful as an Admin");
          navigate("/admin/dashboard");
        } else if (userType === "lawyer") {
          toast.success("Login Successful as a Lawyer");
          navigate("/user/dashboard");
        } else if (userType === "user") {
          toast.success("Login Successful as an User");
          navigate("/attorneys");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const validationErrors = error.response.data.errors;

        validationErrors.forEach((error) => {
          toast.error(error.msg);
        });
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageTitle title={title} />
      <div className="container align-content-center">
        <div className="mt-5 mb-5" style={{ justifyContent: "center"}}>
          <div className="col-md-8 justify-content-center">
            <div className="card shadow-sm px-40 mx-auto ">
              <h3 className="card-title text-center mb-4">Sign In</h3>
              <form className="login" id="login_form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group form-check mt-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Remember me
                  </label>
                </div>
                <div style={{ marginBottom: "30px" }}>
                  <button type="submit" className="btn btn-primary w-100 mt-4">
                    Submit
                  </button>
                </div>

                <div style={{ marginBottom: "30px"}}>
                  <h5 style={{textAlign:"center"}}>
                    OR
                  </h5>
                </div>

                <div className="mt-4 text-center">
                  <p style={{ display: "inline-block" }}>
                    Don't have an account?{" "}
                  </p>
                  <Link to="/registration" style={{ display: "inline-block",paddingLeft:"4px"}}>
                    Sign up >
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
