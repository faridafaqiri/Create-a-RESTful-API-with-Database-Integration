const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./route/taskRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
