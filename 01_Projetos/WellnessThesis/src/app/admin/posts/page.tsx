'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PostsListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setPosts(posts.filter((p: any) => p._id !== id));
    } else {
      alert('Failed to delete post');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-serif">Manage Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-[#4D7C0F] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#3a5e0b] transition-colors"
        >
          Add New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Title</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Created At</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading posts...</td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No posts found.</td>
              </tr>
            ) : (
              posts.map((post: any) => (
                <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                  <td className="px-6 py-4 text-gray-500">{post.slug}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/posts/edit/${post._id}`} className="text-[#4D7C0F] font-bold hover:underline mr-4">Edit</Link>
                    <button 
                      onClick={() => handleDelete(post._id)}
                      className="text-red-600 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
