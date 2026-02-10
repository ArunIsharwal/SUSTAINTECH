// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import connectDB from "./db/connectDB.js";
// import authRoutes from "./routes/authRoutes.js";
// import staff from "./routes/staff.route.js";
// import student from "./routes/student.route.js";
// import maintenance from "./routes/maintenance.route.js";

// await connectDB();
// const app = express();

// app.use(cors({ origin: "http://localhost:8080", credentials: true }));
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/staff", staff);
// app.use("/api/student", student);
// app.use("/api/maintenance", maintenance);

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });




import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import staff from "./routes/staff.route.js";
import student from "./routes/student.route.js";
import maintenance from "./routes/maintenance.route.js";

await connectDB();
const app = express();

/* ✅ CORS: allow localhost + Vercel (no logic change) */
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://opticampus-beta.vercel.app/" // update if Vercel gives different URL
    ],
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/staff", staff);
app.use("/api/student", student);
app.use("/api/maintenance", maintenance);

/* ✅ PORT fallback only */
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello Opticampus")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
