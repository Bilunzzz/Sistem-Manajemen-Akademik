const fs = require("fs");
const path = require("path");

// Path ke folder 'db' dan file output 'db.json'
const dbFolder = path.join(__dirname, "db");
const outputFile = path.join(__dirname, "db.json");
const chartFile = path.join(__dirname, "chart.json");

// Objek untuk menampung hasil gabungan
const combined = {};

try {
  // Ambil semua file .json di folder db/
  const files = fs.readdirSync(dbFolder).filter((f) => f.endsWith(".json"));

  console.log("Menggabungkan file-file berikut:");
  files.forEach((file) => {
    console.log(`- db/${file}`);
    const key = path.basename(file, ".json"); // misal: mahasiswa.json → mahasiswa
    const content = fs.readFileSync(path.join(dbFolder, file), "utf-8");
    combined[key] = JSON.parse(content);
  });

  // Tambahkan chart.json dari root directory
  if (fs.existsSync(chartFile)) {
    console.log(`- chart.json`);
    const chartContent = fs.readFileSync(chartFile, "utf-8");
    combined.chart = JSON.parse(chartContent);
  }

  fs.writeFileSync(outputFile, JSON.stringify(combined, null, 2));
  console.log(
    `\n✅ Berhasil! Semua data telah digabungkan ke dalam file ${path.basename(
      outputFile
    )}.`
  );
} catch (error) {
  console.error("\n❌ Gagal menggabungkan file:", error);
}
