// src/components/Experience.jsx
import React from 'react';
import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaAward } from 'react-icons/fa';

const TimelineItem = ({ icon, title, period, organization, description, certificateLink, isLast, index }) => {
  const itemRef = useRef(null);
  const itemInView = useInView(itemRef, { once: true, amount: 0.3 });

  const slideIn = useSpring({
    opacity: itemInView ? 1 : 0,
    transform: itemInView ? 'translateX(0)' : 'translateX(-50px)',
    config: { tension: 280, friction: 20 },
    delay: itemInView ? index * 150 : 0
  });

  return (
    <animated.div ref={itemRef} style={slideIn} className="flex items-start relative w-full timeline-item">
      <div className="flex flex-col items-center mr-4 md:mr-6 flex-shrink-0 relative timeline-icon">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center z-10 text-white shadow-lg shadow-purple-600/30 flex-shrink-0 ring-4 ring-purple-500/20">
          {icon}
        </div>
        {!isLast && (
          <div 
            className="w-0.5 bg-gradient-to-b from-purple-600 via-purple-500 to-pink-500/30 absolute top-12 left-1/2 -translate-x-1/2"
            style={{ height: 'calc(100% + 2rem)' }}
          ></div>
        )}
      </div>
      <div className="liquid-glass-card rounded-3xl p-4 md:p-6 mb-8 md:mb-10 transition-all shadow-lg shadow-black/5 hover:shadow-purple-500/10 flex-1 min-w-0 overflow-hidden">
        <h3 className="text-lg md:text-xl font-bold mb-2 text-white break-words">{title}</h3>
        <p className="text-sm md:text-base text-gray-200 mb-3 break-words">{organization}</p>
        <p className="text-xs md:text-sm text-purple-200 mb-3 font-medium">{period}</p>
        <p className="text-sm md:text-base text-gray-300 leading-relaxed break-words hyphens-auto">{description}</p>
        {certificateLink && (
          <div className="mt-4">
            <button
              onClick={() => window.open(certificateLink, '_blank')}
              className="liquid-glass-shine px-4 py-2 rounded-full text-purple-100 hover:text-white text-xs md:text-sm transition-all cursor-pointer inline-block"
            >
              <span className="relative z-10 whitespace-nowrap">View Certificate →</span>
            </button>
          </div>
        )}
      </div>
    </animated.div>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const titleAnimation = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 400, friction: 25 },
  });

  const timelineItems = [
    {
      icon: <FaGraduationCap size={20} />,
      title: "Bachelor of Computer Applications (BCA)",
      period: "2022 - 2025",
      organization: "St. Joseph's University, Lalbagh Rd., Bengaluru",
      description: "Pursuing a degree in Computer Applications. Focused on programming, web development, databases, and software development lifecycle."
    },
    {
      icon: <FaAward size={20} />,
      title: "Research Paper Publication",
      period: "2024",
      organization: "International Conference on Current Trends in Information Technology",
      description: "Published research paper on Deep Learning Frontiers at St. Joseph's University, Bengaluru. Featured presenter for Facial and Hand Recognition project at the university's Open Day, demonstrating applied machine learning concepts.",
      certificateLink: "https://drive.google.com/file/d/1oTx411vg61iMN-utb1gqrU3MsoleKeJc/view"
    },
    {
      icon: <FaBriefcase size={20} />,
      title: "Software Development Intern",
      period: "Jan 2025 - May 2025",
      organization: "WspacesAI Labs Private Limited (WhiteSpaces.ai), Koramangala, Bengaluru",
      description: "Developed web applications using Vite JavaScript and TypeScript (frontend) and PHP (backend), enhancing CRM system efficiency by 30%. Optimized performance and user experience, reducing load times by 25% and improving team delivery efficiency by 20%. Collaborated in an agile team, ensuring 100% on-time project delivery and scalable code deployment.",
      certificateLink: "https://drive.google.com/file/d/1zN0Dpgxt9sQVyzFuG2YFxRMBQlzm-60c/view?usp=sharing"
    },
    {
      icon: <FaGraduationCap size={20} />,
      title: "MSc in Data Analytics",
      period: "2025 - 2027",
      organization: "Christ University, Central Campus, Dairy Circle, Bengaluru",
      description: "Future enrollment in Master's program focusing on data analysis, machine learning, business intelligence, and advanced analytics techniques."
    }
  ];

  return (
    <section id="experience" className="py-6 px-2 sm:px-4 overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <animated.div style={titleAnimation} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Experience & Education</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            My professional journey and academic background that have shaped my skills and expertise in web development.
          </p>
        </animated.div>

        <div className="relative overflow-hidden">
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
