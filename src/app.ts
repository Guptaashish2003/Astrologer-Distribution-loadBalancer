import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import seeder from "./seeder";
import express from "express";
import assignUser from "./routes/assign-user";
import { Request, Response, Application } from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
  })
);
console.log(process.env.FRONTEND_URL as string);

app.use(express.json());
app.use(cookieParser());
app.get("/", (req: Request, res: Response) => {
   res
    .status(200)
    .send({
      message: "Hello, World! this is your Distribution User to Astrologer",
    });
});
app.use("/api/seeder", async (req: Request, res: Response) => {
  try {
    await seeder(); // Ensure this is awaited
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("Error running seeder:", error);
    res.status(500).json({ error: "Database seeding failed" });
  }
});
app.use("/api", assignUser);
// app.use("/api", getAllUser);
// app.use("/api", getAllAstrologer);
// app.use("/api", getHigherRatingAstrologer);
// app.use("/api", getHigherConnectionAstrologer);

export default app;
