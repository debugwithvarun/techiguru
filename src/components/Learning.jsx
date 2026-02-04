import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const Learning = () => {
  // Companies data with actual logo types or names
  const companies = [
    { name: 'amazon', width: 'w-24' },
    { name: 'Google', width: 'w-24' },
    { name: 'Lenovo', width: 'w-24' },
    { name: 'PayPal', width: 'w-24' },
    { name: 'shopify', width: 'w-24' },
    { name: 'Spotify', width: 'w-24' },
  ];

  // Infinite Scroll logic: We duplicate the list to make it seamless
  const scrollContent = [...companies, ...companies, ...companies];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-20">
        
        {/* Left Side: Overlapping Images (Same as before) */}
        <div className="lg:w-1/2 relative">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
          >
            <img 
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80" 
              alt="Student" className="w-full h-[500px] object-cover"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-10 -right-10 lg:-right-16 z-30 w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-8 border-white"
          >
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" 
              alt="Group" className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.button
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/2 right-0 lg:-right-4 z-40 -translate-y-1/2 w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-purple-300 hover:bg-purple-700 transition-colors"
          >
            <Play size={32} fill="currentColor" />
          </motion.button>
        </div>

        {/* Right Side: Content (Same as before) */}
        <div className="lg:w-1/2">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-6">
              Access to Learning <br /> Anytime & Anywhere
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.
            </p>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10 text-slate-700">
              {["Flexible Timing", "Affordable", "Easy Learning", "World Class"].map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-2 h-2 rounded-full bg-purple-600 group-hover:scale-150 transition-transform"></div>
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>

            <button className="bg-purple-100 text-purple-700 px-8 py-4 rounded-xl font-bold hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-sm">
              Learn More →
            </button>
          </motion.div>
        </div>
      </div>

      {/* --- IMPROVED PARTNER LOGOS SECTION --- */}
      <div className="relative border-t border-gray-100 pt-16 bg-white">
        {/* Subtle Gradient Overlays for smooth entry/exit */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="flex overflow-hidden">
          <motion.div 
            className="flex flex-none gap-20 items-center"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              ease: "linear",
              duration: 20, // Slider ki speed control karein
              repeat: Infinity,
            }}
          >
            {scrollContent.map((company, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, opacity: 1 }}
                className="flex-none grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                {/* Yahan aap real <img> tags use kar sakte hain */}
                <span className="text-2xl font-black tracking-tighter text-slate-800 uppercase italic">
                   {company.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Learning;