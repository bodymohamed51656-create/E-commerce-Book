import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError("");

    try {
      const apiUrl = "https://bookstore.eraasoft.pro/api/register";

      const response = await axios.post(apiUrl, {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        password_confirmation: values.password,
      });

      console.log(response.data);
      alert("Account created successfully!");
      navigate("/Login");
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.response) {
        console.log("Server Error Details:", error.response.data);
        setServerError(error.response.data.message || "Error creating account");
      } else {
        setServerError("Network error. Please check your connection.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    
      <Navbar/>
   
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 font-sans  py-10">
        <div className="w-full m-15 max-w-lg bg-white border-2 border-purple-400 p-8 shadow-sm rounded-md">
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-2">
            Create Account
          </h2>

          {serverError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded border border-red-200 text-center">
              {serverError}
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 text-sm">
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 text-sm">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-xs font-bold text-purple-600 hover:text-purple-800 uppercase"
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="rePassword"
                      placeholder="Confirm password"
                      className="w-full px-4 py-3 text-black bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3.5 text-xs font-bold text-purple-600 hover:text-purple-800 uppercase"
                    >
                      {showConfirmPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                  <ErrorMessage
                    name="rePassword"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-white font-bold py-3 rounded-lg shadow-md transition duration-300 mt-4 ${
                    isSubmitting
                      ? "bg-fuchsia-300 cursor-not-allowed"
                      : "bg-fuchsia-500 hover:bg-fuchsia-600"
                  }`}
                >
                  {isSubmitting ? "Creating Account..." : "Sign Up"}
                </button>

                <div className="text-center text-sm text-gray-600 mt-2">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-purple-600 font-bold hover:underline"
                  >
                    Login
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
}
