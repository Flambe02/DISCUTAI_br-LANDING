import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const sourcePath = path.join(ROOT, "src", "DiscutAI_Landing.jsx");
const backupPath = path.join(ROOT, "src", "DiscutAI_Landing.inline-backup.jsx");
const imageDir = path.join(ROOT, "public", "images");

const dataUriRegex = /(\w+)\s*:\s*"data:image\/([a-zA-Z0-9.+-]+);base64,([^"]+)"/g;

function toFileName(key) {
  return key.toLowerCase();
}

async function main() {
  const source = await fs.readFile(sourcePath, "utf8");
  const matches = [...source.matchAll(dataUriRegex)];

  if (matches.length === 0) {
    console.log("No inline data URI images found in src/DiscutAI_Landing.jsx");
    return;
  }

  await fs.mkdir(imageDir, { recursive: true });
  await fs.writeFile(backupPath, source, "utf8");

  let optimizedBytes = 0;
  let originalBytes = 0;
  const replacements = new Map();

  for (const match of matches) {
    const key = match[1];
    const mimeType = match[2];
    const base64Data = match[3];
    const fileName = `${toFileName(key)}.webp`;
    const outputPath = path.join(imageDir, fileName);

    const buffer = Buffer.from(base64Data, "base64");
    originalBytes += buffer.byteLength;

    const image = sharp(buffer);
    const metadata = await image.metadata();

    if (key === "LOGO" || metadata.width < 500) {
      await image.webp({ lossless: true, effort: 6 }).toFile(outputPath);
    } else {
      await image.webp({ quality: 78, effort: 6 }).toFile(outputPath);
    }

    const stats = await fs.stat(outputPath);
    optimizedBytes += stats.size;
    replacements.set(match[0], `${key}: "/images/${fileName}"`);

    console.log(
      `Extracted ${key} (${mimeType}) -> public/images/${fileName} (${Math.round(
        stats.size / 1024,
      )} KB)`,
    );
  }

  let updatedSource = source;
  for (const [original, replacement] of replacements) {
    updatedSource = updatedSource.replace(original, replacement);
  }

  await fs.writeFile(sourcePath, updatedSource, "utf8");

  const gain = originalBytes - optimizedBytes;
  const reductionPct = ((gain / originalBytes) * 100).toFixed(1);

  console.log(`Done. Original images: ${Math.round(originalBytes / 1024)} KB`);
  console.log(`Optimized images: ${Math.round(optimizedBytes / 1024)} KB`);
  console.log(`Saved: ${Math.round(gain / 1024)} KB (${reductionPct}%)`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
