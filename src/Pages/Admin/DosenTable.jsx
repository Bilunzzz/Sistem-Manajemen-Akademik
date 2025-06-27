import { Link } from "react-router-dom";

const DosenTable = ({
  data,
  onDelete,
  onDetail,
  onEdit,
  getTotalSksDosen,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="overflow-x-auto shadow-md rounded-xl bg-white">
        <div className="p-10 text-center text-gray-500">
          Memuat data dosen...
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-xl bg-white">
      <table className="min-w-full table-auto rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white text-sm">
            <th className="px-5 py-3 text-left">Nama</th>
            <th className="px-5 py-3 text-left">Maksimal SKS</th>
            <th className="px-5 py-3 text-left">SKS Terpakai</th>
            <th className="px-5 py-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((dosen, index) => {
              const sksTerpakai = getTotalSksDosen
                ? getTotalSksDosen(dosen.id)
                : 0;

              return (
                <tr
                  key={dosen.id}
                  className={`transition duration-150 hover:bg-blue-50 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-5 py-3">{dosen.nama}</td>
                  <td className="px-5 py-3">{dosen.max_sks}</td>
                  <td className="px-5 py-3">{sksTerpakai}</td>
                  <td className="px-5 py-3 space-x-2">
                    <button
                      onClick={() => onDetail(dosen.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => onEdit(dosen)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(dosen.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan="4"
                className="text-center text-sm text-gray-500 py-6"
              >
                Tidak ada data dosen.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DosenTable;
