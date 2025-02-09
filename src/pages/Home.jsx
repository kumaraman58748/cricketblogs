import { useEffect } from "react";
import Signup from "../components/Signup"
import { useDispatch, useSelector } from "react-redux";
import dbservice from "../appwrite/config";
import { setPosts } from "../app/postSlice";
import PostCard from "../components/PostCard"
const Home=()=>{
    const { status: authStatus, userData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {posts,searchTerm}=useSelector((state)=>state.post)
    useEffect(()=>{
      let ismounted=true
      if(authStatus){
        if(!posts.length){
          dbservice.getPosts().then((postfromdb)=>{
              if(ismounted && postfromdb){
                dispatch(setPosts(postfromdb.documents));
              }
          })
          .catch((error)=>{
            if(ismounted){
              console.error("Error fetching posts: ", error);
            }
          });
        }
      }
      return () => {
        ismounted = false;
      };

    },[authStatus,dispatch,posts]);
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (!filteredPosts.length && authStatus) {
      return (
        <div className="h-screen w-full flex justify-center items-center">
          <h1 className="text-2xl">Not found!</h1>
        </div>
      );
    }
    if (!filteredPosts.length &&  !authStatus) {
      return (
        
          <div className="hero bg-base-300 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div>
                <h1 className="text-5xl font-bold">
                Step Up to the Crease—Log In for Exclusive Cricket Articles!
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
     
      );
    }
    return(
      <div className="w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
        {filteredPosts.map((post) => {
          if (post.status === "active") {
            return (
              <div key={post.$id}>
                <PostCard {...post} author={userData.name} />
              </div>
            );
          }
        })} 
      </div>
    </div>
    )
}
export default Home