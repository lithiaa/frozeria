"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  useReactTable,
} from "@tanstack/react-table"

import { useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])

  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnFilters,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="w-full space-y-4">

      {/* TOOLBAR */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-2">
          {/* SEARCH */}
          <Input
            placeholder="Cari barang..."
            value={
              (table
                .getColumn("nama_barang")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("nama_barang")
                ?.setFilterValue(event.target.value)
            }
            className="w-full md:max-w-sm"
          />
        </div>
        <div className="flex items-center gap-2">
        {/* FILTER KATEGORI */}
        <Select
          value={
            (table
              .getColumn("kategori")
              ?.getFilterValue() as string) ?? ""
          }
          onValueChange={(value) =>
            table
              .getColumn("kategori")
              ?.setFilterValue(
                value === "all" ? "" : value
              )
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter Kategori" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              Semua Kategori
            </SelectItem>

            <SelectItem value="Kategori 1">
              Kategori 1
            </SelectItem>

            <SelectItem value="Kategori 2">
              Kategori 2
            </SelectItem>
          </SelectContent>
        </Select>

        {/* BUTTON TAMBAH */}
        <Button>
          Tambah Barang
        </Button>
        </div>
      </div>

      {/* TABLE */}
      <div className="w-full rounded-md border">
        <Table className="w-full table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>

                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex items-center gap-2 font-medium"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                        {{
                          asc: <ArrowUp className="h-4 w-4" />,
                          desc: <ArrowDown className="h-4 w-4" />,
                        }[header.column.getIsSorted() as string] ?? <ArrowUpDown className="h-4 w-4" />}

                      </button>

                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </div>
    </div>
  )
}