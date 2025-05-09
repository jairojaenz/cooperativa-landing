"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const images = [
  {
    src: "https://www.el19digital.com/files/articulos/329998.jpg",
    alt: "Mujeres trabajando en el campo",
  },
  {
    src: "https://www.el19digital.com/files/notas/source/2022/Junio/07Jun/esteli/COOPERATIVA_4.jpg",
    alt: "Productos orgánicos de la cooperativa",
  },
  {
    src: "https://www.el19digital.com/files/notas/source/2022/Junio/07Jun/esteli/COOPERATIVA_2.jpg",
    alt: "Cosecha de productos frescos",
  },
  {
    src: "https://www.el19digital.com/files/notas/source/2022/Junio/07Jun/esteli/COOPERATIVA_3.jpg",
    alt: "Comunidad de mujeres agricultoras",
  },
]

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }, [])

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index)
  }, [])

  // Autoplay functionality
  useEffect(() => {
    let interval

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, nextSlide])

  // Pause autoplay when user interacts with carousel
  const handleInteraction = () => {
    setIsAutoPlaying(false)
    // Resume autoplay after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background/30 z-10 
      absolute top-0 left-0 w-full flex justify-center py-6">
      <h1 className= "text-4xl font-bold sm:text-3xl md:text-4xl text-primary">Cooperativa Multisectorial Tierra Nuestra</h1>
      </div>
      <div className="absolute inset-0   z-10
      absolute top-20 left-0 w-full flex justify-center py-10">
      <h2 className= "text-4xl font-bold sm:text-2xl md:text-3xl text-primary">Las Diosas R,L</h2>
      </div>


      {/* Carousel images */}
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentIndex ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={() => {
          prevSlide()
          handleInteraction()
        }}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/50 p-2 text-foreground backdrop-blur-sm transition-all hover:bg-background/80"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={() => {
          nextSlide()
          handleInteraction()
        }}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/50 p-2 text-foreground backdrop-blur-sm transition-all hover:bg-background/80"
        aria-label="Imagen siguiente"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              goToSlide(index)
              handleInteraction()
            }}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentIndex ? "w-8 bg-primary" : "bg-background/50 hover:bg-background/80",
            )}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

