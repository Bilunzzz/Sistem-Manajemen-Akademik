import Card from "@/Pages/Layouts/Components/Card";
import Heading from "@/Pages/Layouts/Components/Heading";
import Button from "@/Pages/Layouts/Components/Button";

<Card>
  <div className="flex justify-between items-center mb-4">
    <Heading as="h2">Rencana Studi</Heading>
    {user.permission.includes("rencana-studi.page") && (
      <Button onClick={openAddModal}>+ Tambah Kelas</Button>
    )}
  </div>
  ...
</Card>;
