import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import router from "./routes/adminRoutes.js";

//config env
dotenv.config();


const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
// Enable CORS for all routes and specify allowed origins
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS', // Allowed HTTP methods
    credentials: true, // Allow sending cookies
  }));
//routes
app.use("/api/v1/",router)


//testing route
app.get("/", (req, res) => {
    res.send("Hello World!");
});


//server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
connectDB();