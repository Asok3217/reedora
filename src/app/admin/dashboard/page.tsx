// app/admin/dashboard/page.tsx

import type { PageProps } from "next"; // ✅ Add this
import Sidebar from "./components/Sidebar";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";

// ✅ Extend PageProps to satisfy Next.js 15 constraints
interface AdminDashboardProps extends PageProps {
  searchParams?: { page?: string };
}

export default async function AdminDashboard({
  searchParams,
}: AdminDashboardProps) {
  const selectedPage = searchParams?.page || "add";

  return (
    <div className="flex min-h-screen">
      <Sidebar selectedPage={selectedPage} />
      <main className="flex-1 p-6">
        {selectedPage === "add" ? <AddProduct /> : <ProductList />}
      </main>
    </div>
  );
}
