import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Sparkles } from 'lucide-react';
import CourseCard from './CourseCard'; 

// Mock Data
const ACTIVE_COURSES = [
  { id: 1, title: 'Complete React Native Bootcamp', category: 'Mobile Dev', students: 1240, rating: 4.8, price: '$49', lessons: 45, duration: '12h 30m', thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop' },
  { id: 2, title: 'Advanced Python for Data Science', category: 'Data Science', students: 850, rating: 4.9, price: '$59', lessons: 32, duration: '18h 15m', thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop' },
  { id: 3, title: 'UI/UX Design Masterclass', category: 'Design', students: 2100, rating: 4.7, price: '$39', lessons: 28, duration: '8h 45m', thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=600&auto=format&fit=crop' },
  { id: 4, title: 'Full Stack MERN Development', category: 'Web Dev', students: 3400, rating: 4.9, price: '$89', lessons: 60, duration: '24h 00m', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop' },
  { id: 5, title: 'Digital Marketing Strategies 2026', category: 'Marketing', students: 560, rating: 4.6, price: '$29', lessons: 20, duration: '6h 30m', thumbnail: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=600&auto=format&fit=crop' },
  { id: 6, title: 'Docker & Kubernetes for Beginners', category: 'DevOps', students: 980, rating: 4.8, price: '$69', lessons: 40, duration: '14h 10m', thumbnail: 'https://images.unsplash.com/photo-1667372393119-c85c020799a3?q=80&w=600&auto=format&fit=crop' },
];

const ActiveCourses = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">Live & Trending</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3">
              Explore Active Courses
            </h1>
            <p className="text-slate-500 mt-3 max-w-xl text-lg">
              Dive into our most popular, up-to-date content. No enrollment fees, just pure learning.
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="text" placeholder="Find a topic..." className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 bg-white shadow-sm" />
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 shadow-sm">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Featured Banner (Optional Visual Pop) */}
        <div className="mb-12 p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl">
           <div className="bg-white rounded-xl p-4 flex items-center justify-center gap-3 text-sm font-bold text-slate-700">
              <Sparkles size={18} className="text-amber-500" fill="currentColor"/> 
              All courses are unlocked for a limited time! Happy Learning.
           </div>
        </div>

        {/* Grid Layout */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {ACTIVE_COURSES.map((course) => (
            <motion.div 
              key={course.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default ActiveCourses;