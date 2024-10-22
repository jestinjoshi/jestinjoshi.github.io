"use client"

import { motion } from "framer-motion";
import { useRef } from 'react'
import Contact from './components/Contact'
import Education from './components/Education'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Header from './components/Header/Header'
import Intro from './components/Intro'
import Portfolio from './components/Portfolio'
import Skills from './components/Skills'
import ProfessionalSummary from "./components/ProfessionalSummary";

export default function Home() {
  const mainRef = useRef(null);

  return (
    <>
      <Header mainRef={mainRef} />
      <motion.main initial={{ backgroundPositionX: '-150%' }} animate={{ backgroundPositionX: '20%' }} ref={mainRef}>
        <Intro />
        <Skills />
        <ProfessionalSummary />
        <Experience />
        <Education />
        <motion.div className="portfolio-contact-wrap" initial={{ backgroundPositionX: '500%' }} whileInView={{ backgroundPositionX: '200%' }} viewport={{ once: true }}>
          <Portfolio />
          <Contact />
        </motion.div>
      </motion.main>
      <Footer />
    </>
  )
}
