const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const { protect } = require('./middleware/authMiddleware')

dotenv.config();
connectDB();

const app = express();
app.use(express.json())

app.use(cors());

// For Authorization data
app.use('/api/auth', require('./routes/authRoutes'));

//  For jobs Data
app.use('/api/jobs', require('./routes/jobRoute'))

// Resume Data
app.use('/uploads',express.static("uploads"))

// For Application data
app.use('/api/applications', require('./routes/applicationRoutes'))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

})