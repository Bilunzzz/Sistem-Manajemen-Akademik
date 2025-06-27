import { Link } from "react-router-dom";

const Card = ({ data, onOpenModal, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 shadow rounded mt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Daftar Mahasiswa</h2>
        <button
          onClick={onOpenModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah Mahasiswa
        </button>
      </div>
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden border-collapse">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="p-3 text-left">NIM</th>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mhs, i) => (
            <tr
              key={mhs.nim}
              className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="p-3">{mhs.nim}</td>
              <td className="p-3">
                <Link
                  to={`/admin/mahasiswa/${mhs.nim}`}
                  state={{ nama: mhs.nama }}
                  className="text-blue-600 hover:underline"
                >
                  {mhs.nama}
                </Link>
              </td>
              <td className="p-3">
                <span
                  className={mhs.status ? "text-green-600" : "text-red-600"}
                >
                  {mhs.status ? "Aktif" : "Tidak Aktif"}
                </span>
              </td>

              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(mhs.nim)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(mhs.nim)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                Tidak ada data mahasiswa.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Card;
