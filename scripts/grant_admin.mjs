import { config } from "dotenv";
import { Client } from "pg";

config({ path: new URL("../.env.local", import.meta.url) });

const email = process.argv[2];
if (!email) {
  console.error("Usage: node scripts/grant_admin.mjs <email>  (the user must already exist in Supabase Auth)");
  process.exit(1);
}

const connectionString = process.env.DIRECT_URL;
if (!connectionString || connectionString.includes("[YOUR-PASSWORD]")) {
  console.error("DIRECT_URL is missing or still has the [YOUR-PASSWORD] placeholder — set it in .env.local first.");
  process.exit(1);
}

const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  const { rowCount } = await client.query(
    `insert into admins (user_id)
     select id from auth.users where lower(email) = lower($1)
     on conflict (user_id) do nothing`,
    [email]
  );
  const { rows } = await client.query(
    "select u.email from admins a join auth.users u on u.id = a.user_id order by u.email"
  );
  console.log(rowCount ? `Granted admin to ${email}.` : `No new grant (no such user, or already an admin): ${email}`);
  console.log("Current admins:", rows.map(r => r.email).join(", ") || "(none)");
} catch (err) {
  console.error("Failed:", err.message);
  process.exit(1);
} finally {
  await client.end();
}
