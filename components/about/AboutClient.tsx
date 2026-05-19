'use client'

import { useState } from 'react'
import { Sparkles, Heart, Globe, Award } from 'lucide-react'

export default function AboutClient() {
  const [activeValue, setActiveValue] = useState(0)

  const values = [
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Every piece in our collection is carefully curated to meet our exacting standards for craftsmanship and design excellence.'
    },
    {
      icon: Heart,
      title: 'Sustainability',
      description: 'We are committed to responsible sourcing and ethical production practices that respect both people and the planet.'
    },
    {
      icon: Globe,
      title: 'Global Vision',
      description: 'We source the finest materials and designs from artisans and manufacturers around the world.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Our dedication to excellence is reflected in every detail, from design to delivery.'
    }
  ]

  const milestones = [
    { year: '2018', title: 'Founded', description: 'StyleHub began as a passion project with a vision to redefine luxury shopping.' },
    { year: '2019', title: 'First Collection', description: 'Launched our signature collection of premium accessories and home decor.' },
    { year: '2021', title: 'Global Expansion', description: 'Expanded to serve customers across 25+ countries worldwide.' },
    { year: '2023', title: 'Community Leader', description: 'Recognized as an industry leader in sustainable luxury fashion.' }
  ]

  return (
    <>
      {/* Values Section */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container-responsive mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from selection to service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <button
                  key={idx}
                  onClick={() => setActiveValue(idx)}
                  className={`p-6 rounded-lg border-2 transition-all text-left ${
                    activeValue === idx
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <Icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="container-responsive mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">From humble beginnings to a global luxury brand</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative">
                {/* Timeline dot */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold mb-4">
                    {idx + 1}
                  </div>
                  {idx < milestones.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-1/2 w-0.5 h-24 bg-border" />
                  )}
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <p className="text-sm font-semibold text-accent mb-2">{milestone.year}</p>
                  <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
