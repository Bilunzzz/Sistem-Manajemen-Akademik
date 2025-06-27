const MataKuliahTable = ({ data, onEdit, onDelete, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="overflow-x-auto shadow-md rounded-xl bg-white">
        <div className="p-10 text-center text-gray-500">
          Memuat data mata kuliah...
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-xl bg-white">
      <table className="min-w-full table-auto rounded-xl overflow-hidden">
        {/* ... thead tidak berubah ... */}
        <thead>
          <tr className="bg-blue-600 text-white text-sm">
            <th className="px-5 py-3 text-left">Kode</th>
            <th className="px-5 py-3 text-left">Nama</th>
            <th className="px-5 py-3 text-left">SKS</th>
            <th className="px-5 py-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((mk, index) => (
              <tr
                key={mk.id}
                className={`transition-colors duration-150 hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-5 py-3">{mk.kode}</td>
                <td className="px-5 py-3">{mk.nama}</td>
                <td className="px-5 py-3">{mk.sks}</td>
                <td className="px-5 py-3 space-x-2">
                  <button
                    onClick={() => onEdit(mk)} // [*] FIX: Kirim seluruh objek 'mk', bukan hanya 'mk.id'
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(mk.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-200"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-5 py-6 text-center text-gray-500 text-sm"
              >
                Tidak ada data mata kuliah.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MataKuliahTable;
