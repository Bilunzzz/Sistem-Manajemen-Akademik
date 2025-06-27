import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmDialog, errorDialog } from "@/Utils/Helpers/swalHelpers";

import {
  useMahasiswa,
  useStoreMahasiswa,
  useUpdateMahasiswa,
  useDeleteMahasiswa,
} from "@/Utils/Hooks/useMahasiswa";
import { useKelas } from "@/Utils/Hooks/useKelas";
import { useMataKuliah } from "@/Utils/Hooks/useMataKuliah";

import ModalMahasiswa from "./ModalMahasiswa";
import TableMahasiswa from "./TableMahasiswa";
import Pagination from "../Components/Pagination";

const Mahasiswa = () => {
  const navigate = useNavigate();

  // State untuk pencarian, sorting, dan pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");

  // Panggil useMahasiswa dengan query lengkap
  const {
    data: result = { data: [], total: 0 },
    isLoading: isLoadingMahasiswa,
  } = useMahasiswa({
    q: search,
    _sort: sort,
    _order: order,
    _page: page,
    _limit: perPage,
  });

  // Pecah hasil
  const { data: mahasiswa = [] } = result;
  const totalCount = result.total;
  const totalPages = Math.ceil(totalCount / perPage);

  const { data: kelas = [], isLoading: isKelasLoading } = useKelas();
  const { data: mataKuliah = [], isLoading: isMataKuliahLoading } =
    useMataKuliah();

  const { mutate: store } = useStoreMahasiswa();
  const { mutate: update } = useUpdateMahasiswa();
  const { mutate: remove } = useDeleteMahasiswa();

  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const resetAndCloseModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(false);
  };

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setSelectedMahasiswa(mhs);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (selectedMahasiswa) {
      // Mode Edit
      const confirmed = await confirmDialog(
        "Simpan Perubahan?",
        "Yakin ingin memperbarui data mahasiswa ini?"
      );
      if (confirmed) {
        update({ id: selectedMahasiswa.id, data: formData });
        resetAndCloseModal();
      }
    } else {
      // Mode Tambah
      const exists = mahasiswa.find((m) => m.nim === formData.nim);
      if (exists) {
        errorDialog("Gagal", "NIM sudah terdaftar!");
        return;
      }
      const confirmed = await confirmDialog(
        "Tambah Mahasiswa?",
        "Yakin ingin menyimpan data mahasiswa baru ini?"
      );
      if (confirmed) {
        store(formData);
        resetAndCloseModal();
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await confirmDialog(
      "Hapus Mahasiswa?",
      "Yakin ingin menghapus mahasiswa ini secara permanen?"
    );
    if (confirmed) {
      remove(id);
    }
  };

  const getTotalSks = (mhsId) => {
    if (!kelas || !mataKuliah) return 0;
    return kelas
      .filter((k) => k.mahasiswa_ids.includes(String(mhsId)))
      .map(
        (k) =>
          mataKuliah.find((mk) => String(mk.id) === String(k.mata_kuliah_id))
            ?.sks || 0
      )
      .reduce((a, b) => a + b, 0);
  };

  // Handler pagination
  const handlePageChange = (newPage) => setPage(newPage);
  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
  };

  const isLoading = isLoadingMahasiswa || isKelasLoading || isMataKuliahLoading;

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Daftar Mahasiswa</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Tambah Mahasiswa
        </button>
      </div>

      {/* Search, Sort, dan Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Cari nama/NIM..."
          className="border px-3 py-1 rounded flex-grow"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {/* Sort By Field */}
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="name">Sort by Nama</option>
          <option value="nim">Sort by NIM</option>
          <option value="max_sks">Sort by Max SKS</option>
        </select>

        {/* Sort Order */}
        <select
          value={order}
          onChange={(e) => {
            setOrder(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>

        {/* Per Page */}
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value={5}>5 per halaman</option>
          <option value={10}>10 per halaman</option>
          <option value={20}>20 per halaman</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Memuat data...</div>
      ) : (
        <>
          <TableMahasiswa
            data={mahasiswa}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
            getTotalSks={getTotalSks}
            isLoading={isLoadingMahasiswa}
          />

          {/* Pagination Component */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalCount={totalCount}
            perPage={perPage}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
            isLoading={isLoadingMahasiswa}
          />
        </>
      )}

      <ModalMahasiswa
        isOpen={isModalOpen}
        onClose={resetAndCloseModal}
        onSubmit={handleSubmit}
        selectedData={selectedMahasiswa}
      />
    </div>
  );
};

export default Mahasiswa;
