// src/components/Projects.jsx
import React from 'react';
import { useState, useRef } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import petrolBunkThumbnail from '../assets/petrolbunkmanagementsystem-thumnail.png';
import eduWorldThumbnail from '../assets/eduworld-thumbnail.png';
import headlinesHubThumbnail from '../assets/headlinesHub-thumnail.png';



const ProjectCard = ({ title, description, tags, image, liveLink, githubLink, isInView, delay, duration }) => {
  const [hovered, setHovered] = useState(false);



  const cardAnimation = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'scale(1)' : 'scale(0.9)',
    config: { tension: 400, friction: 25 },
    delay
  });



  const contentAnimation = useSpring({
    opacity: hovered ? 1 : 0,
    transform: hovered ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 400, friction: 20 }
  });



  const buttonAnimation = useSpring({
    opacity: hovered ? 1 : 0,
    transform: hovered ? 'translateY(0)' : 'translateY(10px)',
    config: { tension: 400, friction: 20 },
    delay: 50
  });


  const imageAnimation = useSpring({
    filter: hovered ? 'brightness(0.4) blur(3px)' : 'brightness(1) blur(0px)',
    transform: hovered ? 'scale(1.05)' : 'scale(1)',
    config: { tension: 400, friction: 20 }
  });


  // Function to highlight project name in description
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
      className="liquid-glass-card-enhanced rounded-xl overflow-hidden group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden aspect-video">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 group-hover:opacity-70 transition-opacity"></div>
        <animated.img 
          style={imageAnimation}
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />



        <animated.div
          style={contentAnimation}
          className="absolute inset-0 p-6 flex flex-col justify-end"
        >
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className="liquid-glass-badge text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <animated.div style={buttonAnimation} className="flex gap-4">
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className="liquid-glass-icon p-2 rounded-full text-gray-300 hover:text-white transition-all">
                <FaGithub className="text-lg" />
              </a>
            )}
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noopener noreferrer" className="liquid-glass-icon p-2 rounded-full text-gray-300 hover:text-white transition-all">
                <FaExternalLinkAlt className="text-lg" />
              </a>
            )}
          </animated.div>
        </animated.div>
      </div>
      <div className="p-6">
        {duration && (
          <p className="text-sm text-purple-400 font-medium mb-2">{duration}</p>
        )}
        <p className="text-gray-300">{renderDescription()}</p>
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
    <section id="projects" className="py-6 px-6 bg-gray-900/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <animated.div style={titleAnimation} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
          <p className="text-gray-300 mt-5 max-w-2xl mx-auto">
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
