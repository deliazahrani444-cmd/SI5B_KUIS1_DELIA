// ROUTE: memetakan alamat ke fungsi controller
const express = require("express");
const router = express.Router();
const c = require("../controllers/vaccinationController");
const cekApiKey = require("../middlewares/cekApiKey");

router.get("/", c.getAllVaccinations);
router.get("/:id", c.getVaccinationById);
router.post("/", cekApiKey, c.createVaccination);
router.put("/:id", cekApiKey, c.updateVaccination);
router.delete("/:id", cekApiKey, c.deleteVaccination);

module.exports = router;
