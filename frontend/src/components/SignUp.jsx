import React from "react";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import "../css/signup.css";
import { useNavigate } from "react-router-dom";
import useUserContext from "../UserContext";

const SignUp = () => {
  const navigate = useNavigate;
 const {loggedIn}= useUserContext();
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    profile: Yup.string().required("Required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Required")
      .test("email", "Email already registered", function (email) {
        return checkAvailabilityEmail(email);
      }),
    password: Yup.string().min(8, "Too Short!").required("Required"),
    phone: Yup.string()
      .min(10, "Too Short!")
      .max(10, "Too Long!")
      //verify if all are numbers
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Required"),
  });

  //check if email is present
  const checkAvailabilityEmail = async (email) => {
    const res = await fetch("https://homehunt-b54g.onrender.com/user/checkemail/" + email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.status);
    if (res.status === 200) {
      return true;
    } else if (res.status === 401) {
      return false;
    }
  };
  const signupForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      profile: "",
    },
    onSubmit: async (values) => {
      if(loggedIn)
        {
          Swal.fire({
            icon: "error",
            title: "A user is Already Logged In",
            text: "Please logout to signup again",
          });
          return;
        }
      console.log(values);
      //sending request to backend
      const res = await fetch("https://homehunt-b54g.onrender.com/user/add", {
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
          title: "Signup Success",
          text: "Now Login To Continue",
        });
        //reset signup form

        signupForm.resetForm();
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Some error occured",
        });
      }
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="signup-bg">
      <div className="container d-flex justify-content-center">
        <div
          className="card signup-card p-5 pb-1 pt-3 shadow-lg signup-card w-50 mt-5 "
          style={{ border: "none" }}
        >
          <div className="card-body">
            <i
              className="fa-solid fa-lock fa-2x d-block text-center mb-3"
              style={{ color: "white" }}
            ></i>
            <h3 className="text-center" style={{ color: "white" }}>
              Sign Up
            </h3>
            <form
              action="#"
              method="POST"
              id="registration-form"
              onSubmit={signupForm.handleSubmit}
            >
              <div className="form-group">
                <p className="error-label">
                  {signupForm.touched.firstName
                    ? signupForm.errors.firstName
                    : ""}
                </p>

                <div className="d-flex">
                  <i
                    className="fa-solid fa-user fa-2x me-3"
                    style={{ color: "white" }}
                  ></i>
                  <input
                    name="firstName"
                    id="firstName-register"
                    className="form-control"
                    type="text"
                    placeholder="First Name"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.firstName}
                  />
                </div>
              </div>
              <div className="form-group">
                <p className="error-label">
                  {signupForm.touched.lastName
                    ? signupForm.errors.lastName
                    : ""}
                </p>

                <div className="d-flex">
                  <i
                    className="fa-solid fa-user fa-2x me-3"
                    style={{ color: "white" }}
                  ></i>
                  <input
                    name="lastName"
                    id="lastName-register"
                    className="form-control"
                    type="text"
                    placeholder="Last Name"
                    //   autoComplete="off"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.lastName}
                  />
                </div>
              </div>
              <div className="form-group">
                {/* <label htmlFor="type-register" className="text-muted mb-1">
              <small>Profile</small>
            </label> */}
                <p className="error-label">
                  {signupForm.touched.profile ? signupForm.errors.profile : ""}
                </p>
                <div className="d-flex">
                  <i
                    className="fa-solid fa-user-tie fa-2x me-3"
                    style={{ color: "white" }}
                  ></i>
                  <select
                    name="profile"
                    className="form-control text-muted"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.profile}
                  >
                    <option value="">Pick a profile</option>
                    <option value="Seller">Seller</option>
                    <option value="Buyer">Buyer</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <p className="error-label">
                  {signupForm.touched.email ? signupForm.errors.email : ""}
                </p>

                <div className="d-flex">
                  <i
                    className="fa-solid fa-envelope fa-2x me-3"
                    style={{ color: "white" }}
                  ></i>
                  <input
                    name="email"
                    id="email-register"
                    className="form-control"
                    type="text"
                    placeholder="you@example.com"
                    //   autoComplete="off"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.email}
                  />
                </div>
              </div>

              {/* make for phone as well */}
              <div className="form-group">
                <p className="error-label">
                  {signupForm.touched.phone ? signupForm.errors.phone : ""}
                </p>
                <div className="d-flex">
                  <i
                    className="fa-solid fa-phone fa-2x me-3"
                    style={{ color: "white" }}
                  ></i>
                  <input
                    name="phone"
                    id="phone-register"
                    className="form-control"
                    type="text"
                    placeholder="Phone Number"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.phone}
                  />
                </div>
              </div>
              <div className="form-group">
                {/* <label htmlFor="password-register" className="text-muted mb-1" >
              <small>Password</small>
            </label> */}
                <p className="error-label">
                  {signupForm.touched.password
                    ? signupForm.errors.password
                    : ""}
                </p>
                <div className="d-flex">
                  <i
                    className="fa-solid fa-key fa-2x me-3"
                    style={{ color: "white" }}
                  ></i>
                  <input
                    name="password"
                    id="password-register"
                    className="form-control"
                    type="password"
                    placeholder="Password here (Min 8 Characters)"
                    onChange={signupForm.handleChange}
                    value={signupForm.values.password}
                  />
                  <i
                    className="fa-solid fa-eye px-2"
                    style={{
                      marginLeft: "-35px",
                      marginTop: "10px",
                      color: "white",
                    }}
                    onClick={function () {
                      var x = document.getElementById("password-register");
                      if (x.type === "password") {
                        x.type = "text";
                      } else {
                        x.type = "password";
                      }
                    }}
                  ></i>
                </div>
              </div>
              {/* <label htmlFor="" className='form-label'>Profile Pic</label> */}

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="py-2 mt-4   btn rounded-5 btn-info "
                >
                  Sign up for Rentify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
