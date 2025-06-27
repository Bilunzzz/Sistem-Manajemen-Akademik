import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";
import Button from "../Components/Button";

const TableMahasiswa = ({
  data = [],
  onEdit,
  onDelete,
  onDetail,
  getTotalSks,
}) => {
  const { user } = useAuthStateContext();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-2 px-4">NIM</th>
            <th className="py-2 px-4">Nama</th>
            <th className="py-2 px-4 text-center">Max SKS</th>
            <th className="py-2 px-4 text-center">SKS Terpakai</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mhs, index) => {
            const totalSks = getTotalSks(mhs.id);
            return (
              <tr
                key={mhs.nim}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="py-2 px-4">{mhs.nim}</td>
                <td className="py-2 px-4">{mhs.name}</td>
                <td className="py-2 px-4 text-center">{mhs.max_sks || "-"}</td>
                <td className="py-2 px-4 text-center">{totalSks}</td>
                <td className="py-2 px-4 text-center space-x-2">
                  <Button onClick={() => onDetail(mhs.id)}>Detail</Button>
                  {Array.isArray(user?.permission) &&
                    user.permission.includes("mahasiswa.update") && (
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => onEdit(mhs)}
                      >
                        Edit
                      </Button>
                    )}
                  {Array.isArray(user?.permission) &&
                    user.permission.includes("mahasiswa.delete") && (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => onDelete(mhs.id)}
                      >
                        Hapus
                      </Button>
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableMahasiswa;
