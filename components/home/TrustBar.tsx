import { Truck, RotateCcw, Lock, Clock } from 'lucide-react'

const trustItems = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $500'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy'
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    description: '100% secure transactions'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Customer support team'
  }
]

export default function TrustBar() {
  return (
    <section className="py-12 border-y border-border">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {trustItems.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="flex items-start gap-6 group">
              <div className="flex-shrink-0 w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-black group-hover:text-white group-hover:rotate-6">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-serif text-lg font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
