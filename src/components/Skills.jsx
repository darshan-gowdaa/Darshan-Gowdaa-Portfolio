// src/components/Skills.jsx
import { useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'framer-motion';
import {
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDatabase,
  FaGitAlt, FaAws, FaBootstrap, FaChartLine
} from 'react-icons/fa';
import {
  SiJavascript, SiTailwindcss, SiMongodb, SiMysql,
  SiPython, SiExpress, SiPhp, SiDocker
} from 'react-icons/si';

const SkillCard = ({ icon, name, delay, category }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hovered, setHovered] = useState(false);

  const cardAnimation = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(30px) scale(0.9)'
    },
    to: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)'
    },
    config: { tension: 300, friction: 25 },
    delay: 50 + delay,
  });

  const hoverAnimation = useSpring({
    transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
    config: { tension: 400, friction: 30 },
  });

  const iconAnimation = useSpring({
    transform: hovered ? 'scale(1.3)' : 'scale(1)',
    config: { tension: 400, friction: 30 },
  });

  return (
    <animated.div
      ref={ref}
      style={{ ...cardAnimation, ...hoverAnimation }}
      className="skill-card cursor-pointer group flex-none w-32 sm:w-36 md:w-40 lg:w-44"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col items-center justify-center h-full p-4 sm:p-5 md:p-6">
        <animated.div 
          style={iconAnimation} 
          className="text-3xl sm:text-4xl md:text-5xl relative z-10 transition-all duration-300 mb-3 sm:mb-4"
        >
          {icon}
        </animated.div>
        <h3 className="skill-text font-semibold text-xs sm:text-sm md:text-base text-white relative z-10 text-center">
          {name}
        </h3>
      </div>
    </animated.div>
  );
};

const SkillSection = ({ title, skills, category }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const titleAnimation = useSpring({
    from: {
      opacity: 0,
      transform: 'translateX(-30px)'
    },
    to: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateX(0)' : 'translateX(-30px)'
    },
    config: { tension: 300, friction: 25 }
  });

  return (
    <div ref={ref} className="mb-16 sm:mb-20 md:mb-24">
      <animated.div 
        style={titleAnimation} 
        className="text-left mb-6 sm:mb-8 md:mb-12 px-4 sm:px-6 relative z-0"
      >
        <h3 className="section-title text-xl sm:text-2xl md:text-3xl font-bold">
          {title}
        </h3>
      </animated.div>
      
      {/* Responsive Horizontal Scroll Container */}
      <div className="cards-scroll-container overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 sm:gap-5 md:gap-6 px-4 sm:px-6 pb-4">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} {...skill} delay={index * 100} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const titleAnimation = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    to: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(20px)'
    },
    config: { tension: 280, friction: 60 }
  });

  const frontendSkills = [
    { icon: <FaReact className="text-blue-400" />, name: 'React', delay: 0 },
    { icon: <SiJavascript className="text-yellow-400" />, name: 'JavaScript', delay: 0 },
    { icon: <FaHtml5 className="text-orange-500" />, name: 'HTML & CSS', delay: 0 },
    { icon: <SiTailwindcss className="text-cyan-400" />, name: 'Tailwind CSS', delay: 0 },
    { icon: <FaBootstrap className="text-purple-500" />, name: 'Bootstrap', delay: 0 },
  ];

  const backendSkills = [
    { icon: <FaNodeJs className="text-green-500" />, name: 'Node.js', delay: 0 },
    { icon: <SiExpress className="text-gray-300" />, name: 'Express.js', delay: 0 },
    { icon: <SiPython className="text-blue-500" />, name: 'Python', delay: 0 },
    { icon: <SiMongodb className="text-green-600" />, name: 'MongoDB', delay: 0 },
    { icon: <SiMysql className="text-blue-600" />, name: 'MySQL', delay: 0 },
    { icon: <FaDatabase className="text-blue-400" />, name: 'PostgreSQL', delay: 0 },
  ];

  const otherSkills = [
    { icon: <FaGitAlt className="text-orange-500" />, name: 'Git/GitHub', delay: 0 },
    { icon: <FaAws className="text-orange-500" />, name: 'AWS', delay: 0 },
    { icon: <FaChartLine className="text-yellow-500" />, name: 'Power BI', delay: 0 },
    { icon: <SiDocker className="text-blue-400" />, name: 'Docker', delay: 0 },
  ];

  return (
    <section 
      id="skills" 
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-0 bg-gray-900/50" 
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <animated.div 
          style={titleAnimation} 
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-4 sm:px-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Technical Skills
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
        </animated.div>

        <SkillSection title="Frontend Development" skills={frontendSkills} category="frontend" />
        <SkillSection title="Backend Development" skills={backendSkills} category="backend" />
        <SkillSection title="Tools & Platforms" skills={otherSkills} category="tools" />
      </div>
    </section>
  );
};

export default Skills;
