import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogs = [
  {
    tag: 'Degree',
    date: '13th Sep 25',
    time: '5 Min',
    title: 'The Future of Remote Work: Trending Now',
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80'
  },
  {
    tag: 'University',
    date: '29th Nov 25',
    time: '5 Min',
    title: 'The Psychology of Learning: How Cognitive',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80'
  },
  {
    tag: 'Developer',
    date: '29th Dec 25',
    time: '5 Min',
    title: 'Crafting Compelling Presentations: Design',
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80'
  }
];

const Blog = () => {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold mb-4">Blogs or News</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Stay updated with the latest trends and news in the education world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-md overflow-hidden border border-gray-100
                         shadow-[0_8px_24px_rgba(0,0,0,0.05)]
                         hover:shadow-xl transition h-full flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-purple-600 text-white text-[11px] px-3 py-1 rounded-sm font-semibold">
                  {blog.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex gap-5 text-gray-400 text-xs mb-4 font-semibold">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {blog.time}
                  </span>
                </div>

                <h3 className="font-extrabold text-lg mb-6 hover:text-purple-600 cursor-pointer line-clamp-2">
                  {blog.title}
                </h3>

                <div className="mt-auto">
                  <button className="flex items-center gap-1 text-sm font-bold text-slate-800 hover:text-purple-600 transition">
                    Read More <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
