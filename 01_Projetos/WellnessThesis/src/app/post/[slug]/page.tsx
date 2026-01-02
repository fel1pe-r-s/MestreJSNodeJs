import React from 'react';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TopAd, SidebarAd } from '@/components/AdSlots';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getPost(slug: string) {
  await dbConnect();
  return Post.findOne({ slug }).lean();
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug) as any;

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-[#F0F5F9] min-h-screen font-sans text-gray-900">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <TopAd script={post.ad_slots?.top} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
          {/* Main Article */}
          <article className="lg:col-span-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            <header className="mb-8">
              <div className="text-sm text-[#4D7C0F] font-bold uppercase tracking-widest mb-2">Science Report</div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center text-gray-500 text-sm gap-4">
                <span>By HealthThesis Editorial</span>
                <span>•</span>
                <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </header>

            {post.image_url && (
              <img src={post.image_url} alt={post.title} className="w-full h-[400px] object-cover rounded-xl mb-10 shadow-md" />
            )}

            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-serif"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.cta_link && (
              <div className="mt-12 p-8 bg-[#FDFDEA] border-2 border-[#FFC857] rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-4 font-serif">Ready to take the next step?</h3>
                <p className="text-gray-600 mb-6 text-lg">Check out our recommended solution for better metabolic health.</p>
                <a 
                  href={post.cta_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[#4D7C0F] text-white font-bold py-4 px-10 rounded-full hover:bg-[#3a5e0b] transition-all transform hover:scale-105 shadow-xl"
                >
                  Learn More &rarr;
                </a>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
             <div className="sticky top-24 space-y-8">
                <SidebarAd script={post.ad_slots?.sidebar} />
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-bold mb-4 uppercase text-xs tracking-wider">Related Articles</h4>
                  <div className="space-y-4">
                     {/* Dynamic related articles could be added here */}
                     <p className="text-sm text-gray-400 italic">Coming soon: Related insights based on science.</p>
                  </div>
                </div>
             </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
