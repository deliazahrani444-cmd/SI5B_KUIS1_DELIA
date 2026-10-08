// MODEL: menyimpan data dan fungsi pengolahnya (tanpa req dan res)
const vaccinations = [
  { id: 1, namaPasien: "Rudi Santoso", nik: "1671010101010001", jenisVaksin: "Hepatitis B", dosisKe: 2, tanggal: "2026-10-03" },
  { id: 2, namaPasien: "Siti Aminah", nik: "1671010202020002", jenisVaksin: "Influenza", dosisKe: 1, tanggal: "2026-10-05" },
  { id: 3, namaPasien: "Budi Hartono", nik: "1671010303030003", jenisVaksin: "Hepatitis B", dosisKe: 1, tanggal: "2026-10-07" },
  { id: 4, namaPasien: "Maya Lestari", nik: "1671010404040004", jenisVaksin: "Tetanus", dosisKe: 3, tanggal: "2026-10-09" },
];

let nextId = 5;

const getAll = (jenisVaksin) => {
  if (jenisVaksin === undefined) return vaccinations;
  return vaccinations.filter(
    (v) => v.jenisVaksin.toLowerCase() === String(jenisVaksin).trim().toLowerCase()
  );
};

const getById = (id) => vaccinations.find((v) => v.id === id);

const create = ({ namaPasien, nik, jenisVaksin, dosisKe, tanggal }) => {
  const baru = {
    id: nextId++,
    namaPasien: namaPasien.trim(),
    nik: nik.trim(),
    jenisVaksin: jenisVaksin.trim(),
    dosisKe,
    tanggal: tanggal.trim(),
  };
  vaccinations.push(baru);
  return baru;
};

const update = (id, { namaPasien, nik, jenisVaksin, dosisKe, tanggal }) => {
  const index = vaccinations.findIndex((v) => v.id === id);
  if (index === -1) return null;
  vaccinations[index] = {
    id,
    namaPasien: namaPasien.trim(),
    nik: nik.trim(),
    jenisVaksin: jenisVaksin.trim(),
    dosisKe,
    tanggal: tanggal.trim(),
  };
  return vaccinations[index];
};

const remove = (id) => {
  const index = vaccinations.findIndex((v) => v.id === id);
  if (index === -1) return false;
  vaccinations.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, create, update, remove };
