import React, { useState, useEffect } from 'react';
import { 
  PlayCircle, CheckCircle, Lock, ChevronDown, ChevronUp, 
  Star, Users, Clock, Share2, Bookmark, 
  ChevronLeft, Menu, X, Globe, Calendar, Check, 
  MessageCircle, Send, ThumbsUp, MoreHorizontal, Loader, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useCourse } from '../../context/CourseContext'; 

// Helper for Star Rating
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
  const { id } = useParams(); 
  const { fetchCourseById } = useCourse(); 

  // State
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  
  // UI States
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Review & Q&A
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDetail, setQuestionDetail] = useState('');

  // --- FIXED DATA FETCHING ---
  useEffect(() => {
    const loadCourse = async () => {
      // 1. Reset states
      setLoading(true);
      setError(null);

      // 2. Handle missing ID gracefully
      if (!id) {
        setError("Invalid URL: No Course ID provided.");
        setLoading(false); // Stop spinner!
        return;
      }

      console.log("Fetching details for ID:", id);

      try {
        const data = await fetchCourseById(id);
        
        if (data) {
          setCourse(data);
          // Auto-select first lesson
          if (data.sections && data.sections.length > 0) {
             const firstSection = data.sections[0];
             setExpandedSections([firstSection._id]); 
             
             if (firstSection.lessons && firstSection.lessons.length > 0) {
                 setActiveLesson(firstSection.lessons[0]); 
             }
          }
        } else {
          setError("Course not found in database.");
        }
      } catch (err) {
        console.error("Error loading course:", err);
        setError("Failed to load course details.");
      } finally {
        // 3. ALWAYS Stop spinner
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

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

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]);
  };

  const formatDuration = (mins: number) => {
      if (!mins) return '5m';
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  // --- RENDER STATES ---

  if (loading) {
      return (
          <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
              <div className="text-center">
                  <Loader className="animate-spin text-purple-600 mx-auto mb-4" size={48} />
                  <p className="text-slate-400">Loading course content...</p>
              </div>
          </div>
      );
  }

  if (error || !course) {
      return (
          <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center text-slate-400">
              <AlertCircle size={48} className="text-red-500 mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Unable to Load Course</h2>
              <p className="mb-6">{error || "The requested course could not be found."}</p>
              <Link to="/active-course" className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors">
                  Browse Active Courses
              </Link>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 font-sans flex flex-col overflow-hidden">
      
      {/* HEADER */}
      <header className="h-16 bg-[#151F32] border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <Link to="/active-course" className="p-2 hover:bg-slate-700/50 rounded-full transition-colors text-slate-400 hover:text-white">
            <ChevronLeft size={22} />
          </Link>
          <h1 className="text-white font-bold text-sm md:text-base lg:text-lg leading-tight line-clamp-1 max-w-[200px] md:max-w-md">
            {course.title}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
                <Clock size={14} className="text-purple-400" />
                <span className="text-slate-300">Progress: 0%</span>
            </div>
            <button 
              className="p-2 text-slate-400 hover:text-white lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 relative overflow-hidden">
        
        {/* LEFT: PLAYER & CONTENT */}
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 bg-[#0B1120] pb-20">
          
          {/* VIDEO PLAYER */}
          <div className="w-full bg-black aspect-video relative shadow-2xl z-10 flex items-center justify-center">
             {activeLesson?.videoKey ? (
                 <iframe 
                   width="100%" 
                   height="100%" 
                   src={`https://www.youtube.com/embed/${activeLesson.videoKey}?autoplay=0&rel=0`} 
                   title="Video Player"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen
                   className="w-full h-full"
                 ></iframe>
             ) : (
                 <div className="text-center p-10">
                     <PlayCircle size={48} className="mx-auto text-slate-600 mb-2"/>
                     <p className="text-slate-500">
                        {course.sections?.length > 0 
                            ? "Select a lesson to start watching" 
                            : "No lessons available yet"}
                     </p>
                 </div>
             )}
          </div>

          {/* TABS & INFO */}
          <div className="max-w-5xl mx-auto p-4 md:p-8">
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

            <div className="min-h-[400px]">
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{course.title}</h1>
                            <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-6">{course.description}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-6">
                                <span className="flex items-center gap-1.5"><Star size={16} className="text-amber-400 fill-amber-400"/> {course.rating || 0} Rating</span>
                                <span className="flex items-center gap-1.5"><Users size={16} /> {course.studentsEnrolled || 0} students</span>
                                <span className="flex items-center gap-1.5"><Globe size={16} /> {course.language || 'English'}</span>
                            </div>
                        </div>

                        {/* Learning Points */}
                        {course.learningPoints && course.learningPoints.length > 0 && (
                            <div className="bg-[#151F32] border border-slate-800 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-white mb-4">What you'll learn</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {course.learningPoints.map((point: string, idx: number) => (
                                        <div key={idx} className="flex gap-3 items-start">
                                            <Check size={18} className="text-emerald-500 mt-1 shrink-0" />
                                            <span className="text-slate-300 text-sm leading-relaxed">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Instructor */}
                        {course.instructor && (
                            <div className="border-t border-slate-800 pt-8">
                                <h3 className="text-xl font-bold text-white mb-6">Instructor</h3>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <img src={course.instructor.avatar || 'https://i.pravatar.cc/150'} alt="Instructor" className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-purple-500/20" />
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1">{course.instructor.name}</h4>
                                        <p className="text-purple-400 text-sm font-medium mb-4">{course.instructor.title || 'Instructor'}</p>
                                        <p className="text-slate-400 text-sm leading-relaxed">{course.instructor.bio || 'Passionate educator and industry expert.'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
                
                {/* Q&A TAB */}
                {activeTab === 'q&a' && (
                    <div className="text-center py-10 text-slate-500">
                        <MessageCircle size={48} className="mx-auto mb-4 opacity-50"/>
                        <p>Q&A Forum coming soon!</p>
                    </div>
                )}

                {/* REVIEWS TAB */}
                {activeTab === 'reviews' && (
                    <div className="text-center py-10 text-slate-500">
                        <Star size={48} className="mx-auto mb-4 opacity-50"/>
                        <p>No reviews yet. Be the first!</p>
                    </div>
                )}
            </div>
          </div>
        </main>

        {/* RIGHT: CURRICULUM SIDEBAR */}
        <AnimatePresence>
            {isMobile && sidebarOpen && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
                    <p className="text-xs text-slate-500 mt-1">
                        {course.sections?.length || 0} Sections
                    </p>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
                    <X size={20}/>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                {course.sections && course.sections.map((section: any) => (
                    <div key={section._id} className="border-b border-slate-800">
                        <button 
                            onClick={() => toggleSection(section._id)}
                            className="w-full flex items-center justify-between p-4 bg-[#1E293B] hover:bg-slate-800 transition-colors text-left group"
                        >
                            <div>
                                <h4 className="text-sm font-bold text-slate-200 group-hover:text-purple-400 transition-colors line-clamp-1">{section.title}</h4>
                                <span className="text-[11px] text-slate-500 font-medium">{section.lessons.length} Lessons</span>
                            </div>
                            {expandedSections.includes(section._id) ? <ChevronUp size={16} className="text-slate-500"/> : <ChevronDown size={16} className="text-slate-500"/>}
                        </button>

                        <AnimatePresence>
                            {expandedSections.includes(section._id) && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }} 
                                    animate={{ height: 'auto', opacity: 1 }} 
                                    exit={{ height: 0, opacity: 0 }} 
                                    className="overflow-hidden bg-[#0B1120]"
                                >
                                    {section.lessons.map((lesson: any) => (
                                        <div 
                                            key={lesson._id}
                                            onClick={() => {
                                                setActiveLesson(lesson);
                                                if(isMobile) setSidebarOpen(false);
                                            }}
                                            className={`flex items-start gap-3 p-4 cursor-pointer transition-all border-l-[3px] ${
                                                activeLesson?._id === lesson._id 
                                                ? 'bg-purple-500/10 border-purple-500' 
                                                : 'border-transparent hover:bg-slate-800/50'
                                            }`}
                                        >
                                            <div className="mt-0.5 shrink-0">
                                                <PlayCircle size={16} className={activeLesson?._id === lesson._id ? 'text-purple-400' : 'text-slate-500'} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-medium leading-snug line-clamp-2 ${activeLesson?._id === lesson._id ? 'text-purple-300' : 'text-slate-300'}`}>
                                                    {lesson.title}
                                                </p>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                                        <Clock size={10} /> {formatDuration(lesson.videoDuration)}
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