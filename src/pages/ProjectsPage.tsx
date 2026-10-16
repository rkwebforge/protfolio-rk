import Projects from "../components/Projects";

function ProjectsPage() {
  // Extra room below the fixed navbar; SinglePage stacks sections without it
  return (
    <div className="pt-12">
      <Projects />
    </div>
  );
}

export default ProjectsPage;
