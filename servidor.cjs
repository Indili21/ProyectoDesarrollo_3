const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

const port = process.env.PORT || 3000;

// Configurar el middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar Sequelize para usar SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Definir el modelo de Usuario
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Sincronizar el modelo con la base de datos
sequelize.sync();

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

  try {
    await User.create({ email, password: hashedPassword });
    res.redirect('/login');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

// Ruta de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send('Invalid password');
    }

    req.session.userId = user.id;
    req.session.email = user.email;
    res.redirect('/');  // Redirigir a la página de inicio después del login
  } catch (err) {
    res.status(500).send('Error logging in');
  }
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


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Aplicación de ejemplo escuchando en http://localhost:${port}`);
});
