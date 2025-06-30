import { motion } from 'framer-motion';
import {
  Award,
  Code,
  Coffee,
  Heart,
  Palette,
  Smartphone,
  Users,
  Zap,
} from 'lucide-react';
import React from 'react';
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  fastStaggerContainer,
  staggerContainer,
} from '../utils/animations';

const About: React.FC = () => {
  const highlights = [
    {
      icon: Code,
      title: 'Clean Code',
      description:
        'Writing maintainable, scalable code with best practices and modern patterns',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description:
        'Creating intuitive and beautiful user interfaces that delight users',
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description:
        'Ensuring perfect experience across all devices and screen sizes',
    },
    {
      icon: Zap,
      title: 'Performance',
      description:
        'Optimizing for speed, accessibility, and exceptional user experience',
    },
  ];

  const achievements = [
    { icon: Award, number: '50+', label: 'Projects Completed' },
    { icon: Users, number: '30+', label: 'Happy Clients' },
    { icon: Coffee, number: '1000+', label: 'Cups of Coffee' },
    { icon: Heart, number: '100%', label: 'Passion for Code' },
  ];

  return (
    <motion.section
      id='about'
      className='relative min-h-screen overflow-hidden px-4 pb-16 pt-24'
      variants={staggerContainer}
      initial='initial'
      whileInView='animate'
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className='relative mx-auto max-w-7xl'>
        <motion.div
          className='mb-12 text-center sm:mb-16'
          variants={fadeInUp}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className='mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            whileHover={{
              scale: 1.02,
              textShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
            }}
          >
            About{' '}
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
              Me
            </motion.span>
          </motion.h1>
          <motion.div
            className='mx-auto mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 sm:mb-6 sm:w-24'
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeInOut', delay: 0.3 }}
            whileHover={{
              scaleY: 3,
              boxShadow: '0 0 20px rgba(147, 51, 234, 0.6)',
            }}
          />
          <motion.p
            className='mx-auto max-w-3xl px-2 text-lg leading-relaxed text-gray-300 sm:px-4 sm:text-xl'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{
              scale: 1.02,
              color: '#e5e7eb',
            }}
          >
            Passionate developer with a love for creating digital experiences
            that make a difference
          </motion.p>
        </motion.div>

        <div className='mb-16 grid items-start gap-8 sm:mb-20 sm:gap-12 lg:grid-cols-2 lg:gap-16'>
          <motion.div
            className='order-2 space-y-6 sm:space-y-8 lg:order-1'
            variants={fadeInLeft}
          >
            <motion.div variants={fadeInUp}>
              <motion.h2
                className='mb-4 text-2xl font-semibold text-white sm:mb-6 sm:text-3xl'
                variants={fadeInUp}
              >
                Crafting Digital Experiences
              </motion.h2>
              <motion.div
                className='space-y-4 text-base leading-relaxed text-gray-300 sm:space-y-6 sm:text-lg'
                variants={fastStaggerContainer}
                initial='initial'
                whileInView='animate'
                viewport={{ once: true }}
              >
                <motion.p variants={fadeInUp}>
                  With over 5 years of experience in front-end development, I
                  specialize in creating modern, responsive web applications
                  using React, TypeScript, and cutting-edge web technologies. My
                  journey began with a curiosity about how websites work, and it
                  has evolved into a passionate career dedicated to building
                  exceptional digital experiences.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  I believe that great software is not just about
                  functionality—it's about creating intuitive, accessible, and
                  delightful experiences for users. Every line of code I write
                  is crafted with attention to detail, performance optimization,
                  and user-centric design principles.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  When I'm not coding, you'll find me exploring new
                  technologies, contributing to open source projects, mentoring
                  junior developers, or sharing knowledge with the developer
                  community. I'm a firm believer in continuous learning and
                  staying ahead of the ever-evolving web development landscape.
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.div
              className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                staggerChildren: 0.1,
                delayChildren: 0.3,
              }}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className='group rounded-xl border border-dark-600 bg-dark-800/30 p-3 text-center backdrop-blur-sm transition-all duration-300 hover:bg-gradient-to-br hover:from-primary-900/20 hover:to-accent-900/20 sm:p-4'
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'backOut',
                  }}
                  whileHover={{
                    scale: 1.08,
                    y: -8,
                    rotateY: 5,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className='mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-primary-500 sm:mb-3 sm:h-12 sm:w-12'
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                      boxShadow: '0 0 25px rgba(147, 51, 234, 0.6)',
                    }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  >
                    <achievement.icon
                      size={20}
                      className='text-white sm:h-6 sm:w-6'
                    />
                  </motion.div>
                  <motion.div
                    className='mb-1 text-xl font-bold text-accent-400 sm:text-2xl'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                    whileHover={{
                      scale: 1.1,
                      textShadow: '0 0 15px rgba(251, 191, 36, 0.8)',
                    }}
                  >
                    {achievement.number}
                  </motion.div>
                  <motion.div
                    className='text-xs text-gray-400 sm:text-sm'
                    whileHover={{ color: '#d1d5db' }}
                    transition={{ duration: 0.2 }}
                  >
                    {achievement.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className='relative order-1 lg:order-2'
            variants={fadeInRight}
            initial='initial'
            whileInView='animate'
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className='flex aspect-square items-center justify-center rounded-2xl border border-dark-600 bg-gradient-to-br from-accent-600/20 via-primary-600/20 to-secondary-600/20 p-6 backdrop-blur-sm sm:rounded-3xl sm:p-8'
              whileHover={{
                scale: 1.05,
                rotateY: 8,
                rotateX: 5,
                boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className='text-center'>
                <motion.div
                  className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 via-primary-500 to-secondary-500 shadow-2xl sm:mb-8 sm:h-32 sm:w-32 lg:h-40 lg:w-40'
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    y: {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                    scale: {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotateY: 180,
                    boxShadow: '0 0 40px rgba(147, 51, 234, 0.7)',
                    transition: {
                      scale: { duration: 0.3 },
                      rotateY: { duration: 0.8 },
                      boxShadow: { duration: 0.3 },
                    },
                  }}
                >
                  <motion.div
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Code
                      size={48}
                      className='text-white sm:h-16 sm:w-16 lg:h-20 lg:w-20'
                    />
                  </motion.div>
                </motion.div>
                <motion.h3
                  className='mb-3 text-xl font-semibold text-white sm:mb-4 sm:text-2xl'
                  whileHover={{
                    scale: 1.05,
                    textShadow: '0 0 20px rgba(255,255,255,0.5)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Always Learning
                </motion.h3>
                <motion.p
                  className='text-base text-gray-300 sm:text-lg'
                  whileHover={{
                    color: '#e5e7eb',
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Staying current with the latest technologies and best
                  practices in web development
                </motion.p>
              </div>
            </motion.div>

            {/* Enhanced Floating elements */}
            <motion.div
              className='absolute -right-4 -top-4 hidden h-16 w-16 rounded-full bg-purple-500/20 blur-xl sm:-right-6 sm:-top-6 sm:block sm:h-24 sm:w-24'
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className='absolute -bottom-4 -left-4 hidden h-20 w-20 rounded-full bg-cyan-500/20 blur-xl sm:-bottom-6 sm:-left-6 sm:block sm:h-32 sm:w-32'
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
            <motion.div
              className='absolute left-1/2 top-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-yellow-500/10 blur-lg sm:block sm:h-16 sm:w-16'
              animate={{
                scale: [0.8, 1.1, 0.8],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </motion.div>
        </div>

        <motion.div
          variants={fadeInUp}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className='mb-8 text-center text-2xl font-semibold text-white sm:mb-12 sm:text-3xl'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{
              scale: 1.02,
              textShadow: '0 0 20px rgba(255,255,255,0.4)',
            }}
          >
            What I Bring to the Table
          </motion.h2>
          <motion.div
            className='grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              staggerChildren: 0.15,
              delayChildren: 0.3,
            }}
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className='group'
                initial={{
                  opacity: 0,
                  y: 60,
                  scale: 0.8,
                  rotateX: 45,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: 'backOut',
                }}
                whileHover={{
                  y: -15,
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className='transform rounded-2xl border border-dark-600 bg-dark-800/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-accent-500/50 hover:bg-gradient-to-br hover:from-accent-900/20 hover:to-primary-900/20 hover:shadow-2xl sm:p-8'
                  whileHover={{
                    boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                    borderColor: 'rgba(147, 51, 234, 0.7)',
                    background:
                      'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(6, 182, 212, 0.1))',
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 via-primary-500 to-secondary-500 shadow-lg transition-transform duration-300 group-hover:scale-110 sm:mb-6 sm:h-20 sm:w-20'
                    whileHover={{
                      rotate: 360,
                      scale: 1.3,
                      boxShadow: '0 0 30px rgba(147, 51, 234, 0.8)',
                    }}
                    transition={{
                      rotate: { duration: 0.8, ease: 'easeInOut' },
                      scale: { duration: 0.3 },
                      boxShadow: { duration: 0.3 },
                    }}
                  >
                    <highlight.icon
                      size={32}
                      className='text-white sm:h-10 sm:w-10'
                    />
                  </motion.div>
                  <motion.h3
                    className='mb-3 text-lg font-semibold text-white sm:mb-4 sm:text-xl'
                    whileHover={{
                      scale: 1.05,
                      textShadow: '0 0 15px rgba(255,255,255,0.6)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {highlight.title}
                  </motion.h3>
                  <motion.p
                    className='text-sm leading-relaxed text-gray-400 sm:text-base'
                    whileHover={{
                      color: '#d1d5db',
                      scale: 1.02,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {highlight.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
