// import  Post  from "../components/post/Post.jsx";
// const AddPost = () => {
//   return (
//     <div className="w-full md:w-1/2 lg:w-2/3 mx-auto bg-base-100 p-6 rounded shadow-lg">
//       <Post />
//     </div>
//   );
// };

// export default AddPost;
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Post from "../components/post/Post.jsx";

// const AddPost = () => {
//   const navigate = useNavigate();
//   const userData = useSelector((state) => state.auth.userData);
//   const [isEmailVerified, setIsEmailVerified] = useState(null); // Initially null (to prevent premature checks)
//   const [isChecking, setIsChecking] = useState(true); // Loading state

//   useEffect(() => {
//     if ( userData) {
//       setIsEmailVerified(userData.emailVerification);
//       setIsChecking(false); // Stop checking after setting verification status
//     }
//   }, [userData]);

//   useEffect(() => {
//     if (!isChecking && isEmailVerified === false) {
//       setTimeout(() => {
//         toast.error("You must verify your email to add a post!");
//         navigate("/");
//       }, 1500); // 1.5-second delay
//     }
//   }, [isEmailVerified, isChecking, navigate]);

//   // Show nothing while checking verification status
//   if (isChecking) return null;

//   // If not verified, don't render the component (redirect happens in useEffect)
//   if (!isEmailVerified) return null;

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
import authservice from "../appwrite/auth.js";

const AddPost = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [isEmailVerified, setIsEmailVerified] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [verificationLink, setVerificationLink] = useState("");

  useEffect(() => {
    console.log(userData)
    if (userData) {
      setIsEmailVerified(userData.emailVerification);
      setIsChecking(false);
    }
  }, [userData,window]);

  // ✅ Function to send verification email
  const sendVerificationEmail = async () => {
   
       await authservice.sendVerificationEmail();
        console.log("Verification email sent to:", userData.email);
        toast.success("Verification email sent!");
        setEmailSent(true);
    
  };

  // When not verified
  if (!isChecking && isEmailVerified === false) {
    return (
      <div className="w-full md:w-1/2 lg:w-2/3 mx-auto bg-base-100 p-6 rounded shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4 text-red-500">
          Your email is not verified
        </h2>
        <p className="mb-4">Please check your inbox for a verification link.</p>

        {!emailSent && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={sendVerificationEmail}
          >
            Send Verification Email
          </button>
        )}

{emailSent && (
  <p className="text-green-500 mt-4">
    Verification email has been sent. Please check your inbox......
    <input
      className="input input-bordered w-full max-w-xs"
      type="text"
      placeholder="Paste verification link here"
      value={verificationLink}
      onChange={(e) => setVerificationLink(e.target.value)}
    />
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={() => window.location.href = verificationLink}
    >
      Go to Verification Link
    </button>
  </p>
)}

      </div>
    );
  }

  // While checking
  if (isChecking) return null;

  // Verified users see the post form
  return (
    <div className="w-full md:w-1/2 lg:w-2/3 mx-auto bg-base-100 p-6 rounded shadow-lg">
      <Post />
    </div>
  );
};

export default AddPost;
