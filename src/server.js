import "dotenv/config";
import { connectDB } from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 4000;

await connectDB(process.env.MONGODB_URI);
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
