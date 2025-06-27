// src/Pages/Dosen/DosenDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDosen } from "@/Utils/Apis/DosenApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";

const DosenDetail = () => {
  const { id } = useParams();
  const [dosen, setDosen] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getDosen(id);
        setDosen(res.data);
      } catch {
        toastError("Gagal mengambil data dosen.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <p className="text-center">Memuat data...</p>;
  if (!dosen) return <p className="text-center">Data tidak ditemukan.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md relative">
        <button
          onClick={() => navigate("/admin/dosen")}
          className="absolute left-4 top-4 text-sm text-blue-600 hover:underline"
        >
          ← Kembali
        </button>
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Detail Dosen
        </h1>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 text-sm">Nama</p>
            <p className="text-lg font-medium text-gray-800">{dosen.name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Maksimal SKS</p>
            <p className="text-lg font-medium text-gray-800">{dosen.max_sks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DosenDetail;
