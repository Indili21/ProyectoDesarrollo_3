const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');
const app = express();



// El resto de tu configuración de Express...

const port = process.env.PORT || 3000;

// Configurar el middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));


// Sirve archivos estáticos desde el directorio 'static'
app.use('/static', express.static('static'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'audel',
  database: 'user_auth'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Configurar las sesiones
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Cambiar a true si usas HTTPS
}));

// Middleware para verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Rutas para mostrar las vistas
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { email: req.session.email });
});

// Ruta de registro
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).send('Error registering user');
    }
    res.redirect('/login');
  });
});

// Ruta de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).send('Error logging in');
    }

    if (results.length === 0) {
      return res.status(400).send('User not found');
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).send('Invalid password');
    }

    req.session.userId = user.id;
    req.session.email = user.email;
    res.redirect('/');  // Redirigir a la página de inicio después del login
  });
});

// Ruta de logout
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
});

// Rutas con verificación de autenticación
app.get('/', isAuthenticated, (req, res) => {
  res.render('inicio');
});

app.get('/inicio.ejs', isAuthenticated, (req, res) => {
  res.render('inicio');
});

app.get('/nosotros.ejs', isAuthenticated, (req, res) => {
  res.render('nosotros');
});

app.get('/servicios.ejs', isAuthenticated, (req, res) => {
  res.render('servicios');
});

app.get('/contactanos.ejs', isAuthenticated, (req, res) => {
  res.render('contactanos');
});

app.get('/blogs.ejs', isAuthenticated, (req, res) => {
  res.render('blogs');
});

app.get('/form.ejs', isAuthenticated, (req, res) => {
  res.render('form');
});

// Manejar errores 404

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Aplicación de ejemplo escuchando en http://localhost:${port}`);
});
