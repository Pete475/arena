import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';
import userRoute from "./routes/userRoute";
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true // Essential for sending cookies/sessions with authentication requests.
}));

app.use(express.json()); // allows parsing JSON bodies

app.use("/user", userRoute)
// GET route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: "GET request successful" });
  } catch (err) {
    next(err);
  }
});

// POST route
app.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    res.json({ message: "POST request successful", data });
  } catch (err) {
    next(err);
  }
});

// DELETE route
app.delete("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: "DELETE request successful" });
  } catch (err) {
    next(err);
  }
});

// Global error handler
app.use((err: Error, req: Request, res: Response) => {
  console.error("Global error handler caught:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

const PORT = 3334;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
