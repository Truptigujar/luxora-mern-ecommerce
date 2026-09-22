/**
 * A tiny local database backed by a single JSON file on disk.
 *
 * No installation, no service, no native modules to compile — just a file.
 * This replaces MongoDB entirely so the app runs the same way on any
 * machine, with nothing extra to install or keep running in the background.
 *
 * The file lives at server/data/db.json and is created automatically
 * the first time the server starts.
 */

const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "db.json");

let data = null;

function ensureFile() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(
      DB_PATH,
      JSON.stringify({ products: [], users: [], carts: [] }, null, 2)
    );
  }
}

function load() {
  ensureFile();
  const raw = fs.readFileSync(DB_PATH, "utf8");
  data = raw.trim() ? JSON.parse(raw) : { products: [], users: [], carts: [] };
  data.products = data.products || [];
  data.users = data.users || [];
  data.carts = data.carts || [];
  return data;
}

function getData() {
  if (!data) load();
  return data;
}

function save() {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Kept as "connectDB" so server.js doesn't need to change at all —
// it's imported and called the same way it always was:
//   const connectDB = require("./config/db"); ... connectDB();
const connectDB = async () => {
  load();
  console.log("✅ Local database ready:", DB_PATH);
};

// getData/save are also attached directly onto connectDB (functions can
// hold properties in JS), so internal files can do:
//   const { getData, save } = require("./db");
connectDB.getData = getData;
connectDB.save = save;

module.exports = connectDB;
