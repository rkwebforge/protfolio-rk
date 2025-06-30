import { motion } from 'framer-motion';
import debounce from 'lodash.debounce';
import {
  Calendar,
  Clock,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Twitter,
} from 'lucide-react';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  buttonHover,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  scaleIn,
  staggerContainer,
} from '../utils/animations';
import CustomSelect from './CustomSelect';
import Notification, { NotificationType } from './Notification';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
  timeline: string;
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    isVisible: boolean;
    type: NotificationType;
    title: string;
    message?: string;
  }>({
    isVisible: false,
    type: 'success',
    title: '',
    message: '',
  });
  const [debouncedSubjectCount, setDebouncedSubjectCount] = useState(0);
  const [debouncedMessageCount, setDebouncedMessageCount] = useState(0);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      budget: '',
      timeline: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = useCallback(
    async data => {
      setIsSubmitting(true);

      // Hide any existing notifications
      setNotification(prev => ({ ...prev, isVisible: false }));

      try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Form submitted:', data);

        // Reset form and show success notification
        reset();
        setNotification({
          isVisible: true,
          type: 'success',
          title: 'Message Sent Successfully! 🎉',
          message:
            "Thank you for reaching out! I'll review your message and get back to you within 24 hours.",
        });
      } catch (error) {
        console.error('Form submission error:', error);
        setNotification({
          isVisible: true,
          type: 'error',
          title: 'Oops! Something went wrong 😔',
          message:
            'Unable to send your message right now. Please try again later or reach out to me directly via email.',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [reset, setNotification]
  );

  // Optimized debounced functions with different delays for better UX
  const debouncedSubjectUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSubjectCount(value.length);
      }, 200), // Shorter delay for subject (shorter field)
    []
  );

  const debouncedMessageUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedMessageCount(value.length);
      }, 300), // Longer delay for message (longer field)
    []
  );

  // Function to close notification
  const closeNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  }, []);

  // Watch form values for debounced updates
  useEffect(() => {
    const subscription = watch(value => {
      if (value.subject !== undefined) {
        debouncedSubjectUpdate(value.subject || '');
      }
      if (value.message !== undefined) {
        debouncedMessageUpdate(value.message || '');
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedSubjectUpdate.cancel();
      debouncedMessageUpdate.cancel();
    };
  }, [watch, debouncedSubjectUpdate, debouncedMessageUpdate]);

  const contactInfo = useMemo(
    () => [
      {
        icon: Mail,
        title: 'Email',
        value: 'rk.prasad@email.com',
        link: 'mailto:rk.prasad@email.com',
        description: 'Send me an email anytime',
      },
      {
        icon: Phone,
        title: 'Phone',
        value: '+91 98765 43210',
        link: 'tel:+919876543210',
        description: 'Call me for urgent matters',
      },
      {
        icon: MapPin,
        title: 'Location',
        value: 'Bangalore, India',
        link: '#',
        description: 'Available for remote work',
      },
    ],
    []
  );

  const socialLinks = useMemo(
    () => [
      { icon: Github, url: '#', label: 'GitHub', color: 'hover:text-gray-300' },
      {
        icon: Linkedin,
        url: '#',
        label: 'LinkedIn',
        color: 'hover:text-blue-400',
      },
      {
        icon: Twitter,
        url: '#',
        label: 'Twitter',
        color: 'hover:text-cyan-400',
      },
    ],
    []
  );

  const budgetOptions = useMemo(
    () => [
      { value: 'under-5k', label: 'Under $5,000' },
      { value: '5k-10k', label: '$5,000 - $10,000' },
      { value: '10k-25k', label: '$10,000 - $25,000' },
      { value: '25k-50k', label: '$25,000 - $50,000' },
      { value: '50k-plus', label: '$50,000+' },
    ],
    []
  );

  const timelineOptions = useMemo(
    () => [
      { value: 'asap', label: 'ASAP' },
      { value: '1-2-weeks', label: '1-2 weeks' },
      { value: '1-month', label: '1 month' },
      { value: '2-3-months', label: '2-3 months' },
      { value: '3-plus-months', label: '3+ months' },
    ],
    []
  );

  // Character count calculations using debounced values for display
  const subjectCharCount = `${debouncedSubjectCount}/100 characters`;
  const messageCharCount = `${debouncedMessageCount}/1000 characters`;

  // Form validation using react-hook-form isValid
  const isFormValid = isValid;

  // Memoized animation variants to prevent recreation on each render
  const titleAnimation = useMemo(
    () => ({
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as const },
      whileHover: {
        scale: 1.02,
        textShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
      },
    }),
    []
  );

  const dividerAnimation = useMemo(
    () => ({
      initial: { scaleX: 0 },
      animate: { scaleX: 1 },
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
        delay: 0.3,
      },
      whileHover: {
        scaleY: 3,
        boxShadow: '0 0 20px rgba(147, 51, 234, 0.6)',
      },
    }),
    []
  );

  const descriptionAnimation = useMemo(
    () => ({
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay: 0.5 },
      whileHover: {
        scale: 1.02,
        color: '#e5e7eb',
      },
    }),
    []
  );

  return (
    <motion.section
      className='min-h-screen bg-gradient-to-br from-dark-900/30 via-dark-800/50 to-dark-900/30 px-4 pb-16 pt-24'
      variants={staggerContainer}
      initial='initial'
      whileInView='animate'
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className='mx-auto max-w-7xl'>
        <motion.div
          className='mb-12 text-center sm:mb-16'
          variants={fadeInUp}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className='mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl'
            initial={titleAnimation.initial}
            whileInView={titleAnimation.animate}
            transition={titleAnimation.transition}
            whileHover={titleAnimation.whileHover}
            viewport={{ once: true }}
          >
            Get In{' '}
            <motion.span
              className='bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Touch
            </motion.span>
          </motion.h1>
          <motion.div
            className='mx-auto mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 sm:mb-6 sm:w-24'
            initial={dividerAnimation.initial}
            whileInView={dividerAnimation.animate}
            transition={dividerAnimation.transition}
            whileHover={dividerAnimation.whileHover}
            viewport={{ once: true }}
          />
          <motion.p
            className='mx-auto max-w-3xl px-2 text-lg leading-relaxed text-gray-300 sm:px-4 sm:text-xl'
            initial={descriptionAnimation.initial}
            whileInView={descriptionAnimation.animate}
            transition={descriptionAnimation.transition}
            whileHover={descriptionAnimation.whileHover}
            viewport={{ once: true }}
          >
            I'm always excited to discuss new opportunities, interesting
            projects, or just have a great conversation about technology and
            innovation.
          </motion.p>
        </motion.div>
        <div className='grid gap-12 lg:grid-cols-5'>
          {/* Contact Information */}
          <motion.div className='space-y-8 lg:col-span-2' variants={fadeInLeft}>
            <motion.div variants={fadeInUp}>
              <h2 className='mb-6 text-3xl font-semibold text-white'>
                Let's Connect
              </h2>
              <p className='mb-8 text-lg leading-relaxed text-gray-300'>
                Whether you have a project in mind, want to collaborate, or just
                want to say hello, I'd love to hear from you. Let's create
                something amazing together!
              </p>
            </motion.div>

            <motion.div className='space-y-6' variants={staggerContainer}>
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  className='group flex transform items-start space-x-4 rounded-2xl border border-dark-600 bg-dark-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent-500/50 hover:bg-gradient-to-br hover:from-primary-900/20 hover:to-accent-900/20'
                  variants={scaleIn}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className='flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg transition-transform duration-300 group-hover:scale-110'
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <info.icon size={24} className='text-white' />
                  </motion.div>
                  <div className='min-w-0 flex-1'>
                    <h3 className='mb-1 truncate text-lg font-semibold text-white'>
                      {info.title}
                    </h3>
                    <p className='mb-1 truncate font-medium text-purple-400'>
                      {info.value}
                    </p>
                    <p className='line-clamp-2 text-sm text-gray-400'>
                      {info.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <motion.div className='pt-8' variants={fadeInUp}>
              <h3 className='mb-6 text-xl font-semibold text-white'>
                Follow Me
              </h3>
              <div className='flex space-x-4'>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className={`group flex h-14 w-14 transform items-center justify-center rounded-xl border border-dark-600 bg-dark-800/50 transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon
                      size={24}
                      className='text-gray-300 group-hover:text-current'
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              className='rounded-2xl border border-slate-700 bg-gradient-to-br from-purple-600/10 to-cyan-600/10 p-6'
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
            >
              <div className='mb-4 flex items-center space-x-3'>
                <MessageCircle size={24} className='text-purple-400' />
                <h3 className='text-lg font-semibold text-white'>
                  Quick Response
                </h3>
              </div>
              <p className='text-sm leading-relaxed text-gray-300'>
                I typically respond to emails within 24 hours. For urgent
                matters, feel free to call me directly.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className='lg:col-span-3' variants={fadeInRight}>
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-6'
              variants={staggerContainer}
            >
              <motion.div
                className='grid gap-6 md:grid-cols-2'
                variants={fadeInUp}
              >
                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor='name'
                    className='mb-2 block text-sm font-medium text-gray-300'
                  >
                    Full Name *
                  </label>
                  <Controller
                    name='name'
                    control={control}
                    rules={{
                      required: 'Full name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                      maxLength: {
                        value: 50,
                        message: 'Name must be less than 50 characters',
                      },
                    }}
                    render={({ field }) => (
                      <motion.input
                        {...field}
                        type='text'
                        id='name'
                        className={`w-full rounded-xl border ${
                          errors.name ? 'border-red-500' : 'border-dark-600'
                        } bg-dark-800/50 px-4 py-4 text-white placeholder-gray-400 transition-all duration-300 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500`}
                        placeholder='Your full name'
                        whileFocus={{ scale: 1.02 }}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className='mt-1 text-sm text-red-400'>
                      {errors.name.message}
                    </p>
                  )}
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor='email'
                    className='mb-2 block text-sm font-medium text-gray-300'
                  >
                    Email Address *
                  </label>
                  <Controller
                    name='email'
                    control={control}
                    rules={{
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                      maxLength: {
                        value: 100,
                        message: 'Email must be less than 100 characters',
                      },
                    }}
                    render={({ field }) => (
                      <motion.input
                        {...field}
                        type='email'
                        id='email'
                        className={`w-full rounded-xl border ${
                          errors.email ? 'border-red-500' : 'border-dark-600'
                        } bg-dark-800/50 px-4 py-4 text-white placeholder-gray-400 transition-all duration-300 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500`}
                        placeholder='your.email@example.com'
                        whileFocus={{ scale: 1.02 }}
                      />
                    )}
                  />
                  {errors.email && (
                    <p className='mt-1 text-sm text-red-400'>
                      {errors.email.message}
                    </p>
                  )}
                </motion.div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label
                  htmlFor='subject'
                  className='mb-2 block text-sm font-medium text-gray-300'
                >
                  Subject *
                </label>
                <Controller
                  name='subject'
                  control={control}
                  rules={{
                    required: 'Subject is required',
                    minLength: {
                      value: 3,
                      message: 'Subject must be at least 3 characters',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Subject must be less than 100 characters',
                    },
                  }}
                  render={({ field }) => (
                    <motion.input
                      {...field}
                      type='text'
                      id='subject'
                      className={`w-full rounded-xl border ${
                        errors.subject ? 'border-red-500' : 'border-dark-600'
                      } bg-dark-800/50 px-4 py-4 text-white placeholder-gray-400 transition-all duration-300 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500`}
                      placeholder="What's this about?"
                      whileFocus={{ scale: 1.02 }}
                    />
                  )}
                />
                {errors.subject && (
                  <p className='mt-1 text-sm text-red-400'>
                    {errors.subject.message}
                  </p>
                )}
                <div className='mt-1 text-xs text-gray-400'>
                  {subjectCharCount}
                </div>
              </motion.div>

              <motion.div
                className='grid gap-6 md:grid-cols-2'
                variants={fadeInUp}
              >
                <motion.div variants={fadeInUp}>
                  <Controller
                    name='budget'
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        label='Project Budget'
                        icon={<Calendar size={16} />}
                        options={budgetOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Select budget range'
                        maxDisplayLength={20}
                      />
                    )}
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Controller
                    name='timeline'
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        label='Timeline'
                        icon={<Clock size={16} />}
                        options={timelineOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder='Select timeline'
                        maxDisplayLength={20}
                      />
                    )}
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label
                  htmlFor='message'
                  className='mb-2 block text-sm font-medium text-gray-300'
                >
                  Message *
                </label>
                <Controller
                  name='message'
                  control={control}
                  rules={{
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters',
                    },
                    maxLength: {
                      value: 1000,
                      message: 'Message must be less than 1000 characters',
                    },
                  }}
                  render={({ field }) => (
                    <motion.textarea
                      {...field}
                      id='message'
                      rows={6}
                      className={`w-full resize-none rounded-xl border ${
                        errors.message ? 'border-red-500' : 'border-dark-600'
                      } bg-dark-800/50 px-4 py-4 text-white placeholder-gray-400 transition-all duration-300 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500`}
                      placeholder='Tell me about your project, goals, and how I can help you achieve them...'
                      whileFocus={{ scale: 1.02 }}
                    />
                  )}
                />
                {errors.message && (
                  <p className='mt-1 text-sm text-red-400'>
                    {errors.message.message}
                  </p>
                )}
                <div className='mt-1 text-xs text-gray-400'>
                  {messageCharCount}
                </div>
              </motion.div>

              <motion.button
                type='submit'
                disabled={isSubmitting || !isFormValid}
                className={`flex w-full items-center justify-center space-x-2 rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 ${
                  isFormValid && !isSubmitting
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl'
                    : 'cursor-not-allowed bg-gradient-to-r from-gray-600 to-gray-700'
                }`}
                variants={buttonHover}
                whileHover={isFormValid && !isSubmitting ? 'hover' : {}}
                whileTap={isFormValid && !isSubmitting ? 'tap' : {}}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className='h-5 w-5 rounded-full border-b-2 border-white'
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    ></motion.div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Notification Component */}
      <Notification
        type={notification.type}
        title={notification.title}
        {...(notification.message && { message: notification.message })}
        isVisible={notification.isVisible}
        onClose={closeNotification}
        autoClose={true}
        duration={5000}
      />
    </motion.section>
  );
};

export default memo(Contact);
