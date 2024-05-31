import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/login.css";
import useUserContext from "../UserContext";

const Login = () => {


  const { setLoggedIn,setBuyer, setSeller, setCurrentUser} = useUserContext();
  const navigate = useNavigate(); 
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);

      //submit values to backend
      const res = await fetch("http://localhost:5000/user/authenticate", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.status);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Login Successful !!",
        });

         const data = await res.json();
         sessionStorage.setItem('user',JSON.stringify(data));
         setCurrentUser(data);
          setLoggedIn(true);
          if(data.profile === "Buyer"){
            setBuyer(true);
            navigate('/houses');
          }else{
            setSeller(true);
            navigate('/myhouses');
          }


      } else if (res.status === 401) {
        Swal.fire(
          "Invalid Credentials",
          "Please check your credentials and try again.",
          "warning"
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Some error occured",
        });
      }
    },
    validationSchema: loginSchema,
  });

  return (
    <div className="bg-login">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="card login-card card-shadow-lg mb-5 w-25"
          style={{ width: "350px" }}
        >
          <div className="card-body py-3 px-5 login">
            <i
              className="fa-solid fa-lock fa-2x d-block text-center"
              style={{ color: "white" }}
            ></i>
            <h3 className="text-center" style={{ color: "white" }}>
              Login
            </h3>
            <form onSubmit={loginForm.handleSubmit}>
              <div className="form-group py-2">
                <p className="error-label">
                  {loginForm.touched.email ? loginForm.errors.email : ""}
                </p>
                <div className="d-flex">
                  <i
                    className="fa-solid fa-envelope fa-2x me-3"
                    style={{ color: "white" }}
                  ></i>

                  <input
                    type=""
                    className="form-control mb-2 p-2"
                    id="Email"
                    placeholder="Enter email"
                    name="email"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.email}
                  />
                </div>

                <p className="error-label">
                  {loginForm.touched.password ? loginForm.errors.password : ""}
                </p>
                <div className="d-flex">
                  <i
                    className="fa-solid fa-key fa-2x me-3"
                    style={{ color: "white" }}
                  ></i>
                  <input
                    type="password"
                    className="form-control mb-3 p-2"
                    id="pass"
                    placeholder="Enter Password"
                    name="password"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.password}
                  />
                  <i
                    className="fa-solid fa-eye px-2"
                    style={{ marginLeft: "-35px", marginTop: "10px" }}
                    onClick={function () {
                      var x = document.getElementById("pass");
                      if (x.type === "password") {
                        x.type = "text";
                      } else {
                        x.type = "password";
                      }
                    }}
                  ></i>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-info w-75 rounded-5 mt-2 mb-1"
                >
                  LOG IN
                </button>
              </div>
            </form>

            {/* <p className='text-center mt-2'>No Account?
                <Link to="/signup" className='fw-bold text-success text-decoration-none'>Create One</Link>
               </p>
     */}
            <h5 className="text-white text-center pt-1">No account?</h5>
            <Link
              to="/signup"
              className="d-flex justify-content-center text-decoration-none"
            >
              <button
                type="submit"
                className="py-1 mt-2 w-75 rounded-5 btn btn-lg btn-info "
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
