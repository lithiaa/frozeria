"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table"

import { useEffect, useState } from "react"

import { SlidersHorizontal, Search } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { AddBarangDialog } from "./add-barang-dialog"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

type Category = {
  id: number
  category_name: string
}

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

  const [pagination, setPagination] =
    useState<PaginationState>({
      pageIndex: 0,
      pageSize: 5,
    })

  const [categories, setCategories] =
    useState<Category[]>([])

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "http://localhost:8000/categories"
        )

        const data = await response.json()

        setCategories(data)

      } catch (error) {
        console.error(error)
      }
    }

    fetchCategories()
  }, [])

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnFilters,
      pagination,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="w-full space-y-4">

      {/* TOOLBAR */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* LEFT SECTION */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Cari barang..."
            value={
              (table
                .getColumn("item_name")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("item_name")
                ?.setFilterValue(event.target.value)
            }
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* FILTER KATEGORI */}
          <Select
            value={
              (table
                .getColumn("category_name")
                ?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) =>
              table
                .getColumn("category_name")
                ?.setFilterValue(
                  value === "all" ? "" : value
                )
            }
          >
            <SelectTrigger className="w-[200px]">
              <SlidersHorizontal />
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                Semua Kategori
              </SelectItem>

              {categories.map((category) => (

                <SelectItem
                  key={category.id}
                  value={category.category_name}
                >
                  {category.category_name}
                </SelectItem>

              ))}

            </SelectContent>
          </Select>

          {/* BUTTON TAMBAH */}
          <AddBarangDialog />
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
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.getSize(),
                      }}
                    >

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
      {table.getFilteredRowModel().rows.length > 0 ? (
        <div className="flex items-center justify-end px-4 py-4">

          {/* INFO */}
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize + 1}
            {" - "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} data
          </div>

          {/* PAGINATION */}
          <Pagination>
            <PaginationContent>

              {/* PREVIOUS */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  className={
                    !table.getCanPreviousPage()
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {/* PAGE NUMBER */}
              {Array.from(
                { length: table.getPageCount() },
                (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={
                        table.getState().pagination.pageIndex ===
                        index
                      }
                      onClick={() => table.setPageIndex(index)}
                      className="cursor-pointer"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              {/* NEXT */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => table.nextPage()}
                  className={
                    !table.getCanNextPage()
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>

        </div>
      ) : null}
    </div>
  )
}