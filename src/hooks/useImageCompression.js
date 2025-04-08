import { useState } from "react";
import imageCompression from "browser-image-compression";

const useImageCompression = () => {
  const [isCompressing, setIsCompressing] = useState(false);

  const compressImage = async (
    file,
    options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    }
  ) => {
    try {
      setIsCompressing(true);

      // Step 1: Compress the image first
      const compressedFile = await imageCompression(file, options);

      // Step 2: Convert compressed image to WebP using canvas
      const webpFile = await convertToWebP(compressedFile);

      setIsCompressing(false);
      return webpFile;
    } catch (error) {
      console.error("Image compression failed", error);
      setIsCompressing(false);
      throw error;
    }
  };

  // Convert to WebP using canvas
  const convertToWebP = async (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("WebP conversion failed."));
              return;
            }
            const webpFile = new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
              type: "image/webp",
            });
            resolve(webpFile);
          },
          "image/webp",
          0.8 // quality
        );
      };
      img.onerror = (err) => reject(err);
    });
  };

  return { compressImage, isCompressing };
};

export default useImageCompression;
