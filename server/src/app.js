import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = process.env.CORS_ORIGIN;
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE, PATCH");
  next();
});

app.use(express.json({ limit: "16kb" })); //json upload limit to save server from crash..
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //url data understanding
app.use(express.static("public")); //store file direct on server for public access
app.use(cookieParser()); //cookie  set get operations

//routes
//routes import
import userRouter from "./routes/user.routes.js";
import healthCheckRouter from "./routes/healthcheck.routes.js";
import s3Router from "./routes/s3.routes.js";
import applicantRouter from "./routes/applicant.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import jobRouter from "./routes/job.routes.js";
import mailRouter from "./routes/mail.routes.js";

//routes declaration
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/s3", s3Router);
app.use("/api/v1/applicant", applicantRouter);
app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/sendmail", mailRouter);

app.get("/", (req, res) => {
  res.send("hey i back end api started now testing .... 🍻⏳");
});

export { app };
