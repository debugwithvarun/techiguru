import React from 'react';
import { MapPin, Phone, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B0E27] text-gray-400 py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">E</div>
            TechiGuru
          </h2>
          <p className="mb-6 leading-relaxed">Discover a world of knowledge and opportunities with our online education platform.</p>
          <div className="space-y-4">
            <p className="flex items-start gap-3"><MapPin className="text-purple-500 shrink-0" /> C/54 Northwest Freeway, Houston, USA 485</p>
            <p className="flex items-center gap-3"><Phone className="text-purple-500 shrink-0" /> +152 534-468-854</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-white font-bold mb-6">Useful Links</h3>
          <ul className="space-y-3">
            {['Course', 'Mission & Vision', 'Join a Career', 'Zoom Meeting'].map(item => (
              <li key={item} className="hover:text-purple-500 cursor-pointer transition-colors">› {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Get In Touch</h3>
          <div className="flex flex-col gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="app store" className="w-32" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="play store" className="w-32" />
          </div>
          <div className="flex gap-4 mt-6">
             <Facebook size={20} className="hover:text-white cursor-pointer" />
             <Instagram size={20} className="hover:text-white cursor-pointer" />
             <Twitter size={20} className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm">
        © 2026 TechiGuru
      </div>
    </footer>
  );
};

export default Footer;