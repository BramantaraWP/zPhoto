import { useEffect, useState } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/repos/YOUR_USERNAME/foto-publik/contents/images")
      .then(res => res.json())
      .then(data => {
        const urls = data.map(img => img.download_url);
        setImages(urls);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🖼️ Galeri Publik</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {images.map((src, i) => (
          <img key={i} src={src} className="rounded-lg shadow-lg" />
        ))}
      </div>
    </div>
  );
}
