import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

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
      setStatus(data.message || "Gagal upload");
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">📤 Upload Foto Publik</h1>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full">
        Upload
      </button>
      {status && <p className="mt-6 text-green-400">{status}</p>}
    </div>
  );
    }
