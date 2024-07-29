import express from "express";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import cors from "cors";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import session from "express-session";
import "dotenv/config";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB successfully');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
const app = express();
app.use(cors({
  credentials: true,
  origin: process.env.NETLIFY_URL || "http://localhost:3000",
}));
app.use(express.json());
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(
  session(sessionOptions)
);

AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
UserRoutes(app);

Lab5(app);
Hello(app);



const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
