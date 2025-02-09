// import  Post  from "../components/post/Post.jsx";
// const AddPost = () => {
//   return (
//     <div className="w-full md:w-1/2 lg:w-2/3 mx-auto bg-base-100 p-6 rounded shadow-lg">
//       <Post />
//     </div>
//   );
// };

// export default AddPost;
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Post from "../components/post/Post.jsx";

const AddPost = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [isEmailVerified, setIsEmailVerified] = useState(null); // Initially null (to prevent premature checks)
  const [isChecking, setIsChecking] = useState(true); // Loading state

  useEffect(() => {
    if (userData) {
      setIsEmailVerified(userData.emailVerification);
      setIsChecking(false); // Stop checking after setting verification status
    }
  }, [userData]);

  useEffect(() => {
    if (!isChecking && isEmailVerified === false) {
      setTimeout(() => {
        toast.error("You must verify your email to add a post!");
        navigate("/");
      }, 1500); // 1.5-second delay
    }
  }, [isEmailVerified, isChecking, navigate]);

  // Show nothing while checking verification status
  if (isChecking) return null;

  // If not verified, don't render the component (redirect happens in useEffect)
  if (!isEmailVerified) return null;

  return (
    <div className="w-full md:w-1/2 lg:w-2/3 mx-auto bg-base-100 p-6 rounded shadow-lg">
      <Post />
    </div>
  );
};

export default AddPost;
