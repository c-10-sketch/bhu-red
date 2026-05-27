import app from "../backend/src/app";
import { connectDB } from "../backend/src/config/db";

let connected = false;

export default async function handler(req: any, res: any) {
  if (!connected) {
    await connectDB();
    connected = true;
  }

  return app(req, res);
}
