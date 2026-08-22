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
        <Section id="experience" index={1} label="Experience" title="My professional experience.">
          <Experience />
        </Section>

        <Section id="projects" index={2} label="Projects" title="Interesting and fun ideas I am working on.">
          <Projects />
        </Section>

        <Section id="skills" index={3} label="Skills">
          <Skills />
        </Section>

        <Section id="contact" index={4} label="Contact" title="Open to new opportunities and teams.">
          <Contact />
        </Section>
      </main>

      <Footer />
    </>
  )
}
