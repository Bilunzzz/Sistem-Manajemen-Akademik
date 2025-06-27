import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDosen,
  useStoreDosen,
  useUpdateDosen,
  useDeleteDosen,
} from "@/Utils/Hooks/useDosen";
import { useKelas } from "@/Utils/Hooks/useKelas";
import { useMataKuliah } from "@/Utils/Hooks/useMataKuliah";
import { confirmDialog } from "@/Utils/Helpers/swalHelpers";

// Komponen UI
import DosenModal from "./DosenModal";
import DosenTable from "./DosenTable";
import Pagination from "../Components/Pagination";

const Dosen = () => {
  const navigate = useNavigate();

  // State untuk pencarian, sorting, dan pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");

  // Ambil data dengan React Query hooks
  const { data: result = { data: [], total: 0 }, isLoading: isDosenLoading } =
    useDosen({
      q: search,
      _sort: sort,
      _order: order,
      _page: page,
      _limit: perPage,
    });

  // Pecah hasil
  const { data: dosen = [] } = result;
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / perPage);

  const { data: kelas = [], isLoading: isKelasLoading } = useKelas();
  const { data: mataKuliah = [], isLoading: isMataKuliahLoading } =
    useMataKuliah();

  // Mutasi data
  const { mutate: store } = useStoreDosen();
  const { mutate: update } = useUpdateDosen();
  const { mutate: remove } = useDeleteDosen();

  // State untuk modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDosen, setSelectedDosen] = useState(null);

  const resetFormAndCloseModal = () => {
    setSelectedDosen(null);
    setModalOpen(false);
  };

  const openAddModal = () => {
    setSelectedDosen(null);
    setModalOpen(true);
  };

  const openEditModal = (dosenData) => {
    setSelectedDosen(dosenData);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    if (selectedDosen) {
      const confirmed = await confirmDialog(
        "Konfirmasi",
        "Yakin ingin menyimpan perubahan?",
        "Simpan"
      );
      if (confirmed) {
        update({ id: selectedDosen.id, data: form });
        resetFormAndCloseModal();
      }
    } else {
      store(form);
      resetFormAndCloseModal();
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await confirmDialog(
      "Konfirmasi",
      "Yakin ingin menghapus dosen ini?",
      "Hapus"
    );
    if (confirmed) {
      remove(id);
    }
  };

  // Kalkulasi total SKS dosen
  const getTotalSksDosen = (dosenId) => {
    if (!kelas || !mataKuliah) return 0;
    return kelas
      .filter((k) => String(k.dosen_id) === String(dosenId))
      .map((k) => mataKuliah.find((mk) => mk.id === k.mata_kuliah_id)?.sks || 0)
      .reduce((acc, curr) => acc + curr, 0);
  };

  // Handler pagination
  const handlePageChange = (newPage) => setPage(newPage);
  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
  };

  const isLoading = isDosenLoading || isKelasLoading || isMataKuliahLoading;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Data Dosen</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Tambah Dosen
        </button>
      </div>

      {/* Search, Sort, dan Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Cari nama"
          className="border px-3 py-1 rounded flex-grow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Sort */}
        <select
          className="border px-3 py-1 rounded"
          value={`${sort}.${order}`}
          onChange={(e) => {
            const [newSort, newOrder] = e.target.value.split(".");
            setSort(newSort);
            setOrder(newOrder);
          }}
        >
          <option value="name.asc">Nama A-Z</option>
          <option value="name.desc">Nama Z-A</option>
          <option value="nip.asc">NIP ↑</option>
          <option value="nip.desc">NIP ↓</option>
        </select>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500 py-10">Memuat data dosen...</p>
      ) : (
        <>
          <DosenTable
            data={dosen}
            onDelete={handleDelete}
            onDetail={(id) => navigate(`/admin/dosen/${id}`)}
            onEdit={openEditModal}
            getTotalSksDosen={getTotalSksDosen}
            isLoading={isLoading}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalCount={totalCount}
            perPage={perPage}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
            isLoading={isLoading}
          />
        </>
      )}

      <DosenModal
        isModalOpen={isModalOpen}
        onClose={resetFormAndCloseModal}
        onSubmit={handleSubmit}
        selectedDosen={selectedDosen}
      />
    </div>
  );
};

export default Dosen;
