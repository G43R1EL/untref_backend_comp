require('dotenv').config();

const { PORT, HOST } = process.env;

const express = require('express');
const router = require('./routes/router');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));

server.use('/api', router);

server.get('*', (req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
