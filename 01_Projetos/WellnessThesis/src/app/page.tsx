import React from 'react';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { TopAd, InFeedAd, SidebarAd } from '@/components/AdSlots';

export const dynamic = 'force-dynamic';

async function getPosts() {
  await dbConnect();
  return Post.find({}).sort({ createdAt: -1 }).limit(10).lean();
}

export default async function HomePage() {
  const posts = await getPosts() as any[];
  const heroPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <div className="bg-[#F0F5F9] min-h-screen font-sans text-gray-900">
      {/* AD SPOT 1: Top Notification Bar */}
      <div className="bg-gray-900 text-white text-xs md:text-sm py-2 text-center px-4">
        <p>
          <span className="font-bold text-[#FFC857] uppercase mr-2">Trend Alert:</span>
          New research on mitochondrial efficiency released.
          <Link href="/mytolin" className="underline hover:text-[#FFC857] ml-1 transition-colors">Read the Report &rarr;</Link>
        </p>
      </div>

      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            
            {/* Hero Post */}
            {heroPost ? (
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-12">
                <img 
                  src={heroPost.image_url || "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80"} 
                  alt={heroPost.title} 
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center text-sm text-[#4D7C0F] font-bold mb-3 uppercase tracking-wider">
                    Metabolic Health • Editor&apos;s Choice
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
                    <Link href={`/post/${heroPost.slug}`} className="hover:text-[#4D7C0F] transition-colors">
                      {heroPost.title}
                    </Link>
                  </h1>
                  <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                    {heroPost.content.replace(/<[^>]*>?/gm, '').substring(0, 200)}...
                  </p>
                  <Link href={`/post/${heroPost.slug}`} className="bg-[#4D7C0F] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#3a5e0b] transition-colors duration-300 inline-block">
                    Read Full Report
                  </Link>
                </div>
              </article>
            ) : (
                <div className="bg-white rounded-2xl p-12 text-center mb-12 border border-dashed border-gray-300">
                    <p className="text-gray-500 italic">Welcome to HealthThesis. Start by adding your first post in the admin panel.</p>
                </div>
            )}

            <h3 className="text-2xl font-bold text-gray-800 mb-8 border-b-2 border-gray-200 pb-2 font-serif">Latest Insights</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {gridPosts.map((post, index) => (
                <React.Fragment key={post._id.toString()}>
                  <article className="flex flex-col bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <img 
                      src={post.image_url || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80"} 
                      className="rounded-lg h-48 object-cover mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{post.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {post.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                    </p>
                    <Link href={`/post/${post.slug}`} className="text-[#4D7C0F] font-bold text-sm mt-auto">Read More &rarr;</Link>
                  </article>
                  {/* Insert native ad after the first small article post */}
                  {index === 0 && <InFeedAd />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider">About HealthThesis</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We analyze the latest scientific research to bring you actionable advice on wellness, longevity, and beauty.
              </p>
              <Link href="#" className="text-[#4D7C0F] text-sm font-bold hover:underline">Read our Mission &rarr;</Link>
            </div>

            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-[#4D7C0F] to-[#2e4c06] rounded-xl p-6 text-center text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-[#FFC857] opacity-20 rounded-full"></div>

                <span className="inline-block bg-[#FFC857] text-gray-900 text-xs font-extrabold px-2 py-1 rounded uppercase mb-4">Trending Now</span>
                <h3 className="text-xl font-bold mb-3 font-serif">Stuck at a Plateau?</h3>
                <p className="text-sm text-gray-100 mb-6">See the #1 rated natural method to support mitochondrial efficiency after 35.</p>
                
                <Link href="#" className="block w-full bg-white text-[#4D7C0F] font-bold py-3 rounded-lg shadow-md hover:bg-[#FFC857] hover:text-gray-900 transition-all duration-300 transform group-hover:-translate-y-1">
                  Watch Video Presentation
                </Link>
                <p className="text-[10px] text-gray-300 mt-3 opacity-70">Advertisement</p>
              </div>
              
              <div className="mt-8">
                <SidebarAd />
              </div>
            </div>
          </aside>
        </div>
      </main>

      <section id="newsletter" className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Get Weekly Health Theses</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">Join our community and get free recipes, workout plans, and supplement reviews.</p>
            <form className="max-w-md mx-auto flex gap-2">
                <input type="email" placeholder="Your Email" className="flex-grow px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4D7C0F]" />
                <button className="bg-[#4D7C0F] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#3a5e0b]">Join</button>
            </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
