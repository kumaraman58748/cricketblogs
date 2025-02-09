import dbservice from "../appwrite/config";
import { Link } from "react-router-dom";
const PostCard=({$id,title,featuredimg,$createdat,author})=>{
    const getRelativedate=(date)=>{
        const now=new Date()
        const diff=now-date
        const seconds=Math.floor(diff/1000)
        const minutes=Math.floor(seconds/60)
        const hours=Math.floor(minutes/60)
        const day=Math.floor(hours/24)
        const month=Math.floor(day/30)
        const year=Math.floor(month/12)

        if (year>0) return year + (year===1 ? "year ago" : "years ago" );
        if(month>0 ) return month + (month===1 ? "month ago ": "months ago");
        if (day > 0) return day + (day === 1 ? " day ago" : " days ago");
    if (hours > 0) return hours + (hours === 1 ? " hour ago" : " hours ago");
    if (minutes > 0)
      return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    if (seconds > 0)
      return seconds + (seconds === 1 ? " second ago" : " seconds ago");
    return "Just now";
    }
    return (
        <Link to ={`post/${$id}`}>
            <div className="card card-compact bg-base-100 w-60 max-h-80 shadow hover:shadow-lg active:scale-95">
        <figure>
        <img
            src={dbservice.getFilePreview(featuredimg)}
            className="aspect-auto object-cover"
            alt={title}
          />
        </figure>
        <div className="card-body">
          <div className="avatar space-x-2">
            <div className="w-6 rounded">
              <img
                src="https://thispersondoesnotexist.com/"
                width="20px"
                height="20px"
              />
            </div>
            <p className="text-lg font-medium">{author}</p>
          </div>
          <h2
            className="card-title line-clamp-2 text-truncate text-pretty"
            title={title}
          >
            {title}
          </h2>
          <time className="block text-xs text-gray-500">
            {getRelativedate(new Date($createdat))}{"  "}
          </time>
        </div>
        </div>
        </Link>
    )
} 
export default PostCard;