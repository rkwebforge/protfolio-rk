import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Github } from "./BrandIcons";
import React from "react";
import { motion } from "framer-motion";
import { NeonText } from "./Neon";
import { useNeonFrame } from "./useNeonFrame";

const GITHUB_PROFILE = "https://github.com/rkwebforge";

interface Project {
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const featured = {
  title: "Bladewell UI",
  tagline: "Blade components you install and own",
  description:
    "An open-source component library for Laravel. Instead of shipping a black-box package, a single Artisan command copies each component's Blade, JavaScript and Tailwind CSS into your app, so you can edit it like your own code.",
  image: "https://www.bladewellui.com/og-image.png",
  highlights: [
    "42 accessible components: 22 form controls plus tables, modals, tabs and more",
    "Installed with `php artisan bladewell:add`; updates leave your edits alone",
    "Works inside Livewire 3 & 4, or plain Blade with vanilla JS (no Alpine)",
    "Built for AI agents: MCP server, llms.txt index and a JSON catalogue",
  ],
  technologies: [
    "Laravel",
    "Blade",
    "PHP",
    "Livewire",
    "Tailwind CSS v4",
    "Vite",
    "MCP",
  ],
  liveUrl: "https://www.bladewellui.com/",
  githubUrl: "https://github.com/rkwebforge/bladewell",
};

const projects: Project[] = [
  {
    title: "Bladewell Starter Kit",
    tagline: "A secure-by-default Laravel starting point",
    description:
      "A Laravel starter kit with Bladewell widgets, Tailwind CSS and AI agents set up. Plain Blade and vanilla JS (no React, Vue, Inertia or Alpine), with a strict Content Security Policy, every security setting explained in one config file, and a Light / Dark / System theme.",
    technologies: ["Laravel", "PHP", "Blade", "Tailwind CSS", "JavaScript"],
    githubUrl: "https://github.com/rkwebforge/bladewell-starter-kit",
  },
  {
    title: "This Portfolio",
    tagline: "The site you're looking at",
    description:
      "A single-page portfolio with animated sections, scroll-aware navigation and a fully typed codebase, deployed to GitHub Pages.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Vite",
    ],
    githubUrl: "https://github.com/rkwebforge/protfolio-rk",
  },
];

/** Renders `inline code` spans inside a highlight string. */
const renderInlineCode = (text: string) =>
  text.split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code
        key={i}
        className="rounded-sm bg-raised px-1.5 py-0.5 font-mono text-[0.85em] text-accent"
      >
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  );

const TechTags: React.FC<{ technologies: string[] }> = ({ technologies }) => (
  <ul className="flex flex-wrap gap-2" aria-label="Built with">
    {technologies.map((tech) => (
      <li
        key={tech}
        className="rounded-md border border-rule px-2.5 py-1 text-sm text-fg"
      >
        {tech}
      </li>
    ))}
  </ul>
);

const linkClass =
  "inline-flex items-center gap-2 font-display text-sm font-medium text-fg transition-colors hover:text-accent";

const Projects: React.FC = () => {
  const neonFrame = useNeonFrame();

  return (
    <section className="pb-24 pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          <NeonText>Projects</NeonText>
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Open-source work I've designed, built and shipped.
        </p>

        {/* Featured: Bladewell */}
        <article className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-2 text-lg text-accent">{featured.tagline}</p>

            <p className="mt-6 leading-relaxed text-fg">
              {featured.description}
            </p>

            <ul className="mt-6 space-y-3 border-l border-rule pl-5">
              {featured.highlights.map((item) => (
                <li key={item} className="leading-relaxed text-fg">
                  {renderInlineCode(item)}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <TechTags technologies={featured.technologies} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={featured.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-display text-sm font-medium text-ink transition-colors hover:bg-accent-strong"
              >
                <ExternalLink size={18} aria-hidden="true" />
                Visit site
              </a>
              <a
                href={featured.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-rule px-5 py-3 font-display text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <Github size={18} aria-hidden="true" />
                View code
              </a>
            </div>
          </div>

          <motion.a
            href={featured.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${featured.title}`}
            {...neonFrame}
            className="order-first block overflow-hidden rounded-lg border border-rule transition-colors hover:border-accent lg:order-last"
          >
            <img
              src={featured.image}
              alt="Bladewell UI: Blade components you install and own"
              width={1200}
              height={630}
              loading="lazy"
              className="aspect-1200/630 w-full object-cover"
            />
          </motion.a>
        </article>

        {/* Other projects */}
        <div className="mt-20 grid gap-x-14 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex flex-col border-t border-rule py-8"
            >
              <h3 className="text-xl font-semibold text-white">
                {project.title}
              </h3>
              <p className="mt-1 text-accent">{project.tagline}</p>
              <p className="mb-6 mt-4 flex-1 leading-relaxed text-fg">
                {project.description}
              </p>

              <TechTags technologies={project.technologies} />

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    Visit site
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <Github size={16} aria-hidden="true" />
                    View code
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <a
          href={GITHUB_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClass} mt-6 text-muted`}
        >
          <Github size={18} aria-hidden="true" />
          More on GitHub
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default Projects;
