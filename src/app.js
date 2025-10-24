import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.get("/", (req, res) => res.json({ ok: true, service: "Budget Buddy API" }));


app.use("/api", router);


app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});


app.use(errorHandler);

export default app;
