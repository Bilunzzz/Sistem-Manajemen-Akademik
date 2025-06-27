import fs from "fs";
import path from "path";

// Simulasi database dengan data yang ada
const db = {
  dosen: [
    { id: "1", nama: "Dr. Siti Aminah, M.Kom.", max_sks: 12 },
    { id: "2", nama: "Dr. Bambang Wijoyo, M.T.", max_sks: 10 },
    { id: "3", nama: "Prof. Dr. Ir. Udin Sedunia, S.T.", max_sks: 14 },
    { id: "4", nama: "Vina Lestari, S.Kom., M.Cs.", max_sks: 16 },
    { id: "5", nama: "Wawan Setiawan, S.T., M.Eng.", max_sks: 12 },
    { id: "6", nama: "Dr. Retno Wulandari, M.Sc.", max_sks: 10 },
    { id: "7", nama: "Agus Purnomo, S.Kom., M.Kom.", max_sks: 14 },
  ],
  mahasiswa: [
    {
      id: "1",
      name: "Alice Johnson",
      nim: "220001",
      status: true,
      max_sks: 24,
    },
    { id: "2", name: "Bob Smith", nim: "220002", status: false, max_sks: 24 },
    {
      id: "3",
      name: "Charlie Brown",
      nim: "220003",
      status: true,
      max_sks: 24,
    },
    { id: "4", name: "Diana Prince", nim: "220004", status: true, max_sks: 24 },
    {
      id: "5",
      name: "Edward Norton",
      nim: "220005",
      status: false,
      max_sks: 24,
    },
  ],
  matkul: [
    { id: "1", kode: "TI101", nama: "Pemrograman Dasar", sks: 3 },
    { id: "2", kode: "TI102", nama: "Struktur Data", sks: 3 },
    { id: "3", kode: "TI103", nama: "Basis Data", sks: 3 },
    { id: "4", kode: "TI104", nama: "Jaringan Komputer", sks: 3 },
    { id: "5", kode: "TI105", nama: "Sistem Operasi", sks: 3 },
  ],
  kelas: [
    {
      id: "1",
      mata_kuliah_id: "1",
      dosen_id: "1",
      mahasiswa_ids: ["1", "2", "3", "4", "5"],
    },
    {
      id: "2",
      mata_kuliah_id: "2",
      dosen_id: "2",
      mahasiswa_ids: ["2", "3", "4"],
    },
    {
      id: "3",
      mata_kuliah_id: "3",
      dosen_id: "3",
      mahasiswa_ids: ["1", "3", "5"],
    },
  ],
  user: [
    {
      id: 1,
      name: "Admin",
      email: "admin@mail.com",
      password: "admin123",
      role: "admin",
      permission: ["*"],
    },
    {
      id: 2,
      name: "Mahasiswa 1",
      email: "mahasiswa@mail.com",
      password: "mahasiswa123",
      role: "mahasiswa",
      permission: ["rencana-studi.page", "rencana-studi.read"],
    },
  ],
  chart: {
    students: [
      { id: 1, faculty: "Teknik", count: 320 },
      { id: 2, faculty: "Ekonomi", count: 210 },
      { id: 3, faculty: "Kedokteran", count: 150 },
      { id: 4, faculty: "Hukum", count: 180 },
      { id: 5, faculty: "Ilmu Komputer", count: 260 },
    ],
    genderRatio: [
      { id: 1, gender: "Laki-laki", count: 600 },
      { id: 2, gender: "Perempuan", count: 700 },
    ],
    registrations: [
      { id: 1, year: 2020, total: 500 },
      { id: 2, year: 2021, total: 580 },
      { id: 3, year: 2022, total: 640 },
      { id: 4, year: 2023, total: 710 },
    ],
    gradeDistribution: [
      { subject: "TI", A: 120, B: 80, C: 40 },
      { subject: "SI", A: 100, B: 90, C: 50 },
      { subject: "MI", A: 110, B: 85, C: 30 },
    ],
    lecturerRanks: [
      { rank: "Asisten Ahli", count: 30 },
      { rank: "Lektor", count: 50 },
      { rank: "Lektor Kepala", count: 40 },
      { rank: "Guru Besar", count: 10 },
    ],
  },
};

export default function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { query, method } = req;
  const { endpoint, id } = query;

  try {
    switch (method) {
      case "GET":
        if (endpoint && db[endpoint]) {
          const data = db[endpoint];

          if (id) {
            // Get single item
            const item = Array.isArray(data)
              ? data.find((item) => item.id == id)
              : data;

            if (!item) {
              return res.status(404).json({ error: "Item not found" });
            }
            return res.status(200).json(item);
          }

          // Support pagination for arrays
          if (Array.isArray(data)) {
            const { _page, _limit, q, _sort, _order } = req.query;
            let result = [...data];

            // Search
            if (q) {
              result = result.filter((item) =>
                Object.values(item).some((value) =>
                  String(value).toLowerCase().includes(q.toLowerCase())
                )
              );
            }

            // Sort
            if (_sort) {
              result.sort((a, b) => {
                const aVal = a[_sort];
                const bVal = b[_sort];
                if (_order === "desc") {
                  return bVal > aVal ? 1 : -1;
                }
                return aVal > bVal ? 1 : -1;
              });
            }

            // Pagination
            const total = result.length;
            if (_page && _limit) {
              const page = parseInt(_page);
              const limit = parseInt(_limit);
              const start = (page - 1) * limit;
              result = result.slice(start, start + limit);
            }

            // Set total count header for pagination
            res.setHeader("X-Total-Count", total);
            return res.status(200).json(result);
          }

          // Return object as is (like chart data)
          return res.status(200).json(data);
        }

        return res.status(404).json({ error: "Endpoint not found" });

      case "POST":
        if (endpoint && db[endpoint] && Array.isArray(db[endpoint])) {
          const newItem = {
            id: String(db[endpoint].length + 1),
            ...req.body,
          };
          db[endpoint].push(newItem);
          return res.status(201).json(newItem);
        }
        return res.status(400).json({ error: "Invalid endpoint for POST" });

      case "PUT":
        if (endpoint && id && db[endpoint] && Array.isArray(db[endpoint])) {
          const index = db[endpoint].findIndex((item) => item.id == id);
          if (index === -1) {
            return res.status(404).json({ error: "Item not found" });
          }
          db[endpoint][index] = { ...db[endpoint][index], ...req.body };
          return res.status(200).json(db[endpoint][index]);
        }
        return res.status(400).json({ error: "Invalid endpoint for PUT" });

      case "DELETE":
        if (endpoint && id && db[endpoint] && Array.isArray(db[endpoint])) {
          const index = db[endpoint].findIndex((item) => item.id == id);
          if (index === -1) {
            return res.status(404).json({ error: "Item not found" });
          }
          const deleted = db[endpoint].splice(index, 1)[0];
          return res.status(200).json(deleted);
        }
        return res.status(400).json({ error: "Invalid endpoint for DELETE" });

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
