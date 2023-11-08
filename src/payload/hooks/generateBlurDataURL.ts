import { CollectionBeforeChangeHook } from "payload/types";
import * as fs from "fs";
import path from "path";

function imageFileToBase64(filePath) {
  try {
    // Read the image file as a buffer (synchronous)
    const imageBuffer = fs.readFileSync(filePath);

    // Convert the buffer to a Base64 string
    const base64String = imageBuffer.toString("base64");

    // Create a data URL from the Base64 string
    const dataUrl = `data:image/${getFileExtension(
      filePath
    )};base64,${base64String}`;

    return dataUrl;
  } catch (error) {
    console.error(`Error converting image file to Base64: `, error);
    return null;
  }
}

function getFileExtension(filePath) {
  return filePath.split(".").pop().toLowerCase();
}

export const generateBlurDataURL: CollectionBeforeChangeHook = ({
  data,
  collection,
}) => {
  const blurDataURL = imageFileToBase64(
    path.resolve(
      __dirname,
      `../../../${collection?.slug}/${data?.sizes?.blur?.filename}`
    )
  );

  return {
    ...data,
    blurDataURL: blurDataURL,
  };
};

export default generateBlurDataURL;
