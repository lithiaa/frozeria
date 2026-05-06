import { columns, DashboardColumns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<DashboardColumns[]> {
  return [
    {
      id: 1,
      nama_barang: "Barang 1",
      kategori: "Kategori 1",
      stok: 10,
      satuan: "Buah",
      harga_jual: 10000,
      aksi: "Edit",
    },
  ]
}

export async function DashboardTable() {
  const data = await getData()

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  )
}