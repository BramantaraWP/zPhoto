export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  const { fileName, content } = req.body;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO;

  const uploadRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/images/${fileName}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify({
      message: `Upload ${fileName}`,
      content: content,
    }),
  });

  if (uploadRes.ok) {
    res.status(200).json({ message: "✅ Gambar berhasil diupload ke GitHub!" });
  } else {
    const error = await uploadRes.json();
    res.status(500).json({ message: "❌ Upload gagal", error });
  }
}
