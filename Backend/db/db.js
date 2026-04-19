import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres", // MUST match where tables are
  password: "0000",
  port: 5432,

  // 🔥 ADD THESE (IMPORTANT)
  ssl: false,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL ✅");
});

pool.on("error", (err) => {
  console.error("PostgreSQL error ❌", err);
});

export default pool;