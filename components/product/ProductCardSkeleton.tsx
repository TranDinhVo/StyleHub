'use client'

import { Skeleton } from '@/components/ui/skeleton'

interface ProductCardSkeletonProps {
  variant?: 'grid' | 'list'
}

export default function ProductCardSkeleton({ variant = 'grid' }: ProductCardSkeletonProps) {
  const isList = variant === 'list'

  return (
    <div
      className={`group bg-white rounded-xl overflow-hidden shadow-sm border border-secondary/20 ${
        isList ? 'flex flex-row min-h-[180px]' : 'flex flex-col h-full'
      }`}
    >
      {/* Image Block */}
      <div
        className={`relative overflow-hidden bg-secondary/30 shrink-0 ${
          isList ? 'w-36 sm:w-44 md:w-52 min-h-[180px]' : 'w-full aspect-[3/4]'
        }`}
      >
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* Content Details Block */}
      <div className={`flex-1 flex flex-col ${isList ? 'p-4 sm:p-6' : 'p-4'} space-y-3`}>
        {/* Category Tag */}
        <div className="w-16 h-3">
          <Skeleton className="w-full h-full rounded-full" />
        </div>

        {/* Title */}
        <div className="w-3/4 h-5">
          <Skeleton className="w-full h-full rounded-md" />
        </div>

        {/* Price and Rating Row */}
        <div
          className={`flex items-center gap-3 pt-3 ${
            isList ? 'flex-wrap' : 'justify-between border-t border-secondary/30'
          }`}
        >
          {/* Price */}
          <div className="w-16 h-5">
            <Skeleton className="w-full h-full rounded-md" />
          </div>

          {/* Rating */}
          <div className="w-12 h-4">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
        </div>

        {/* List layout CTA Button skeleton */}
        {isList && (
          <div className="w-full sm:w-32 sm:ml-auto h-10 mt-auto">
            <Skeleton className="w-full h-full rounded-full" />
          </div>
        )}
      </div>
    </div>
  )
}
