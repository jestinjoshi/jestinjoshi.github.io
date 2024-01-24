import Education from './components/Education'
import Experience from './components/Experience'
import Header from './components/Header'
import Intro from './components/Intro'
import Portfolio from './components/Portfolio'
import Skills from './components/Skills'

export default function Home() {
  return (
    <>
      <Header></Header>
      <main>
        <Intro></Intro>
        <Skills></Skills>
        <Experience></Experience>
        <Education></Education>
        <Portfolio></Portfolio>
      </main>
    </>
  )
}
