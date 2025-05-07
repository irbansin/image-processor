require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const imageRoutes = require('./routes/imageroutes.js');

app.use(cors());
app.use(express.json());
app.use('/api/images', imageRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
