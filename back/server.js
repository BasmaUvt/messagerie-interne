const express = require("express");
const path = require("path");
const session = require("express-session");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const PORT = process.env.PORT || 3000;

// Configuration de la session
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Remplacez cette vérification par une authentification appropriée
  if (username && password && username === password) {
    req.session.username = username;
    res.redirect("/");
  } else {
    res.status(401).send("Invalid username or password");
  }
});

// Middleware pour gérer les redirections
app.use((req, res, next) => {
  if (req.originalUrl === "/login" || req.originalUrl === "/login.html") {
    return next();
  }
  if (!req.session.username) {
    return res.redirect("/login");
  }
  next();
});

// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route pour la page de connexion
app.get("/login", (req, res) => {
  if (req.session.username) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname, "public", "login.html"));
  }
});

// Route pour la déconnexion
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

// Servir les fichiers statiques du dossier 'public'
app.use(express.static(path.join(__dirname, "public")));

// Gestion des connexions socket.io
io.on("connection", (socket) => {
  console.log("User connected");

  // Écoutez les messages de chat émis par les clients
  socket.on("chat message", (msg) => {
    console.log("Message reçu:", msg);

    // Diffusez le message à tous les clients connectés
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

  // Gérer les autres événements de socket.io ici


// Démarrage du serveur
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});