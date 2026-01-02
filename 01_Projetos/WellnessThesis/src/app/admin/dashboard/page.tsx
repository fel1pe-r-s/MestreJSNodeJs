'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, drafts: 0 });

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStats({ total: data.length, drafts: 0 });
        }
      })
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Posts</h3>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Drafts</h3>
          <p className="text-3xl font-bold">{stats.drafts}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <Link 
            href="/admin/posts/new"
            className="bg-[#4D7C0F] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#3a5e0b] transition-colors text-center"
          >
            Create New Post
          </Link>
        </div>
      </div>
    </div>
  );
}

