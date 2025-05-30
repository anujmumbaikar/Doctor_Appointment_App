import React, { useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const {backendUrl,accessToken,setAccessToken} = useContext(AppContext)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(state === 'Sign Up'){
        const {data} = await axios.post(`${backendUrl}/api/v1/user/register`,{name,email,password})
        if(data.success){
          localStorage.setItem('accessToken',data.data.accessToken)
          setAccessToken(data.data.accessToken)
        }else{
          toast.error(data.message)
        }
      } else{
        const {data} = await axios.post(`${backendUrl}/api/v1/user/login`,{email,password})
        console.log(data);
        if(data.success){
          localStorage.setItem('accessToken',data.data.accessToken)
          setAccessToken(data.data.accessToken)
          toast.success(data.message)
          navigate('/')
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 py-10 px-10 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "Sign up" : "Log in"} to book
          appointment
        </p>

        <div className="w-full">
          {state === "Sign Up" ? (
            <>
              <p>Full Name</p>
              <input
                className="border border-zinc-300 rounded-lg w-full p-2 mt-1"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </>
          ) : (
            ""
          )}
        </div>
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zonc-300 rounded-lg w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zonc-300 rounded-lg w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type="submit" className="bg-blue-400 text-white rounded-md px-7 py-3 w-full font-medium">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?
            <span
              onClick={() => setState("Login")}
              className="text-blue-600 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-600 underline cursor-pointer"
            >
              Sign up here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
