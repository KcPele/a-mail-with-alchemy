import Sidebar from "../components/ui/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-[calc(100vh-4rem)] pt-16">
        {children}
      </main>
    </div>
  );
}
