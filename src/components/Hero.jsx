import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const Hero = () => {
  const floatVariant = {
    animate: {
      y: [0, -18, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <section className="relative pt-32 lg:pt-40 min-h-screen bg-[#FDFEFE] flex items-center overflow-hidden">
      {/* Same Max Width and Padding as Navbar for perfect alignment */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex flex-col lg:flex-row items-center">
        
        {/* Left Side */}
        <div className="lg:w-[55%] text-left z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-[72px] font-black text-slate-900 leading-[1.1] mb-8"
          >
            Best <span className="relative inline-block text-white px-5 mx-1">
              <span className="relative z-10 italic font-medium">Online</span>
              <span className="absolute inset-0 bg-purple-600 -skew-x-6"></span>
            </span> <br /> Courses From TechiGuru
          </motion.h1>
          
          <p className="text-gray-500 text-lg lg:text-xl mb-12 max-w-lg leading-relaxed">
            Discover a world of knowledge and opportunities with our online education platform pursue a new career.
          </p>

          <button className="bg-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-purple-200 hover:translate-y-[-2px] transition-all flex items-center gap-3">
            View Courses <span>→</span>
          </button>
        </div>

        {/* Right Side: Image with Floating Boxes */}
        <div className="lg:w-[45%] relative mt-20 lg:mt-0 flex justify-center">
          
          {/* Large Circle behind Student */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] lg:w-[480px] lg:h-[480px] bg-purple-600 rounded-full"></div>
          
          <img 
            src="https://shreethemes.in/TechiGuru/assets/images/hero.png" 
            className="relative z-10 w-full max-w-[500px]"
            alt="Hero Student" 
          />

          {/* FLOAT BOX: Online Course */}
          <motion.div 
            variants={floatVariant}
            animate="animate"
            className="absolute -top-4 -right-4 lg:right-0 z-20 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl flex items-center gap-4 border border-white"
          >
             <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                <Play size={24} fill="currentColor" />
             </div>
             <div>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Online Course</p>
               <p className="text-2xl font-black text-slate-800 tracking-tight">100+</p>
             </div>
          </motion.div>

          {/* FLOAT BOX: Our Instructors */}
          <motion.div 
            variants={floatVariant}
            animate="animate"
            transition={{ delay: 1 }}
            className="absolute bottom-10 -left-4 lg:-left-10 z-20 bg-white p-6 rounded-[2rem] shadow-2xl border border-white"
          >
             <p className="text-sm font-black text-slate-800 mb-4 tracking-tight">Our Instructors</p>
             <div className="flex -space-x-3 items-center">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?u=user${i}`} className="w-11 h-11 rounded-full border-4 border-white" />
                ))}
                <div className="w-11 h-11 rounded-full bg-purple-600 border-4 border-white flex items-center justify-center text-white text-[10px] font-black">
                  +
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;