import { useEffect } from "react";
import Signup from "../components/Signup";
import { useDispatch, useSelector } from "react-redux";
import dbservice from "../appwrite/config";
import { setPosts } from "../app/postSlice";
import PostCard from "../components/PostCard";

const Home = () => {
  const { status: authStatus, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { posts, searchTerm } = useSelector((state) => state.post);

  useEffect(() => {
    let isMounted = true;

    if (authStatus && posts.length === 0) {
      dbservice
        .getPosts()
        .then((postfromdb) => {
          if (isMounted && postfromdb) {
            dispatch(setPosts(postfromdb.documents));
          }
        })
        .catch((error) => {
          if (isMounted) {
            console.error("Error fetching posts: ", error);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [authStatus, dispatch, posts]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🟥 Case: Logged in but no posts match search
  if (!filteredPosts.length && authStatus) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-white">
        <h1 className="text-2xl font-semibold text-gray-500">No posts found!</h1>
      </div>
    );
  }

  // 🟦 Case: Not logged in → show hero with sign-up
  if (!filteredPosts.length && !authStatus) {
    return (
      <div className="min-h-screen w-full bg-white">
        <div className="hero h-full w-full">
          <div className="hero-content flex-col lg:flex-row-reverse max-w-6xl">
            <div>
              <h1 className="text-4xl md:text-5xl text-red-500 font-bold mb-6 leading-snug">
                Step Up to the Crease—<br />
                Log In for Exclusive Cricket Articles!
              </h1>
              <button
                className="btn btn-primary"
                onClick={() => document.getElementById("signup").showModal()}
              >
                Join Our Community
              </button>
              <dialog id="signup" className="modal">
                <div className="modal-box">
                  <Signup />
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Case: Show post grid
  return (
    <div className="min-h-screen w-full px-4 py-6 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPosts.map((post) => {
          if (post.status === "active" || post.status === "inactive") {
            return (
              <div key={post.$id} className="w-full">
                <PostCard {...post} author={userData.name} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Home;
