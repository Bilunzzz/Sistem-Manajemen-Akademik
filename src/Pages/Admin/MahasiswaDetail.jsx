import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

const MahasiswaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMahasiswa();
    // eslint-disable-next-line
  }, [id]);

  const fetchMahasiswa = async () => {
    try {
      const res = await getMahasiswa(id);
      setMahasiswa(res.data);
    } catch (err) {
      toastError("Gagal mengambil data mahasiswa.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Memuat data...</p>;

  if (!mahasiswa)
    return (
      <p className="text-center text-gray-500 mt-10">Data tidak ditemukan.</p>
    );

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100 px-4">
      {/* Tombol Kembali di pojok kiri atas */}
      <button
        onClick={() => navigate("/admin/mahasiswa")}
        className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        ← Kembali
      </button>

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md mt-8">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Detail Mahasiswa
        </h1>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 text-sm">Nama</p>
            <p className="text-lg font-medium text-gray-800">
              {mahasiswa.name}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">NIM</p>
            <p className="text-lg font-medium text-gray-800">{mahasiswa.nim}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Maksimal SKS</p>
            <p className="text-lg font-medium text-gray-800">
              {mahasiswa.max_sks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MahasiswaDetail;
