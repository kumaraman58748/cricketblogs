import { useEffect, useState } from "react";

function FilePreview({ fileId }) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const loadPreview = async () => {
      try {
        const result = await dbservice.getFilePreview(fileId);
        setPreviewUrl(result.href); // result is a URL object
      } catch (err) {
        console.error("Error fetching preview:", err);
      }
    };

    if (fileId) loadPreview();
  }, [fileId]);

  return previewUrl ? (
    <img
      src={previewUrl}
      alt="File preview"
      className="w-full h-60 object-cover rounded-lg"
    />
  ) : (
    <div className="w-full h-60 bg-gray-300 rounded-lg animate-pulse" />
  );
}

export default FilePreview;
