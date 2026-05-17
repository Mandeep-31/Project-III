import express from "express";
import cors from "cors";
import friendRoutes from "./routes/friend.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/friends", friendRoutes);
app.get("/", (req, res) => {
  res.send("FocusPact API Running");
});

app.use("/api/auth", authRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});