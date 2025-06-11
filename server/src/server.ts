const forceDatabaseRefresh = false;

import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import path from "path"; // Import the 'path' module

import { fileURLToPath } from "url";
import { dirname } from "path";
import routes from "./routes/index.js";
import { sequelize } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
}

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server is listening on port ${PORT} in ${
        process.env.NODE_ENV || "development"
      } mode`
    );
    if (process.env.NODE_ENV === "production") {
      console.log("Client static files are being served from client/dist");
    }
  });
});
