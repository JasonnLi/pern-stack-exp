import { Pool } from "pg";

export const pool = new Pool({
    user: "admin",
    password: "test",
    host: "db",
    port: 5432,
    database: "pern-test"
});
