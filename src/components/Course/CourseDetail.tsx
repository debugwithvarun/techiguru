import React, { useState, useEffect } from 'react';
import { 
  PlayCircle, CheckCircle, Lock, ChevronDown, ChevronUp, 
  Star, Users, Clock, Share2, Bookmark, 
  ChevronLeft, Menu, X, Globe, Calendar, Check, 
  MessageCircle, Send, ThumbsUp, MoreHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const COURSE = {
  id: 1,
  title: 'Complete React Native Bootcamp 2026',
  subtitle: 'Go from zero to hero. Master React Native, Redux, Hooks, and Animation by building 3 real-world mobile applications.',
  description: `React Native is the most popular framework for building native mobile apps using JavaScript. In this comprehensive course, we will dive deep into the ecosystem. You will learn not just the basics, but advanced patterns used by top-tier companies.\n\nWe start with the absolute basics of components and styling, move into navigation and state management, and finish with advanced topics like native device features (Camera, Maps, Sensors) and publishing to the App Store.`,
  instructor: {
    name: 'Calvin Carlo',
    role: 'Senior Mobile Engineer',
    avatar: 'https://i.pravatar.cc/150?u=calvin',
    bio: 'Calvin is a Senior Engineer at TechCorp with 10+ years of experience. He has published 20+ apps to the App Store and has taught over 50,000 students worldwide.',
    courses: 12,
    students: 54000,
    rating: 4.9
  },
  enrolled: 1240,
  rating: 4.8,
  reviews: 420,
  lastUpdated: 'February 2026',
  totalDuration: '12h 30m',
  level: 'Intermediate',
  language: 'English',
  learningPoints: [
    'Build native mobile apps for iOS and Android using a single codebase',
    'Master the latest React Native features including Hooks and Context API',
    'Implement complex navigation with React Navigation v6',
    'Handle state management efficiently using Redux Toolkit',
    'Integrate native device features like Camera, Maps, and Geolocation',
    'Deploy your applications to the Apple App Store and Google Play Store'
  ],
  requirements: [
    'Basic understanding of JavaScript (ES6+) and React',
    'A computer (Mac, Windows, or Linux) with Node.js installed',
    'No prior mobile development experience needed'
  ],
  topics: [
    {
      id: 101,
      title: 'Section 1: Getting Started',
      duration: '45m',
      lessons: [
        { id: 1, title: 'Course Introduction', duration: '5:00', type: 'video', isCompleted: true, videoKey: 'dQw4w9WgXcQ' },
        { id: 2, title: 'Environment Setup (Mac & Windows)', duration: '15:00', type: 'video', isCompleted: true, videoKey: 'LXb3EKWsInQ' },
        { id: 3, title: 'Your First React Native App', duration: '25:00', type: 'video', isCompleted: false, videoKey: '0-S5a0eXPoc' }
      ]
    },
    {
      id: 102,
      title: 'Section 2: React Native Basics',
      duration: '2h 15m',
      lessons: [
        { id: 4, title: 'View, Text & Image Components', duration: '20:00', type: 'video', isCompleted: false, videoKey: 'qSRrxpdMpVc' },
        { id: 5, title: 'Styling & Flexbox Deep Dive', duration: '35:00', type: 'video', isCompleted: false, videoKey: 'F73273e9' },
        { id: 6, title: 'Props & State Management', duration: '40:00', type: 'video', isCompleted: false, isLocked: true, videoKey: 'xyz' }
      ]
    },
    {
      id: 103,
      title: 'Section 3: Navigation & Routing',
      duration: '1h 30m',
      lessons: [
        { id: 7, title: 'React Navigation v6 Setup', duration: '25:00', type: 'video', isCompleted: false, isLocked: true, videoKey: 'xyz' },
        { id: 8, title: 'Stack & Tab Navigators', duration: '30:00', type: 'video', isCompleted: false, isLocked: true, videoKey: 'xyz' }
      ]
    }
  ]
};

// --- HELPER COMPONENTS ---

const StarRatingInput = ({ rating, setRating }: { rating: number, setRating: (r: number) => void }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star 
            size={24} 
            className={`${star <= (hover || rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'} transition-colors`} 
          />
        </button>
      ))}
    </div>
  );
};

