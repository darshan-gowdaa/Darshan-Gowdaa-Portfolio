// src/components/Contact.jsx
import { useState, useRef } from 'react';
import React from 'react'
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaCopy, FaArrowRight, FaExclamationCircle } from 'react-icons/fa';

const ContactItem = ({ icon, title, value, link, linkText, copyable, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-8 flex">
      <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 mr-4 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <div className="flex items-center gap-2">
          {link ? (
            <a href={link} className="text-gray-300 hover:text-purple-400 transition-colors break-all">
              {linkText || value}
            </a>
          ) : (
            <p className="text-gray-300 break-all">{value}</p>
          )}
          {copyable && (
            <button
              onClick={handleCopy}
              className={`p-2 rounded-lg transition-all ${
                copied 
                  ? 'bg-green-600/20 text-green-400' 
                  : 'bg-gray-800/50 hover:bg-purple-600/20 text-gray-400 hover:text-purple-400'
              }`}
              aria-label="Copy email to clipboard"
            >
              {copied ? <FaEnvelope size={14} /> : <FaCopy size={14} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, type = "text", placeholder, value, onChange, onBlur, isTextarea, error, touched, maxLength, showCharCount }) => {
  const charCount = value?.length || 0;
  const isError = touched && error;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-2">
        {label} {maxLength && showCharCount && (
          <span className={`text-xs ${charCount > maxLength ? 'text-red-400' : 'text-gray-500'}`}>
            ({charCount}/{maxLength})
          </span>
        )}
      </label>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          rows="4"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full p-3 bg-gray-800/50 border ${isError ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:ring-2 ${isError ? 'focus:ring-red-500' : 'focus:ring-purple-500'} focus:border-transparent outline-none transition-all text-white placeholder-gray-500 resize-none`}
          aria-invalid={isError}
          aria-describedby={isError ? `${name}-error` : undefined}
          required
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full p-3 bg-gray-800/50 border ${isError ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:ring-2 ${isError ? 'focus:ring-red-500' : 'focus:ring-purple-500'} focus:border-transparent outline-none transition-all text-white placeholder-gray-500`}
          aria-invalid={isError}
          aria-describedby={isError ? `${name}-error` : undefined}
          required
        />
      )}
      {isError && (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-400 flex items-center gap-1" role="alert">
          <FaExclamationCircle /> {error}
        </p>
      )}
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        } else if (value.trim().length > 50) {
          error = 'Name must not exceed 50 characters';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'subject':
        if (!value.trim()) {
          error = 'Subject is required';
        } else if (value.trim().length < 3) {
          error = 'Subject must be at least 3 characters';
        } else if (value.trim().length > 100) {
          error = 'Subject must not exceed 100 characters';
        }
        break;

      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters';
        } else if (value.trim().length > 1000) {
          error = 'Message must not exceed 1000 characters';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission - Replace with actual API call
      // Example with EmailJS:
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_PUBLIC_KEY');
      
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitStatus('success');
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setTouched({});

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('darshangowdaa223@gmail.com').catch((err) => {
      console.error('Failed to copy email:', err);
    });
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const titleAnimation = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 400, friction: 25 },
  });

  const leftColAnimation = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateX(0)' : 'translateX(-30px)',
    config: { tension: 400, friction: 25 },
    delay: 100,
  });

  const rightColAnimation = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateX(0)' : 'translateX(30px)',
    config: { tension: 400, friction: 25 },
    delay: 200,
  });

  const buttonAnimation = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 400, friction: 25 },
    delay: 300,
  });

  const submitButtonAnimation = useSpring({
    scale: isSubmitting ? 0.98 : 1,
    config: { tension: 400, friction: 20 },
  });

  return (
    <section id="contact" className="py-6 px-2 sm:px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <animated.div style={titleAnimation} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
        </animated.div>

        <div className="grid md:grid-cols-5 gap-6 lg:gap-8">
          <animated.div style={leftColAnimation} className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6 inline-block relative">
              Contact Information
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-purple-500"></span>
            </h3>

            <ContactItem
              icon={<FaMapMarkerAlt />}
              title="Location"
              value="Bengaluru, Karnataka, India"
            />

            <ContactItem
              icon={<FaEnvelope />}
              title="Email"
              value="darshangowdaa223@gmail.com"
              link="mailto:darshangowdaa223@gmail.com"
              copyable={true}
              onCopy={copyEmailToClipboard}
            />

            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Connect with me</h3>
              <animated.div style={buttonAnimation} className="flex space-x-4">
                <a
                  href="https://github.com/darshan-gowdaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass-icon w-12 h-12 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:scale-110 transition-all group relative"
                  aria-label="Visit GitHub profile"
                >
                  <FaGithub size={20} />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    GitHub
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/Darshan-Gowda-G-S"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass-icon w-12 h-12 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:scale-110 transition-all group relative"
                  aria-label="Visit LinkedIn profile"
                >
                  <FaLinkedin size={20} />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    LinkedIn
                  </span>
                </a>
              </animated.div>
            </div>
          </animated.div>

          <animated.div style={rightColAnimation} className="md:col-span-3">
            <div className="liquid-glass-card p-6 sm:p-8 rounded-xl transition-all shadow-lg contact-form">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

              {submitStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300">
                  Your message has been sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
                  Failed to send message. Please try again later.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-4">
                  <InputField
                    label="Name"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name}
                    touched={touched.name}
                    maxLength={50}
                  />

                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                  />
                </div>

                <InputField
                  label="Subject"
                  name="subject"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.subject}
                  touched={touched.subject}
                  maxLength={100}
                />

                <InputField
                  label="Message"
                  name="message"
                  placeholder="Tell me about your project, question, or just say hi..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.message}
                  touched={touched.message}
                  isTextarea
                  maxLength={1000}
                  showCharCount
                />

                <animated.button
                  style={submitButtonAnimation}
                  type="submit"
                  disabled={isSubmitting}
                  className={`liquid-glass-primary w-full px-8 py-3 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/30'
                  }`}
                  aria-label={isSubmitting ? 'Sending message' : 'Send message'}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaArrowRight />
                    </>
                  )}
                </animated.button>

                <div className="mt-4 flex justify-center gap-2">
                  {['name', 'email', 'subject', 'message'].map((field) => (
                    <div
                      key={field}
                      className={`h-1 w-full rounded-full transition-all duration-300 ${
                        formData[field] && !errors[field]
                          ? 'bg-purple-500'
                          : formData[field] && errors[field]
                          ? 'bg-red-500'
                          : 'bg-gray-700'
                      }`}
                      aria-label={`${field} field status`}
                    />
                  ))}
                </div>
              </form>
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
