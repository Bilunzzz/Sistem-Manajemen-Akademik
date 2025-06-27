import ModalRencanaStudi from "./ModalRencanaStudi";

<ModalRencanaStudi
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onChange={handleChange}
  onSubmit={handleSubmit}
  form={form}
  dosen={dosen}
  mataKuliah={mataKuliahBelumAdaKelas}
/>;
