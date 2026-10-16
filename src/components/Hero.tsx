import { motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import React from "react";
import { Link } from "react-router-dom";
import { EMAIL, EMAIL_HREF } from "../constants/contact";
import { ROUTES } from "../constants/paths";

import dpImageUrl from "../assets/profile_img/dp.avif";

const NAME = "R.Krishnaprasad";
const TYPE_STEP = 0.07; // seconds per typed character
const AFTER_TYPING = NAME.length * TYPE_STEP + 0.15;
const RESTING_GLOW = "0 0 32px rgba(255,77,94,0.18)";

// Size the name to its column so it fills one line at any width, whatever its
// length. Martian Mono at 75% width is ~0.6em per character; +0.8em for the caret.
const NAME_FONT_SIZE = `min(4.5rem, ${(100 / (NAME.length * 0.6 + 0.8)).toFixed(2)}cqw)`;

const socialLinks = [
  {
    href: "https://github.com/rkwebforge",
    label: "GitHub profile",
    icon: Github,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/krishnaprasad-r-2261371a3",
    label: "LinkedIn profile",
    icon: Linkedin,
    external: true,
  },
  {
    href: EMAIL_HREF,
    label: `Email ${EMAIL}`,
    icon: Mail,
    external: false,
  },
];

const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion();

  // The page's one orchestrated moment: the name types in, then the rest appears.
  const reveal = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.4, delay },
        };

  const chars = NAME.split("");
  const typedAt = (i: number) => 0.2 + i * TYPE_STEP;

  // A solid caret shown only between two keystrokes. Its negative margin cancels
  // its width, so it sits in the gap of the not-yet-typed letter without moving
  // anything; together they make the caret appear to advance as the name types.
  const passingCaret = (from: number, to: number) => (
    <motion.span
      className="caret -mr-[0.67em]"
      style={{ animation: "none" }}
      initial={{ opacity: from === 0 ? 1 : 0 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{
        duration: to - from,
        delay: from,
        times: [0, 0.999, 1],
      }}
    />
  );

  const typedChar = (char: string, i: number) => (
    <motion.span
      key={i}
      {...(reduceMotion
        ? {}
        : {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0, delay: typedAt(i) },
          })}
    >
      {char}
      {!reduceMotion &&
        i < chars.length - 1 &&
        passingCaret(typedAt(i), typedAt(i + 1))}
    </motion.span>
  );

  return (
    <section id="home" className="flex min-h-screen items-center pb-16 pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 text-center sm:px-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:gap-16 xl:text-left">
        <div className="@container min-w-0">
          <motion.p className="mb-4 text-lg text-muted" {...reveal(0)}>
            Hi, I'm
          </motion.p>

          <h1
            aria-label={NAME}
            className="font-bold leading-tight text-white font-stretch-75%"
            style={{ fontSize: NAME_FONT_SIZE }}
          >
            <span aria-hidden="true">
              {!reduceMotion && passingCaret(0, typedAt(0))}
              {chars.slice(0, -1).map(typedChar)}
              {/* Keep the caret glued to the last letter so it never wraps alone */}
              <span className="whitespace-nowrap">
                {typedChar(chars[chars.length - 1] ?? "", chars.length - 1)}
                {/* The resting caret takes over, blinking, once the last letter lands */}
                <motion.span
                  {...(reduceMotion
                    ? {}
                    : {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        transition: {
                          duration: 0,
                          delay: typedAt(chars.length - 1),
                        },
                      })}
                >
                  <span className="caret" />
                </motion.span>
              </span>
            </span>
          </h1>

          <motion.p
            className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-fg xl:mx-0"
            {...reveal(AFTER_TYPING)}
          >
            Full Stack Developer in Trivandrum. I build web apps with Laravel
            and React, and I made{" "}
            <a
              href="https://www.bladewellui.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              Bladewell
            </a>
            , an open-source component library for Laravel.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4 xl:justify-start"
            {...reveal(AFTER_TYPING + 0.15)}
          >
            <Link
              to={ROUTES.PROJECTS}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-display text-sm font-medium text-ink transition-colors hover:bg-accent-strong"
            >
              View my work
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center gap-2 rounded-md border border-rule px-5 py-3 font-display text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </Link>

            <ul className="flex basis-full items-center justify-center gap-1 xl:-ml-3 xl:justify-start">
              {socialLinks.map(({ href, label, icon: Icon, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors hover:text-accent"
                  >
                    <Icon size={22} />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Neon sign switching on: the ring traces itself while the name types,
            then the photo flickers on and the glow settles. */}
        <div className="relative order-first mx-auto shrink-0 xl:order-last xl:mx-0">
          <motion.img
            src={dpImageUrl}
            alt={`Portrait of ${NAME}`}
            width={320}
            height={320}
            className="aspect-square h-52 w-52 shrink-0 rounded-full object-cover sm:h-64 sm:w-64 lg:h-72 lg:w-72 xl:h-96 xl:w-96"
            style={{ boxShadow: RESTING_GLOW }}
            {...(reduceMotion
              ? {}
              : {
                  initial: {
                    opacity: 0,
                    scale: 0.94,
                    filter: "brightness(1.8)",
                    boxShadow: "0 0 0 rgba(255,77,94,0)",
                  },
                  animate: {
                    opacity: [0, 0.7, 0.1, 0.9, 0.35, 1],
                    scale: 1,
                    filter: "brightness(1)",
                    boxShadow: [
                      "0 0 0 rgba(255,77,94,0)",
                      "0 0 80px rgba(255,77,94,0.55)",
                      RESTING_GLOW,
                    ],
                  },
                  transition: {
                    opacity: {
                      duration: 0.6,
                      times: [0, 0.15, 0.3, 0.45, 0.6, 1],
                      delay: AFTER_TYPING - 0.2,
                    },
                    scale: {
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                      delay: AFTER_TYPING - 0.2,
                    },
                    filter: { duration: 1.2, delay: AFTER_TYPING - 0.2 },
                    boxShadow: {
                      duration: 1.6,
                      times: [0, 0.35, 1],
                      delay: AFTER_TYPING - 0.2,
                    },
                  },
                })}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 h-full w-full -rotate-90 overflow-visible text-accent"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              {...(reduceMotion
                ? {}
                : {
                    initial: { pathLength: 0 },
                    animate: { pathLength: 1 },
                    transition: {
                      duration: AFTER_TYPING - 0.2,
                      delay: 0.2,
                      ease: "easeInOut",
                    },
                  })}
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
