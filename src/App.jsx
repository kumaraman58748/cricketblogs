import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import Footer from "./components/footer/Footer"
import authservice from './appwrite/auth'
import { login,logout } from './app/authSlice'
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
function App() {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.authStatus);
  useEffect(() => {
    if (authStatus) {
      authservice
        .getCurrentUser()
        .then((userData) => {
          if (userData) dispatch(login(userData));
          else dispatch(logout());
        })
        .finally(() => setLoading(false));
    }
  }, [dispatch, authStatus]);
  return  !loading? (
    <div className=" min-h-0 flex flex-col max-w-10xl  ">
      <div className="flex-grow ">
        <Header />
        <main className="bg-base-200 p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
      <ToastContainer />
</div>

  ): (
    <div className="flex justify-center content-center h-screen">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
}
export default App;
