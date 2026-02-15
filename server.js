const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS simple (à garder si le front est sur un autre domaine)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

/*
  ============================
  DONNÉES STATIQUES (MEMORY)
  ============================
*/

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
      "Tanger relie l’Afrique à l’Europe. Ville cosmopolite et artistique, elle offre une vue exceptionnelle sur le détroit de Gibraltar.",
    highlights: [
      "Cap Spartel",
      "Grottes d’Hercule",
      "Médina de Tanger"
    ]
  }
];

/*
  ============================
  ROUTES API
  ============================
*/

// Health check Azure
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API Maroc Tourisme running"
  });
});

// GET grand titre
app.get("/api/title", (req, res) => {
  res.status(200).json(siteInfo);
});

// GET toutes les villes
app.get("/api/cities", (req, res) => {
  res.status(200).json(cities);
});

// GET ville par ID
app.get("/api/cities/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const city = cities.find(c => c.id === id);

  if (!city) {
    return res.status(404).json({
      error: "City not found"
    });
  }

  res.status(200).json(city);
});

// Gestion route inconnue
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

/*
  ============================
  START SERVER
  ============================
*/

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
