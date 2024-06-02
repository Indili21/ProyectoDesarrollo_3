/*const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;
//-------------------------------------------
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/HTML/inicio.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/HTML/inicio.html'));
});
app.get('/nosotros.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/HTML/nosotros.html'));
});
app.get('/servicios.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/HTML/servicios.html'));
});
app.get('/contactanos.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/HTML/contactanos.html'));
});
app.get('/blogs.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/HTML/blogs.html'));
});
app.get('/form.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'static/HTML/form.html'));
});
*/

// Express application
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';

const __dirname = dirname(fileURLToPath( import.meta.url )) +
	sep;




// configuration
const	cfg = {
		port: process.env.PORT || 3000,
		dir: {
			root: __dirname,
			static: __dirname + 'static' + sep,
			views: __dirname + 'views' + sep
		}
	};
console.dir(cfg, { depth: null, color: true });


// Express initiation
const app = express();
//----------------------------------------------------------
app.set('view engine', 'ejs');
app.set('views', cfg.dir.views);






// RUTAS A PÁGINAS
app.get('/', (req, res) => {
	res.render('inicio');
});

app.get('/inicio.ejs/', (req, res) => {
	res.render('inicio');
});
app.get('/nosotros.ejs/', (req, res) => {
	res.render('nosotros');
});
app.get('/servicios.ejs/', (req, res) => {
	res.render('servicios');
});
app.get('/contactanos.ejs/', (req, res) => {
	res.render('contactanos');
});

app.get('/blogs.ejs/', (req, res) => {
	res.render('blogs');
});

app.get('/form.ejs/', (req, res) => {
	res.render('form');
});



// serve static assets
app.use(express.static( cfg.dir.static ));

// 404 errors
app.use((req, res) => {
	res.status(404).render('404');
});





// start server
app.listen(cfg.port, () => {
console.log(`Example app listening at http://localhost:${
cfg.port }`);
});



/*
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});*/
