import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Section from '@/components/layout/Section'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'

export default function App() {
  return (
    <>
      <div aria-hidden className="grid-ground" />

      <a
        href="#experience"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Header />
      <Hero />

      <main>
        <Section id="experience" label="Experience" title="Where I’ve worked and what I studied.">
          <Experience />
        </Section>

        <Section id="projects" label="Projects" title="Things I’m building outside of work.">
          <Projects />
        </Section>

        <Section id="skills" label="Skills" title="The tools I reach for.">
          <Skills />
        </Section>

        <Section id="contact" label="Contact" title="Open to interesting problems and good teams.">
          <Contact />
        </Section>
      </main>

      <Footer />
    </>
  )
}
