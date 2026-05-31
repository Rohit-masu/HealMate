import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { assets } from "../assets/assets";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/google-login`, {
        token: credentialResponse.credential
      });
      
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Google Login Successful");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google Login Failed");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Login/Register Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <section className="grid min-h-[80vh] items-center gap-8 py-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="hidden overflow-hidden rounded-[2rem] bg-gradient-to-br from-teal-950 via-teal-800 to-emerald-600 p-8 text-white shadow-2xl shadow-teal-950/20 lg:block">
        <div className="mb-10 w-fit rounded-2xl bg-white px-4 py-3">
          <img className="w-40" src={assets.logo} alt="HealMate" />
        </div>
        <p className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100 w-fit">Patient access</p>
        <h1 className="font-display mt-6 text-5xl font-bold leading-tight">Your health profile, appointments, and doctors in one place.</h1>
        <p className="mt-5 max-w-lg text-sm leading-6 text-emerald-50/90">Sign in to book consultations, update your personal information, and keep upcoming visits easy to track.</p>
      </div>

      <form onSubmit={onSubmitHandler} className="mx-auto w-full max-w-md rounded-[2rem] border border-teal-100 bg-white p-6 text-sm text-slate-600 shadow-xl shadow-teal-950/10 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{state === "Sign Up" ? "Join HealMate" : "Welcome back"}</p>
        <h2 className="font-display mt-3 text-3xl font-bold text-slate-900">
          {state === "Sign Up" ? "Create your account" : "Login to HealMate"}
        </h2>
        <p className="mt-2 leading-6">
          {state === "Sign Up" ? "Set up your patient profile to book appointments faster." : "Access your profile and manage appointments securely."}
        </p>

        <div className="mt-7 flex flex-col gap-4">
          {state === "Sign Up" && (
            <label className="w-full">
              <span className="font-medium text-slate-700">Full Name</span>
              <input
                className="mt-2 w-full rounded-xl border border-teal-100 bg-teal-50/40 p-3 outline-none transition focus:border-primary focus:bg-white"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </label>
          )}

          <label className="w-full">
            <span className="font-medium text-slate-700">Email</span>
            <input
              className="mt-2 w-full rounded-xl border border-teal-100 bg-teal-50/40 p-3 outline-none transition focus:border-primary focus:bg-white"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </label>
          <label className="w-full">
            <span className="font-medium text-slate-700">Password</span>
            <input
              className="mt-2 w-full rounded-xl border border-teal-100 bg-teal-50/40 p-3 outline-none transition focus:border-primary focus:bg-white"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-primary py-3 text-base font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:-translate-y-0.5 hover:bg-teal-800"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="mt-5 flex w-full flex-col items-center gap-3">
          <div className="flex w-full items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-teal-100"></span>
            OR
            <span className="h-px flex-1 bg-teal-100"></span>
          </div>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google Login Failed")}
            useOneTap
            theme="outline"
            shape="pill"
            width="100%"
          />
        </div>

        {state === "Sign Up" ? (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="cursor-pointer font-semibold text-primary"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="cursor-pointer font-semibold text-primary"
            >
              Sign up here
            </span>
          </p>
        )}
      </form>
    </section>
  );
};

export default Login;
