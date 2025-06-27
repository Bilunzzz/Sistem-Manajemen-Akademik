import { useState, useEffect } from "react";

const MataKuliahModal = ({ isOpen, onClose, onSubmit, selectedData }) => {
  const [form, setForm] = useState({ kode: "", nama: "", sks: "" });

  useEffect(() => {
    if (selectedData) {
      setForm(selectedData);
    } else {
      setForm({ kode: "", nama: "", sks: "" });
    }
  }, [selectedData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "sks" ? Number(value) || "" : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.kode || !form.nama || !form.sks) {
      alert("Semua field wajib diisi!");
      return;
    }
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl animate-scaleIn">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">
            {selectedData ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="kode"
                className="block mb-2 text-sm font-medium text-gray-800"
              >
                Kode
              </label>
              <input
                type="text"
                id="kode"
                name="kode"
                value={form.kode}
                onChange={handleChange}
                disabled={!!selectedData}
                placeholder="Kode Mata Kuliah"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nama"
                className="block mb-2 text-sm font-medium text-gray-800"
              >
                Nama
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Nama Mata Kuliah"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="sks"
                className="block mb-2 text-sm font-medium text-gray-800"
              >
                SKS
              </label>
              <input
                type="number"
                id="sks"
                name="sks"
                value={form.sks}
                onChange={handleChange}
                placeholder="Jumlah SKS"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min={1}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              {selectedData ? "Simpan Perubahan" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MataKuliahModal;
