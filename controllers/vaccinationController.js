const Vaccination = require("../models/vaccinationModel");

function kirim(res, kodeStatus, status, message, data) {
  return res.status(kodeStatus).json({ status, message, data });
}

function validasi(body) {
  const { namaPasien, nik, jenisVaksin, dosisKe, tanggal } = body || {};

  const fieldString = { namaPasien, nik, jenisVaksin, tanggal };
  for (const [nama, nilai] of Object.entries(fieldString)) {
    if (nilai === undefined || nilai === null || String(nilai).trim() === "") {
      return `Field ${nama} wajib diisi`;
    }
    if (typeof nilai !== "string") {
      return `Field ${nama} harus berupa string`;
    }
  }

  if (dosisKe === undefined || dosisKe === null || dosisKe === "") {
    return "Field dosisKe wajib diisi";
  }
  if (typeof dosisKe !== "number" || !Number.isFinite(dosisKe) || dosisKe < 1) {
    return "Field dosisKe harus berupa angka lebih dari 0";
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal.trim())) {
    return "Field tanggal harus berformat YYYY-MM-DD";
  }
  const cek = new Date(tanggal.trim() + "T00:00:00Z");
  if (Number.isNaN(cek.getTime()) || cek.toISOString().slice(0, 10) !== tanggal.trim()) {
    return "Field tanggal bukan tanggal yang valid";
  }
  return null;
}

const tidakDitemukan = (res, idParam) =>
  kirim(res, 404, "error", `Data dengan id ${idParam} tidak ditemukan`, null);

exports.getAllVaccinations = (req, res) => {
  res.status(200).json(Vaccination.getAll(req.query.jenisVaksin));
};

exports.getVaccinationById = (req, res) => {
  const data = Vaccination.getById(parseInt(req.params.id));
  if (!data) return tidakDitemukan(res, req.params.id);
  res.status(200).json(data);
};

exports.createVaccination = (req, res) => {
  const pesanError = validasi(req.body);
  if (pesanError) return kirim(res, 400, "error", pesanError, null);
  const baru = Vaccination.create(req.body);
  kirim(res, 201, "success", "Data berhasil ditambahkan", baru);
};

exports.updateVaccination = (req, res) => {
  const id = parseInt(req.params.id);
  if (!Vaccination.getById(id)) return tidakDitemukan(res, req.params.id);
  const pesanError = validasi(req.body);
  if (pesanError) return kirim(res, 400, "error", pesanError, null);
  const hasil = Vaccination.update(id, req.body);
  kirim(res, 200, "success", "Data berhasil diubah", hasil);
};

exports.deleteVaccination = (req, res) => {
  const id = parseInt(req.params.id);
  if (!Vaccination.remove(id)) return tidakDitemukan(res, req.params.id);
  res.status(204).send();
};
