import Contact from "../components/Contact";

function ContactPage() {
  // Extra room below the fixed navbar; SinglePage stacks sections without it
  return (
    <div className="pt-12">
      <Contact />
    </div>
  );
}

export default ContactPage;
