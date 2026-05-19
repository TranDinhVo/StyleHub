'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@stylehub.com',
      desc: 'We&apos;ll respond within 24 hours'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      desc: 'Monday to Friday, 9 AM - 6 PM EST'
    },
    {
      icon: MapPin,
      label: 'Address',
      value: '123 Fashion Avenue, New York, NY 10001',
      desc: 'Visit our showroom by appointment'
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: 'Mon - Fri: 9 AM - 6 PM EST',
      desc: 'Sat - Sun: 10 AM - 4 PM EST'
    }
  ]

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container-responsive mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products or services? We&apos;d love to hear from you. Our team is here to help!
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24">
        <div className="container-responsive mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div key={index} className="bg-card p-6 rounded-lg border border-border">
                  <Icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="font-serif font-bold text-lg mb-1">{info.label}</h3>
                  <p className="font-medium text-sm mb-2">{info.value}</p>
                  <p className="text-xs text-muted-foreground">{info.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-responsive mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg border border-border">
              <h2 className="font-serif text-2xl font-bold mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <CheckCircle className="w-16 h-16 text-accent mb-4" />
                  <p className="text-xl font-semibold mb-2">Thank you!</p>
                  <p className="text-muted-foreground text-center">
                    Your message has been received. We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="order-support">Order Support</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="brand-partnership">Brand Partnership</option>
                      <option value="feedback">General Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold mb-2">How long does shipping take?</h3>
                  <p className="text-sm text-muted-foreground">
                    Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold mb-2">What&apos;s your return policy?</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer 30-day returns on most items. Products must be unused with original tags and packaging.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold mb-2">Do you offer international shipping?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! We ship to 25+ countries worldwide. Shipping costs and times vary by location.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold mb-2">How can I track my order?</h3>
                  <p className="text-sm text-muted-foreground">
                    You&apos;ll receive a tracking number via email once your order ships. You can use it to track delivery in real-time.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold mb-2">Do you offer gift wrapping?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! Premium gift wrapping is available for an additional fee at checkout.
                  </p>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold mb-2">Can I become a brand partner?</h3>
                  <p className="text-sm text-muted-foreground">
                    We&apos;re always looking for quality brands. Contact us at partnerships@stylehub.com to discuss opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container-responsive mx-auto">
          <h2 className="font-serif text-2xl font-bold mb-8 text-center">Visit Our Showroom</h2>
          <div className="bg-secondary rounded-lg overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
              <p className="text-muted-foreground">123 Fashion Avenue, New York, NY 10001</p>
              <p className="text-sm text-muted-foreground mt-2">Open Monday - Friday, 9 AM - 6 PM EST</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
