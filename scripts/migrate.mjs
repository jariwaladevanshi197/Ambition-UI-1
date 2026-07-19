import { readFileSync } from "node:fs";
import { config } from "dotenv";
import { Client } from "pg";

config({ path: new URL("../.env.local", import.meta.url) });

const connectionString = process.env.DIRECT_URL;
if (!connectionString || connectionString.includes("[YOUR-PASSWORD]")) {
  console.error("DIRECT_URL is missing or still has the [YOUR-PASSWORD] placeholder — set it in .env.local first.");
  process.exit(1);
}

const file = process.argv[2] || "0001_init.sql";
const sql = readFileSync(new URL(`../supabase/migrations/${file}`, import.meta.url), "utf8");

const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  await client.query(sql);
  console.log("Migration applied successfully.");
} catch (err) {
  console.error("Migration failed:", err.message);
  process.exit(1);
} finally {
  await client.end();
}
