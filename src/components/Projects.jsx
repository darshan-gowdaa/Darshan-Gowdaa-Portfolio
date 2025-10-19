import React from 'react';
import { useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Mock images for demo
const petrolBunkThumbnail = 'src/assets/petrolbunkmanagementsystem-thumnail.png';
const eduWorldThumbnail = 'src/assets/eduworld-thumbnail.png';
const headlinesHubThumbnail = 'src/assets/headlinesHub-thumnail.png';

const ProjectCard = ({ title, description, tags, image, liveLink, githubLink, isInView, delay, duration }) => {
  const [hovered, setHovered] = useState(false);

  const cardAnimation = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'scale(1)' : 'scale(0.95)',
    config: { tension: 400, friction: 25 },
    delay
  });

  const contentAnimation = useSpring({
    opacity: hovered ? 1 : 0,
    transform: hovered ? 'translateY(0)' : 'translateY(15px)',
    config: { tension: 300, friction: 25 }
  });

  const buttonAnimation = useSpring({
    opacity: hovered ? 1 : 0,
    transform: hovered ? 'translateY(0)' : 'translateY(8px)',
    config: { tension: 300, friction: 25 },
    delay: 80
  });

  const imageAnimation = useSpring({
    filter: hovered ? 'brightness(0.6) blur(3px)' : 'brightness(1) blur(0px)',
    transform: hovered ? 'scale(1.05)' : 'scale(1)',
    config: { tension: 300, friction: 25 }
  });

  const renderDescription = () => {
    const parts = description.split(title);
    if (parts.length > 1) {
      return (
        <>
          {parts[0]}
          <span className="text-purple-400 font-semibold">{title}</span>
          {parts[1]}
        </>
      );
    }
    return description;
  };

  return (
    <animated.div
      style={cardAnimation}
      className="liquid-glass-primary rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden aspect-video">
        <animated.img 
          style={imageAnimation}
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />

        <animated.div
          style={contentAnimation}
          className="absolute inset-0 p-4 flex flex-col justify-end backdrop-blur-sm bg-gradient-to-t from-black/50 to-transparent"
        >
          <h3 className="text-lg font-bold mb-2 text-white drop-shadow-2xl">{title}</h3>
          
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="liquid-glass-secondary text-[10px] px-2 py-0.5 rounded-md font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <animated.div style={buttonAnimation} className="flex gap-3">
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-900/80 backdrop-blur-lg p-2.5 rounded-full text-gray-200 hover:text-white hover:scale-105 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub className="text-base" />
              </a>
            )}
            {liveLink && (
              <a 
                href={liveLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-900/80 backdrop-blur-lg p-2.5 rounded-full text-gray-200 hover:text-white hover:scale-105 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt className="text-base" />
              </a>
            )}
          </animated.div>
        </animated.div>
      </div>
      
      <div className="p-5 bg-gray-800/20 backdrop-blur-md border-t border-gray-700/20 flex-grow">
        {duration && (
          <p className="text-sm text-purple-400 font-semibold mb-2">{duration}</p>
        )}
        <p className="text-gray-200 text-sm leading-relaxed">{renderDescription()}</p>
      </div>
    </animated.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const titleAnimation = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 400, friction: 25 },
  });

  const projects = [
    {
      title: "Petrol Bunk Management System",
      description: "Petrol Bunk Management System is a MERN-Stack web application (Full-Stack) designed to streamline petrol bunk operations with modern technology. It provides a comprehensive solution for managing inventory, sales, employees, and generate Visual Reports, ensuring efficient and transparent business processes.",
      tags: ["MERN Stack","JWT", "Software Documentation", "Responsive Web Design","Data Visualisation"],
      image: petrolBunkThumbnail,
      githubLink: "https://github.com/darshan-gowdaa/petrol-bunk-management-system",
      delay: 200,
    },
    {
      title: "EduWorld-FullStack",
      description: "EduWorld-FullStack offers a comprehensive suite of features for admissions, course management, enquiries, and more. It has a chatbot feature for user interaction and a responsive design for easy use. It also has a dashboard for the admin to manage the website.",
      tags: ["MERN Stack", "Tailwind CSS", "JWT", "Chatbot", "Responsive"],
      image: eduWorldThumbnail,
      githubLink: "https://github.com/darshan-gowdaa/eduworld-fullstack",
      delay: 300,
    },
    {
      title: "headlinesHub-React",
      description: "headlinesHub-React is a modern, responsive news aggregator app built with React and Vite. Fetches latest news articles from various categories using the NewsAPI and displays them in a clean, intuitive interface. The app allows users to search for news articles, view them in a list format, and click on an article to read the full content.",
      tags: ["React.js", "API", "Bootstrap", "Infinite Scroll", "Caching"],
      image: headlinesHubThumbnail,
      liveLink: "#",
      githubLink: "https://github.com/darshan-gowdaa/headlinesHub-React",
      delay: 400,
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-gray-900/50 backdrop-blur-sm" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <animated.div style={titleAnimation} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-5 max-w-2xl mx-auto text-base">
            My recent projects that showcase my technical skills and problem-solving abilities.
          </p>
        </animated.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
