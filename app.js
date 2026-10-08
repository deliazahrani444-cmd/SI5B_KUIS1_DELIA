require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const vaccinationRoutes = require("./routes/vaccinationRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    nama: "Delia Zahrani",
    nim: "2428240111",
    kelas: "SI5C",
    topik: 31,
    namaTopik: "Puskesmas - Jadwal Vaksinasi",
    resource: "/vaccinations",
    endpoint: [
      "GET /",
      "GET /vaccinations",
      "GET /vaccinations/:id",
      "POST /vaccinations",
      "PUT /vaccinations/:id",
      "DELETE /vaccinations/:id",
      "GET /vaccinations?jenisVaksin=Hepatitis B",
    ],
  });
});

app.use("/vaccinations", vaccinationRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));

module.exports = app;
