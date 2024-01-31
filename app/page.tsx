"use client"
import { MouseEventHandler, useRef } from 'react'
import Contact from './components/Contact'
import Education from './components/Education'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Header from './components/Header'
import Intro from './components/Intro'
import Portfolio from './components/Portfolio'
import Skills from './components/Skills'

export default function Home() {
  const mainRef = useRef(null as HTMLElement | null);

  return (
    <>
      <Header mainRef={mainRef}></Header>
      <main ref={mainRef}>
        <Intro></Intro>
        <Skills></Skills>
        <Experience></Experience>
        <Education></Education>
        <Portfolio></Portfolio>
        <Contact></Contact>
      </main>
      <Footer></Footer>
    </>
  )
}
