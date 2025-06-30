import { motion } from "framer-motion";
import { ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import dp_image from "../assets/profile_img/dp.avif"; // Adjust the path as necessary
import { ROUTES } from "../constants/paths";
import {
  bounceIn,
  enhancedButtonHover,
  fadeInDown,
  fadeInUp,
  fastStaggerContainer,
  floatingElement,
  floatingElementDelayed,
  staggerContainer,
} from "../utils/animations";
import { addPerformanceClasses, instantTransition } from "../utils/performance";
const Hero: React.FC = () => {
  const scrollToSkills = () => {
    const element = document.getElementById("skills");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-16 pt-24"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-900/30 via-dark-900 to-primary-900/30"></div>

      {/* Floating elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-r from-accent-500/40 to-accent-400/30 blur-2xl"
          variants={floatingElement}
          initial="initial"
          animate="animate"
        ></motion.div>
        <motion.div
          className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-gradient-to-r from-primary-500/40 to-primary-400/30 blur-2xl"
          variants={floatingElementDelayed(2)}
          initial="initial"
          animate="animate"
        ></motion.div>
        <motion.div
          className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-secondary-500/30 to-secondary-400/20 blur-2xl"
          variants={floatingElementDelayed(4)}
          initial="initial"
          animate="animate"
        ></motion.div>
        {/* Additional smaller floating elements for more depth */}
        <motion.div
          className="absolute right-1/4 top-1/4 h-40 w-40 rounded-full bg-gradient-to-r from-accent-400/25 to-primary-400/20 blur-xl"
          variants={floatingElementDelayed(1)}
          initial="initial"
          animate="animate"
        ></motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/4 h-60 w-60 rounded-full bg-gradient-to-r from-primary-400/25 to-secondary-400/20 blur-xl"
          variants={floatingElementDelayed(3)}
          initial="initial"
          animate="animate"
        ></motion.div>
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
        variants={fastStaggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInDown}>
          <motion.div className="mb-6" variants={bounceIn}>
            <motion.div
              className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 via-primary-500 to-secondary-500 p-1 sm:h-40 sm:w-40 lg:h-52 lg:w-52"
              initial={{
                scale: 0.8,
                opacity: 0,
                rotate: -10,
                y: 30,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
                y: 0,
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.3,
                duration: 0.8,
                backgroundPosition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              whileHover={{
                scale: 1.12,
                rotate: [0, -3, 3, -2, 2, 0],
                boxShadow: [
                  "0 0 0 rgba(99, 102, 241, 0)",
                  "0 0 30px rgba(99, 102, 241, 0.4)",
                  "0 0 50px rgba(99, 102, 241, 0.6)",
                ],
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  duration: 0.6,
                  rotate: {
                    duration: 0.8,
                    ease: "easeInOut",
                  },
                  boxShadow: {
                    duration: 0.5,
                    ease: "easeInOut",
                  },
                },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
              style={{
                background:
                  "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)",
                backgroundSize: "300% 300%",
              }}
            >
              <motion.img
                src={dp_image}
                alt="Profile Picture"
                className="h-full w-full rounded-full object-cover"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  filter: [
                    "brightness(1) contrast(1) saturate(1)",
                    "brightness(1.1) contrast(1.1) saturate(1.2)",
                  ],
                  transition: {
                    duration: 0.4,
                    ease: "easeOut",
                  },
                }}
              />
            </motion.div>
          </motion.div>

          <motion.h1
            className="mb-6 text-3xl font-bold sm:text-4xl md:text-6xl lg:text-7xl"
            variants={fadeInUp}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <motion.span
              className="mb-2 block text-white"
              variants={fadeInUp}
              whileHover={{
                color: "#f8fafc",
                textShadow: "0 0 20px rgba(248, 250, 252, 0.5)",
                transition: { duration: 0.3 },
              }}
            >
              Hi, I'm
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-accent-400 via-primary-400 to-secondary-400 bg-clip-text text-transparent"
              variants={fadeInUp}
              style={{ backgroundSize: "200% 200%" }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 30px rgba(99, 102, 241, 0.5)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              RK Prasad
            </motion.span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-8 max-w-3xl px-4 text-lg leading-relaxed text-gray-300 sm:text-xl md:text-2xl"
            variants={fadeInUp}
            whileHover={{
              scale: 1.01,
              color: "#e5e7eb",
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            A passionate{" "}
            <motion.span
              className="font-semibold text-accent-400"
              whileHover={{
                color: "#fbbf24",
                textShadow: "0 0 15px rgba(251, 191, 36, 0.6)",
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              style={{ display: "inline-block" }}
            >
              Front-End Developer
            </motion.span>{" "}
            crafting beautiful, responsive web experiences with modern
            technologies and innovative solutions.
          </motion.p>

          <motion.div
            className="mb-12 flex flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:flex-wrap sm:gap-6 sm:px-0"
            variants={fadeInUp}
          >
            <motion.div
              className="w-full max-w-xs sm:w-auto"
              variants={enhancedButtonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={instantTransition}
            >
              <Link
                to={ROUTES.PROJECTS}
                className={addPerformanceClasses(
                  "block w-full transform rounded-full bg-gradient-to-r from-accent-600 via-accent-500 to-primary-500 px-8 py-4 text-center text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-lg",
                  "button"
                )}
              >
                View My Work
              </Link>
            </motion.div>
            <motion.div
              className="w-full max-w-xs sm:w-auto"
              variants={enhancedButtonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={instantTransition}
            >
              <Link
                to={ROUTES.CONTACT}
                className={addPerformanceClasses(
                  "block w-full transform rounded-full border-2 border-secondary-400 px-8 py-4 text-center text-base font-semibold text-secondary-400 transition-all duration-300 hover:bg-secondary-400 hover:text-dark-900 hover:shadow-lg sm:w-auto sm:px-8 sm:py-4 sm:text-lg",
                  "button"
                )}
              >
                Get In Touch
              </Link>
            </motion.div>
            <motion.button
              className={addPerformanceClasses(
                "flex w-full max-w-xs transform items-center justify-center space-x-2 rounded-full border border-dark-700 bg-dark-800/50 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-primary-500 hover:bg-gradient-to-r hover:from-primary-600/20 hover:to-accent-600/20 sm:w-auto sm:px-8 sm:py-4 sm:text-lg",
                "button"
              )}
              variants={enhancedButtonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={instantTransition}
            >
              <Download size={20} />
              <span>Resume</span>
            </motion.button>
          </motion.div>

          <motion.div
            className="mb-12 flex items-center justify-center space-x-4 sm:space-x-6"
            variants={fadeInUp}
          >
            <motion.a
              href="#"
              className="transform p-2 text-gray-400 transition-all duration-300 hover:text-accent-400"
              aria-label="GitHub Profile"
              whileHover={{ scale: 1.3, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={24} className="sm:h-7 sm:w-7" />
            </motion.a>
            <motion.a
              href="#"
              className="transform p-2 text-gray-400 transition-all duration-300 hover:text-primary-400"
              aria-label="LinkedIn Profile"
              whileHover={{ scale: 1.3, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={24} className="sm:h-7 sm:w-7" />
            </motion.a>
            <motion.a
              href="#"
              className="transform p-2 text-gray-400 transition-all duration-300 hover:text-secondary-400"
              aria-label="Email Contact"
              whileHover={{ scale: 1.3, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={24} className="sm:h-7 sm:w-7" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={scrollToSkills}
          className="transform text-gray-400 transition-colors duration-300 hover:text-accent-400"
          variants={bounceIn}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
