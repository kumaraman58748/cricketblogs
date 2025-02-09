 import { useSelector, useDispatch } from "react-redux";
 import { Link, useLocation } from "react-router-dom";
 import Logoutbtn from "../header/Logoutbtn.jsx"
 import Login from "../Login.jsx";
import { setSearchTerm } from "../../app/postSlice.js";
 import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const authStatus = useSelector((state) => state.auth.status);
//   const {posts,searchTerm}=useSelector((state)=>state.post);
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const handleSearch = (e) => {
//     dispatch(setSearchTerm(e.target.value));
//   };
//   const navigate=useNavigate();
//   return (
//     <div className="navbar bg-green-100  flex justify-between items-center p-4 shadow-md">
//       <div className="flex items-center">
//         <Link to="/">
//           <p className="m-2 text-xl font-semibold text-gray-800">CRICKETBLOGS</p>
//         </Link>
//       </div>
//       <div className=" flex-1 flex justify-end items-center space-x-4">
//           {authStatus && (location.pathname==='/' || location.pathname==='/drafts')
//           && (
//             <div className="form-control">
//             <label className="input input-bordered flex items-center gap-2">
//                 <input
//                   type="text"
//                   className="md:w-auto grow"
//                   placeholder="Search"
//                   value={searchTerm}
//                   onChange={handleSearch}
//                 />
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 16 16"
//                   fill="currentColor"
//                   className="h-4 w-4 opacity-70"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </label>
//               </div>
//           )}
//           {!authStatus && (
//           <button
//             className="btn btn-primary"
//             onClick={() => document.getElementById("login").showModal()}
//           >
//             Login
//           </button>
//         )}
//           {authStatus && location.pathname !='/addpost' && (
            
//               <button className="btn" onClick={()=>navigate('/addpost')}>
//                 Write
//                 <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 height="1em"
//                 fill="currentColor"
//                 viewBox="0 0 512 512">
//                 <path d="M 380.2278978388998 41.24165029469548 L 313.8388998035363 108.63654223968565 L 380.2278978388998 41.24165029469548 L 313.8388998035363 108.63654223968565 L 403.36345776031436 198.16110019646365 L 403.36345776031436 198.16110019646365 L 470.7583497053045 131.7721021611002 L 470.7583497053045 131.7721021611002 Q 479.811394891945 121.71316306483301 479.811394891945 108.63654223968565 Q 479.811394891945 95.55992141453831 470.7583497053045 85.50098231827111 L 426.4990176817289 41.24165029469548 L 426.4990176817289 41.24165029469548 Q 416.44007858546166 32.18860510805501 403.36345776031436 32.18860510805501 Q 390.286836935167 32.18860510805501 380.2278978388998 41.24165029469548 L 380.2278978388998 41.24165029469548 Z M 282.65618860510807 94.55402750491159 L 358.098231827112 19.111984282907663 L 282.65618860510807 94.55402750491159 L 358.098231827112 19.111984282907663 Q 378.21611001964635 0 403.36345776031436 0 Q 429.516699410609 0 448.6286836935167 19.111984282907663 L 492.88801571709234 63.3713163064833 L 492.88801571709234 63.3713163064833 Q 512 82.48330058939096 512 108.63654223968565 Q 512 133.78388998035362 492.88801571709234 153.901768172888 L 417.4459724950884 229.34381139489196 L 417.4459724950884 229.34381139489196 L 380.2278978388998 368.15717092337917 L 380.2278978388998 368.15717092337917 Q 367.15127701375246 410.40471512770137 325.909626719057 424.48722986247543 L 48.282907662082515 506.9705304518664 L 48.282907662082515 506.9705304518664 Q 29.17092337917485 512 14.082514734774067 497.91748526522593 Q 0 482.82907662082516 5.029469548133595 463.7170923379175 L 88.51866404715128 186.09037328094303 L 88.51866404715128 186.09037328094303 Q 101.59528487229862 144.84872298624754 143.84282907662083 131.7721021611002 L 282.65618860510807 94.55402750491159 L 282.65618860510807 94.55402750491159 Z M 285.6738703339882 126.7426326129666 L 152.8958742632613 162.9548133595285 L 285.6738703339882 126.7426326129666 L 152.8958742632613 162.9548133595285 Q 126.7426326129666 171.00196463654223 118.69548133595285 196.1493123772102 L 44.25933202357564 445.61100196463656 L 44.25933202357564 445.61100196463656 L 154.90766208251475 334.96267190569745 L 154.90766208251475 334.96267190569745 Q 145.85461689587427 319.8742632612967 145.85461689587427 301.7681728880157 Q 146.86051080550098 274.6090373280943 164.96660117878193 256.50294695481335 Q 183.07269155206288 238.3968565815324 210.23182711198427 237.3909626719057 Q 237.3909626719057 238.3968565815324 255.49705304518665 256.50294695481335 Q 273.6031434184676 274.6090373280943 274.6090373280943 301.7681728880157 Q 273.6031434184676 328.92730844793715 255.49705304518665 347.0333988212181 Q 237.3909626719057 365.139489194499 210.23182711198427 366.14538310412576 Q 192.12573673870335 366.14538310412576 178.0432220039293 357.0923379174853 L 66.38899803536346 467.74066797642433 L 66.38899803536346 467.74066797642433 L 315.8506876227898 393.3045186640471 L 315.8506876227898 393.3045186640471 Q 340.99803536345775 385.2573673870334 349.0451866404715 360.1100196463654 L 385.2573673870334 226.32612966601178 L 385.2573673870334 226.32612966601178 L 285.6738703339882 126.7426326129666 L 285.6738703339882 126.7426326129666 Z M 210.23182711198427 269.5795677799607 Q 196.1493123772102 269.5795677799607 187.09626719056973 278.6326129666012 L 187.09626719056973 278.6326129666012 L 187.09626719056973 278.6326129666012 Q 178.0432220039293 287.68565815324166 178.0432220039293 301.7681728880157 Q 178.0432220039293 315.8506876227898 187.09626719056973 324.90373280943027 Q 196.1493123772102 333.95677799607074 210.23182711198427 333.95677799607074 Q 224.31434184675834 333.95677799607074 233.3673870333988 324.90373280943027 Q 242.4204322200393 315.8506876227898 242.4204322200393 301.7681728880157 Q 242.4204322200393 287.68565815324166 233.3673870333988 278.6326129666012 Q 224.31434184675834 269.5795677799607 210.23182711198427 269.5795677799607 L 210.23182711198427 269.5795677799607 Z" />
//               </svg>
//             </button>
//           )}

//         {authStatus && (
//           <>
//           <button className="btn btn-primary"  onClick={()=>navigate("/drafts")}>
//               my drafts
//               </button>
//         <Logoutbtn className="btn btn-error" />
//         </>
//       ) } 

//         <dialog id="login" className="modal">
//           <div className="modal-box">
//             <Login />
//           </div>
//           <form method="dialog" className="modal-backdrop">
//             <button className="btn btn-secondary">Close</button>
//           </form>
//         </dialog>
//         </div>
//     </div>
//   );
// };

// export default Header;
const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const { posts, searchTerm } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="navbar bg-gradient-to-r from-green-200 via-green-300 to-green-500 text-gray-800 shadow-md p-4 flex justify-between items-center w-full">
      {/* Brand Name */}
      <div className="flex items-center">
        <Link to="/">
          <p className="m-2 text-2xl font-bold text-gray-800 hover:text-gray-900">
            CRICKETBLOGS
          </p>
        </Link>
      </div>

      {/* Right-side Actions */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        {authStatus && (location.pathname === "/" || location.pathname === "/drafts") && (
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="input input-bordered w-full pl-10 pr-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="absolute top-2 left-2 h-6 w-6 text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Login Button */}
        {!authStatus && (
          <button
            className="btn bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
            onClick={() => document.getElementById("login").showModal()}
          >
            Login
          </button>
        )}

        {/* Write Button */}
        {authStatus && location.pathname !== "/addpost" && (
          <button
            className="btn bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
            onClick={() => navigate("/addpost")}
          >
            Write
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              fill="currentColor"
              viewBox="0 0 512 512"
              className="h-4 w-4"
            >
              <path d="M380.23 41.24L313.84 108.64L403.36 198.16L470.76 131.77Q479.81 121.71 479.81 108.64Q479.81 95.56 470.76 85.5L426.5 41.24Q416.44 32.19 403.36 32.19Q390.29 32.19 380.23 41.24ZM282.66 94.55L358.1 19.11Q378.22 0 403.36 0Q429.52 0 448.63 19.11L492.89 63.37Q512 82.48 512 108.64Q512 133.78 492.89 153.9L417.45 229.34L380.23 368.16Q367.15 410.4 325.91 424.49L48.28 506.97Q29.17 512 14.08 497.92Q0 482.83 5.03 463.72L88.52 186.09Q101.6 144.85 143.84 131.77L282.66 94.55ZM285.67 126.74L152.9 162.95Q126.74 171 118.7 196.15L44.26 445.61L154.91 334.96Q145.85 319.87 145.85 301.77Q146.86 274.61 164.97 256.5Q183.07 238.4 210.23 237.39Q237.39 238.4 255.5 256.5Q273.6 274.61 274.61 301.77Q273.6 328.93 255.5 347.03Q237.39 365.14 210.23 366.15Q192.13 366.15 178.04 357.09L66.39 467.74L315.85 393.3Q341 385.26 349.05 360.11L385.26 226.33L285.67 126.74ZM210.23 269.58Q196.15 269.58 187.1 278.63Q178.04 287.69 178.04 301.77Q178.04 315.85 187.1 324.9Q196.15 333.96 210.23 333.96Q224.31 333.96 233.37 324.9Q242.42 315.85 242.42 301.77Q242.42 287.69 233.37 278.63Q224.31 269.58 210.23 269.58Z" />
            </svg>
          </button>
        )}

        {/* Drafts and Logout */}
        {authStatus && (
          <>
            <button
              className="btn bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-lg shadow-md"
              onClick={() => navigate("/drafts")}
            >
              My Drafts
            </button>
            <Logoutbtn className="btn bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg shadow-md" />
          </>
        )}

        {/* Modal for Login */}
        <dialog id="login" className="modal">
          <div className="modal-box">
            <Login />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button className="btn btn-secondary">Close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default Header;
