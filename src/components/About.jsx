// src/components/About.jsx
import { useRef } from 'react';
import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { BsChatDots } from 'react-icons/bs';
import { HiOutlineDocumentDownload } from 'react-icons/hi';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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

  const staggeredCards = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'scale(1)' : 'scale(0.9)',
    config: { tension: 280, friction: 60 },
    delay: 400,
  });

  return (
    <section id="about" className="py-6 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <animated.div style={fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-purple-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
        </animated.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Image Card - Circular */}
          <animated.div style={fadeInLeft} className="lg:col-span-1 flex justify-center items-start">
            <div className="liquid-glass-card relative rounded-full overflow-hidden w-80 h-80">
              <img
                src="src/assets/purple design bg.jpg"
                alt="Darshan Gowda"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-600/10 to-transparent"></div>
            </div>
          </animated.div>

          {/* Bio and Description */}
          <animated.div style={fadeInRight} className="lg:col-span-2 space-y-6">
            <div className="liquid-glass-card p-8 rounded-3xl">
              <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                <p>
                  I'm a <strong className="text-white">full-stack developer</strong> currently pursuing my <strong className="text-purple-400">MSc in Data Analytics</strong> at Christ University, Bengaluru. I completed my BCA from St. Joseph's University and have hands-on experience from my internship at <strong className="text-white">WspacesAI Labs</strong>, where I built web applications using Vite, TypeScript, and PHP that improved system efficiency by 30%.
                </p>

                <p>
  I work primarily with the <strong className="text-purple-400">MERN stack</strong> and have built production-ready projects like a Petrol Bunk Management System and EduWorld platform. I'm comfortable with Python, MySQL, AWS, Docker, and Android development. My work focuses on optimizing performance—reducing API calls by 60% and cutting report generation time by 65%.
</p>


                <p>
                  Outside of coding, I've published research on deep learning, hold AWS certifications, and help mentor junior students in web development.
                </p>
              </div>
            </div>
          </animated.div>
        </div>

        {/* CTA Buttons */}
        <animated.div style={staggeredCards} className="flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="liquid-glass-primary group relative overflow-hidden px-8 py-4 rounded-full text-white font-medium transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center gap-2"
          >
            <span className="relative z-10">View My Work</span>
            <HiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="liquid-glass-secondary px-8 py-4 rounded-full text-white font-medium transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center gap-2"
          >
            <BsChatDots className="text-xl" />
            <span>Let's Talk</span>
          </a>

          <a
            href="/path-to-your-resume.pdf"
            download
            className="liquid-glass-card px-8 py-4 rounded-full text-white font-medium transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center gap-2 border border-purple-500/30"
          >
            <HiOutlineDocumentDownload className="text-xl" />
            <span>Download Resume</span>
          </a>
        </animated.div>
      </div>
    </section>
  );
};

export default About;
