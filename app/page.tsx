import Header from "@/src/components/layout/Header/Header";
import Footer from "@/src/components/layout/Footer/Footer";
import Hero from "@/src/components/sections/Hero/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}

