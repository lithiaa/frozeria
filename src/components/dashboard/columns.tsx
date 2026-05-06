"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

export type DashboardColumns = {
  id: number
  nama_barang: string
  kategori: string
  stok: number
  satuan: string
  harga_jual: number
  aksi: string
}

export const columns: ColumnDef<DashboardColumns>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nama_barang",
    header: "Nama Barang",
  },
  {
    accessorKey: "kategori",
    header: "Kategori",
  },
  {
    accessorKey: "stok",
    header: "Stok",
  },
  {
    accessorKey: "satuan",
    header: "Satuan",
  },
  {
    accessorKey: "harga_jual",
    header: "Harga Jual",
  },
  {
  id: "aksi",
  header: "Aksi",

  cell: ({ row }) => {
    const data = row.original

    return (
      <div className="flex gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => console.log("Edit", data.id)}
        >
          Edit
        </Button>

        <Button
          variant="destructive"
          size="sm"
          onClick={() => console.log("Delete", data.id)}
        >
          Delete
        </Button>
      </div>
    )
  },
}
]