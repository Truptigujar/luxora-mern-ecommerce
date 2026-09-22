/**
 * One-command launcher for LUXORA.
 *
 * Running "npm start" from the project root calls this script, which:
 *   1. Installs server/ and client/ dependencies if they're missing
 *   2. Creates server/.env from server/.env.example if it doesn't exist yet
 *   3. Seeds the local database if it's empty
 *   4. Downloads the product images if they haven't been downloaded yet
 *   5. Starts the backend and frontend together
 *
 * Every step is skipped automatically if it's already been done, so this
 * is the only command you ever need to run — the first time and every
 * time after that.
 */

const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const serverDir = path.join(root, "server");
const clientDir = path.join(root, "client");
const isWindows = process.platform === "win32";
const npmCmd = isWindows ? "npm.cmd" : "npm";

function run(command, cwd) {
  execSync(command, { cwd, stdio: "inherit" });
}

function ensureInstalled(dir, label) {
  if (!fs.existsSync(path.join(dir, "node_modules"))) {
    console.log(`\n📦 Installing ${label} dependencies (first run only)...`);
    run(`${npmCmd} install`, dir);
  }
}

function ensureEnvFile() {
  const envPath = path.join(serverDir, ".env");
  const examplePath = path.join(serverDir, ".env.example");
  if (!fs.existsSync(envPath) && fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath);
    console.log("\n🔑 Created server/.env from server/.env.example");
  }
}

function needsSeed() {
  const dbPath = path.join(serverDir, "data", "db.json");
  if (!fs.existsSync(dbPath)) return true;
  try {
    const data = JSON.parse(fs.readFileSync(dbPath, "utf8"));
    return !Array.isArray(data.products) || data.products.length === 0;
  } catch {
    return true;
  }
}

function ensureSeeded() {
  if (needsSeed()) {
    console.log("\n🌱 Seeding the database (first run only)...");
    run("node seed.js", serverDir);
  }
}

function hasDownloadedImages() {
  const productsDir = path.join(clientDir, "public", "assets", "products");
  if (!fs.existsSync(productsDir)) return false;
  return fs.readdirSync(productsDir).some((category) => {
    const categoryDir = path.join(productsDir, category);
    return (
      fs.statSync(categoryDir).isDirectory() &&
      fs.readdirSync(categoryDir).length > 0
    );
  });
}

function ensureImagesDownloaded() {
  if (hasDownloadedImages()) return;
  console.log("\n🖼️  Downloading product images (first run only)...");
  try {
    run("node scripts/download-images.js", root);
  } catch {
    // A handful of images can occasionally fail to fetch (network hiccup,
    // a dead link, etc). That's not worth blocking the whole app over —
    // download-images.js is safe to re-run later and will only retry the
    // ones that are still missing, so just warn and keep going.
    console.log(
      "\n⚠️  Some product images didn't download (this is non-fatal)."
    );
    console.log("   Run \"npm run download-images\" later to retry them.\n");
  }
}

function startApp() {
  console.log("\n🚀 Starting LUXORA (server on :5000, client on :3000)...\n");

  const server = spawn(npmCmd, ["run", "dev"], {
    cwd: serverDir,
    stdio: "inherit",
    shell: isWindows,
  });
  const client = spawn(npmCmd, ["run", "dev"], {
    cwd: clientDir,
    stdio: "inherit",
    shell: isWindows,
  });

  let shuttingDown = false;
  function shutdown(code) {
    if (shuttingDown) return;
    shuttingDown = true;
    server.kill();
    client.kill();
    process.exit(code || 0);
  }

  process.on("SIGINT", () => shutdown(0));
  process.on("SIGTERM", () => shutdown(0));
  server.on("exit", (code) => shutdown(code));
  client.on("exit", (code) => shutdown(code));
}

function main() {
  try {
    ensureInstalled(serverDir, "server");
    ensureInstalled(clientDir, "client");
    ensureEnvFile();
    ensureSeeded();
  } catch (err) {
    console.error(
      "\n❌ Setup failed while getting the project ready to run."
    );
    console.error(
      "   Make sure you have an internet connection (needed the first time,",
    );
    console.error(
      "   to install dependencies) and that Node.js/npm are up to date, then",
    );
    console.error("   run \"npm start\" again.\n");
    if (err && err.message) console.error(`   Details: ${err.message}`);
    process.exit(1);
  }

  ensureImagesDownloaded();
  startApp();
}

main();
