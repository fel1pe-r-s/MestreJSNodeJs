'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    image_url: '',
    content: '',
    cta_link: '',
    ad_slots: {
      top: '',
      sidebar: '',
      in_feed: '',
    },
  });

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setLoading(false);
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/posts/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/admin/posts');
    } else {
      alert('Failed to update post');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8">Loading post data...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 font-serif">Edit Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Title</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-[#4D7C0F] focus:border-[#4D7C0F]"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Slug</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg bg-gray-50"
              value={formData.slug}
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Featured Image URL</label>
          <input
            type="url"
            className="w-full px-4 py-2 border rounded-lg focus:ring-[#4D7C0F] focus:border-[#4D7C0F]"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Content (HTML/Markdown)</label>
          <textarea
            required
            rows={10}
            className="w-full px-4 py-2 border rounded-lg focus:ring-[#4D7C0F] focus:border-[#4D7C0F]"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </div>

        <div>
           <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Affiliate CTA Link (Optional)</label>
           <input
            type="url"
            placeholder="https://affiliate.link/product"
            className="w-full px-4 py-2 border rounded-lg focus:ring-[#4D7C0F] focus:border-[#4D7C0F]"
            value={formData.cta_link}
            onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
          />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Google Ads Slots</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">TOP AD SCRIPT</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border rounded-lg text-xs font-mono bg-gray-50"
                value={formData.ad_slots.top}
                onChange={(e) => setFormData({ ...formData, ad_slots: { ...formData.ad_slots, top: e.target.value } })}
              />
            </div>
             <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">SIDEBAR AD SCRIPT</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border rounded-lg text-xs font-mono bg-gray-50"
                value={formData.ad_slots.sidebar}
                onChange={(e) => setFormData({ ...formData, ad_slots: { ...formData.ad_slots, sidebar: e.target.value } })}
              />
            </div>
             <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">IN-FEED AD SCRIPT</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border rounded-lg text-xs font-mono bg-gray-50"
                value={formData.ad_slots.in_feed}
                onChange={(e) => setFormData({ ...formData, ad_slots: { ...formData.ad_slots, in_feed: e.target.value } })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-2 bg-[#4D7C0F] text-white font-bold rounded-lg hover:bg-[#3a5e0b] transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Update Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
