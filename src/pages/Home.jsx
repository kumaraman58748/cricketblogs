import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dbservice from "../appwrite/config";

const PostCard = ({ $id, title, featuredimg, $createdat, author }) => {
  const [previewUrl, setPreviewUrl] = useState("");

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
      <div className="card bg-[#2c2c2c] text-white hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl rounded-xl overflow-hidden">
        <figure>
          {previewUrl ? (
            <img
              src={previewUrl}
              className="w-full h-48 object-cover"
              alt={title}
            />
          ) : (
            <div className="w-full h-48 bg-gray-700 animate-pulse" />
          )}
        </figure>

        <div className="card-body">
          <div className="avatar flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full overflow-hidden">
              <img
                src="https://thispersondoesnotexist.com/"
                alt="author"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-medium text-gray-200">{author}</p>
          </div>

          <h2
            className="card-title line-clamp-2 text-lg font-semibold text-white"
            title={title}
          >
            {title}
          </h2>

          <time className="block text-xs text-gray-400 mt-1">
            {getRelativedate(new Date($createdat))}
          </time>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
