const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the CORS package
const connectDB = require('../backend/database');
const ruleRoutes = require('./routes/ruleRoutes');

const app = express();

// Use CORS middleware to allow requests from all origins
app.use(cors());  // This will enable CORS for all origins

app.use(bodyParser.json());

connectDB();

app.use('/api/rules', ruleRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
