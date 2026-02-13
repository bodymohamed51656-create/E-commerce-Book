import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom"; // ضفت Link عشان نستخدمه بدل a href
import { useAuth } from "../context/AuthContext"; // 👈 1. استدعاء الكونتكست

export default function Login() {
  const Navigate = useNavigate();
  const { login } = useAuth(); // 👈 2. استخراج دالة الدخول
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError("");

    try {
      const apiUrl = "https://bookstore.eraasoft.pro/api/login";

      const response = await axios.post(apiUrl, {
        email: values.email,
        password: values.password,
      });

      const apiResponse = response.data;

    
      if (response.status === 200 || apiResponse.statusCode === 200) {
        
     
        const responseData = apiResponse.data;
        
        const userData = {
          name: responseData.user?.name || "User", 
          email: values.email,
          avatar: "https://i.pravatar.cc/150?img=12" 
        };
        const token = responseData.token;

       
        login(userData, token);

        alert(apiResponse.message || "Login Successful");
        Navigate("/"); 
      }
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        setServerError(error.response.data.message || "Invalid credentials");
      } else {
        setServerError("Network error, please check your connection");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className=" min-h-screen flex flex-col items-center justify-center bg-gray-50 font-sans">
        <div className="w-full max-w-md bg-white border-2 border-purple-400 p-8 shadow-sm rounded-lg">
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-8">
            Welcome Back!
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
              <Form className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-3 bg-gray-50 border text-black border-gray-300 rounded focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-semibold mb-1"
                  >
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
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center text-gray-600 cursor-pointer select-none">
                    <Field type="checkbox"  name="rememberM" className="mr-2 accent-purple-600 w-4 h-4" />
                    Remember me
                  </label>
                  <Link  to="/ForgetPassword"  className="text-purple-600 hover:underline font-medium" >
                    Forget password?
                  </Link>
                </div>

                <button  type="submit"  disabled={isSubmitting}
                  className={`w-full text-white font-bold py-3 rounded-lg shadow-md transition duration-300 mt-2 ${
                    isSubmitting
                      ? "bg-fuchsia-300 cursor-not-allowed"
                      : "bg-fuchsia-500 hover:bg-fuchsia-600"
                  }`}
                >
                  {" "}
                  {isSubmitting ? "Logging in..." : "Log In"}{" "}
                </button>

                <div className="text-center text-sm text-gray-600 mt-2">
                  Don't have an account?{" "}
                  <Link
                    to="/Signup"
                    className="text-purple-600 font-bold hover:underline"
                  >
                    Signup
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}