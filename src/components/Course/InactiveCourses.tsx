import React from 'react';
import { motion } from 'framer-motion';
import { Search, Archive, History } from 'lucide-react';
import CourseCard from './CourseCard'; 

const INACTIVE_COURSES = [
  { id: 101, title: 'Legacy: Intro to C++', category: 'Programming', students: 5000, rating: 4.5, price: '$19', lessons: 50, duration: '20h 00m', thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop' },
  { id: 102, title: 'Photoshop CS6 Essentials', category: 'Design', students: 1200, rating: 4.2, price: '$25', lessons: 25, duration: '10h 00m', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop' },
  { id: 103, title: 'Web Development 2018', category: 'Web Dev', students: 8900, rating: 4.1, price: 'Free', lessons: 100, duration: '40h 00m', thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&auto=format&fit=crop' },
  { id: 104, title: 'Draft: Advanced AI Agents', category: 'AI & ML', students: 0, rating: 0, price: 'TBD', lessons: 5, duration: '2h 00m', thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop' },
];

const InactiveCourses = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-2 block flex items-center gap-2">
              <Archive size={16} className="text-purple-600"/> Legacy & Archives
            </span>
            <h1 className="text-4xl font-black text-slate-900">
              Course Library Archive
            </h1>
            <p className="text-slate-500 mt-3 max-w-xl text-lg">
              Access our older content and previous workshops. These courses are no longer updated but remain open for reference.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type="text" placeholder="Search archive..." className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 bg-white shadow-sm" />
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-10 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4 text-blue-900">
          <div className="p-3 bg-white rounded-full shadow-sm text-blue-600">
             <History size={24} />
          </div>
          <div>
             <h4 className="font-bold text-lg">Did you know?</h4>
             <p className="text-blue-700/80">These courses are free to watch! While they may use older software versions, the core concepts remain valuable.</p>
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
          {INACTIVE_COURSES.map((course) => (
            <motion.div 
              key={course.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              {/* Using same card, but passing isInactive=true just in case we want specific visual cues later, 
                  but strictly open access for now. */}
              <CourseCard course={course} isInactive={true} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default InactiveCourses;