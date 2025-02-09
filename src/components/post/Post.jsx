import {useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {useForm, Controller} from "react-hook-form"
import Input from "../Input"
import dbservice from "../../appwrite/config"
import { setPosts } from "../../app/postSlice"
import { toast } from "react-toastify"
import { useCallback,useEffect } from "react"
import {useState} from "react"
import RTE from "../RTE"
import Button from "../Button"

// const Post=({post})=>{
//     const { register, watch, handleSubmit, setValue, control, getValues } =
//     useForm({
//       defaultValues: {
//         title: post?.title || "",
//         slug: post?.$id || "",
//         content: post?.content || "",
//         status: post?.status || "inactive",
//       },
//     });
//     const currentTheme = localStorage.getItem("theme");
//   const toastTheme =
//     currentTheme == "light" ||
//     currentTheme == "cupcake" ||
//     currentTheme == "aqua" ||
//     currentTheme == "cyberpunk" ||
//     currentTheme == "wireframe"
//       ? "light"
//       : "dark";
//   const notifyOnUpdate = () =>
//     toast.success("Post updated!", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: `${toastTheme}`,
//     });
//   const notifyOnCreate = () =>
//     toast.success("Kudos 👏 Post published", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: `${toastTheme}`,
//     });
//   const notifyAfterError = () =>
//     toast.error("Something went wrong!!!", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: `${toastTheme}`,
//     });
//     const navigate=useNavigate();
//     const dispatch=useDispatch();
//     const userData=useSelector((state)=>state.auth.userData);
//     console.log(userData)
//     const posts=useSelector((state)=>state.post.posts);
//     const [loading,setloading]=useState(false)
//     const submit=async (data)=>{
//         setloading(true);
//         if(post){
//             const file=data.image[0] ? await dbservice.uploadFile(data.image[0]):null
//             if(file){
//                 dbservice.deleteFile(post.featuredImage)
//             }
//             const dbpost=await dbservice.updatePost(post.$id,{...data,
//                 featuredImage:file?file.$id:post.featuredImage,
//             })
//                 if(dbpost){
//                     const updatedPosts=posts.map((post)=>
//                         post.$id===dbpost.$id ?dbpost:post
//                     );
//                     dispatch(setPosts(updatedPosts))
//                     setloading(false);
//                     notifyOnUpdate();
//                     navigate(`/post/${dbpost.$id}`) 
//                 }
//                 else{
//                     notifyAfterError();
//                     navigate("/");
//                 }  
//             }else{
//                 const file = await dbservice.uploadFile(data.image[0]);
//                 console.log(file);
//                 if (file) {
//                   const fileId = file.$id;
//                   data.featuredImage = fileId;
//                   console.log(data.featuredImage);
//                   const dbPost = await dbservice.createPost({
//                     ...data,
//                     userId: userData.$id,
//                   });
//                   console.log(dbPost)
//                   if (dbPost) {
//                     const updatedPosts = [dbPost, ...posts];
//                     dispatch(setPosts(updatedPosts));
//                     setloading(false);
//                     notifyOnCreate();
//                     navigate(`/post/${dbPost.$id}`);
//                   } else {
//                     notifyAfterError();
//                     navigate("/");
//                   }
//                 }
//         }
//     }
//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//           return value
//             .trim()
//             .toLowerCase()
//             .replace(/[^a-zA-Z\d\s]+/g, "-")
//             .replace(/\s/g, "-")
//             .slice(0, 32)
//             .concat("...");
//         return "";
//       }, []);
    
//       useEffect(() => {
//         const subscription = watch((value, { name }) => {
//           if (name === "title") setValue("slug", slugTransform(value.title));
//         });
//         return () => subscription.unsubscribe();
//       }, [watch, slugTransform, setValue]);
//       return(
//         <>
//         <form onSubmit={handleSubmit(submit)}>
//           {post && (
//             <img src={dbservice.getFilePreview(post.featuredImage)}
//               alt={post.title}
//               className="aspect-auto"
//             />
//           )}
//           <div className="flex flex-wrap justify-between items-center">
//           <Input
//             type="file"
//             accept="image/png, image/jpg, image/jpeg, image/gif"
//             {...register("image", { required: !post })}
//           />
//           <span className="flex space-x-2 items-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="size-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
//               />
//               </svg>
//               <p className="text-lg">Add cover image</p>
//           </span>
//           </div>
//           <Input
//             placeholder="post title here"
//             {...register("title",{required:true})}
//             />
//             <RTE
//                 name="content"
//                 control={control}
//                 defaultValue={getValues("content")}
//               />
//             <Controller
//               name="status"
//               control={control}
//               render={({field})=>(
//                 <div className="form-control">
//                   <label className="label cursor-pointer">
//                     <span className="label-text"> Publish/update as a draft </span>
//                     <input
//                   type="checkbox"
//                   className="toggle"
//                   id={field.name}
//                   {...field}
//                   onChange={(e) =>
//                     field.onChange(e.target.checked ? "inactive" : "active")
//                   }
//                 />
//                   </label>
//                 </div>
//               )}
//               />
//                <Button type="submit" disabled={loading}>
//           {loading ? (
//             <span className="loading loading-spinner"></span>
//           ) : post ? (
//             "Update"
//           ) : (
//             "Publish"
//           )}
//         </Button>
//         <div className="space-x-1">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="size-4 inline-block"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
//             />
//           </svg>
//           <p className="text-xs inline-block">
//             After first visit of this page, subsequent visits will be much
//             faster
//           </p>
//         </div>
//         </form>
//         </>
//       )
// }
const Post = ({ post }) => {
  const { register, watch, handleSubmit, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "inactive",
      },
    });
  const currentTheme = localStorage.getItem("theme");
  const toastTheme =
    currentTheme == "light" ||
    currentTheme == "cupcake" ||
    currentTheme == "aqua" ||
    currentTheme == "cyberpunk" ||
    currentTheme == "wireframe"
      ? "light"
      : "dark";
  const notifyOnUpdate = () =>
    toast.success("Post updated!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: `${toastTheme}`,
    });
  const notifyOnCreate = () =>
    toast.success("Kudos 👏 Post published", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: `${toastTheme}`,
    });
  const notifyAfterError = () =>
    toast.error("Something went wrong!!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: `${toastTheme}`,
    });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.post.posts);
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    setLoading(true);
    data.slug = slugTransform(data.title);

    if (post) {
      const file = data.image[0]
        ? await dbservice.uploadFile(data.image[0])
        : null;

      if (file) dbservice.deleteFile(post.featuredimg);

      const dbPost = await dbservice.updatePost(post.$id, {
        ...data,
        featuredimg: file ? file.$id : post.featuredimg,
      });

      if (dbPost) {
        const updatedPosts = posts.map((post) =>
          post.$id === dbPost.$id ? dbPost : post
        );

        dispatch(setPosts(updatedPosts));
        setLoading(false);
        notifyOnUpdate();
        navigate(`/post/${dbPost.$id}`);
      } else {
        notifyAfterError();
        navigate("/");
      }
    } else {
      const file = await dbservice.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredimg = fileId;
        const dbPost = await dbservice.createPost({
          ...data,
        });

        if (dbPost) {
          const updatedPosts = [dbPost, ...posts];
          dispatch(setPosts(updatedPosts));
          setLoading(false);
          notifyOnCreate();
          navigate(`/post/${dbPost.$id}`);
        } else {
          notifyAfterError();
          navigate("/");
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
        .slice(0, 32)
        .concat("...");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") setValue("slug", slugTransform(value.title));
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="space-y-2">
        {post && (
          <img
            src={dbservice.getFilePreview(post.featuredimg)}
            alt={post.title}
            className="aspect-auto"
          />
        )}
        <div className="flex flex-wrap justify-between items-center">
          <Input
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          <span className="flex space-x-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <p className="text-lg">Add cover image</p>
          </span>
        </div>
        <Input
          placeholder="Post Title Here..."
          {...register("title", { required: true })}
        />
        <RTE
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Publish/Update as Draft</span>
                <input
                  type="checkbox"
                  className="toggle"
                  id={field.name}
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.checked ? "inactive" : "active")
                  }
                />
              </label>
            </div>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : post ? (
            "Update"
          ) : (
            "Publish"
          )}
        </Button>
        <div className="space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
          <p className="text-xs inline-block">
            After first visit of this page, subsequent visits will be much
            faster
          </p>
        </div>
      </form>
    </>
  );
};
export default Post;