import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Liste des villes autorisées
const villesAutorisees = ["Casablanca", "Tanger", "Fès", "Marrakech"];

// Route POST
app.post("/reservation", (req, res) => {
  const { nom, prenom, telephone, destination } = req.body;

  // Validation
  if (!nom || !prenom || !telephone || !destination) {
    return res.status(400).json({
      success: false,
      message: "Tous les champs sont obligatoires",
    });
  }

  if (!villesAutorisees.includes(destination)) {
    return res.status(400).json({
      success: false,
      message: "Destination invalide",
    });
  }

  // Simulation enregistrement (plus tard DB)
  const reservation = {
    id: Date.now(),
    nom,
    prenom,
    telephone,
    destination,
    createdAt: new Date(),
  };

  console.log("Nouvelle réservation :", reservation);

  return res.status(201).json({
    success: true,
    message: "Réservation enregistrée avec succès",
    data: reservation,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
