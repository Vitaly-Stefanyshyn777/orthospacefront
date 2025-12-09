import Header from "@/src/components/layout/Header/Header";
import Footer from "@/src/components/layout/Footer/Footer";
import Hero from "@/src/components/sections/Hero/Hero";
import About from "@/src/components/sections/About/About";
import Services from "@/src/components/sections/Services/Services";
import WhyUs from "@/src/components/sections/WhyUs/WhyUs";
import Specialists from "@/src/components/sections/Specialists/Specialists";
import Specialization from "@/src/components/sections/Specialization/Specialization";
import Gallery from "@/src/components/sections/Gallery/Gallery";
import Contact from "@/src/components/sections/Contact/Contact";
import Location from "@/src/components/sections/Location/Location";

export default function Home() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Specialists />
        <Specialization />
        <Gallery />
        <Contact />
        <Location />
      </main>
      <Footer />
    </>
  );
}
