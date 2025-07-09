import {useDispatch} from "react-redux"
import {useForm} from "react-hook-form"
import { toast } from "react-toastify"
import { login as authlogin } from "../app/authSlice"
import authservice from "../appwrite/auth"
import {useNavigate} from "react-router-dom"
import { useState } from "react"
import Button from "../components/Button.jsx"
import Input from "../components/Input.jsx"

const Login=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { register, handleSubmit, setValue } = useForm();
    const currentTheme = localStorage.getItem("theme") ?? "light";
    const toastTheme =
        currentTheme == "light" ||
        currentTheme == "cupcake" ||
        currentTheme == "aqua" ||
        currentTheme == "cyberpunk" ||
        currentTheme == "wireframe"
        ? "light"
        : "dark";
        const notifyOnSuccess = (user) =>
            toast.success(`Welcome! back ${user}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: `${toastTheme}`,
            });
            const notifyOnError = () =>
                toast.error("Something went wrong!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: `${toastTheme}`,
                });
        const [error,setError]=useState("");
        const [loading,setLoading]=useState(false);
        const login=async (data)=>{
            setError("");
            try {
                setLoading(true);
                const session=await authservice.login(data);
                if(session){
                    const userdata=await  authservice.getCurrentuser();
                    console.log(userdata)
                    if (userdata) dispatch(authlogin(userdata));
                    // better way?
                    document.getElementById("login").close();
                    setLoading(false);
                    navigate("/");
                    notifyOnSuccess(userdata.name);
                    }
            } catch (error) {
                setLoading(false);
                notifyOnError();
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }
        return (
            <div className="w-full bg-yellow-50 p-7 rounded ">
                <button className="absolute top-0 right-0 p-2" onClick={() => document.getElementById("login").close()}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <h2 className="text-center text-2xl  bg-white font-bold leading-tight">
                  Sign in to your account
                </h2>
            { error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className="mt-4">
                 <div className="space-y-5">
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      className="text-white bg-white"
                      {...register("email", {
                        required: true,
                        validate: {
                          matchPatern: (value) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        },
                      })}
                    />
                    <Input
                      type="password"
                      className="text-white bg-white"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: true,
                      })}
                    />
            <Button type="submit" className="btn btn-lg w-full">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
          </Button>
           </div>
            </form>
        </div>

        )
}
export default Login
