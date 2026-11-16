import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import SelectedWork from "@/components/SelectedWork";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <SelectedWork />
      <Services />
      <Process />
      <Contact />
    </>
  );
}
