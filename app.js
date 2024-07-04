const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./router/routes');
const cors=require('cors')
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});
app.use(cors());

// Serve static files (if needed)
// app.use(express.static(path.join(__dirname, '../frontend')));

// Middleware for JSON parsing
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
