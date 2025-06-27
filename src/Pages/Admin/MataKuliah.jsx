import { useState } from "react";
import { confirmDialog, errorDialog } from "@/Utils/Helpers/swalHelpers";

// Hooks TanStack Query
import {
  useMataKuliah,
  useStoreMataKuliah,
  useUpdateMataKuliah,
  useDeleteMataKuliah,
} from "../../Utils/Hooks/useMataKuliah";

// Komponen UI
import MataKuliahModal from "./MataKuliahModal";
import MataKuliahTable from "./MataKuliahTable";
import Pagination from "../Components/Pagination";

const MataKuliah = () => {
  // State untuk pencarian, sorting, dan pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sort, setSort] = useState("nama");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");

  // Data dari React Query dengan pagination
  const { data: result = { data: [], total: 0 }, isLoading } = useMataKuliah({
    q: search,
    _sort: sort,
    _order: order,
    _page: page,
    _limit: perPage,
  });

  // Pecah hasil
  const { data: mataKuliah = [] } = result;
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / perPage);

  const { mutate: store } = useStoreMataKuliah();
  const { mutate: update } = useUpdateMataKuliah();
  const { mutate: remove } = useDeleteMataKuliah();

  // State untuk modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMatkul, setSelectedMatkul] = useState(null);

  const resetAndCloseModal = () => {
    setSelectedMatkul(null);
    setModalOpen(false);
  };

  const openAddModal = () => {
    setSelectedMatkul(null);
    setModalOpen(true);
  };

  const openEditModal = (matkul) => {
    setSelectedMatkul(matkul);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    if (selectedMatkul) {
      // Mode Edit
      const confirmed = await confirmDialog(
        "Simpan Perubahan?",
        "Yakin ingin memperbarui data mata kuliah ini?"
      );
      if (confirmed) {
        update({ id: selectedMatkul.id, data: form });
        resetAndCloseModal();
      }
    } else {
      // Mode Tambah
      const exists = mataKuliah.find((m) => m.kode === form.kode);
      if (exists) {
        errorDialog("Gagal", "Kode mata kuliah sudah terdaftar!");
        return;
      }
      const confirmed = await confirmDialog(
        "Tambah Mata Kuliah?",
        "Yakin ingin menyimpan data baru ini?"
      );
      if (confirmed) {
        store(form);
        resetAndCloseModal();
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await confirmDialog(
      "Hapus Data?",
      "Yakin ingin menghapus mata kuliah ini secara permanen?"
    );
    if (confirmed) {
      remove(id);
    }
  };

  // Handler pagination
  const handlePageChange = (newPage) => setPage(newPage);
  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Daftar Mata Kuliah</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Tambah Mata Kuliah
        </button>
      </div>

      {/* Search, Sort, dan Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Cari nama/kode mata kuliah..."
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
          <option value="nama.asc">Nama A-Z</option>
          <option value="nama.desc">Nama Z-A</option>
          <option value="kode.asc">Kode A-Z</option>
          <option value="kode.desc">Kode Z-A</option>
          <option value="sks.asc">SKS ↑</option>
          <option value="sks.desc">SKS ↓</option>
        </select>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500 py-10">Memuat data...</p>
      ) : (
        <>
          <MataKuliahTable
            data={mataKuliah}
            onEdit={openEditModal}
            onDelete={handleDelete}
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

      <MataKuliahModal
        isOpen={isModalOpen}
        onClose={resetAndCloseModal}
        onSubmit={handleSubmit}
        selectedData={selectedMatkul}
      />
    </div>
  );
};

export default MataKuliah;
