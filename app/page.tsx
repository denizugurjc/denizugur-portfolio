import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { LifeGallery } from "@/components/LifeGallery";
import { Contact } from "@/components/Contact";
import { LikeSection } from "@/components/LikeSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <LifeGallery />
        <Contact />
        <LikeSection />
      </main>
      <Footer />
    </>
  );
}
