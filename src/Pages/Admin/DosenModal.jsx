import { useState, useEffect } from "react";

const DosenModal = ({ isModalOpen, onClose, onSubmit, selectedDosen }) => {
  const [form, setForm] = useState({ max_sks: "", name: "" });

  useEffect(() => {
    if (selectedDosen) {
      setForm(selectedDosen);
    } else {
      setForm({ max_sks: "", nama: "" });
    }
  }, [selectedDosen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "max_sks" ? Number(value) || "" : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.max_sks || !form.nama) {
      alert("Harap isi semua data!");
      return;
    }

    onSubmit(form);
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-300">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg transform transition-all duration-300">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          {selectedDosen ? "Edit Dosen" : "Tambah Dosen"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maksimal SKS
            </label>
            <input
              type="text"
              name="nidn"
              value={form.max_sks}
              onChange={handleChange}
              disabled={!!selectedDosen}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maksimal SKS
            </label>
            <input
              type="number"
              name="max_sks"
              value={form.max_sks}
              onChange={handleChange}
              min={1}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DosenModal;
