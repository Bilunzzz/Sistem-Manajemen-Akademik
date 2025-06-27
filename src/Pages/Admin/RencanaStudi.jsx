import { useEffect, useState } from "react";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import {
  confirmDialog,
  successDialog,
  errorDialog,
} from "@/Utils/Helpers/swalHelpers";
import {
  getAllRencanaStudi,
  storeRencanaStudi,
  updateRencanaStudi,
  deleteRencanaStudi,
} from "@/Utils/Apis/RencanaStudiApi";
import { getAllDosen } from "@/Utils/Apis/DosenApi";
import { getAllMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { getAllMatkul } from "@/Utils/Apis/MatkulApi";

import ModalRencanaStudi from "./ModalRencanaStudi";
import Select from "../Components/Select";
import Button from "../Components/Button";

const RencanaStudi = () => {
  const { user } = useAuthStateContext();
  const [daftarKelas, setDaftarKelas] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);
  const [selectedMhs, setSelectedMhs] = useState({});
  const [selectedDsn, setSelectedDsn] = useState({});
  const [form, setForm] = useState({ mata_kuliah_id: "", dosen_id: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [resRencanaStudi, resDosen, resMahasiswa, resMataKuliah] =
        await Promise.all([
          getAllRencanaStudi(),
          getAllDosen(),
          getAllMahasiswa(),
          getAllMatkul(),
        ]);
      setDaftarKelas(resRencanaStudi.data);
      setDosen(resDosen.data);
      setMahasiswa(resMahasiswa.data);
      setMataKuliah(resMataKuliah.data);
    } catch (error) {
      errorDialog("Gagal", "Tidak dapat mengambil data dari server.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Helper Functions ---
  const mataKuliahSudahDipakai = daftarKelas.map((k) => k.mata_kuliah_id);
  const mataKuliahBelumAdaKelas = mataKuliah.filter(
    (m) => !mataKuliahSudahDipakai.includes(String(m.id))
  );
  const getMaxSks = (id) =>
    mahasiswa.find((m) => String(m.id) === String(id))?.max_sks || 0;

  const getDosenMaxSks = (id) =>
    dosen.find((d) => String(d.id) === String(id))?.max_sks || 0;

  const getTotalSksMahasiswa = (mhsId) => {
    return daftarKelas
      .filter((k) => k.mahasiswa_ids.includes(String(mhsId)))
      .map(
        (k) =>
          mataKuliah.find((mk) => String(mk.id) === String(k.mata_kuliah_id))
            ?.sks || 0
      )
      .reduce((a, b) => a + b, 0);
  };

  // --- Event Handlers ---
  const handleAddMahasiswa = async (kelasItem, mhsId) => {
    if (!mhsId) return errorDialog("Gagal", "Pilih mahasiswa terlebih dahulu.");
    const matkul = mataKuliah.find(
      (m) => String(m.id) === String(kelasItem.mata_kuliah_id)
    );

    const sks = matkul?.sks || 0;

    const currentSks = getTotalSksMahasiswa(mhsId);

    const maxSks = getMaxSks(mhsId);

    if (currentSks + sks > maxSks)
      return errorDialog(
        "Gagal",

        `SKS mahasiswa akan melebihi batas (${maxSks} SKS).`
      );

    if (kelasItem.mahasiswa_ids.includes(String(mhsId)))
      return errorDialog("Gagal", "Mahasiswa sudah terdaftar di kelas ini.");

    const confirmed = await confirmDialog(
      "Tambah Mahasiswa?",

      `Yakin ingin menambahkan mahasiswa ini ke kelas ${matkul?.nama}?`
    );

    if (confirmed) {
      const updated = {
        ...kelasItem,

        mahasiswa_ids: [...kelasItem.mahasiswa_ids, String(mhsId)],
      };

      await updateRencanaStudi(kelasItem.id, updated)
        .then(() => {
          successDialog("Berhasil", "Mahasiswa berhasil ditambahkan.");

          setSelectedMhs((prev) => ({ ...prev, [kelasItem.id]: "" }));

          fetchData();
        })

        .catch(() => errorDialog("Gagal", "Gagal memperbarui data kelas."));
    }
  };

  const handleDeleteMahasiswa = async (kelasItem, mhsId) => {
    const mhs = mahasiswa.find((m) => String(m.id) === String(mhsId));

    const confirmed = await confirmDialog(
      "Hapus Mahasiswa?",

      `Yakin ingin menghapus ${mhs?.name} dari kelas ini?`
    );

    if (confirmed) {
      const updated = {
        ...kelasItem,

        mahasiswa_ids: kelasItem.mahasiswa_ids.filter(
          (id) => id !== String(mhsId)
        ),
      };

      await updateRencanaStudi(kelasItem.id, updated)
        .then(() => {
          successDialog("Berhasil", "Mahasiswa berhasil dihapus dari kelas.");

          fetchData();
        })

        .catch(() => errorDialog("Gagal", "Gagal memperbarui data kelas."));
    }
  };

  const handleChangeDosen = async (kelasItem) => {
    const dsnId = selectedDsn[kelasItem.id];
    if (!dsnId) {
      return errorDialog("Gagal", "Anda belum memilih dosen baru.");
    }

    const dosenBaru = dosen.find((d) => String(d.id) === String(dsnId));
    if (!dosenBaru) return;

    const totalSksDosenSaatIni = daftarKelas
      .filter((k) => String(k.dosen_id) === String(dsnId))
      .map(
        (k) =>
          mataKuliah.find((m) => String(m.id) === String(k.mata_kuliah_id))
            ?.sks || 0
      )
      .reduce((acc, curr) => acc + curr, 0);

    const sksKelasIni =
      mataKuliah.find((m) => String(m.id) === String(kelasItem.mata_kuliah_id))
        ?.sks || 0;
    const maxSksDosen = dosenBaru.max_sks;

    if (totalSksDosenSaatIni + sksKelasIni > maxSksDosen) {
      return errorDialog(
        "Beban SKS Melebihi Batas",
        `Gagal menetapkan ${dosenBaru.nama}. Total SKS akan menjadi ${
          totalSksDosenSaatIni + sksKelasIni
        }, melebihi batas SKS dosen yaitu ${maxSksDosen}.`
      );
    }

    const confirmed = await confirmDialog(
      "Ubah Dosen Pengampu?",
      `Yakin ingin mengubah dosen untuk kelas ini menjadi ${dosenBaru.nama}?`
    );
    if (confirmed) {
      await updateRencanaStudi(kelasItem.id, { ...kelasItem, dosen_id: dsnId })
        .then(() => {
          successDialog("Berhasil", "Dosen pengampu berhasil diperbarui.");
          fetchData();
        })
        .catch(() => errorDialog("Gagal", "Gagal memperbarui data."));
    }
  };

  const handleDeleteKelas = async (kelasId) => {
    const confirmed = await confirmDialog(
      "Hapus Kelas?",

      "Yakin ingin menghapus kelas ini secara permanen?"
    );

    if (confirmed) {
      await deleteRencanaStudi(kelasId)
        .then(() => {
          successDialog("Berhasil", "Kelas berhasil dihapus.");

          fetchData();
        })

        .catch(() => errorDialog("Gagal", "Gagal menghapus kelas."));
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!form.mata_kuliah_id || !form.dosen_id) {
      return errorDialog(
        "Gagal",
        "Form mata kuliah dan dosen tidak boleh kosong."
      );
    }

    const dsnId = form.dosen_id;
    const matkulId = form.mata_kuliah_id;

    const dosenBaru = dosen.find((d) => String(d.id) === String(dsnId));
    const mataKuliahBaru = mataKuliah.find(
      (m) => String(m.id) === String(matkulId)
    );

    if (!dosenBaru || !mataKuliahBaru) {
      return errorDialog("Gagal", "Data dosen atau mata kuliah tidak valid.");
    }

    const totalSksDosenSaatIni = daftarKelas
      .filter((k) => String(k.dosen_id) === String(dsnId))
      .map(
        (k) =>
          mataKuliah.find((m) => String(m.id) === String(k.mata_kuliah_id))
            ?.sks || 0
      )
      .reduce((acc, curr) => acc + curr, 0);

    const sksKelasBaru = mataKuliahBaru.sks;
    const maxSksDosen = dosenBaru.max_sks;

    if (totalSksDosenSaatIni + sksKelasBaru > maxSksDosen) {
      return errorDialog(
        "Beban SKS Melebihi Batas",
        `Gagal menambahkan kelas baru untuk ${
          dosenBaru.nama
        }. Total SKS akan menjadi ${
          totalSksDosenSaatIni + sksKelasBaru
        }, melebihi batas SKS dosen yaitu ${maxSksDosen}.`
      );
    }

    const confirmed = await confirmDialog(
      "Simpan Kelas Baru?",
      "Yakin ingin menyimpan data kelas baru ini?"
    );
    if (confirmed) {
      const newData = { ...form, mahasiswa_ids: [] };
      await storeRencanaStudi(newData)
        .then(() => {
          setIsModalOpen(false);
          successDialog("Berhasil", "Kelas baru berhasil ditambahkan.");
          fetchData();
        })
        .catch(() => errorDialog("Gagal", "Gagal menyimpan kelas baru."));
    }
  };

  return (
    <>
      <div className="bg-white p-4 shadow rounded mt-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Rencana Studi</h2>
          {user?.permission.includes("rencana-studi.create") && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Tambah Kelas
            </button>
          )}
        </div>

        <div className="space-y-6">
          {daftarKelas.length > 0 ? (
            daftarKelas.map((kls) => {
              const matkul = mataKuliah.find(
                (m) => String(m.id) === String(kls.mata_kuliah_id)
              );
              const dosenPengampu = dosen.find(
                (d) => String(d.id) === String(kls.dosen_id)
              );
              const mhsInClass = kls.mahasiswa_ids
                .map((id) => mahasiswa.find((m) => String(m.id) === String(id)))
                .filter(Boolean);

              return (
                <div
                  key={kls.id}
                  className="border rounded-lg shadow-md bg-white overflow-hidden"
                >
                  <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50">
                    <h3 className="text-lg font-semibold text-blue-700">
                      {matkul?.nama || "-"} ({matkul?.sks || 0} SKS)
                    </h3>
                    {mhsInClass.length === 0 &&
                      user?.permission.includes("rencana-studi.delete") && (
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteKelas(kls.id)}
                        >
                          Hapus Kelas
                        </Button>
                      )}
                  </div>

                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium bg-gray-50 w-1/3">
                          Dosen Pengampu
                        </td>
                        <td className="px-4 py-2">
                          {dosenPengampu?.nama || "Belum ditentukan"}
                        </td>
                      </tr>
                      {/* Baris untuk mengganti dosen */}
                      {user?.permission.includes("rencana-studi.update") && (
                        <tr className="border-b">
                          <td className="px-4 py-2 font-medium bg-gray-50 align-middle">
                            Ganti Dosen
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              <Select
                                value={selectedDsn[kls.id] || ""}
                                onChange={(e) =>
                                  setSelectedDsn({
                                    ...selectedDsn,
                                    [kls.id]: e.target.value,
                                  })
                                }
                                size="sm"
                                className="w-full md:w-56"
                              >
                                <option value="">-- Pilih Dosen Baru --</option>
                                {dosen.map((d) => (
                                  <option key={d.id} value={d.id}>
                                    {d.nama}
                                  </option>
                                ))}
                              </Select>
                              <Button
                                size="sm"
                                onClick={() => handleChangeDosen(kls)}
                              >
                                Update
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )}
                      <tr className="border-b">
                        <td className="px-4 py-2 font-medium bg-gray-50">
                          Mahasiswa Terdaftar
                        </td>
                        <td className="px-4 py-2">
                          {mhsInClass.length > 0
                            ? mhsInClass.map((m) => m.name).join(", ")
                            : "Belum ada mahasiswa"}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {user?.permission.includes("rencana-studi.update") && (
                    <div className="flex items-center gap-2 px-4 py-3 border-t bg-gray-50">
                      <Select
                        value={selectedMhs[kls.id] || ""}
                        onChange={(e) =>
                          setSelectedMhs({
                            ...selectedMhs,
                            [kls.id]: e.target.value,
                          })
                        }
                        size="sm"
                        className="w-full md:w-56"
                      >
                        <option value="">-- Pilih Mahasiswa --</option>
                        {mahasiswa.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.nama} ({m.nim})
                          </option>
                        ))}
                      </Select>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleAddMahasiswa(kls, selectedMhs[kls.id])
                        }
                      >
                        Tambah
                      </Button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">
              Tidak ada kelas yang tersedia.
            </div>
          )}
        </div>
      </div>

      <ModalRencanaStudi
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        form={form}
        dosen={dosen}
        mataKuliah={mataKuliahBelumAdaKelas}
      />
    </>
  );
};

export default RencanaStudi;
