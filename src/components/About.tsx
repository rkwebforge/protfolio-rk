import { Code, Palette, Smartphone, Zap } from "lucide-react";
import React from "react";
import { NeonText } from "./Neon";

const About: React.FC = () => {
  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description:
        "Writing maintainable, scalable code with best practices and modern patterns",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Creating intuitive and beautiful user interfaces that delight users",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description:
        "Ensuring perfect experience across all devices and screen sizes",
    },
    {
      icon: Zap,
      title: "Performance",
      description:
        "Optimizing for speed, accessibility, and exceptional user experience",
    },
  ];

  const achievements = [
    { number: "50+", label: "Projects Completed" },
    { number: "30+", label: "Happy Clients" },
    { number: "1000+", label: "Cups of Coffee" },
    { number: "100%", label: "Passion for Code" },
  ];

  return (
    <section id="about" className="min-h-screen pb-24 pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 sm:mb-16">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            <NeonText>About Me</NeonText>
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Passionate developer with a love for creating digital experiences
            that make a difference
          </p>
        </div>

        <div className="mb-16 grid items-start gap-10 sm:mb-20 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="space-y-10">
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-white sm:mb-6">
                <NeonText>Crafting Digital Experiences</NeonText>
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-fg sm:space-y-6 sm:text-lg">
                <p>
                  With over 5 years of experience in full stack development, I
                  specialize in creating modern, responsive web applications
                  using React, TypeScript, Node.js, and cutting-edge web
                  technologies. My journey began with a curiosity about how
                  websites work, and it has evolved into a passionate career
                  dedicated to building exceptional digital experiences.
                </p>
                <p>
                  I believe that great software is not just about
                  functionality—it's about creating intuitive, accessible, and
                  delightful experiences for users. Every line of code I write
                  is crafted with attention to detail, performance optimization,
                  and user-centric design principles.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new
                  technologies, contributing to open source projects, mentoring
                  junior developers, or sharing knowledge with the developer
                  community. I'm a firm believer in continuous learning and
                  staying ahead of the ever-evolving web development landscape.
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-rule pt-8 sm:grid-cols-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.label}
                  className="flex flex-col-reverse gap-1"
                >
                  <dt className="text-sm text-muted">{achievement.label}</dt>
                  <dd className="font-display text-2xl font-semibold text-white sm:text-3xl">
                    {achievement.number}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-lg border border-rule bg-raised p-6 sm:p-8">
            <Code size={28} className="mb-5 text-accent" aria-hidden="true" />
            <h3 className="mb-3 text-xl font-semibold text-white">
              Always Learning
            </h3>
            <p className="text-base text-fg">
              Staying current with the latest technologies and best practices in
              web development
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-semibold text-white sm:mb-8">
            <NeonText>What I Bring to the Table</NeonText>
          </h2>
          <dl className="border-b border-rule">
            {highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="grid gap-3 border-t border-rule py-6 sm:grid-cols-[14rem_1fr]"
              >
                <dt className="flex items-center gap-3 font-medium text-white">
                  <highlight.icon
                    size={18}
                    className="text-accent"
                    aria-hidden="true"
                  />
                  {highlight.title}
                </dt>
                <dd className="leading-relaxed text-fg">
                  {highlight.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
