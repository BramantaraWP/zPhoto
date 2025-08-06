import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [preview, setPreview] = useState("");

  const handleFile = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return alert("Pilih gambar dulu bro!");

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64 = reader.result.split(',')[1];
      const fileName = `${Date.now()}-${file.name}`;

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName, content: base64 }),
      });

      const data = await res.json();
      setStatus(data.message || "❌ Upload gagal");
      setFile(null);
      setPreview("");
    };
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">📡 FotoShare Cloud</h1>
      <p className="mb-10 text-gray-400 text-sm">Upload gambar kamu ke cloud publik</p>

      <label
        htmlFor="file-upload"
        className="w-full max-w-lg p-6 border-2 border-dashed border-gray-500 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0 0l-3-3m3 3l3-3M12 3v9" />
        </svg>
        <span className="text-gray-300 text-sm">Klik atau drag gambar ke sini</span>
        <input id="file-upload" type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </label>

      {preview && (
        <div className="mt-6 max-w-md w-full flex flex-col items-center">
          <img src={preview} className="rounded-lg shadow-md mb-4" />
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
          >
            🚀 Upload ke Cloud
          </button>
        </div>
      )}

      {status && <p className="mt-6 text-green-400 font-semibold">{status}</p>}

      <footer className="mt-16 text-sm text-gray-500">© 2025 FotoShare Cloud</footer>
    </div>
  );
          }
