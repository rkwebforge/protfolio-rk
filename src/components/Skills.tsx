import React from "react";
import { NeonText } from "./Neon";

const Skills: React.FC = () => {
  const skillGroups = [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "HTML/CSS", "Tailwind CSS", "Framer Motion"],
    },
    {
      title: "Backend",
      skills: ["Laravel", "Livewire", "Blade", "Node.js", "MySQL", "REST APIs"],
    },
    {
      title: "Languages",
      skills: ["TypeScript", "JavaScript", "PHP"],
    },
  ];

  const tools = [
    { name: "VS Code", category: "Editor" },
    { name: "Figma", category: "Design" },
    { name: "Postman", category: "API" },
    { name: "Chrome DevTools", category: "Debug" },
    { name: "Webpack", category: "Build" },
    { name: "Vite", category: "Build" },
    { name: "ESLint", category: "Quality" },
    { name: "Git", category: "Version Control" },
  ];

  return (
    <section id="skills" className="min-h-screen pb-24 pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 sm:mb-16">
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            <NeonText>Skills & Expertise</NeonText>
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Here are the technologies and tools I use to bring ideas to life and
            create exceptional digital experiences
          </p>
        </div>
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Technical Skills */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-white">
              <NeonText>Technical Skills</NeonText>
            </h2>
            <dl className="border-b border-rule">
              {skillGroups.map((group) => (
                <div
                  key={group.title}
                  className="grid gap-3 border-t border-rule py-6 sm:grid-cols-[10rem_1fr]"
                >
                  <dt className="font-medium text-white">{group.title}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-md border border-rule px-2.5 py-1 text-sm text-fg"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Tools & Software */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-white">
              <NeonText>Tools & Software</NeonText>
            </h2>
            <ul className="grid border-b border-rule sm:grid-cols-2 sm:gap-x-8">
              {tools.map((tool) => (
                <li
                  key={tool.name}
                  className="flex items-baseline justify-between gap-4 border-t border-rule py-4"
                >
                  <span className="text-fg">{tool.name}</span>
                  <span className="text-sm text-muted">{tool.category}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
