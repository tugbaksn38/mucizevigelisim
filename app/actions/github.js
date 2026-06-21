"use server";

export async function commitToGithub({ filePath, content, message }) {
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;

  // Dosya SHA al (varsa)
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  const fileData = res.ok ? await res.json() : null;

  // Commit isteği at
  const commitRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"), // Base64 encode zorunlu
      sha: fileData?.sha,
    }),
  });

  if (!commitRes.ok) {
    const err = await commitRes.text();
    throw new Error("GitHub commit hatası: " + err);
  }

  return commitRes.json();
}
