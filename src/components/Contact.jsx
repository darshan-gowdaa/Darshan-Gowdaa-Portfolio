// src/components/Contact.jsx
import React, { memo, useState, useRef, useCallback, useMemo } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaCopy, FaArrowRight, FaExclamationCircle } from 'react-icons/fa';

const ContactItem = memo(({ icon, title, value, link, linkText, copyable, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [onCopy]);

  return (
    <div className="mb-6 sm:mb-8 flex gap-3 sm:gap-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg font-medium mb-1">{title}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {link ? (
            <a href={link} className="text-gray-300 hover:text-purple-400 transition-colors break-all text-sm sm:text-base">
              {linkText || value}
            </a>
          ) : (
            <p className="text-gray-300 break-all text-sm sm:text-base">{value}</p>
          )}
          {copyable && (
            <button
              onClick={handleCopy}
              className={`p-1.5 sm:p-2 rounded-lg transition-all touch-manipulation ${
                copied ? 'bg-green-600/20 text-green-400' : 'bg-gray-800/50 hover:bg-purple-600/20 text-gray-400 hover:text-purple-400'
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
});

ContactItem.displayName = 'ContactItem';

const InputField = memo(({ label, name, type = "text", placeholder, value, onChange, onBlur, isTextarea, error, touched, maxLength, showCharCount }) => {
  const charCount = value?.length || 0;
  const isError = touched && error;
  const inputClass = `w-full p-2.5 sm:p-3 bg-gray-800/50 border ${isError ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-purple-500'} rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all text-white placeholder-gray-500 text-sm sm:text-base ${isTextarea ? 'resize-none' : ''}`;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">
        {label} {maxLength && showCharCount && (
          <span className={`text-xs ${charCount > maxLength ? 'text-red-400' : 'text-gray-500'}`}>
            ({charCount}/{maxLength})
          </span>
        )}
      </label>
      {isTextarea ? (
        <textarea id={name} name={name} rows="4" value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} maxLength={maxLength} className={inputClass} aria-invalid={isError} aria-describedby={isError ? `${name}-error` : undefined} required />
      ) : (
        <input type={type} id={name} name={name} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder} maxLength={maxLength} className={inputClass} aria-invalid={isError} aria-describedby={isError ? `${name}-error` : undefined} required />
      )}
      {isError && (
        <p id={`${name}-error`} className="mt-2 text-xs sm:text-sm text-red-400 flex items-center gap-1" role="alert">
          <FaExclamationCircle /> {error}
        </p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const validateField = useCallback((name, value) => {
    const validations = {
      name: { min: 2, max: 50, required: 'Name is required', minMsg: 'Name must be at least 2 characters', maxMsg: 'Name must not exceed 50 characters' },
      email: { required: 'Email is required', invalidMsg: 'Please enter a valid email address' },
      subject: { min: 3, max: 100, required: 'Subject is required', minMsg: 'Subject must be at least 3 characters', maxMsg: 'Subject must not exceed 100 characters' },
      message: { min: 10, max: 1000, required: 'Message is required', minMsg: 'Message must be at least 10 characters', maxMsg: 'Message must not exceed 1000 characters' }
    };

    const val = validations[name];
    if (!val) return '';
    const trimmed = value.trim();

    if (!trimmed) return val.required;
    if (name === 'email' && !emailRegex.test(value)) return val.invalidMsg;
    if (val.min && trimmed.length < val.min) return val.minMsg;
    if (val.max && trimmed.length > val.max) return val.maxMsg;
    return '';
  }, [emailRegex]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  }, [touched, validateField]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  }, [validateField]);

  const validateForm = useCallback(() => {
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validateField(key, formData[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});
    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setTouched({});
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm]);

  const copyEmailToClipboard = useCallback(() => {
    navigator.clipboard.writeText('darshangowdaa223@gmail.com').catch((err) => console.error('Failed to copy email:', err));
  }, []);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const animations = useMemo(() => ({
    title: { opacity: isInView ? 1 : 0, transform: isInView ? 'translate3d(0,0,0)' : 'translate3d(0,20px,0)', config: { tension: 280, friction: 25 } },
    leftCol: { opacity: isInView ? 1 : 0, transform: isInView ? 'translate3d(0,0,0)' : 'translate3d(-30px,0,0)', config: { tension: 280, friction: 25 }, delay: 100 },
    rightCol: { opacity: isInView ? 1 : 0, transform: isInView ? 'translate3d(0,0,0)' : 'translate3d(30px,0,0)', config: { tension: 280, friction: 25 }, delay: 150 },
    button: { opacity: isInView ? 1 : 0, transform: isInView ? 'translate3d(0,0,0)' : 'translate3d(0,20px,0)', config: { tension: 280, friction: 25 }, delay: 200 },
    submit: { scale: isSubmitting ? 0.98 : 1, config: { tension: 400, friction: 20 } }
  }), [isInView, isSubmitting]);

  const titleAnimation = useSpring(animations.title);
  const leftColAnimation = useSpring(animations.leftCol);
  const rightColAnimation = useSpring(animations.rightCol);
  const buttonAnimation = useSpring(animations.button);
  const submitButtonAnimation = useSpring(animations.submit);

  const contactInfo = useMemo(() => [
    { icon: <FaMapMarkerAlt />, title: "Location", value: "Bengaluru, Karnataka, India" },
    { icon: <FaEnvelope />, title: "Email", value: "darshangowdaa223@gmail.com", link: "mailto:darshangowdaa223@gmail.com", copyable: true, onCopy: copyEmailToClipboard }
  ], [copyEmailToClipboard]);

  const socialLinks = useMemo(() => [
    { href: "https://github.com/darshan-gowdaa", icon: <FaGithub size={20} />, label: "GitHub" },
    { href: "https://www.linkedin.com/in/Darshan-Gowda-G-S", icon: <FaLinkedin size={20} />, label: "LinkedIn" }
  ], []);

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-900/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <animated.div style={titleAnimation} className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Get In Touch</h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </animated.div>

        <div className="grid md:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          <animated.div style={leftColAnimation} className="md:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 inline-block relative">
              Contact Information
              <span className="absolute -bottom-2 left-0 w-10 sm:w-12 h-1 bg-purple-500"></span>
            </h3>

            {contactInfo.map((item, idx) => <ContactItem key={idx} {...item} />)}

            <div className="mt-8 sm:mt-10">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Connect with me</h3>
              <animated.div style={buttonAnimation} className="flex gap-3 sm:gap-4">
                {socialLinks.map(({ href, icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="liquid-glass-icon w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:scale-110 active:scale-95 transition-all group relative touch-manipulation" aria-label={`Visit ${label} profile`}>
                    {icon}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {label}
                    </span>
                  </a>
                ))}
              </animated.div>
            </div>
          </animated.div>

          <animated.div style={rightColAnimation} className="md:col-span-3">
            <div className="liquid-glass-card p-5 sm:p-6 md:p-8 rounded-xl transition-all shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send a Message</h3>

              {submitStatus === 'success' && (
                <div className="mb-4 p-3 sm:p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm sm:text-base">
                  Your message has been sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-4 p-3 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm sm:text-base">
                  Failed to send message. Please try again later.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="Name" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} touched={touched.name} maxLength={50} />
                  <InputField label="Email" name="email" type="email" placeholder="example@mail.com" value={formData.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} touched={touched.email} />
                </div>

                <InputField label="Subject" name="subject" placeholder="What is this regarding?" value={formData.subject} onChange={handleChange} onBlur={handleBlur} error={errors.subject} touched={touched.subject} maxLength={100} />
                <InputField label="Message" name="message" placeholder="Tell me about your project, question, or just say hi..." value={formData.message} onChange={handleChange} onBlur={handleBlur} error={errors.message} touched={touched.message} isTextarea maxLength={1000} showCharCount />

                <animated.button
                  style={submitButtonAnimation}
                  type="submit"
                  disabled={isSubmitting}
                  className={`liquid-glass-primary w-full px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/30 active:scale-95'
                  }`}
                  aria-label={isSubmitting ? 'Sending message' : 'Send message'}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaArrowRight />
                    </>
                  )}
                </animated.button>

                <div className="mt-3 sm:mt-4 flex gap-1.5 sm:gap-2">
                  {['name', 'email', 'subject', 'message'].map((field) => (
                    <div key={field} className={`h-1 w-full rounded-full transition-all duration-300 ${formData[field] && !errors[field] ? 'bg-purple-500' : formData[field] && errors[field] ? 'bg-red-500' : 'bg-gray-700'}`} aria-label={`${field} field status`} />
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

export default memo(Contact);
