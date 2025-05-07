require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const imageRoutes = require('./routes/imageroutes.js');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
}));
app.use(express.json());
app.use('/api/images', imageRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
