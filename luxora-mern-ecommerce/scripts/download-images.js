/**
 * Downloads every product image listed in image-manifest.json into
 * client/public/assets/products/<category>/<filename> — real photos,
 * saved locally so the app doesn't depend on an internet connection
 * once this has run.
 *
 * Run once, from the project root:
 *   npm run download-images
 *
 * Safe to re-run any time — it skips files that already exist, and
 * retries any that failed on a previous run.
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const manifestPath = path.join(__dirname, "image-manifest.json");
const outputRoot = path.join(__dirname, "..", "client", "public", "assets", "products");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

function downloadOne(entry) {
  return new Promise((resolve) => {
    const destDir = path.join(outputRoot, entry.category);
    fs.mkdirSync(destDir, { recursive: true });
    const destPath = path.join(destDir, entry.filename);

    const requestHeaders = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
    };

    const fetchImage = (url, redirectsLeft) => {
      https
        .get(url, { headers: requestHeaders }, (res) => {
          if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirectsLeft > 0) {
            fetchImage(res.headers.location, redirectsLeft - 1);
            return;
          }
          if (res.statusCode !== 200) {
            console.error(`  FAIL   ${entry.category}/${entry.filename} (HTTP ${res.statusCode})`);
            res.resume();
            return resolve({ ok: false, entry });
          }
          const fileStream = fs.createWriteStream(destPath);
          res.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            console.log(`  saved  ${entry.category}/${entry.filename}`);
            resolve({ ok: true, entry });
          });
        })
        .on("error", (err) => {
          console.error(`  FAIL   ${entry.category}/${entry.filename} (${err.message})`);
          resolve({ ok: false, entry });
        });
    };

    fetchImage(entry.url, 5);
  });
}

async function run() {
  console.log(`Downloading ${manifest.length} real product photos into:\n  ${outputRoot}\n`);
  console.log("This replaces the placeholder illustrations with actual photos.\n");

  const results = [];
  const concurrency = 6;
  let i = 0;
  async function worker() {
    while (i < manifest.length) {
      const entry = manifest[i++];
      results.push(await downloadOne(entry));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));

  const failed = results.filter((r) => !r.ok);
  const saved = results.filter((r) => r.ok);

  console.log("\nDone.");
  console.log(`  ${saved.length} downloaded, ${failed.length} failed.`);
  if (failed.length) {
    console.log("\nThe following failed to download (check your internet connection and re-run the same command):");
    failed.forEach((r) => console.log(`  - ${r.entry.category}/${r.entry.filename}  (${r.entry.url})`));
    process.exitCode = 1;
  }
}

run();
