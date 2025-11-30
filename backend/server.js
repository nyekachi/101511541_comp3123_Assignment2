require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./Routes/userRoutes');
const empRoutes = require('./routes/empRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();   

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', empRoutes);

//error handler
app.use(errorHandler);

//uploads
app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 8084;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));