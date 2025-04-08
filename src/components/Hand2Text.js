import { useState } from "react";
import { recognizeFromURL, recognizeFromFile } from "../api/api";

const Hand2Text = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUrlSubmit = async () => {
    if (!imageUrl.trim()) return alert("Please enter a valid image URL.");
    setLoading(true);
    try {
      const data = await recognizeFromURL(imageUrl);
      setResult(data);
    } catch (error) {
      alert("Something went wrong processing the URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSubmit = async () => {
    if (!file) return alert("Please select a file first.");
    setLoading(true);
    try {
      const data = await recognizeFromFile(file);
      setResult(data);
    } catch (error) {
      alert("Something went wrong with the file upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📝 Hand2Text — Turn Handwriting into Clarity
      </h1>

      <div className="space-y-6">
        {/* URL Input */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/note.jpg"
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUrlSubmit}
            disabled={loading}
            className={`bg-blue-600 text-white rounded-lg py-2 px-4 font-semibold hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Submit URL"}
          </button>
        </div>

        {/* File Input */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Upload Image File</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          <button
            onClick={handleFileSubmit}
            disabled={loading}
            className={`bg-green-600 text-white rounded-lg py-2 px-4 font-semibold hover:bg-green-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Upload File"}
          </button>
        </div>
      </div>

      {/* Output */}
      {result && (
        <div className="mt-8 space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Extracted Text</h2>
          <p className="whitespace-pre-wrap text-gray-700">{result.text}</p>

          <h2 className="text-xl font-semibold text-gray-800 mt-4">Summary</h2>
          <p className="whitespace-pre-wrap text-gray-700">{result.summary}</p>
        </div>
      )}
    </div>
  );
};

export default Hand2Text;
