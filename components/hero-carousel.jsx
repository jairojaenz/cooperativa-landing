"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

//importar imagenes de la carpeta src/images

import produccion_jamaica from "@/src/images/Produccion_jamaica.webp"
import apicultores from "@/src/images/Apicultores.webp"
import GrupoApicultores from "@/src/images/GrupoApicultores.webp"
import Produccion_miel from "@/src/images/Produccion_miel.webp"
import Jamaica from "@/src/images/Jamaica.webp"
import Fruto_Cafe from "@/src/images/Fruto_cafe.webp"
import procesando_jamaica from "@/src/images/Procesando_jamaica.webp"


const images = [
  {
    //add image src of folder src/images of root the project and alt text

    src: produccion_jamaica,
    alt: "Producción de jamaica",
  },
  {
    src: apicultores,
    alt: "Mujeres apicultoras en el campo",
    alt: "Productos orgánicos de la cooperativa",
  },
  {
    src: GrupoApicultores,
    alt: "Grupo de apicultores",
  },
  {
    src: Produccion_miel,
    alt: "Producción de miel",
  },
  {
    src: Jamaica,
    alt: "Producción de jamaica",
  },
  {
    src: Fruto_Cafe,
    alt: "Fruto de café",
  },
  {
    src: procesando_jamaica,
    alt: "Procesando jamaica",
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
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  return (
    <div
      className="relative w-full h-[700px]  overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
     
      {/* Carousel images */}
      <div className="relative h-full w-full">
     <div className="absolute top-2/4 left-2/4 flex-col gap-4 z-10 w-full flex justify-center px-6 text-center transform -translate-x-2/4 -translate-y-2/4">

     <h1
  className="text-4xl font-bold tracking-tighter lg:text-6xl"
  style={{ textShadow: "12 16px 42px rgba(0,0,0,0.9)" }}
>
  Productos del campo <span className="text-primary"
  >cultivados por mujeres</span>
      </h1>
               <h2 className="text-shadow-lg/30 text-lg font-bold"
               style={{ textShadow: "12 8px 32px rgba(0,0,0,0.9)" }}>
                Apoya a nuestra cooperativa de mujeres trabajadoras del campo y disfruta de productos orgánicos, frescos
                y de alta calidad.
              </h2>
      </div>
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-90",
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

