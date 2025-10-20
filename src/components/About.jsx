// src/components/About.jsx
import { useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'framer-motion';
import profileImage from '../assets/DGpfp.jpg';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);

  const fadeInUp = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 280, friction: 60 },
    delay: 100,
  });

  const fadeInLeft = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateX(0)' : 'translateX(-50px)',
    config: { tension: 280, friction: 60 },
    delay: 200,
  });

  const fadeInRight = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateX(0)' : 'translateX(50px)',
    config: { tension: 280, friction: 60 },
    delay: 300,
  });

  return (
    <section id="about" className="py-12 px-2 sm:px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <animated.div style={fadeInUp} className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-purple-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
        </animated.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
          <animated.div style={fadeInLeft} className="lg:col-span-1 flex justify-center items-center">
            <div 
              className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto lg:mx-0 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Rotating glow effect with hover speed control */}
              <div 
                className="absolute inset-0 rounded-full blur-2xl opacity-70 transition-all duration-300"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, white, transparent 30%)',
                  animation: `spin-slow ${isHovered ? '1s' : '4s'} linear infinite`,
                }}
              ></div>
              
              {/* Image container */}
              <div className="relative rounded-full overflow-hidden w-full h-full shadow-[0_0_80px_rgba(255,255,255,0.6)] hover:shadow-[0_0_100px_rgba(255,255,255,0.8)] transition-shadow duration-300">
                <img
                  src={profileImage}
                  alt="Darshan Gowda"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-600/10 to-transparent"></div>
              </div>
            </div>
          </animated.div>

          {/* Bio and Description */}
          <animated.div style={fadeInRight} className="lg:col-span-2 space-y-4">
            <div className="liquid-glass-card-enhanced p-6 sm:p-7 rounded-3xl">
              <div className="space-y-3 text-gray-300 leading-relaxed text-base sm:text-lg">
                <p>
                  I'm a <strong className="text-white">Full-Stack Developer</strong> and <strong className="text-purple-400">Data Enthusiast</strong> currently pursuing my <strong className="text-purple-400">MSc in Data Analytics</strong> at Christ University, Bengaluru. I completed my BCA from St. Joseph's University and have hands-on experience from my internship at <strong className="text-white">WspacesAI Labs</strong>, where I built web applications using Vite, TypeScript, and PHP that improved system efficiency by 30%.
                </p>

                <p>
                  I work primarily with the <strong className="text-purple-400">MERN stack</strong> and have built production-ready projects like a Petrol Bunk Management System and EduWorld platform. I'm skilled in <strong className="text-white">Python libraries for Data Science, AI, and ML</strong>, and I also develop <strong className="text-purple-400 mr-20">Android apps using Java & React Native.</strong> My expertise includes <strong className="text-white">PowerBI and Python visualization</strong> for creating compelling data insights.
                </p>

                <p>
                  I'm comfortable with Python, MySQL, AWS, Docker, and have experience in mobile development. My work focuses on optimizing performance—reducing API calls by 60% and cutting report generation time by 65%. Outside of coding, I've published research on deep learning, hold AWS certifications, and help mentor junior students in web development.
                </p>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  );
};

export default About;
