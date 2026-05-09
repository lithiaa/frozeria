import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Barang = {
  id: number
  item_name: string
  category_name: string
  stock_amount: number
  unit: string
  selling_price: number
}

interface DashboardStatsProps {
  data: Barang[]
}

export function DashboardStats({
  data,
}: DashboardStatsProps) {

  // TOTAL BARANG
  const totalBarang = data.length

  // TOTAL KATEGORI
  const totalKategori = new Set(
    data.map((item) => item.category_name)
  ).size

  // STOK MENIPIS
  const stokMenipis = data.filter(
    (item) => item.stock_amount > 0 && item.stock_amount <= 5
  ).length

  // STOK HABIS
  const stokHabis = data.filter(
    (item) => item.stock_amount === 0
  ).length

  const stats = [
    {
      title: "Total Barang",
      value: totalBarang,
    },
    {
      title: "Total Kategori",
      value: totalKategori,
    },
    {
      title: "Stok Menipis",
      value: stokMenipis,
    },
    {
      title: "Stok Habis",
      value: stokHabis,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}

    </div>
  )
}