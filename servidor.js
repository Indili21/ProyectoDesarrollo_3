const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/HTML/inicio.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/HTML/inicio.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
