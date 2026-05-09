"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

export type DashboardColumns = {
  id: number
  item_name: string
  category_name: string
  stock_amount: number
  unit: string
  selling_price: number
  aksi: string
}

export const columns: ColumnDef<DashboardColumns>[] = [
  {
    accessorKey: "id",
    header: "ID",
    minSize: 50,
    maxSize: 100,
  },
  {
    accessorKey: "item_name",
    header: "Nama Barang",
    minSize: 200,
    maxSize: 300,
  },
  {
    accessorKey: "category_name",
    header: "Kategori",
    minSize: 150,
    maxSize: 150,
  },
  {
    accessorKey: "stock_amount",
    header: "Stok",
    minSize: 100,
    maxSize: 100,
  },
  {
    accessorKey: "unit",
    header: "Satuan",
    minSize: 100,
    maxSize: 100,
  },
  {
    accessorKey: "selling_price",
    header: "Harga Jual",
    minSize: 150,
    maxSize: 150,
  },
  {
    id: "aksi",
    header: "Aksi",

    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="flex gap-2">
          <Button variant="outline"
            size="sm"
            onClick={() => console.log("Detail", data.id)}
          >Detail</Button>
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