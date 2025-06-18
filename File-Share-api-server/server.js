import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import fileRouter from "./routers/file.router.js";
import userRouter from "./routers/user.router.js";
import cookieParser from "cookie-parser";
import errhandle from "./middlewares/errorHandle.js";

const app = express();
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["POST", "PUT", "PATCH", "GET", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use("/api", fileRouter);
app.use("/api/user", userRouter);

//Middleware for errors
app.use(errhandle);
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
  });

export default app;