// Mengasumsikan komponen Form, Label, dan Button sudah ada dan diimpor dengan benar
import Form from "../../Pages/Components/Form";
import Label from "../../Pages/Components/Label";
import Button from "../../Pages/Components/Button";

const ModalRencanaStudi = ({
  isOpen,
  onClose,
  onSubmit,
  onChange,
  form,
  dosen,
  mataKuliah,
}) => {
  if (!isOpen) return null;

  return (
    // [+] Latar belakang dengan efek fade-in
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-300 animate-fadeIn">
      {/* [*] Panel modal dengan efek scale-in */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl transform transition-transform duration-300 animate-scaleIn">
        {/* [*] Header Modal yang baru */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.975M15 21H9"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Tambah Kelas Baru
            </h3>
          </div>
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

        {/* [*] Form dengan styling yang diperbarui */}
        <Form onSubmit={onSubmit} className="p-5">
          <div className="space-y-5">
            <div>
              <Label htmlFor="mata_kuliah_id">Mata Kuliah</Label>
              <select
                name="mata_kuliah_id"
                id="mata_kuliah_id"
                value={form.mata_kuliah_id}
                onChange={onChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Pilih Mata Kuliah --</option>
                {mataKuliah &&
                  mataKuliah.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nama}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <Label htmlFor="dosen_id">Dosen Pengampu</Label>
              <select
                name="dosen_id"
                id="dosen_id"
                value={form.dosen_id}
                onChange={onChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Pilih Dosen --</option>
                {dosen &&
                  dosen.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nama} {/* [FIX] Mengubah d.name menjadi d.nama */}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* [*] Footer dengan tombol aksi yang dibedakan */}
          <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-200">
            <Button type="button" variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ModalRencanaStudi;
