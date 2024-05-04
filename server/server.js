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
// Enable CORS 
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS', 
    credentials: true, 
  }));
//routes
app.use("/api/v1/",router)


//testing route
app.get("/health-check", (req, res) => {
    res.send("no worries!, server is up and running");
});


//server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
connectDB();