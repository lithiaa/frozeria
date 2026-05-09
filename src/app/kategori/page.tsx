import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/dashboard/sidebar"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

import { KategoriTable } from "@/components/kategori/kategori-table"

export default function KategoriPage() {
  return (
    <SidebarProvider>
          <div className="flex min-h-screen">
            <AppSidebar />
    
            <SidebarInset>
              <header className="flex items-center gap-2 border-b px-4 py-3">
                <SidebarTrigger />
    
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Daftar Kategori</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </header>

              <div className="flex w-full flex-col p-4">
                <KategoriTable />
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
  )}