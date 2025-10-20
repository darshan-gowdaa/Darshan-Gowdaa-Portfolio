// src/components/Certifications.jsx
import React, { memo, useMemo, useCallback, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'framer-motion';
import { SiAmazonwebservices, SiInfosys } from 'react-icons/si';

// Memoized CertificationCard component
const CertificationCard = memo(({ title, issuer, description, link, icon, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  // GPU-accelerated animation with translate3d
  const cardAnimation = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translate3d(0,0,0)' : 'translate3d(0,20px,0)',
    config: { tension: 280, friction: 25 },
    delay: 50 + delay,
  });

  // Memoized click handler
  const handleClick = useCallback(() => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  }, [link]);

  return (
    <animated.div
      ref={ref}
      style={cardAnimation}
      className="liquid-glass-card-enhanced p-4 sm:p-5 md:p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Icon container */}
        <div className="flex-shrink-0 text-xl sm:text-2xl mt-1" aria-hidden="true">
          {icon}
        </div>

        {/* Content container */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1.5 sm:mb-2 text-white break-words">
            {title}
          </h3>
          <p className="text-gray-300 text-sm sm:text-base mb-2 font-medium">
            {issuer}
          </p>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
            {description}
          </p>
          
          {link && (
            <button
              onClick={handleClick}
              className="liquid-glass-shine px-3 sm:px-4 py-2 rounded-full text-purple-100 hover:text-white text-xs sm:text-sm transition-all cursor-pointer inline-block touch-manipulation hover:scale-105 active:scale-95"
              aria-label={`View ${title} certificate`}
            >
              <span className="relative z-10 whitespace-nowrap">
                View Certificate →
              </span>
            </button>
          )}
        </div>
      </div>
    </animated.div>
  );
});

CertificationCard.displayName = 'CertificationCard';

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  // GPU-accelerated title animation
  const titleAnimation = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translate3d(0,0,0)' : 'translate3d(0,20px,0)',
    config: { tension: 280, friction: 25 }
  });

  // Memoized certifications data
  const certifications = useMemo(() => [
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
  ], []);

  return (
    <section 
      id="certifications" 
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-900/30" 
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        {/* Title section */}
        <animated.div 
          style={titleAnimation} 
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Certifications
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-4">
            Professional certifications that validate my expertise in cloud computing, cybersecurity, and data analytics.
          </p>
        </animated.div>

        {/* Responsive grid - optimized for all screen sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <CertificationCard 
              key={`cert-${index}-${cert.title.replace(/\s+/g, '-').toLowerCase()}`} 
              {...cert} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Certifications);
