'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: 'Please enter your email',
        variant: 'destructive'
      })
      return
    }

    setLoading(true)
    
    // Simulate subscription
    setTimeout(() => {
      setLoading(false)
      setEmail('')
      toast({
        title: 'Success!',
        description: 'You&apos;ve been subscribed to our newsletter'
      })
    }, 1000)
  }

  return (
    <section className="py-24 bg-black rounded-[2.5rem] text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      
      <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
        <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/50 mb-6 block">
          Exclusive Access
        </span>
        
        <h2 className="font-serif text-4xl sm:text-6xl font-bold mb-6 tracking-tight leading-tight">
          Join the StyleHub Inner Circle
        </h2>
        
        <p className="text-white/70 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
          Be the first to discover our new collections and receive exclusive invitations to private seasonal sales.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <div className="flex-1 relative group">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/50 rounded-2xl px-6 transition-all duration-300"
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="h-14 px-10 rounded-2xl bg-white text-black hover:bg-white/90 font-bold transition-all duration-300 active:scale-95"
          >
            {loading ? 'Processing...' : 'Subscribe'}
          </Button>
        </form>

        <p className="text-xs text-white/40 mt-8 font-medium">
          By subscribing, you agree to our <a href="#" className="underline hover:text-white">Privacy Policy</a> and <a href="#" className="underline hover:text-white">Terms of Service</a>.
        </p>
      </div>
    </section>
  )
}
