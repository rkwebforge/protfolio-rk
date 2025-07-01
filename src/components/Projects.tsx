import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  Github,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  buttonHover,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from "../utils/animations";

const Projects: React.FC = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [direction, setDirection] = useState(0);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce platform built with React, TypeScript, and Stripe integration. Features include product catalog, shopping cart, user authentication, and payment processing with real-time inventory management.",
      image:
        "https://images.pexels.com/photos/3584996/pexels-photo-3584996.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Stripe",
        "Node.js",
        "MongoDB",
      ],
      category: "Full Stack",
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, team collaboration features, and advanced project analytics dashboard.",
      image:
        "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: [
        "React",
        "Firebase",
        "Material-UI",
        "Framer Motion",
        "WebSocket",
      ],
      category: "Frontend",
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "A beautiful weather dashboard with location-based forecasts, interactive maps, detailed weather analytics, and personalized weather alerts system.",
      image:
        "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "OpenWeather API", "Chart.js", "CSS Grid", "PWA"],
      category: "Frontend",
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "A responsive portfolio website showcasing modern web design principles, smooth animations, and optimized performance with advanced SEO features.",
      image:
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Vite",
      ],
      category: "Frontend",
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 5,
      title: "Social Media Dashboard",
      description:
        "A comprehensive social media management dashboard with analytics, post scheduling, and multi-platform integration for content creators.",
      image:
        "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: [
        "Next.js",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "TailwindCSS",
      ],
      category: "Full Stack",
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 6,
      title: "Learning Management System",
      description:
        "An interactive learning platform with course management, progress tracking, video streaming, and collaborative learning features.",
      image:
        "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
      category: "Full Stack",
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ];

  const categories = ["All", "Frontend", "Full Stack"];
  const featuredProjects = projects.filter((project) => project.featured);

  // Ensure currentProject is within bounds
  useEffect(() => {
    if (
      currentProject >= featuredProjects.length &&
      featuredProjects.length > 0
    ) {
      setCurrentProject(0);
    }
  }, [featuredProjects.length, currentProject]);

  const filteredProjects =
    selectedCategory === "All"
      ? projects.filter((project) => !project.featured)
      : projects.filter(
          (project) =>
            !project.featured && project.category === selectedCategory
        );

  const nextProject = () => {
    if (featuredProjects.length > 0) {
      setDirection(1);
      setCurrentProject((prev) => (prev + 1) % featuredProjects.length);
    }
  };

  const prevProject = () => {
    if (featuredProjects.length > 0) {
      setDirection(-1);
      setCurrentProject(
        (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length
      );
    }
  };

  const goToProject = (index: number) => {
    if (index !== currentProject) {
      setDirection(index > currentProject ? 1 : -1);
      setCurrentProject(index);
    }
  };

  return (
    <motion.section
      className="featured-projects-section min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pb-16 pt-24"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      viewport={{ once: false, amount: 0.1 }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center sm:mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{
              scale: 1.02,
              textShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
            }}
          >
            Featured{" "}
            <motion.span
              className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Projects
            </motion.span>
          </motion.h1>
          <motion.div
            className="mx-auto mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 sm:mb-6 sm:w-24"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
            whileHover={{
              scaleY: 3,
              boxShadow: "0 0 20px rgba(147, 51, 234, 0.6)",
            }}
          />
          <motion.p
            className="mx-auto max-w-3xl px-2 text-lg leading-relaxed text-gray-300 sm:px-4 sm:text-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{
              scale: 1.02,
              color: "#e5e7eb",
            }}
          >
            Here are some of my recent projects that showcase my skills and
            passion for creating exceptional web experiences
          </motion.p>
        </motion.div>
        {/* Featured Projects Carousel */}
        <motion.div
          className="relative mb-16 sm:mb-24"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {featuredProjects.length > 0 ? (
            <>
              <div className="perspective-1000 overflow-hidden rounded-2xl shadow-2xl sm:rounded-3xl mx-8 sm:mx-12 lg:mx-16">
                <AnimatePresence mode="wait">
                  {featuredProjects[currentProject] && (
                    <motion.div
                      key={currentProject}
                      initial={{
                        opacity: 0,
                        x: direction > 0 ? 300 : -300,
                        scale: 0.9,
                      }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{
                        opacity: 0,
                        x: direction > 0 ? -300 : 300,
                        scale: 0.9,
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="w-full"
                    >
                      <motion.div
                        className="grid items-center gap-8 rounded-2xl border border-slate-700 bg-slate-800/30 p-6 backdrop-blur-sm sm:gap-12 sm:rounded-3xl sm:p-8 lg:grid-cols-2 lg:p-12"
                        whileHover={{
                          scale: 1.01,
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <motion.div
                          className="order-2 space-y-4 sm:space-y-6 lg:order-1"
                          variants={fadeInLeft}
                          initial="initial"
                          animate="animate"
                          transition={{ delay: 0.3 }}
                        >
                          <motion.div
                            className="flex flex-wrap items-center gap-2 sm:gap-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                          >
                            <motion.span
                              className="rounded-full border border-purple-600/30 bg-purple-600/20 px-2 py-1 text-xs font-medium text-purple-300 sm:px-3 sm:py-1 sm:text-sm"
                              whileHover={{
                                scale: 1.1,
                                boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              {featuredProjects[currentProject].category}
                            </motion.span>
                            <motion.span
                              className="rounded-full border border-cyan-600/30 bg-cyan-600/20 px-2 py-1 text-xs font-medium text-cyan-300 sm:px-3 sm:py-1 sm:text-sm"
                              whileHover={{
                                scale: 1.1,
                                boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              Featured
                            </motion.span>
                          </motion.div>

                          <motion.h2
                            className="text-2xl font-bold text-white sm:text-3xl"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                          >
                            {featuredProjects[currentProject].title}
                          </motion.h2>

                          <motion.p
                            className="text-base leading-relaxed text-gray-300 sm:text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                          >
                            {featuredProjects[currentProject].description}
                          </motion.p>

                          <motion.div
                            className="flex flex-wrap gap-2 sm:gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                          >
                            {featuredProjects[currentProject].technologies.map(
                              (tech, index) => (
                                <motion.span
                                  key={tech}
                                  className="rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-slate-700 sm:px-4 sm:py-2 sm:text-sm"
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    delay: index * 0.05,
                                    duration: 0.3,
                                    ease: "easeOut",
                                  }}
                                  whileHover={{
                                    scale: 1.1,
                                    y: -3,
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                                  }}
                                >
                                  {tech}
                                </motion.span>
                              )
                            )}
                          </motion.div>

                          <motion.div
                            className="flex space-x-4 pt-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                          >
                            <motion.a
                              href={featuredProjects[currentProject].liveUrl}
                              className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl"
                              variants={buttonHover}
                              whileHover={{
                                scale: 1.05,
                                boxShadow:
                                  "0 20px 40px rgba(147, 51, 234, 0.4)",
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ExternalLink size={20} />
                              <span>Live Demo</span>
                            </motion.a>
                            <motion.a
                              href={featuredProjects[currentProject].githubUrl}
                              className="inline-flex items-center space-x-2 rounded-xl border-2 border-cyan-400 px-8 py-4 font-semibold text-cyan-400 transition-all duration-300 hover:bg-cyan-400 hover:text-slate-900"
                              whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)",
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Github size={20} />
                              <span>View Code</span>
                            </motion.a>
                          </motion.div>
                        </motion.div>

                        <motion.div
                          className="order-1 lg:order-2"
                          variants={fadeInRight}
                          initial="initial"
                          animate="animate"
                          transition={{ delay: 0.3 }}
                        >
                          <motion.div
                            className="group relative overflow-hidden rounded-2xl shadow-2xl"
                            whileHover={{
                              scale: 1.03,
                              rotateY: 2,
                              rotateX: 2,
                              z: 50,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <motion.img
                              src={featuredProjects[currentProject].image}
                              alt={featuredProjects[currentProject].title}
                              className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-96"
                              initial={{ scale: 1.1, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.5, duration: 0.8 }}
                            />
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.7 }}
                            />
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Enhanced Carousel Controls */}
              {featuredProjects.length > 1 && (
                <>
                  <motion.button
                    onClick={prevProject}
                    className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-slate-800/90 p-3 sm:p-4 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-slate-700 hover:shadow-xl z-10"
                    whileHover={{
                      scale: 1.1,
                      x: -5,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                  </motion.button>
                  <motion.button
                    onClick={nextProject}
                    className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-slate-800/90 p-3 sm:p-4 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-slate-700 hover:shadow-xl z-10"
                    whileHover={{
                      scale: 1.1,
                      x: 5,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                  </motion.button>
                </>
              )}

              {/* Enhanced Carousel Indicators */}
              {featuredProjects.length > 1 && (
                <motion.div
                  className="mt-8 flex justify-center space-x-3"
                  variants={fadeInUp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  {featuredProjects.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToProject(index)}
                      className={`h-4 w-4 rounded-full transition-all duration-300 ${
                        index === currentProject
                          ? "bg-gradient-to-r from-purple-400 to-cyan-400"
                          : "bg-gray-600 hover:bg-gray-500"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      animate={{
                        scale: index === currentProject ? 1.25 : 1,
                        boxShadow:
                          index === currentProject
                            ? "0 0 20px rgba(147, 51, 234, 0.5)"
                            : "none",
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              className="py-16 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="mb-4 text-xl text-gray-400">
                No featured projects available
              </h3>
              <p className="text-gray-500">
                Featured projects will appear here when available.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Other Projects */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="mb-12 flex flex-col items-center justify-between sm:flex-row"
            variants={fadeInUp}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="mb-4 text-3xl font-semibold text-white sm:mb-0"
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 20px rgba(255,255,255,0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              Other Projects
            </motion.h2>
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Filter size={20} className="text-gray-400" />
              <div className="flex space-x-2">
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-lg px-4 py-2 font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                        : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                    }`}
                    variants={buttonHover}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow:
                        selectedCategory === category
                          ? "0 10px 25px rgba(147, 51, 234, 0.3)"
                          : "0 5px 15px rgba(0,0,0,0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              staggerChildren: 0.1,
              delayChildren: 0.2,
            }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group"
                  initial={{
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 50,
                    scale: 0.9,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    rotateX: 5,
                  }}
                  layout
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="transform overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/30 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/50 hover:shadow-2xl"
                    whileHover={{
                      boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                      borderColor: "rgba(147, 51, 234, 0.5)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="h-56 w-full object-cover transition-transform duration-700"
                        whileHover={{
                          scale: 1.1,
                          filter: "brightness(1.1) contrast(1.1)",
                        }}
                        transition={{ duration: 0.7 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"
                        initial={{ opacity: 0.6 }}
                        whileHover={{ opacity: 0.4 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        className="absolute left-4 top-4"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                      >
                        <motion.span
                          className="rounded-full bg-slate-900/80 px-3 py-1 text-sm font-medium text-cyan-300 backdrop-blur-sm"
                          whileHover={{
                            scale: 1.1,
                            boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)",
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {project.category}
                        </motion.span>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="p-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                    >
                      <motion.h3
                        className="mb-3 text-xl font-semibold text-white"
                        whileHover={{
                          color: "#e5e7eb",
                          textShadow: "0 0 10px rgba(255,255,255,0.3)",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {project.title}
                      </motion.h3>

                      <motion.p
                        className="mb-6 leading-relaxed text-gray-300"
                        whileHover={{ color: "#d1d5db" }}
                        transition={{ duration: 0.2 }}
                      >
                        {project.description}
                      </motion.p>

                      <motion.div
                        className="mb-6 flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                      >
                        {project.technologies
                          .slice(0, 3)
                          .map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              className="rounded-lg border border-cyan-600/30 bg-cyan-600/20 px-3 py-1 text-sm font-medium text-cyan-300"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: index * 0.1 + techIndex * 0.05 + 0.7,
                                duration: 0.3,
                              }}
                              whileHover={{
                                scale: 1.05,
                                y: -2,
                                boxShadow: "0 5px 15px rgba(6, 182, 212, 0.3)",
                              }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        {project.technologies.length > 3 && (
                          <motion.span
                            className="rounded-lg bg-gray-600/20 px-3 py-1 text-sm font-medium text-gray-300"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: index * 0.1 + 0.9,
                              duration: 0.3,
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                          >
                            +{project.technologies.length - 3} more
                          </motion.span>
                        )}
                      </motion.div>

                      <motion.div
                        className="flex space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.8, duration: 0.5 }}
                      >
                        <motion.a
                          href={project.liveUrl}
                          className="inline-flex items-center space-x-2 font-medium text-purple-400 transition-colors hover:text-purple-300"
                          whileHover={{
                            scale: 1.05,
                            x: 3,
                            textShadow: "0 0 10px rgba(147, 51, 234, 0.5)",
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          className="inline-flex items-center space-x-2 font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                          whileHover={{
                            scale: 1.05,
                            x: 3,
                            textShadow: "0 0 10px rgba(6, 182, 212, 0.5)",
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github size={16} />
                          <span>View Code</span>
                        </motion.a>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
