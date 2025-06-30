import { motion } from "framer-motion";
import { ArrowUp, Code, Heart, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/paths";
import {
  buttonHover,
  cardHover,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from "../utils/animations";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { path: ROUTES.HOME, label: "Home" },
    { path: ROUTES.ABOUT, label: "About" },
    { path: ROUTES.PROJECTS, label: "Projects" },
    { path: ROUTES.CONTACT, label: "Contact" },
  ];

  const services = [
    "Web Development",
    "UI/UX Design",
    "React Applications",
    "Performance Optimization",
  ];

  return (
    <motion.footer
      className="border-t border-dark-700 bg-gradient-to-r from-dark-950 via-dark-900 to-dark-950"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          className="grid gap-8 py-16 md:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
        >
          {/* Brand Section */}
          <motion.div className="lg:col-span-1" variants={fadeInLeft}>
            <motion.div
              className="mb-6 flex items-center space-x-2"
              variants={fadeInUp}
            >
              <Code size={28} className="text-purple-400" />
              <h3 className="bg-gradient-to-r from-accent-400 via-primary-400 to-secondary-400 bg-clip-text text-2xl font-bold text-transparent">
                RK Prasad
              </h3>
            </motion.div>
            <motion.p
              className="mb-6 leading-relaxed text-gray-400"
              variants={fadeInUp}
            >
              Front-End Developer passionate about creating exceptional digital
              experiences with modern technologies and innovative solutions.
            </motion.p>
            <motion.div
              className="flex items-center space-x-1 text-gray-400"
              variants={fadeInUp}
            >
              <span>Made with</span>
              <Heart size={16} className="mx-1 fill-current text-red-400" />
              <span>and lots of ☕</span>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="group flex items-center text-gray-400 transition-colors duration-300 hover:text-purple-400"
                  >
                    <span className="mr-0 h-0.5 w-0 bg-purple-400 transition-all duration-300 group-hover:mr-2 group-hover:w-2"></span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h4 className="mb-6 text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="group flex cursor-default items-center text-gray-400 transition-colors duration-300 hover:text-cyan-400">
                    <span className="mr-0 h-0.5 w-0 bg-cyan-400 transition-all duration-300 group-hover:mr-2 group-hover:w-2"></span>
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInRight}>
            <h4 className="mb-6 text-lg font-semibold text-white">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <motion.a
                href="mailto:rk.prasad@email.com"
                className="group flex items-center space-x-3 text-gray-400 transition-colors duration-300 hover:text-purple-400"
                variants={cardHover}
                whileHover="hover"
              >
                <Mail
                  size={18}
                  className="transition-transform group-hover:scale-110"
                />
                <span>rk.prasad@email.com</span>
              </motion.a>
              <motion.a
                href="tel:+919876543210"
                className="group flex items-center space-x-3 text-gray-400 transition-colors duration-300 hover:text-cyan-400"
                variants={cardHover}
                whileHover="hover"
              >
                <Phone
                  size={18}
                  className="transition-transform group-hover:scale-110"
                />
                <span>+91 98765 43210</span>
              </motion.a>
              <motion.div
                className="flex items-center space-x-3 text-gray-400"
                variants={fadeInUp}
              >
                <MapPin size={18} />
                <span>Bangalore, India</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col items-center justify-between space-y-4 border-t border-slate-800 py-8 md:flex-row md:space-y-0"
          variants={fadeInUp}
        >
          <motion.div
            className="text-center md:text-left"
            variants={fadeInLeft}
          >
            <p className="text-gray-400">
              © {new Date().getFullYear()} RK Prasad. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            className="flex items-center space-x-6"
            variants={fadeInUp}
          >
            <Link
              to={ROUTES.CONTACT}
              className="text-sm text-gray-400 transition-colors duration-300 hover:text-purple-400"
            >
              Privacy Policy
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className="text-sm text-gray-400 transition-colors duration-300 hover:text-cyan-400"
            >
              Terms of Service
            </Link>
          </motion.div>

          <motion.button
            onClick={scrollToTop}
            className="transform rounded-full bg-dark-800 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:animate-glow hover:bg-gradient-to-r hover:from-accent-600 hover:to-primary-600 hover:shadow-xl"
            aria-label="Scroll to top"
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
          >
            <ArrowUp size={20} />
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
