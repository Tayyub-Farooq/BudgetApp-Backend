import "dotenv/config";
import { connectDB } from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 4000;

// 👇 add this
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/budgetbuddy";

console.log("Using Mongo URI:", MONGODB_URI);

// 👇 use MONGODB_URI instead of process.env.MONGODB_URI
await connectDB(MONGODB_URI);

app.listen(PORT, () => console.log(`📡 http://localhost:${PORT}`));
