import axios from "axios";

const API_BASE_URL = "https://api.hand2text.com";

export const recognizeFromURL = async (imageUrl) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/upload/url`, {
      params: { url: imageUrl },
    });
    return response.data;
  } catch (error) {
    console.error("Error recognizing handwriting:", error);
    throw error;
  }
};

export const recognizeFromFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_BASE_URL}/upload/file`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error recognizing handwriting from file:", error);
    throw error;
  }
};
