export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
      <div className="container mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} HealthThesis. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Affiliate Disclosure</a>
        </div>
      </div>
    </footer>
  );
}
