const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/*
  Données statiques (peuvent être remplacées plus tard par une base de données)
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
  Routes API REST
*/

// Health check (Azure)
app.get("/", (req, res) => {
  res.json({ message: "API Maroc Tourisme is running 🚀" });
});

// GET grand titre
app.get("/api/title", (req, res) => {
  res.json(siteInfo);
});

// GET toutes les villes
app.get("/api/cities", (req, res) => {
  res.json(cities);
});

// GET ville par ID
app.get("/api/cities/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const city = cities.find(c => c.id === id);

  if (!city) {
    return res.status(404).json({ message: "City not found" });
  }

  res.json(city);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
