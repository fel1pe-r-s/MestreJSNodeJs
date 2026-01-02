import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <svg className="h-10 w-10 text-[#4D7C0F]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 85C30 85 15 65 15 45V15L50 5L85 15V45C85 65 70 85 50 85Z" fill="#4D7C0F" opacity="0.8" />
            <path d="M50 15C55 15 60 20 60 25C60 30 55 35 50 35C45 35 40 30 40 25C40 20 45 15 50 15Z" fill="#4D7C0F" opacity="0.9" />
            <path d="M50 35L50 80" stroke="#4D7C0F" strokeWidth="2" />
            <path d="M47 30L53 30L50 38L56 38L44 50L50 42L44 42L47 30Z" fill="#FFC857" />
          </svg>
          <span className="text-2xl font-bold tracking-tight text-gray-800">
            Health<span className="text-[#4D7C0F]">Thesis</span>
          </span>
        </Link>

        <nav className="hidden md:flex space-x-8 text-sm font-semibold text-gray-600">
          <Link href="/category/metabolism" className="hover:text-[#4D7C0F]">Metabolism</Link>
          <Link href="/category/nutrition" className="hover:text-[#4D7C0F]">Nutrition</Link>
          <Link href="/category/fitness" className="hover:text-[#4D7C0F]">Fitness</Link>
        </nav>

        <Link href="#newsletter" className="hidden md:inline-block px-5 py-2 text-sm font-bold border-2 border-[#4D7C0F] text-[#4D7C0F] rounded-full hover:bg-[#4D7C0F] hover:text-white transition-colors">
          Subscribe
        </Link>
      </div>
    </header>
  );
}
