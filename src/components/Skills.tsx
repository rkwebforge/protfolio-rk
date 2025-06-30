import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  scaleIn,
  staggerContainer,
} from '../utils/animations';
import { optimizedViewport } from '../utils/performance';

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, optimizedViewport);

  const skills = [
    {
      name: 'React',
      level: 95,
      color: 'from-blue-400 to-blue-600',
      category: 'Frontend',
    },
    {
      name: 'TypeScript',
      level: 90,
      color: 'from-blue-600 to-indigo-600',
      category: 'Language',
    },
    {
      name: 'JavaScript',
      level: 95,
      color: 'from-yellow-400 to-orange-500',
      category: 'Language',
    },
    {
      name: 'HTML/CSS',
      level: 98,
      color: 'from-orange-400 to-red-500',
      category: 'Frontend',
    },
    {
      name: 'Tailwind CSS',
      level: 92,
      color: 'from-cyan-400 to-blue-500',
      category: 'Styling',
    },
    {
      name: 'Next.js',
      level: 88,
      color: 'from-gray-400 to-gray-600',
      category: 'Framework',
    },
    {
      name: 'Node.js',
      level: 85,
      color: 'from-green-400 to-green-600',
      category: 'Backend',
    },
    {
      name: 'Git',
      level: 90,
      color: 'from-orange-500 to-red-600',
      category: 'Tools',
    },
  ];

  const tools = [
    { name: 'VS Code', category: 'Editor' },
    { name: 'Figma', category: 'Design' },
    { name: 'Adobe XD', category: 'Design' },
    { name: 'Postman', category: 'API' },
    { name: 'Chrome DevTools', category: 'Debug' },
    { name: 'Webpack', category: 'Build' },
    { name: 'Vite', category: 'Build' },
    { name: 'ESLint', category: 'Quality' },
  ];

  const learningTech = [
    { name: 'Three.js', progress: 60 },
    { name: 'GraphQL', progress: 45 },
    { name: 'Rust', progress: 30 },
    { name: 'Web3', progress: 25 },
  ];

  return (
    <motion.section
      id='skills'
      className='min-h-screen bg-gradient-to-br from-dark-900/30 via-dark-800/50 to-dark-900/30 px-4 pb-16 pt-24'
      ref={sectionRef}
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            whileHover={{
              scale: 1.02,
              textShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
            }}
          >
            Skills &{' '}
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
              Expertise
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
            Here are the technologies and tools I use to bring ideas to life and
            create exceptional digital experiences
          </motion.p>
        </motion.div>
        <div className='mb-16 grid gap-16 lg:grid-cols-2'>
          {/* Technical Skills */}
          <motion.div variants={fadeInLeft}>
            <h2 className='mb-10 flex items-center text-3xl font-semibold text-white'>
              <motion.div
                className='mr-3 h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500'
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              ></motion.div>
              Technical Skills
            </h2>
            <motion.div className='space-y-8' variants={staggerContainer}>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className='group'
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className='mb-3 flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                      <span className='text-lg font-semibold text-white'>
                        {skill.name}
                      </span>
                      <motion.span
                        className='rounded-full border border-dark-600 bg-dark-700 px-2 py-1 text-xs font-medium text-gray-300'
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {skill.category}
                      </motion.span>
                    </div>
                    <span className='font-medium text-gray-400'>
                      {skill.level}%
                    </span>
                  </div>
                  <div className='h-4 w-full overflow-hidden rounded-full border border-dark-600 bg-dark-700/50 shadow-inner'>
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skill.color} origin-left rounded-full shadow-lg`}
                      initial={{ width: 0 }}
                      animate={
                        isInView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{
                        duration: 1,
                        delay: index * 0.1,
                        ease: 'easeOut',
                      }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Tools & Software */}
          <motion.div variants={fadeInRight}>
            <h2 className='mb-10 flex items-center text-3xl font-semibold text-white'>
              <motion.div
                className='mr-3 h-8 w-8 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500'
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              ></motion.div>
              Tools & Software
            </h2>
            <motion.div
              className='mb-8 grid grid-cols-2 gap-4'
              variants={staggerContainer}
            >
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  className='group transform rounded-xl border border-dark-600 bg-dark-800/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-accent-500/50 hover:bg-gradient-to-br hover:from-primary-900/20 hover:to-accent-900/20 hover:shadow-xl'
                  variants={scaleIn}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    boxShadow:
                      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className='mb-2 font-semibold text-white'>
                    {tool.name}
                  </div>
                  <div className='text-sm text-gray-400'>{tool.category}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className='rounded-2xl border border-slate-700 bg-gradient-to-br from-purple-600/10 to-cyan-600/10 p-8'
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className='mb-6 flex items-center text-2xl font-semibold text-white'>
                <motion.div
                  className='mr-3 h-6 w-6 rounded bg-gradient-to-r from-pink-500 to-orange-500'
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                ></motion.div>
                Currently Learning
              </h3>
              <motion.div className='space-y-4' variants={staggerContainer}>
                {learningTech.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className='flex items-center justify-between'
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className='font-medium text-secondary-400'>
                      {tech.name}
                    </span>
                    <div className='flex items-center space-x-3'>
                      <div className='h-2 w-24 rounded-full border border-dark-600 bg-dark-700/50'>
                        <motion.div
                          className='h-full rounded-full bg-gradient-to-r from-accent-500 to-secondary-500'
                          initial={{ width: 0 }}
                          animate={
                            isInView
                              ? { width: `${tech.progress}%` }
                              : { width: 0 }
                          }
                          transition={{
                            duration: 1,
                            delay: (index + 8) * 0.1,
                            ease: 'easeOut',
                          }}
                        ></motion.div>
                      </div>
                      <span className='text-sm text-gray-400'>
                        {tech.progress}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
