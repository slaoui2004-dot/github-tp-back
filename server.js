const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// CORS (si front hébergé ailleurs)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

/* =========================
   DONNÉES STATIQUES
========================= */

const siteInfo = {
  title: "Découvrez la Magie du Maroc"
};

const cities = [
  {
    id: 1,
    name: "Marrakech",
    subtitle: "La Ville Rouge",
    highlights: [
      "Jardin Majorelle",
      "Palais Bahia",
      "Place Jemaa el-Fna"
    ]
  },
  {
    id: 2,
    name: "Casablanca",
    subtitle: "La Ville Blanche",
    highlights: [
      "Mosquée Hassan II",
      "La Corniche",
      "Quartier Habous"
    ]
  },
  {
    id: 3,
    name: "Fès",
    subtitle: "Capitale Spirituelle",
    highlights: [
      "Médina de Fès",
      "Université Al Quaraouiyine",
      "Tanneries Chouara"
    ]
  },
  {
    id: 4,
    name: "Tanger",
    subtitle: "La Perle du Détroit",
    description:
      "Tanger relie l’Afrique à l’Europe. Ville cosmopolite et artistique.",
    highlights: [
      "Cap Spartel",
      "Grottes d’Hercule",
      "Médina de Tanger"
    ]
  }
];

// Stockage mémoire (pas de BDD)
const reservations = [];

/* =========================
   ROUTES API
========================= */

// Health check
app.get("/", (req, res) => {
  res.json({ status: "API running" });
});

// GET titre
app.get("/api/title", (req, res) => {
  res.json(siteInfo);
});

// GET villes
app.get("/api/cities", (req, res) => {
  res.json(cities);
});

// POST réservation
app.post("/api/reservations", (req, res) => {
  const { nom, prenom, telephone, ville } = req.body;

  if (!nom || !prenom || !telephone || !ville) {
    return res.status(400).json({
      error: "Tous les champs sont obligatoires"
    });
  }

  const newReservation = {
    id: reservations.length + 1,
    nom,
    prenom,
    telephone,
    ville,
    createdAt: new Date()
  };

  reservations.push(newReservation);

  res.status(201).json({
    message: "Réservation enregistrée",
    reservation: newReservation
  });
});

// GET toutes les réservations (admin test)
app.get("/api/reservations", (req, res) => {
  res.json(reservations);
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
