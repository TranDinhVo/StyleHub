'use client'

import { Skeleton } from '@/components/ui/skeleton'

export default function CartItemSkeleton() {
  return (
    <div className="flex gap-4 py-2">
      {/* Thumbnail Image Skeleton */}
      <div className="relative w-24 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-secondary/20">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* Details Skeleton */}
      <div className="flex flex-col justify-between flex-1 py-1">
        <div className="space-y-2">
          {/* Title */}
          <div className="w-3/4 h-4">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
          {/* Size */}
          <div className="w-1/3 h-3">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
          {/* Color */}
          <div className="w-1/4 h-3">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
        </div>

        {/* Quantity Controls and Price */}
        <div className="flex items-center justify-between mt-4">
          <div className="w-24 h-8">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
          <div className="w-16 h-5">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
