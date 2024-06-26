import axios from "axios";


const getUploadUrl = async (fileName, contentType) => {
  try {
    const response = await axios.get(`/s3/generate-upload-url?fileName=${fileName}&contentType=${contentType}`
    );
    return response.data; 
  } catch (error) {
    console.error("Error fetching upload URL:", error);
    throw error;
  }
};

const getDownloadUrl = async (fileName) => {
  try {
    const response = await axios.get(`/s3/generate-download-url?fileName=${fileName}`
    );
    return response.data.data.url; 
  } catch (error) {
    console.error("Error fetching upload URL:", error);
    throw error;
  }
};
// Function to upload a file using the signed URL
const uploadDoc = async (file) => {
  try {
    const uploadData = await getUploadUrl(file.name, file.type);
    const uploadURL  = uploadData.data.url;

    console.log("uploadUrl", uploadData, uploadURL);

    const isUpload = await axios.put(uploadURL, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    let downloadUrl;
    if (isUpload) {
       downloadUrl = await getDownloadUrl(file.name);

      if (!downloadUrl) console.log("get url fail! ");
      console.log("download url : " + JSON.stringify(downloadUrl));
      return downloadUrl;
    } else {
      console.log("fail to get download url due to un upload file ");
    }

    console.log("File uploaded successfully.");
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default uploadDoc;
