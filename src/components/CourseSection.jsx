import React from 'react';
import CourseCard from './CourseCard';

const coursesData = [
  { title: "The Ultimate Course Bundle", price: "$0", lessons: 10, students: 49, author: "Calvin Carlo", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=500" },
  { title: "App Development Course", price: "$19", lessons: 10, students: 49, author: "Calvin Carlo", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500" },
  { title: "Spoken English Popular Course", price: "$29", lessons: 10, students: 49, author: "Calvin Carlo", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500" }
];

const CourseSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">Explore Our Best Courses</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover a world of knowledge and opportunities with our online education platform pursue a new career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {coursesData.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;