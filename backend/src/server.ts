import path from "path";
import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const port = Number(process.env.PORT || 4000);

const start = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
  });
};

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
