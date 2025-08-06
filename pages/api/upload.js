export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { fileName, content } = req.body;

  const GITHUB_REPO = 'NAMA_USERNAME/NAMA_REPO';
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/images/${fileName}`;

  const uploadResult = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Upload ${fileName}`,
      content: content,
    }),
  });

  if (!uploadResult.ok) {
    const error = await uploadResult.json();
    return res.status(500).json({ message: 'Upload gagal', detail: error });
  }

  const result = await uploadResult.json();
  const publicUrl = result.content.download_url;

  res.status(200).json({
    message: '✅ Upload berhasil!',
    url: publicUrl,
  });
}
