import About from "../components/About";

function AboutPage() {
  // Extra room below the fixed navbar; SinglePage stacks sections without it
  return (
    <div className="pt-12">
      <About />
    </div>
  );
}

export default AboutPage;
