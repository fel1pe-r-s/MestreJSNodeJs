export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-gray-900 text-white p-6">
        <div className="text-xl font-bold mb-10 flex items-center gap-2">
           <span className="text-[#4D7C0F]">Health</span>Thesis Admin
        </div>
        <nav className="space-y-4">
          <a href="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-800 transition-colors">Dashboard</a>
          <a href="/admin/posts" className="block py-2 px-4 rounded hover:bg-gray-800 transition-colors">Posts</a>
          <a href="/admin/settings" className="block py-2 px-4 rounded hover:bg-gray-800 transition-colors text-gray-500 pointer-events-none">Settings</a>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
