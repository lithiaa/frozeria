import { columns, DashboardColumns } from "./columns"
import { DataTable } from "./data-table"
import { DashboardStats } from "./dashboard-stats"

async function getData(): Promise<DashboardColumns[]> {

  const response = await fetch(
    "http://localhost:8000/item",
    {
      cache: "no-store",
    }
  )

  return response.json()
}

export async function DashboardTable() {
  const data = await getData()

  return (
    <div className="w-full">
      <DashboardStats data={data} />
      <div className="my-4 flex items-center gap-5">
      <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}