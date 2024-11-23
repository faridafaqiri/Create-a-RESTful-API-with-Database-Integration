const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./route/taskRoutes");
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.use(cors()); // Enable CORS
app.use(express.json());
app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});