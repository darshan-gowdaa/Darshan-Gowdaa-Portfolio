// src/components/Certifications.jsx
import React from 'react';
import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'framer-motion';
import { FaAward, FaCertificate } from 'react-icons/fa';
import { SiAmazonwebservices, SiInfosys } from 'react-icons/si';

const CertificationCard = ({ title, issuer, description, link, icon, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const cardAnimation = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    to: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(20px)'
    },
    config: { tension: 400, friction: 25 },
    delay: 50 + delay,
  });

  return (
    <animated.div
      ref={ref}
      style={cardAnimation}
      className="liquid-glass-card-enhanced p-6 rounded-xl transition-all duration-300"
    >
      <div className="flex items-start">
        <div className="mr-4 text-2xl text-purple-500">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2 text-white">{title}</h3>
          <p className="text-gray-300 mb-2">{issuer}</p>
          <p className="text-gray-300 text-sm mb-4">{description}</p>
          {link && (
            <button
              onClick={() => window.open(link, '_blank')}
              className="liquid-glass-shine px-4 py-2 rounded-full text-purple-100 hover:text-white text-xs md:text-sm transition-all cursor-pointer inline-block"
            >
              <span className="relative z-10 whitespace-nowrap">View Certificate →</span>
            </button>
          )}
        </div>
      </div>
    </animated.div>
  );
};

const Certifications = () => {
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
    config: { tension: 400, friction: 25 }
  });

  const certifications = [
    {
      title: "AWS Academy Graduate",
      issuer: "AWS Academy",
      description: "Introduction to Cloud & Cloud Foundations with hands-on experience with AWS services",
      link: "https://drive.google.com/drive/folders/1VSngU3XZfkpLdXzRRIWZLZrRpWLmHTQ6?usp=sharing",
      icon: <SiAmazonwebservices className="text-orange-500" />,
      delay: 0
    },
    {
      title: "Cybersecurity & Security Foundation",
      issuer: "Infosys Springboard",
      description: "Certification in cybersecurity awareness, security foundation concepts, security risks and key security concepts",
      link: "https://drive.google.com/drive/folders/1i2oZ1cNJpIdKR3BSpGi85pGLvRn5DR2l?usp=drive_link",
      icon: <SiInfosys className="text-blue-500" />,
      delay: 100
    }
  ];

  return (
    <section id="certifications" className="py-6 px-2 sm:px-4 mt-20 mb-50" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <animated.div style={titleAnimation} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            Professional certifications that validate my expertise in cloud computing, cybersecurity, and data analytics.
          </p>
        </animated.div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl">
            {certifications.map((cert, index) => (
              <CertificationCard key={index} {...cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;


