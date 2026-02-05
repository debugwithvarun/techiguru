import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, BookOpen, PlusCircle, Video, 
  Settings, LogOut, Trash2, Edit2, Save, DollarSign, 
  Users, Clock, BarChart3, Search, Filter, XCircle, 
  User, Mail, Phone, MapPin, X, CheckCircle, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. INTERFACES & TYPES ---

interface VideoItem {
  id: number;
  title: string;
  videoKey: string;
  duration: string;
  isFree: boolean;
}

interface TopicItem {
  id: number;
  title: string;
  videos: VideoItem[];
}

interface CourseData {
  id?: number; 
  title: string;
  description: string;
  price: string;
  category: string;
  status: 'Active' | 'Inactive' | 'Draft';
  thumbnail: any | null; 
  topics: TopicItem[];
}

interface CourseListItem {
  id: number;
  title: string;
  students: number;
  rating: number;
  status: 'Active' | 'Inactive' | 'Draft';
  price: string;
  topics?: TopicItem[];
  description?: string;
  category?: string;
}

interface StatItem {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface CourseListProps {
  status: 'Active' | 'Inactive';
  courses: CourseListItem[];
  onEdit: (course: CourseListItem) => void;
  onDelete: (id: number) => void;
}

interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

// --- MOCK DATA ---
const INITIAL_COURSES: CourseListItem[] = [
  { 
    id: 1, 
    title: 'Complete React Guide', 
    students: 120, 
    rating: 4.8, 
    status: 'Active', 
    price: '$49',
    description: 'Learn React from scratch.',
    category: 'web-dev',
    topics: [
      { 
        id: 101, 
        title: 'Introduction', 
        videos: [{ id: 1, title: 'Setup Environment', videoKey: 'xyz', duration: '10:00', isFree: true }] 
      }
    ]
  },
  { 
    id: 2, 
    title: 'Advanced NodeJS', 
    students: 45, 
    rating: 4.9, 
    status: 'Active', 
    price: '$59',
    description: 'Master Node.js backend.',
    category: 'web-dev',
    topics: []
  },
  { 
    id: 3, 
    title: 'Python for Beginners', 
    students: 0, 
    rating: 0, 
    status: 'Inactive', 
    price: '$29',
    description: 'Start your coding journey.',
    category: 'data-science',
    topics: []
  },
];

const MOCK_STATS: StatItem[] = [
  { label: 'Total Revenue', value: '$12,450', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Active Students', value: '1,240', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Total Courses', value: '8', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Course Hours', value: '142h', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
];

// --- HELPER ICONS ---
const FileIcon: React.FC<{size?: number; className?: string}> = ({size = 20, className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
);


// --- SUB-COMPONENT: SIDEBAR ---
const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'active_courses', label: 'Active Courses', icon: BookOpen },
    { id: 'inactive_courses', label: 'Drafts / Inactive', icon: FileIcon },
    { id: 'add_course', label: 'Create New Course', icon: PlusCircle },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <div className="w-64 bg-[#0F172A] min-h-screen text-slate-300 flex flex-col fixed left-0 top-0 z-50 shadow-2xl">
      <div className="p-8 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-900/50">T</div>
        <span className="text-xl font-bold text-white tracking-tight">TutorPanel</span>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
              activeTab === item.id 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30 translate-x-1' 
                : 'hover:bg-slate-800 hover:text-white hover:translate-x-1'
            }`}
          >
            <item.icon size={20} className={`transition-colors ${activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 rounded-xl transition-colors">
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: COURSE BUILDER ---
interface CourseBuilderProps {
  initialData?: CourseListItem | null;
  onSave: (data: CourseData) => void;
  onCancel: () => void;
}

const CourseBuilder: React.FC<CourseBuilderProps> = ({ initialData, onSave, onCancel }) => {
  const [courseData, setCourseData] = useState<CourseData>(() => {
     if (initialData) {
       return {
         id: initialData.id,
         title: initialData.title,
         description: initialData.description || '',
         price: initialData.price,
         category: initialData.category || '',
         status: initialData.status,
         thumbnail: null,
         topics: initialData.topics || [] 
       };
     }
     return {
      title: '',
      description: '',
      price: '',
      category: '',
      status: 'Draft',
      thumbnail: null,
      topics: [{ id: Date.now(), title: '', videos: [] }]
    };
  });

  const handleAddTopic = () => {
    setCourseData(prev => ({
      ...prev,
      topics: [...prev.topics, { id: Date.now(), title: '', videos: [] }]
    }));
  };

  const handleAddVideo = (topicId: number) => {
    const newVideo: VideoItem = { id: Date.now(), title: '', videoKey: '', duration: '', isFree: false };
    setCourseData(prev => ({
      ...prev,
      topics: prev.topics.map(t => 
        t.id === topicId ? { ...t, videos: [...t.videos, newVideo] } : t
      )
    }));
  };

  const updateTopic = (id: number, value: string) => {
    setCourseData(prev => ({
      ...prev,
      topics: prev.topics.map(t => t.id === id ? { ...t, title: value } : t)
    }));
  };

  const updateVideo = (topicId: number, videoId: number, field: keyof VideoItem, value: string | boolean) => {
    setCourseData(prev => ({
      ...prev,
      topics: prev.topics.map(t => 
        t.id === topicId ? {
          ...t,
          videos: t.videos.map(v => v.id === videoId ? { ...v, [field]: value } : v)
        } : t
      )
    }));
  };

  const deleteTopic = (id: number) => {
    setCourseData(prev => ({ ...prev, topics: prev.topics.filter(t => t.id !== id) }));
  }

  const deleteVideo = (topicId: number, videoId: number) => {
    setCourseData(prev => ({
        ...prev,
        topics: prev.topics.map(t => 
            t.id === topicId ? { ...t, videos: t.videos.filter(v => v.id !== videoId) } : t
        )
    }));
  }

  const handleSaveClick = () => {
    if(!courseData.title) return alert("Title required");
    onSave(courseData);
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            {initialData ? <Edit2 size={24} className="text-purple-600"/> : <PlusCircle size={24} className="text-purple-600"/>}
            {initialData ? 'Edit Course' : 'Create New Course'}
          </h2>
          <p className="text-slate-500 mt-1">Manage curriculum, topics, and upload content.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleSaveClick} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-colors flex items-center gap-2">
            <Save size={18}/> {initialData ? 'Update Course' : 'Publish Course'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Basic Info */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5 sticky top-8">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
                <Settings size={20} className="text-purple-600" /> Basic Details
                </h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                        <input 
                        type="text" 
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-300 outline-none transition-all"
                        placeholder="e.g. Master ReactJS"
                        value={courseData.title}
                        onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                        <textarea 
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-300 outline-none h-32 resize-none"
                        value={courseData.description}
                        onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Price ($)</label>
                            <input 
                                type="text" 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" 
                                value={courseData.price}
                                onChange={(e) => setCourseData({...courseData, price: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status</label>
                            <select 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none bg-white cursor-pointer"
                                value={courseData.status}
                                onChange={(e) => setCourseData({...courseData, status: e.target.value as any})}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Draft">Draft</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: Curriculum */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <BookOpen size={20} className="text-purple-600"/> Curriculum
                </h3>
                <button 
                    onClick={handleAddTopic}
                    className="flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-md shadow-purple-200"
                >
                    <PlusCircle size={16} /> Add Topic
                </button>
            </div>

            <div className="space-y-4">
                {courseData.topics.length === 0 && (
                    <div className="text-center p-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-400">
                        <BookOpen size={48} className="mx-auto mb-4 opacity-20"/>
                        <p>No topics added yet. Click "Add Topic" to start.</p>
                    </div>
                )}

                {courseData.topics.map((topic, tIndex) => (
                <div key={topic.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {/* Topic Header */}
                    <div className="bg-slate-50/80 p-4 flex items-center gap-4 border-b border-slate-100">
                        <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm">
                            {tIndex + 1}
                        </div>
                        <input 
                            type="text" 
                            placeholder="Topic Title (e.g. Introduction)"
                            className="flex-1 bg-transparent border-none focus:ring-0 font-bold text-slate-800 placeholder:text-slate-400 text-lg"
                            value={topic.title}
                            onChange={(e) => updateTopic(topic.id, e.target.value)}
                        />
                        <button onClick={() => deleteTopic(topic.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                    </div>

                    {/* Videos List */}
                    <div className="p-5 space-y-3 bg-white">
                        {topic.videos.map((video, vIndex) => (
                            <div key={video.id} className="group flex flex-col md:flex-row gap-4 items-start md:items-center p-3 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all">
                                <div className="p-2 bg-white border border-slate-200 text-purple-600 rounded-lg shadow-sm">
                                    <Video size={18} />
                                </div>
                                
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 w-full items-center">
                                    <input 
                                    type="text" 
                                    placeholder="Video Title" 
                                    className="md:col-span-5 p-2 bg-transparent border-b border-slate-200 focus:border-purple-400 outline-none text-sm font-medium text-slate-700 placeholder:font-normal"
                                    value={video.title}
                                    onChange={(e) => updateVideo(topic.id, video.id, 'title', e.target.value)}
                                    />
                                    <div className="md:col-span-4 relative">
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key:</span>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. dQw4w9WgXcQ" 
                                            className="w-full pl-8 p-2 bg-transparent border-b border-slate-200 focus:border-purple-400 outline-none text-sm font-mono text-slate-600"
                                            value={video.videoKey}
                                            onChange={(e) => updateVideo(topic.id, video.id, 'videoKey', e.target.value)}
                                        />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Duration" 
                                        className="md:col-span-3 p-2 bg-transparent border-b border-slate-200 focus:border-purple-400 outline-none text-sm text-slate-600 text-center"
                                        value={video.duration}
                                        onChange={(e) => updateVideo(topic.id, video.id, 'duration', e.target.value)}
                                    />
                                </div>

                                <button onClick={() => deleteVideo(topic.id, video.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><XCircle size={20} /></button>
                            </div>
                        ))}

                        <button 
                            onClick={() => handleAddVideo(topic.id)}
                            className="w-full py-3 mt-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-semibold hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center gap-2 text-sm"
                        >
                            <PlusCircle size={16} /> Add Video Lesson
                        </button>
                    </div>
                </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: COURSE LIST ---
const CourseList: React.FC<CourseListProps> = ({ status, courses, onEdit, onDelete }) => {
  const filteredCourses = courses.filter(c => c.status === status);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 capitalize flex items-center gap-2">
            <BookOpen className="text-purple-600" size={24}/> {status} Courses
        </h2>
        <div className="flex gap-2">
           <div className="relative hidden md:block">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input type="text" placeholder="Search courses..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 w-64 text-sm" />
           </div>
           <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50"><Filter size={20} className="text-slate-600"/></button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/80 border-b border-slate-200">
            <tr>
              <th className="p-5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Course Name</th>
              <th className="p-5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Price</th>
              <th className="p-5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Students</th>
              <th className="p-5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Status</th>
              <th className="p-5 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? filteredCourses.map((course) => (
              <tr key={course.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/30 transition-colors group">
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 border border-slate-100 flex items-center justify-center text-purple-600 font-bold text-xs">
                        {course.title.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                        <span className="block font-bold text-slate-800 text-sm">{course.title}</span>
                        <span className="block text-xs text-slate-400">{course.category || 'General'}</span>
                    </div>
                  </div>
                </td>
                <td className="p-5 text-slate-600 font-bold text-sm">{course.price}</td>
                <td className="p-5 text-slate-600 text-sm flex items-center gap-1"><Users size={14}/> {course.students}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      course.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      course.status === 'Inactive' ? 'bg-slate-100 text-slate-600 border-slate-200' : 
                      'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => onEdit(course)} 
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button 
                        onClick={() => onDelete(course.id)} 
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="p-16 text-center text-slate-400">
                   <div className="flex flex-col items-center gap-2">
                       <FileIcon size={48} className="opacity-20"/>
                       <p>No courses found in this category.</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: PROFILE SECTION (View & Edit) ---
const ProfileSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Calvin Carlo',
    title: 'Senior Python Instructor',
    email: 'calvin@techiguru.com',
    phone: '+1 800 555 1234',
    location: 'Houston, USA',
    bio: 'Passionate educator with 10+ years of experience in Full Stack Development.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
            <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>
            <p className="text-slate-500 text-sm">Manage your personal information and contact details.</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all flex items-center gap-2"
          >
            <Edit2 size={16} /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-5 py-2.5 bg-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-colors flex items-center gap-2">
              <Save size={18} /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Avatar Area */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-40 h-40 rounded-full border-4 border-white shadow-xl overflow-hidden relative group">
               <img src="https://i.pravatar.cc/150?u=a" alt="Profile" className="w-full h-full object-cover" />
               {isEditing && (
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                       <span className="text-white text-xs font-bold uppercase tracking-wider">Change</span>
                   </div>
               )}
            </div>
            {!isEditing && (
                <div className="text-center">
                    <h3 className="font-bold text-slate-900 text-lg">{profile.name}</h3>
                    <p className="text-slate-500 text-sm">{profile.title}</p>
                </div>
            )}
          </div>

          {/* Details Form */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full">
            <div className="col-span-2">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Full Name</label>
               {isEditing ? (
                 <input name="name" value={profile.name} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 outline-none" />
               ) : (
                 <p className="text-lg font-medium text-slate-900 py-2 border-b border-slate-100">{profile.name}</p>
               )}
            </div>

            <div className="col-span-2">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Title / Headline</label>
               {isEditing ? (
                 <input name="title" value={profile.title} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 outline-none" />
               ) : (
                 <p className="text-lg text-slate-700 py-2 border-b border-slate-100">{profile.title}</p>
               )}
            </div>

            <div>
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Email</label>
               {isEditing ? (
                 <input name="email" value={profile.email} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 outline-none" />
               ) : (
                 <p className="flex items-center gap-3 text-slate-700 py-2 border-b border-slate-100"><Mail size={18} className="text-purple-500"/> {profile.email}</p>
               )}
            </div>

            <div>
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Phone</label>
               {isEditing ? (
                 <input name="phone" value={profile.phone} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 outline-none" />
               ) : (
                 <p className="flex items-center gap-3 text-slate-700 py-2 border-b border-slate-100"><Phone size={18} className="text-purple-500"/> {profile.phone}</p>
               )}
            </div>
            
            <div className="col-span-2">
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Bio</label>
               {isEditing ? (
                 <textarea name="bio" value={profile.bio} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 outline-none h-32 resize-none" />
               ) : (
                 <p className="text-slate-600 leading-relaxed py-2 bg-slate-50/50 p-4 rounded-xl">{profile.bio}</p>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- SUB-COMPONENT: DASHBOARD OVERVIEW ---
const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Welcome Back, Calvin! 👋</h1>
          <p className="text-slate-500">Here is what's happening with your courses today.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2 transform hover:-translate-y-1">
           <BarChart3 size={18} /> View Analytics
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_STATS.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg transition-shadow group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3.5 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> +12%
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1 opacity-70">{stat.label}</h3>
            <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm min-h-[350px]">
           <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <DollarSign size={20} className="text-purple-600"/> Revenue Analytics
                </h3>
                <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg p-2 font-medium outline-none">
                    <option>This Month</option>
                    <option>Last Month</option>
                </select>
           </div>
           <div className="w-full h-64 bg-slate-50/50 rounded-2xl flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-200">
              <BarChart3 size={48} className="opacity-20 mb-2"/>
              <span className="text-sm font-medium opacity-50">[Chart Component Placeholder]</span>
           </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
           <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
           <div className="space-y-4">
             <button className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 font-bold hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-all text-left flex gap-4 items-center group">
               <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform"><PlusCircle size={20} className="text-purple-600"/></div>
               Create New Course
             </button>
             <button className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 font-bold hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-all text-left flex gap-4 items-center group">
               <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform"><Users size={20} className="text-blue-600"/></div>
               View Student List
             </button>
             <button className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 font-bold hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-all text-left flex gap-4 items-center group">
               <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform"><Settings size={20} className="text-slate-600"/></div>
               Account Settings
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT (CONTAINER) ---
const TutorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [courses, setCourses] = useState<CourseListItem[]>(INITIAL_COURSES);
  
  // State for Editing
  const [editingCourse, setEditingCourse] = useState<CourseListItem | null>(null);

  // -- ACTIONS --

  // 1. Edit: Switch to builder, load data
  const handleEditCourse = (course: CourseListItem) => {
    setEditingCourse(course);
    setActiveTab('add_course');
  };

  // 2. Save: Update or Add new
  const handleSaveCourse = (data: CourseData) => {
    if (editingCourse) {
      // Update logic
      setCourses(prev => prev.map(c => c.id === data.id ? { ...c, ...data } as CourseListItem : c));
      alert("Course Updated Successfully!");
    } else {
      // Create logic
      const newId = Date.now();
      const newCourse: CourseListItem = {
        ...data,
        id: newId,
        students: 0,
        rating: 0,
      } as CourseListItem;
      setCourses(prev => [...prev, newCourse]);
      alert("New Course Created Successfully!");
    }
    // Reset
    setEditingCourse(null);
    setActiveTab('active_courses');
  };

  // 3. Delete
  const handleDeleteCourse = (id: number) => {
    if(window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  // 4. Cancel
  const handleCancel = () => {
    setEditingCourse(null);
    setActiveTab('overview');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardOverview />;
      case 'active_courses': 
        return <CourseList status="Active" courses={courses} onEdit={handleEditCourse} onDelete={handleDeleteCourse} />;
      case 'inactive_courses': 
        return <CourseList status="Inactive" courses={courses} onEdit={handleEditCourse} onDelete={handleDeleteCourse} />;
      case 'add_course': 
        return <CourseBuilder initialData={editingCourse} onSave={handleSaveCourse} onCancel={handleCancel} />;
      case 'profile':
        return <ProfileSection />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
        // Clear edit state if navigating away manually
        if (tab !== 'add_course') setEditingCourse(null);
        setActiveTab(tab);
      }} />
      
      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-8 lg:p-10 overflow-y-auto h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TutorDashboard;