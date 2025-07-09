// import dbservice from "../appwrite/config";
// import { Link } from "react-router-dom";
// import FilePreview from "./img";
// const PostCard=({$id,title,featuredimg,$createdat,author})=>{
//     const getRelativedate=(date)=>{
//         const now=new Date()
//         const diff=now-date
//         const seconds=Math.floor(diff/1000)
//         const minutes=Math.floor(seconds/60)
//         const hours=Math.floor(minutes/60)
//         const day=Math.floor(hours/24)
//         const month=Math.floor(day/30)
//         const year=Math.floor(month/12)

//         if (year>0) return year + (year===1 ? "year ago" : "years ago" );
//         if(month>0 ) return month + (month===1 ? "month ago ": "months ago");
//         if (day > 0) return day + (day === 1 ? " day ago" : " days ago");
//     if (hours > 0) return hours + (hours === 1 ? " hour ago" : " hours ago");
//     if (minutes > 0)
//       return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
//     if (seconds > 0)
//       return seconds + (seconds === 1 ? " second ago" : " seconds ago");
//     return "Just now";
//     }
//     return (
//         <Link to ={`post/${$id}`}>
//             <div className="card hover:scale-105 bg-white card-compact  w-70 max-h-90 shadow hover:shadow-lg active:scale-195">
//             <figure>
//             <img
//                 src={dbservice.getFilePreview(featuredimg)}
//                 className="aspect-auto w-full object-cover"
//                 alt={title}
//               />
//             </figure>
//             <div className="card-body">
//               <div className="avatar space-x-2">
//                 <div className="w-6 rounded">
//                   <img  
//                     src="https://thispersondoesnotexist.com/"
//                     width="30px"
//                     height="30px"
//                   />
//                 </div>
//                 <p className="text-lg text-black  font-captilize font-medium">{author}</p>
//               </div>
//               <h2
//                 className="card-title line-clamp-2 text-truncate text-pretty"
//                 title={title}
//               >
//                 {title}
//               </h2>
//               <time className="block text-xs text-gray-500">
//                 {getRelativedate(new Date($createdat))}{"  "}
//               </time>
//             </div>
//         </div>
//         </Link>
//     )
// } 
// export default PostCard;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dbservice from "../appwrite/config";

const PostCard = ({ $id, title, featuredimg, $createdat, author }) => {
  const [previewUrl, setPreviewUrl] = useState("");

  // Convert creation date to human-readable time
  const getRelativedate = (date) => {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return years + (years === 1 ? " year ago" : " years ago");
    if (months > 0) return months + (months === 1 ? " month ago" : " months ago");
    if (days > 0) return days + (days === 1 ? " day ago" : " days ago");
    if (hours > 0) return hours + (hours === 1 ? " hour ago" : " hours ago");
    if (minutes > 0) return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    if (seconds > 0) return seconds + (seconds === 1 ? " second ago" : " seconds ago");
    return "Just now";
  };

  // Load the image preview URL
  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const result = await dbservice.getFilePreview(featuredimg);
        setPreviewUrl(result.href);
      } catch (err) {
        console.error("Error loading preview:", err);
      }
    };
    if (featuredimg) fetchPreview();
  }, [featuredimg]);

  return (
    <Link to={`post/${$id}`}>
      <div className="card hover:scale-105 bg-white card-compact w-70 max-h-90 shadow hover:shadow-lg active:scale-95 transition-all duration-200">
        <figure>
          {previewUrl ? (
            <img
              src={previewUrl}
              className="aspect-auto w-full object-cover h-48"
              alt={title}
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 animate-pulse rounded-t-lg" />
          )}
        </figure>

        <div className="card-body">
          <div className="avatar flex items-center space-x-2">
            <div className="w-6 rounded-full overflow-hidden">
              <img
                src="https://thispersondoesnotexist.com/"
                width="30"
                height="30"
                alt="Author"
              />
            </div>
            <p className="text-sm text-black font-medium">{author}</p>
          </div>

          <h2 className="card-title line-clamp-2 text-pretty text-md font-semibold text-gray-800" title={title}>
            {title}
          </h2>

          <time className="block text-xs text-gray-500">
            {getRelativedate(new Date($createdat))}
          </time>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
