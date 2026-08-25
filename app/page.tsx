import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Career } from "@/components/Career";
import { Leadership } from "@/components/Leadership";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Connect } from "@/components/Connect";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main className="flex-1">
        <Hero />
        <Education />
        <Career />
        <Leadership />
        <Skills />
        <Projects />
        <About />
        <Connect />
      </main>
      <Footer />
    </div>
  );
}