const CourseDetail = () => {
  const [activeLesson, setActiveLesson] = useState(COURSE.topics[0].lessons[0]);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedTopics, setExpandedTopics] = useState<number[]>([101]);
  
  // Responsive Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Review State
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  // Q&A State
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDetail, setQuestionDetail] = useState('');

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTopic = (id: number) => {
    setExpandedTopics(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans flex flex-col overflow-hidden">
      
      {/* 1. HEADER */}
      <header className="h-16 bg-[#151F32] border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <Link to="/active-course" className="p-2 hover:bg-slate-700/50 rounded-full transition-colors text-slate-400 hover:text-white">
            <ChevronLeft size={22} />
          </Link>
          <h1 className="text-white font-bold text-sm md:text-base lg:text-lg leading-tight line-clamp-1 max-w-[200px] md:max-w-md">
            {COURSE.title}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
                <Clock size={14} className="text-purple-400" />
                <span className="text-slate-300">Next: Lesson 3</span>
            </div>
            <button 
              className="p-2 text-slate-400 hover:text-white lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
        </div>
      </header>

      {/* 2. MAIN LAYOUT */}
      <div className="flex flex-1 relative overflow-hidden">
        
        {/* LEFT: CONTENT AREA */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 bg-[#0B1120] pb-20">
          
          {/* Cinema Mode Video Player */}
          <div className="w-full bg-black aspect-video relative shadow-2xl z-10">
             <iframe 
               width="100%" 
               height="100%" 
               src={`https://www.youtube.com/embed/${activeLesson.videoKey}?autoplay=0&rel=0`} 
               title="Video Player"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
               className="w-full h-full"
             ></iframe>
          </div>

          {/* Details Container */}
          <div className="max-w-5xl mx-auto p-4 md:p-8">
            
            {/* Tabs Navigation */}
            <div className="flex items-center gap-6 md:gap-10 border-b border-slate-800 mb-8 overflow-x-auto no-scrollbar">
                {['Overview', 'Q&A', 'Reviews'].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`pb-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap px-1 ${
                          activeTab === tab.toLowerCase() 
                          ? 'border-purple-500 text-purple-400' 
                          : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                
                {/* --- OVERVIEW TAB --- */}
                {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{COURSE.title}</h1>
                            <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-6">{COURSE.subtitle}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-6">
                                <span className="flex items-center gap-1.5"><Star size={16} className="text-amber-400 fill-amber-400"/> {COURSE.rating} ({COURSE.reviews} reviews)</span>
                                <span className="flex items-center gap-1.5"><Users size={16} /> {COURSE.enrolled} students</span>
                                <span className="flex items-center gap-1.5"><Calendar size={16} /> Updated {COURSE.lastUpdated}</span>
                                <span className="flex items-center gap-1.5"><Globe size={16} /> {COURSE.language}</span>
                            </div>
                        </div>

                        {/* Learning Points */}
                        <div className="bg-[#151F32] border border-slate-800 p-6 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-4">What you'll learn</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {COURSE.learningPoints.map((point, idx) => (
                                    <div key={idx} className="flex gap-3 items-start">
                                        <Check size={18} className="text-emerald-500 mt-1 shrink-0" />
                                        <span className="text-slate-300 text-sm leading-relaxed">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                            <div className="prose prose-invert prose-slate max-w-none">
                                <p className="text-slate-400 whitespace-pre-line leading-7">{COURSE.description}</p>
                            </div>
                        </div>

                        {/* Requirements */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">Requirements</h3>
                            <ul className="list-disc list-inside space-y-2 text-slate-400 ml-2">
                                {COURSE.requirements.map((req, idx) => (
                                    <li key={idx} className="pl-2">{req}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Instructor */}
                        <div className="border-t border-slate-800 pt-8">
                            <h3 className="text-xl font-bold text-white mb-6">Instructor</h3>
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <img src={COURSE.instructor.avatar} alt={COURSE.instructor.name} className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-purple-500/20" />
                                <div>
                                    <h4 className="text-lg font-bold text-white hover:text-purple-400 cursor-pointer transition-colors inline-block mb-1">{COURSE.instructor.name}</h4>
                                    <p className="text-purple-400 text-sm font-medium mb-4">{COURSE.instructor.role}</p>
                                    <div className="flex gap-4 md:gap-6 text-sm text-slate-400 mb-4">
                                        <div className="flex items-center gap-2"><Star size={16} /> {COURSE.instructor.rating} Rating</div>
                                        <div className="flex items-center gap-2"><Users size={16} /> {COURSE.instructor.students.toLocaleString()} Students</div>
                                        <div className="flex items-center gap-2"><PlayCircle size={16} /> {COURSE.instructor.courses} Courses</div>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed">{COURSE.instructor.bio}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
                
                {/* --- Q&A TAB --- */}
                {activeTab === 'q&a' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
                        {/* Input Box */}
                        <div className="bg-[#151F32] p-6 rounded-2xl border border-slate-800 mb-10 shadow-sm">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <MessageCircle size={20} className="text-purple-500"/> Ask a Question
                            </h3>
                            <div className="flex gap-4">
                                <img src="https://i.pravatar.cc/150?u=me" alt="Me" className="w-10 h-10 rounded-full border border-slate-700 hidden md:block" />
                                <div className="flex-1 space-y-4">
                                    <input 
                                        type="text"
                                        placeholder="Question Title (e.g., Why is my simulator crashing?)" 
                                        className="w-full bg-[#0B1120] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm font-medium"
                                        value={questionTitle}
                                        onChange={(e) => setQuestionTitle(e.target.value)}
                                    />
                                    <div className="relative">
                                        <textarea 
                                            placeholder="Describe your issue in detail..." 
                                            className="w-full bg-[#0B1120] border border-slate-700 rounded-xl px-4 py-3 pb-12 text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all h-32 resize-none text-sm"
                                            value={questionDetail}
                                            onChange={(e) => setQuestionDetail(e.target.value)}
                                        />
                                        <div className="absolute bottom-3 right-3 flex gap-2">
                                            <button className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"><MessageCircle size={16}/></button>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                                            Post Question <Send size={16}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Existing Questions List (Mock) */}
                        <div className="space-y-6">
                            <h4 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-4">Recent Questions</h4>
                            {[1, 2].map((i) => (
                                <div key={i} className="flex gap-4 p-4 hover:bg-slate-800/30 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-800">
                                    <div className="flex flex-col items-center gap-1 pt-1 min-w-[40px]">
                                        <button className="text-slate-500 hover:text-emerald-500 transition-colors"><ChevronUp size={20}/></button>
                                        <span className="font-bold text-slate-300">{12 * i}</span>
                                        <button className="text-slate-500 hover:text-red-500 transition-colors"><ChevronDown size={20}/></button>
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="text-white font-bold text-base mb-1 hover:text-purple-400 transition-colors">Error: "Unable to resolve module" in Lesson 4?</h5>
                                        <p className="text-slate-400 text-sm line-clamp-2 mb-2">I'm following the exact steps in the video but when I try to run the iOS simulator, I get a metro bundler error...</p>
                                        <div className="flex items-center gap-3 text-xs text-slate-500">
                                            <span className="flex items-center gap-1"><MessageCircle size={12}/> 4 replies</span>
                                            <span>•</span>
                                            <span>Last reply by Instructor</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* --- REVIEWS TAB --- */}
                {activeTab === 'reviews' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
                        {/* Rating Input Box */}
                        <div className="bg-[#151F32] p-6 rounded-2xl border border-slate-800 mb-10 shadow-sm">
                            <h3 className="text-lg font-bold text-white mb-6">Rate & Review</h3>
                            <div className="flex flex-col items-center mb-6">
                                <span className="text-slate-400 text-sm mb-2">How would you rate this course?</span>
                                <StarRatingInput rating={userRating} setRating={setUserRating} />
                            </div>
                            
                            <div className="space-y-4">
                                <textarea 
                                    placeholder="Tell us about your personal experience with this course. What did you learn?" 
                                    className="w-full bg-[#0B1120] border border-slate-700 rounded-xl px-4 py-3 text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all h-32 resize-none text-sm"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                />
                                <div className="flex justify-end">
                                    <button className="bg-slate-100 hover:bg-white text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors">
                                        Submit Review
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Existing Reviews */}
                        <div className="space-y-8">
                            <h4 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-4">Student Feedback</h4>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="border-b border-slate-800 pb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-300 font-bold border border-purple-500/20">JD</div>
                                            <div>
                                                <p className="text-white font-bold text-sm">John Doe</p>
                                                <div className="flex gap-0.5">
                                                    {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-amber-400 fill-amber-400"/>)}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-500">2 weeks ago</span>
                                    </div>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                        This course is exactly what I needed. The instructor explains the concepts of Redux Toolkit very clearly. I finally understand how to manage global state properly in a complex app. Highly recommended!
                                    </p>
                                    <div className="flex gap-4">
                                        <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors">
                                            <ThumbsUp size={14}/> Helpful (12)
                                        </button>
                                        <button className="text-slate-500 hover:text-white transition-colors">
                                            <MoreHorizontal size={14}/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
          </div>
        </main>

        {/* RIGHT: CURRICULUM SIDEBAR (RESPONSIVE) */}
        
        {/* Mobile Overlay */}
        <AnimatePresence>
            {isMobile && sidebarOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                />
            )}
        </AnimatePresence>

        <aside 
            className={`
                fixed lg:relative inset-y-0 right-0 z-50
                w-80 lg:w-96 
                bg-[#151F32] border-l border-slate-800 
                flex flex-col shadow-2xl lg:shadow-none
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            `}
        >
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#151F32]">
                <div>
                    <h3 className="text-white font-bold text-lg">Course Content</h3>
                    <p className="text-xs text-slate-500 mt-1">{COURSE.topics.length} Sections • {COURSE.totalDuration} Total</p>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
                    <X size={20}/>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                {COURSE.topics.map((topic) => (
                    <div key={topic.id} className="border-b border-slate-800">
                        <button 
                            onClick={() => toggleTopic(topic.id)}
                            className="w-full flex items-center justify-between p-4 bg-[#1E293B] hover:bg-slate-800 transition-colors text-left group"
                        >
                            <div>
                                <h4 className="text-sm font-bold text-slate-200 group-hover:text-purple-400 transition-colors line-clamp-1">{topic.title}</h4>
                                <span className="text-[11px] text-slate-500 font-medium">{topic.lessons.length} / {topic.lessons.length} | {topic.duration}</span>
                            </div>
                            {expandedTopics.includes(topic.id) ? <ChevronUp size={16} className="text-slate-500"/> : <ChevronDown size={16} className="text-slate-500"/>}
                        </button>

                        <AnimatePresence>
                            {expandedTopics.includes(topic.id) && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }} 
                                    animate={{ height: 'auto', opacity: 1 }} 
                                    exit={{ height: 0, opacity: 0 }} 
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden bg-[#0B1120]"
                                >
                                    {topic.lessons.map((lesson) => (
                                        <div 
                                            key={lesson.id}
                                            onClick={() => {
                                                if (!lesson.isLocked) {
                                                    setActiveLesson(lesson);
                                                    if(isMobile) setSidebarOpen(false); // Close sidebar on selection (mobile)
                                                }
                                            }}
                                            className={`flex items-start gap-3 p-4 cursor-pointer transition-all border-l-[3px] ${
                                                activeLesson.id === lesson.id 
                                                ? 'bg-purple-500/10 border-purple-500' 
                                                : 'border-transparent hover:bg-slate-800/50'
                                            } ${lesson.isLocked ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''}`}
                                        >
                                            <div className="mt-0.5 shrink-0">
                                                {lesson.isLocked ? (
                                                    <Lock size={16} className="text-slate-500" />
                                                ) : lesson.isCompleted ? (
                                                    <div className="bg-emerald-500/20 p-0.5 rounded-full"><CheckCircle size={14} className="text-emerald-500" /></div>
                                                ) : (
                                                    <PlayCircle size={16} className={activeLesson.id === lesson.id ? 'text-purple-400' : 'text-slate-500'} />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-medium leading-snug line-clamp-2 ${activeLesson.id === lesson.id ? 'text-purple-300' : 'text-slate-300'}`}>
                                                    {lesson.title}
                                                </p>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <span className="text-[10px] text-slate-500 flex items-center gap-1 bg-slate-800 px-1.5 py-0.5 rounded">
                                                        <PlayCircle size={8} /> Video
                                                    </span>
                                                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                                        <Clock size={10} /> {lesson.duration}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </aside>

      </div>
    </div>
  );
};

export default CourseDetail;