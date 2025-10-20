// src/components/Projects.jsx
import React, { memo, useMemo, useCallback } from 'react';
import { useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

import petrolBunkThumbnail from '../assets/petrolbunkmanagementsystem-thumnail.png';
import eduWorldThumbnail from '../assets/eduworld-thumbnail.png';
import headlinesHubThumbnail from '../assets/headlinesHub-thumnail.png';

const ProjectCard = memo(({ 
  title, 
  description, 
  tags, 
  image, 
  liveLink, 
  githubLink, 
  isInView, 
  delay, 
  duration 
}) => {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);

  const cardAnimation = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translate3d(0,0,0) scale(1)' : 'translate3d(0,20px,0) scale(0.98)',
    config: { tension: 280, friction: 25 },
    delay
  });

  // Show overlay on mobile tap or desktop hover
  const showOverlay = hovered || tapped;

  const contentAnimation = useSpring({
    opacity: showOverlay ? 1 : 0,
    transform: showOverlay ? 'translate3d(0,0,0)' : 'translate3d(0,12px,0)',
    config: { tension: 280, friction: 22 }
  });

  const buttonAnimation = useSpring({
    opacity: showOverlay ? 1 : 0,
    transform: showOverlay ? 'translate3d(0,0,0) scale(1)' : 'translate3d(0,6px,0) scale(0.95)',
    config: { tension: 280, friction: 22 },
    delay: 60
  });

  const imageAnimation = useSpring({
    filter: showOverlay ? 'brightness(0.65) blur(2px)' : 'brightness(1) blur(0px)',
    transform: showOverlay ? 'translate3d(0,0,0) scale(1.05)' : 'translate3d(0,0,0) scale(1)',
    config: { tension: 280, friction: 22 }
  });

  const renderDescription = useCallback(() => {
    const parts = description.split(title);
    if (parts.length > 1) {
      return (
        <>
          {parts[0]}
          <span className="text-purple-100 font-bold [text-shadow:_0_0_8px_rgb(168_85_247_/_0.7),_0_0_16px_rgb(168_85_247_/_0.4)]">
            {title}
          </span>
          {parts[1]}
        </>
      );
    }
    return description;
  }, [description, title]);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);
  
  // Toggle tap state on mobile
  const handleTap = useCallback(() => {
    setTapped(prev => !prev);
  }, []);
  
  const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);

  return (
    <animated.div
      style={cardAnimation}
      className="liquid-glass-primary rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
    >
      <div className="relative overflow-hidden aspect-video">
        <animated.img
          style={imageAnimation}
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Desktop hover overlay */}
        <animated.div
          style={contentAnimation}
          className="hidden md:flex absolute inset-0 p-3 sm:p-4 md:p-5 flex-col justify-end backdrop-blur-sm bg-gradient-to-t from-black/60 to-transparent"
        >
          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2 text-white drop-shadow-2xl">
            {title}
          </h3>

          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="liquid-glass-badge text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-md font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <animated.div style={buttonAnimation} className="flex gap-2 sm:gap-3">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/80 backdrop-blur-lg p-2 sm:p-2.5 rounded-full text-gray-200 hover:text-white hover:scale-105 active:scale-95 transition-all touch-manipulation"
                onClick={handleStopPropagation}
                aria-label={`View ${title} on GitHub`}
              >
                <FaGithub className="text-sm sm:text-base" />
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/80 backdrop-blur-lg p-2 sm:p-2.5 rounded-full text-gray-200 hover:text-white hover:scale-105 active:scale-95 transition-all touch-manipulation"
                onClick={handleStopPropagation}
                aria-label={`View ${title} live demo`}
              >
                <FaExternalLinkAlt className="text-sm sm:text-base" />
              </a>
            )}
          </animated.div>
        </animated.div>

        {/* Mobile always-visible overlay */}
        <div className="md:hidden absolute inset-0 p-3 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <h3 className="text-base font-bold mb-2 text-white drop-shadow-2xl">
            {title}
          </h3>

          <div className="flex flex-wrap gap-1 mb-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="liquid-glass-badge text-[9px] px-1.5 py-0.5 rounded-md font-medium"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="liquid-glass-badge text-[9px] px-1.5 py-0.5 rounded-md font-medium">
                +{tags.length - 3}
              </span>
            )}
          </div>

          <div className="flex gap-2 mt-1">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/90 backdrop-blur-lg p-2 rounded-full text-gray-200 active:scale-95 transition-all touch-manipulation"
                onClick={handleStopPropagation}
                aria-label={`View ${title} on GitHub`}
              >
                <FaGithub className="text-sm" />
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/90 backdrop-blur-lg p-2 rounded-full text-gray-200 active:scale-95 transition-all touch-manipulation"
                onClick={handleStopPropagation}
                aria-label={`View ${title} live demo`}
              >
                <FaExternalLinkAlt className="text-sm" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 bg-gray-800/20 backdrop-blur-md border-t border-gray-700/20 flex-grow">
        {duration && (
          <p className="text-xs sm:text-sm text-white-100 font-semibold mb-1.5 sm:mb-2">
            {duration}
          </p>
        )}
        <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
          {renderDescription()}
        </p>
      </div>
    </animated.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const titleAnimation = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translate3d(0,0,0)' : 'translate3d(0,20px,0)',
    config: { tension: 280, friction: 25 },
  });

  const projects = useMemo(() => [
    {
      title: "Petrol Bunk Management System",
      description: "Petrol Bunk Management System is a MERN-Stack web application (Full-Stack) designed to streamline petrol bunk operations with modern technology. It provides a comprehensive solution for managing inventory, sales, employees, and generate Visual Reports, ensuring efficient and transparent business processes.",
      tags: ["MERN Stack", "JWT", "Software Documentation", "Responsive Web Design", "Data Visualisation"],
      image: petrolBunkThumbnail,
      githubLink: "https://github.com/darshan-gowdaa/petrol-bunk-management-system",
      delay: 150,
    },
    {
      title: "EduWorld-FullStack",
      description: "EduWorld-FullStack offers a comprehensive suite of features for admissions, course management, enquiries, and more. It has a chatbot feature for user interaction and a responsive design for easy use. It also has a dashboard for the admin to manage the website.",
      tags: ["MERN Stack", "Tailwind CSS", "JWT", "Chatbot", "Responsive"],
      image: eduWorldThumbnail,
      githubLink: "https://github.com/darshan-gowdaa/eduworld-fullstack",
      delay: 250,
    },
    {
      title: "headlinesHub-React",
      description: "headlinesHub-React is a modern, responsive news aggregator app built with React and Vite. Fetches latest news articles from various categories using the NewsAPI and displays them in a clean, intuitive interface. The app allows users to search for news articles, view them in a list format, and click on an article to read the full content.",
      tags: ["React.js", "API", "Bootstrap", "Infinite Scroll", "Caching"],
      image: headlinesHubThumbnail,
      liveLink: "#",
      githubLink: "https://github.com/darshan-gowdaa/headlinesHub-React",
      delay: 350,
    },
  ], []);

  return (
    <section 
      id="projects" 
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-900/50 backdrop-blur-sm" 
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <animated.div style={titleAnimation} className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-4 sm:mt-5 max-w-2xl mx-auto text-sm sm:text-base px-4">
            My recent projects that showcase my technical skills and problem-solving abilities.
          </p>
        </animated.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${index}`}
              {...project}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Projects);
