import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { login } from "../app/authSlice"
import Button from "../components/Button.jsx"
import Input from "../components/Input.jsx"
import { toast } from "react-toastify"
import {useForm} from "react-hook-form"
import { useState } from "react"
import { data } from "autoprefixer"
import authservice from "../appwrite/auth.js"
const Signup=()=>{
    const navigate=useNavigate();
    const [error,seterror]=useState("");
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch();
    const { register, handleSubmit } = useForm();
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
    const create=async (data) =>{
        seterror("")
        try {
          setLoading(true);
            const userdata=await authservice.createAccount(data);
            if(userdata){
                dispatch(login(userdata));
            }
            document.getElementById("signup").close();
          setLoading(false);
          navigate("/");
          notifyOnSuccess(userdata.name);
        } catch (error) {
            setLoading(false);
            notifyOnError();
            seterror(error.message);
        } finally{
            setLoading(false);
        }
    }
    return (
      <>
          <div className="w-full bg-yellow-50 p-7 rounded">
              <h2 className="text-center text-2xl font-bold leading-tight">
                Sign up to create account
              </h2>
              <button className="absolute top-0 right-0 p-2" onClick={() => document.getElementById("signup").close()}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

              <button className="absolute top-0 right-0 p-2" onClick={() => document.getElementById("signup").close()}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
              <form onSubmit={handleSubmit(create)} className="mt-4">
                <div className="space-y-5">
                  <Input
                    type="name"
                    placeholder="Enter your name"
                    {...register("name", {
                      required: true,
                    })}
                  />
                  <Input
                    placeholder="Enter your email"
                    type="email"
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
                    placeholder="Enter your password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <Button type="submit" className="btn btn-lg w-full">
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </>

        )
}
// const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const { register, handleSubmit } = useForm();
//   const [loading, setLoading] = useState(false);
//   const currentTheme = localStorage.getItem("theme") ?? "light";
//   const toastTheme =
//     currentTheme == "light" ||
//     currentTheme == "cupcake" ||
//     currentTheme == "aqua" ||
//     currentTheme == "cyberpunk" ||
//     currentTheme == "wireframe"
//       ? "light"
//       : "dark";
//   const notifyOnSuccess = (user) =>
//     toast.success(`Welcome! back ${user}`, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: `${toastTheme}`,
//     });
//   const notifyOnError = () =>
//     toast.error("Something went wrong!", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: `${toastTheme}`,
//     });

//   const create = async (data) => {
//     setError("");
//     setLoading(true);
//     try {
//       const userData = await authService.createAccount(data);
//       if (userData) {
//         const userData = await authService.getCurrentUser();
//         if (userData) dispatch(login(userData));
//         // better way?
//         document.getElementById("signup").close();
//         setLoading(false);
//         navigate("/");
//         notifyOnSuccess(userData.name);
//       }
//     } catch (error) {
//       setLoading(false);
//       notifyOnError();
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <h2 className="text-center text-2xl font-bold leading-tight">
//         Sign up to create account
//       </h2>
//       {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
//       <form onSubmit={handleSubmit(create)} className="mt-4">
//         <div className="space-y-5">
//           <Input
//             type="name"
//             placeholder="Enter your name"
//             {...register("name", {
//               required: true,
//             })}
//           />
//           <Input
//             placeholder="Enter your email"
//             type="email"
//             {...register("email", {
//               required: true,
//               validate: {
//                 matchPatern: (value) =>
//                   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                   "Email address must be a valid address",
//               },
//             })}
//           />
//           <Input
//             type="password"
//             placeholder="Enter your password"
//             {...register("password", {
//               required: true,
//             })}
//           />
//           <Button type="submit" className="btn btn-lg w-full">
//             {loading ? (
//               <span className="loading loading-spinner"></span>
//             ) : (
//               "Create Account"
//             )}
//           </Button>
//         </div>
//       </form>
//     </>
//   );
// }


export default Signup;