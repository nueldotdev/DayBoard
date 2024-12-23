import { useState, useEffect } from "react";
import { AboutUs } from "../../components/index/AboutUs";
import { FAQ } from "../../components/index/FAQ";
import { Features } from "../../components/index/Features";
import { Header } from "../../components/index/Header";
import { Hero } from "../../components/index/Hero";
import { Pricing } from "../../components/index/Pricing";
import { AnimatePresence } from 'framer-motion';

export const LandingPage = () => { 

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="bg-black text-white">
      <AnimatePresence>
        {scroll && <Header />}
      </AnimatePresence>
      <Hero />
      <Features />
      <Pricing />
      <AboutUs />
      <FAQ />
    </div>
  )
};