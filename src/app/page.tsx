import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import GithubStats from "@/components/GithubStats";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      {/* ctf flag #1 lives in the served HTML */}
      <div
        hidden
        dangerouslySetInnerHTML={{
          __html: "<!-- nice instinct. FLAG{view_source_is_a_skill} -->",
        }}
      />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero />
        <About />
        <Journey />
        <Experience />
        <Projects />
        <GithubStats />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
