/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetReviewsQuery } from "@/redux/featured/reviews/reviews"

const getInitials = (name : any) => {
  return name
    .split(' ')
    .map((word: string) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function TestimonialsSection() {
  const { data } = useGetReviewsQuery()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const testimonials = data || []

  useEffect(() => {
    if (!isAutoPlay || testimonials.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000) 

    return () => clearInterval(interval)
  }, [isAutoPlay, testimonials.length])

  useEffect(() => {
    if (currentIndex >= testimonials.length) {
      setCurrentIndex(0)
    }
  }, [testimonials.length, currentIndex])

  // Don't render if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return null
  }
  
  const currentTestimonial = testimonials[currentIndex]
  const prevIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
  const nextIndex = (currentIndex + 1) % testimonials.length

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 lg:mb-6">
          World-class customer stories
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
          See how our platform has helped businesses like yours. Our solutions are easy to onboard new users, as easy to
          scale, and as easy to customize to your own workflow, process, team, clientele, and changing environment.
        </p>
      </div>

      {/* Testimonial Cards Container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* Main Testimonial Card */}
        <div className="flex justify-center">
          <Card className="bg-card border border-border rounded-2xl p-6 sm:p-8 lg:p-10 max-w-2xl w-full shadow-sm transition-all duration-500 ease-in-out">
            {/* Stars */}
            <div className="flex justify-center mb-6">
              <div className="flex gap-1">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-foreground mb-6">
              {currentTestimonial.title}
            </h3>

            {/* Review Text */}
            <p className="text-center text-foreground text-base sm:text-lg leading-relaxed mb-8">
              {currentTestimonial.description}
            </p>

            {/* Customer Profile */}
            <div className="flex items-center justify-center gap-3">
              <Avatar className="w-12 h-12 sm:w-14 sm:h-14">
                <AvatarImage 
                  src={currentTestimonial.userInfo?.image } 
                  alt={currentTestimonial.userInfo?.name } 
                />
                <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
                  {getInitials(currentTestimonial.userInfo?.name)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-foreground text-sm sm:text-base">
                  {currentTestimonial.userInfo?.name}
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {currentTestimonial.userInfo?.role }
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Side Cards (Partially Visible) */}
          <div className="hidden lg:block">
            {/* Left Card */}
            <Card className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-card/50 border border-border/50 rounded-2xl p-8 w-80 opacity-30 transition-all duration-500 ease-in-out">
              <div className="flex justify-center mb-6">
                <div className="flex gap-1">
                  {[...Array(testimonials[prevIndex].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-foreground mb-4">
                {testimonials[prevIndex].title}
              </h3>
              <p className="text-center text-foreground text-sm leading-relaxed mb-6">
                {testimonials[prevIndex].description.substring(0, 100)}...
              </p>
            </Card>

            {/* Right Card */}
            <Card className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-card/50 border border-border/50 rounded-2xl p-8 w-80 opacity-30 transition-all duration-500 ease-in-out">
              <div className="flex justify-center mb-6">
                <div className="flex gap-1">
                  {[...Array(testimonials[nextIndex].rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-foreground mb-4">
                {testimonials[nextIndex].title}
              </h3>
              <p className="text-center text-foreground text-sm leading-relaxed mb-6">
                {testimonials[nextIndex].description.substring(0, 100)}...
              </p>
            </Card>
          </div>
      </div>

      {/* Navigation Dots  */}
        <div className="flex justify-center mt-12 lg:mt-16">
          <div className="flex gap-2">
            {testimonials.map((_ : any, index : any) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlay(false)
                  setTimeout(() => setIsAutoPlay(true), 3000) 
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
    </section>
  )
}