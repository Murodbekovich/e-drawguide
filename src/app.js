const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./app/routes/api/v1/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
    res.send('E-DrawGuide API is working!');
});

module.exports = app;