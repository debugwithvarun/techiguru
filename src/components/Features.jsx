import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Award, Laptop, Smile, ArrowRight } from 'lucide-react';

const features = [
  {
    title: "Relaxing & Learning",
    desc: "The phrasal sequence of the is now so that many campaign and benefit",
    icon: ThumbsUp,
    delay: 0.1
  },
  {
    title: "Certificate",
    desc: "The phrasal sequence of the is now so that many campaign and benefit",
    icon: Award,
    delay: 0.2
  },
  {
    title: "Private Mentoring",
    desc: "The phrasal sequence of the is now so that many campaign and benefit",
    icon: Laptop,
    delay: 0.3
  },
  {
    title: "Creative Thinking",
    desc: "The phrasal sequence of the is now so that many campaign and benefit",
    icon: Smile,
    delay: 0.4
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black text-slate-900 mb-6"
          >
            Discover Powerful Features
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Discover a world of knowledge and opportunities with our online education platform pursue a new career.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay }}
              whileHover={{ y: -10 }}
              className="group p-10 bg-white rounded-[2.5rem] border border-gray-50
                         shadow-[0_20px_50px_rgba(0,0,0,0.03)]
                         hover:shadow-[0_40px_80px_rgba(124,58,237,0.1)]
                         transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8
                              bg-purple-50 text-purple-600
                              group-hover:bg-purple-600
                              group-hover:text-white
                              transition-all duration-500">
                <feature.icon className="w-8 h-8 stroke-[2.2]" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-500 leading-relaxed mb-8">
                {feature.desc}
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-2 font-bold text-slate-900
                           group-hover:text-purple-600 transition-colors"
              >
                Read More <ArrowRight size={18} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
