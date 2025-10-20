// src/components/Experience.jsx
import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const TimelineItem = ({ icon, title, period, organization, description, certificateLink, isLeft, isLast, index, iconColor }) => {
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: true, amount: 0.3 });

  // Optimized animation - single spring config
  const slideIn = useSpring({
    opacity: itemInView ? 1 : 0,
    transform: itemInView 
      ? 'translateX(0) translateY(0)' 
      : `translateX(${isLeft ? '-30px' : '30px'}) translateY(20px)`,
    config: { tension: 280, friction: 25 },
    delay: itemInView ? index * 100 : 0
  });

  return (
    <animated.div 
      ref={itemRef} 
      style={slideIn} 
      className={`relative w-full mb-8 sm:mb-12 md:mb-16 ${isLeft ? 'md:pr-8 lg:pr-12' : 'md:pl-8 lg:pl-12'}`}
    >
      {/* Timeline Connector Line - Hidden on mobile, visible on md+ */}
      {!isLast && (
        <div className="hidden md:block absolute left-1/2 top-16 w-0.5 h-full bg-gradient-to-b from-purple-500 via-purple-400 to-transparent -translate-x-1/2 z-0"></div>
      )}

      {/* Content Container */}
      <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
        
        {/* Card Content */}
        <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} w-full md:w-auto pl-16 md:pl-0`}>
          <div className="liquid-glass-card-enhanced rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 transition-shadow duration-500 hover:shadow-[0_8px_30px_rgba(168,85,247,0.3)]">
            
            {/* Period Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/30 ${isLeft ? 'md:float-right' : ''}`}>
              <span className="text-xs sm:text-sm font-semibold text-purple-200">{period}</span>
            </div>

            {/* Title & Organization */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white leading-tight clear-both">
              {title}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-purple-200 mb-3 sm:mb-4 font-medium">
              {organization}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-5">
              {description}
            </p>

            {/* Certificate Button */}
            {certificateLink && (
              <button
                onClick={() => window.open(certificateLink, '_blank')}
                className="liquid-glass-primary inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-white text-xs sm:text-sm font-semibold transition-all duration-300"
              >
                <span className="relative z-10">View Certificate</span>
                <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Icon - Centered on timeline */}
        <div className="absolute left-0 top-0 md:relative md:left-0 flex-shrink-0 z-10">
          <div className={`liquid-glass-badge w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full ${iconColor} flex items-center justify-center text-white shadow-xl`}>
            <span className="text-lg sm:text-xl md:text-2xl">{icon}</span>
          </div>
        </div>

        {/* Spacer for alignment on desktop */}
        <div className="hidden md:block flex-1"></div>
      </div>
    </animated.div>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const titleAnimation = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(30px)',
    config: { tension: 280, friction: 25 },
  });

  const timelineItems = [
    {
      icon: <FaGraduationCap size={20} />,
      title: "Bachelor of Computer Applications (BCA)",
      period: "2022 - 2025",
      organization: "St. Joseph's University, Bengaluru",
      description: "Focused on programming, web development, databases, and software development lifecycle. Built strong foundation in computer science fundamentals and practical application development.",
      isLeft: true,
      iconColor: "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 shadow-blue-600/40"
    },
    {
      icon: <FaBriefcase size={20} />,
      title: "Software Development Intern",
      period: "Jan 2025 - May 2025",
      organization: "WspacesAI Labs Private Limited, Bengaluru",
      description: "Developed web applications using Vite, TypeScript, and PHP, enhancing CRM efficiency by 30%. Optimized performance reducing load times by 25% and improved delivery efficiency by 20%. Collaborated in agile team ensuring 100% on-time delivery.",
      certificateLink: "https://drive.google.com/file/d/1zN0Dpgxt9sQVyzFuG2YFxRMBQlzm-60c/view?usp=sharing",
      isLeft: false,
      iconColor: "bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 shadow-green-600/40"
    },
    {
      icon: <FaGraduationCap size={20} />,
      title: "MSc in Data Analytics",
      period: "2025 - 2027",
      organization: "Christ University, Central Campus, Bengaluru",
      description: "Pursuing advanced studies in data analysis, machine learning, business intelligence, and analytics techniques. Developing expertise in statistical modeling and data-driven decision making.",
      isLeft: true,
      iconColor: "bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 shadow-purple-600/40"
    }
  ];

  return (
    <section 
      id="experience" 
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 overflow-hidden" 
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <animated.div style={titleAnimation} className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white">
            Experience & <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Education</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            My professional journey and academic background shaping my expertise in development and data analytics
          </p>
        </animated.div>

        {/* Timeline Container */}
        <div className="relative pl-8 md:pl-0">
          {/* Mobile vertical line - visible only on mobile */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-purple-400 to-transparent"></div>

          {timelineItems.map((item, index) => (
            <TimelineItem
              key={index}
              {...item}
              index={index}
              isLast={index === timelineItems.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
