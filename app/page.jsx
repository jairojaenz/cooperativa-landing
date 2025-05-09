"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronRight, ChevronUp, Leaf, MapPin, MessageSquare, ShoppingBag, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import HeroCarousel from "@/components/hero-carousel"
import { ThemeSwitch } from "@/components/theme-switch"
import { ProductDetailModal, ProductDetails } from "@/components/product-detail-modal"
import Socias_cooperativa from "@/src/images/Socias_cooperativa.webp"
// Datos de productos
const products = [
  {
    id: "rosa-jamaica",
    name: "Rosa de jamaica",
    description:
      "Hierbas frescas para cocina y remedios naturales. La rosa de jamaica es conocida por su sabor único y propiedades medicinales.",
    price: "C$25/Vaso",
    availability: "Según temporada",
    image: "https://www.prensalibre.com/wp-content/uploads/2020/07/ACE-ROSA-DE-JAMAICA-1.jpg?quality=52",
    provider: {
      name: "María Rodríguez",
      location: "Comunidad El Jocote, Condega",
      experience: "15 años cultivando hierbas medicinales",
    },
    benefits: [
      "Rica en antioxidantes y vitamina C",
      "Ayuda a reducir la presión arterial",
      "Propiedades diuréticas naturales",
      "Fortalece el sistema inmunológico",
      "Cultivada sin pesticidas ni químicos dañinos",
    ],
  },
  {
    id: "miel-abeja",
    name: "Miel de abeja",
    description:
      "Miel pura de abeja producida de manera sostenible. Nuestras abejas polinizan cultivos orgánicos, lo que resulta en una miel de alta calidad con sabor excepcional.",
    price: "C$60/Litro",
    availability: "Todo el año",
    image:
      "https://okdiario.com/img/2022/10/04/esta-es-la-diferencia-que-deberias-saber-entre-la-miel-de-abeja-y-la-miel-de-flores.jpg",
    provider: {
      name: "Juana Pérez",
      location: "Comunidad Las Segovias, Condega",
      experience: "8 años como apicultora certificada",
    },
    benefits: [
      "Propiedades antibacterianas y antiinflamatorias",
      "Fuente natural de energía",
      "Ayuda a aliviar la tos y el dolor de garganta",
      "Producida con prácticas sostenibles que protegen a las abejas",
      "Sin aditivos ni conservantes",
    ],
  },
  {
    id: "cafe-organico",
    name: "Café Orgánico",
    description:
      "Café de altura cultivado bajo sombra por nuestras productoras. Nuestro café se cultiva entre 1,200 y 1,500 metros sobre el nivel del mar, lo que le da un sabor excepcional y notas únicas.",
    price: "C$80/Paquete",
    availability: "Según temporada",
    image: "https://www.vostv.com.ni/media/news/84976cc45f2b11efa46f567103a612d1.jpeg",
    provider: {
      name: "Carmen Gutiérrez",
      location: "Comunidad San Juan, Condega",
      experience: "12 años en cultivo de café de especialidad",
    },
    benefits: [
      "Cultivado bajo sombra, lo que protege la biodiversidad",
      "Menor acidez que el café convencional",
      "Rico en antioxidantes",
      "Producido sin pesticidas ni fertilizantes químicos",
      "Apoya directamente a familias de mujeres agricultoras",
    ],
  },
  {
    id: "frijoles-rojos",
    name: "Frijoles Rojos",
    description:
      "Frijoles rojos cultivados de manera tradicional. Nuestros frijoles son seleccionados a mano para garantizar la mejor calidad y sabor en cada grano.",
    price: "C$35/kg",
    availability: "Todo el año",
    image:
      "https://media.istockphoto.com/id/541972824/es/foto/frijol-rojo-en-utensilios-de-cocina-rurales.jpg?s=612x612&w=0&k=20&c=X7XT6OnB2lRbjAzb2qNSGqm6NWEvoMWxbf-4fNE2Bi8=",
    provider: {
      name: "Luisa Martínez",
      location: "Comunidad El Bramadero, Condega",
      experience: "20 años cultivando granos básicos",
    },
    benefits: [
      "Alto contenido de proteínas y fibra",
      "Fuente importante de hierro y otros minerales",
      "Cultivados sin agroquímicos",
      "Semillas criollas adaptadas al clima local",
      "Parte esencial de la dieta tradicional nicaragüense",
    ],
  },
  {
    id: "maiz-criollo",
    name: "Maíz Criollo",
    description:
      "Maíz criollo para tortillas y otros platillos tradicionales. Nuestro maíz conserva las variedades ancestrales que han sido cultivadas por generaciones.",
    price: "C$20/kg",
    availability: "Según temporada",
    image: "https://blog.cambiagro.com/wp-content/uploads/2024/12/pexels-franco30-3973024-1024x682.jpg",
    provider: {
      name: "Ana Sánchez",
      location: "Comunidad Santa Teresa, Condega",
      experience: "15 años preservando semillas criollas",
    },
    benefits: [
      "Mayor valor nutricional que las variedades comerciales",
      "Semillas adaptadas a las condiciones locales",
      "Resistente a plagas y enfermedades de forma natural",
      "Preserva la biodiversidad agrícola",
      "Ideal para la elaboración de tortillas y otros platillos tradicionales",
    ],
  },
  {
    id: "cacao",
    name: "Cacao",
    description:
      "Cacao cultivado con prácticas sostenibles. Nuestro cacao es fermentado y secado con métodos tradicionales para desarrollar su sabor complejo y aromático.",
    price: "C$30/kg",
    availability: "Todo el año",
    image: "https://www.faborit.com/wp-content/uploads/2020/07/blog-cacao-chocolate-planta.jpg",
    provider: {
      name: "Elena Flores",
      location: "Comunidad El Coyolito, Condega",
      experience: "10 años en cultivo y procesamiento de cacao",
    },
    benefits: [
      "Rico en antioxidantes y minerales",
      "Cultivado bajo sistemas agroforestales",
      "Contribuye a la conservación de bosques",
      "Procesado artesanalmente",
      "Ideal para la elaboración de chocolate y otros productos derivados",
    ],
  },
  {
    id: "chiltoma",
    name: "Chiltoma",
    description:
      "Chiltomas frescas cultivadas en huertos de patio. Nuestras chiltomas son cultivadas con técnicas orgánicas que garantizan su sabor y frescura.",
    price: "C$40/kg",
    availability: "Según temporada",
    image: "https://inta.gob.ni/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-01-at-12.53.51-PM.jpeg",
    provider: {
      name: "Rosa Mendoza",
      location: "Comunidad Venecia, Condega",
      experience: "7 años en agricultura urbana y periurbana",
    },
    benefits: [
      "Alto contenido de vitamina C y antioxidantes",
      "Cultivadas sin pesticidas químicos",
      "Cosechadas en su punto óptimo de madurez",
      "Contribuye a la economía familiar",
      "Frescas y con mejor sabor que las convencionales",
    ],
  },
  {
    id: "tomates-organicos",
    name: "Tomates Orgánicos",
    description:
      "Tomates cultivados sin pesticidas en huertos familiares. Nuestros tomates son variedades locales con un sabor intenso y dulce.",
    price: "C$45/kg",
    availability: "Todo el año",
    image: "https://sembralia.com/cdn/shop/articles/tomate.jpg?v=1648560931",
    provider: {
      name: "Sofía Gómez",
      location: "Comunidad Los Cerritos, Condega",
      experience: "9 años en producción orgánica de hortalizas",
    },
    benefits: [
      "Rico en licopeno y antioxidantes",
      "Cultivado con abonos orgánicos",
      "Sin residuos de pesticidas",
      "Variedades locales con mejor sabor",
      "Cosechados en su punto óptimo de madurez",
    ],
  },
  {
    id: "cebolla",
    name: "Cebolla",
    description:
      "Cebollas frescas cultivadas en huertos familiares. Nuestras cebollas son conocidas por su sabor intenso y propiedades medicinales.",
    price: "C$35/kg",
    availability: "Según temporada",
    image: "https://www.editorialderiego.com/wp-content/uploads/2024/02/Cebolla_02.jpg",
    provider: {
      name: "Teresa Jiménez",
      location: "Comunidad San Diego, Condega",
      experience: "11 años cultivando hortalizas orgánicas",
    },
    benefits: [
      "Rica en compuestos de azufre con propiedades medicinales",
      "Cultivada con métodos orgánicos",
      "Cosechada en su punto óptimo",
      "Mayor tiempo de conservación que las convencionales",
      "Sabor más intenso y aromático",
    ],
  },
]

// Productos iniciales a mostrar (los primeros 3)
const initialProducts = products.slice(0, 3)
// Productos adicionales (granos básicos)
const grainsProducts = products.slice(3, 6)
// Productos adicionales (huertos de patio)
const gardenProducts = products.slice(6, 9)

export default function LandingPage() {
  const [showMoreProducts, setShowMoreProducts] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleShowMoreProducts = () => {
    setShowMoreProducts(!showMoreProducts)

    // Si estamos mostrando más productos, desplazarse a la sección de productos adicionales
    if (!showMoreProducts) {
      setTimeout(() => {
        document.getElementById("productos-adicionales")?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      // Si estamos ocultando productos, desplazarse a la sección de productos
      setTimeout(() => {
        document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  const openProductModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Barra de navegación */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold text-primary">COMTINUE</span>
            
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#inicio" className="text-sm font-medium hover:text-primary transition-colors">
              Inicio
            </a>
            <a href="#nosotras" className="text-sm font-medium hover:text-primary transition-colors">
              Nosotras
            </a>
            <a href="#productos" className="text-sm font-medium hover:text-primary transition-colors">
              Productos
            </a>
            <a href="#testimonios" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonios
            </a>
            <a href="#certificaciones" className="text-sm font-medium hover:text-primary transition-colors">
              Certificaciones
            </a>
            <a href="#contacto" className="text-sm font-medium hover:text-primary transition-colors">
              Contacto
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeSwitch />
            <Button size="sm" className="hidden md:flex">
              Regístrate
            </Button>
            <Button variant="outline" size="icon" className="md:hidden">
              <span className="sr-only">Menú</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Sección Hero */}
        <section id="inicio" className="relative overflow-hidden container:py-12 md:py-24 lg:py-32">
          {/* Elementos decorativos de fondo */}
          <div className="absolute -top-80 -left-32 w-[600px] h-[600px] rounded-full bg-primary/90 blur-xl opacity-20 -z-10 animate-move-diagonal"></div>
          <div className="absolute top-40 -right-32 w-[600px] h-[600px] rounded-full bg-secondary/90 blur-xl opacity-20 -z-10 animate-move-vertical"></div>
          <div className="absolute -bottom-35 left-1/4 w-[800px] h-[800px] rounded-full bg-accent/90 blur-lg opacity-30 -z-10 animate-move-diagonal"></div>

          <div className="absolute top-30 -right-10 w-[100px] h-[100px] rounded-full bg-primary/90 blur-xl opacity-50 -z-10 animate-move-vertical"></div>
          <div className="absolute top-80 left-0 w-[100px] h-[100px] rounded-full bg-secondary/90 blur-xl opacity-50 -z-10 animate-move-vertical"></div>
          <div className="absolute -bottom-35 left-1/2 w-[100px] h-[100px] rounded-full bg-secondary/90 blur-xl opacity-50 -z-10 animate-move-diagonal"></div>

          <div className="absolute top-50 -right-90 w-[64px] h-[64px] rounded-full bg-primary/90 blur-xl opacity-30 -z-10 animate-move-diagonal"></div>
          <div className="absolute top-10 left-80 w-[64px] h-[64px] rounded-full bg-secondary/90 blur-xl opacity-30 -z-10 animate-move-diagonal"></div>
          <div className="absolute -bottom-65 left-1/6 w-[64px] h-[64px] rounded-full bg-accent/90 blur-xl opacity-30 -z-10 animate-move-diagonal"></div>

          <div className="container flex flex-col items-center gap-4 py-12 text-center md:py-24 relative z-10">
            <div className="space-y-4">
              <h1 className="text-xl font-bold tracking-tighter sm:text-3xl md:text-6xl">
                Productos del campo <span className="text-primary">cultivados por mujeres</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Apoya a nuestra cooperativa de mujeres trabajadoras del campo y disfruta de productos orgánicos, frescos
                y de alta calidad.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                onClick={() => {
                  document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Ver productos
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  document.getElementById("nosotras")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Conoce nuestra historia
              </Button>
            </div>
          </div>
          <HeroCarousel />
        </section>

        {/* Sección Nosotras */}
        <section id="nosotras" className="bg-muted/50 py-12 md:py-24 relative overflow-hidden">
          <div className="absolute -right-20 top-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl opacity-50 -z-10"></div>
          <div className="container grid gap-6 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Nuestra Historia
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Una cooperativa con propósito
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Somos un grupo de mujeres trabajadoras del campo unidas por la pasión de cultivar productos de calidad
                mientras generamos oportunidades para nuestras familias y comunidad.
              </p>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">33+</span>
                  <span className="text-muted-foreground">Mujeres</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">3+</span>
                  <span className="text-muted-foreground">Años</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">100%</span>
                  <span className="text-muted-foreground">Orgánico</span>
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    document.getElementById("nosotras")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Conoce a nuestras productoras
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] overflow-hidden rounded-lg md:h-auto">
              <Image
                src={Socias_cooperativa}
                alt="Mujeres trabajadoras de la cooperativa mostrando sus productos frescos"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Sección Productos */}
        <section id="productos" className="py-12 md:py-24 relative overflow-hidden">
          <div className="absolute -left-20 top-1/3 w-[350px] h-[350px] rounded-full bg-secondary/10 blur-3xl opacity-40 -z-10"></div>
          <div className="absolute right-0 bottom-0 w-[250px] h-[250px] rounded-full bg-primary/5 blur-3xl opacity-50 -z-10"></div>
          <div className="container space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestros Productos</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Descubre la variedad de productos cultivados con amor y dedicación por nuestras mujeres trabajadoras.
                <span className="block mt-2 text-sm font-medium text-primary">
                  *Precios informativos, sujetos a cambios según temporada y disponibilidad
                </span>
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {initialProducts.map((product) => (
                <div key={product.id} className="group relative overflow-hidden rounded-lg border">
                  <div className="relative h-[200px] w-full">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {/*<div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full font-bold">
                      {product.price}
                    </div>*/}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-primary">{product.name}</h3>
                    <p className="text-muted-foreground line-clamp-2">{product.description}</p>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                      <span className="font-medium">Disponibilidad:</span>
                      <span className="ml-2">{product.availability}</span>
                    </div>
                    <Button className="mt-4" variant="outline" onClick={() => openProductModal(product)}>
                      <ShoppingBag className="mr-2 h-4 w-4 text-amber-900" />
                      Ver detalles
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Productos adicionales que se muestran al hacer clic en "Ver catálogo completo" */}
            {showMoreProducts && (
              <div id="productos-adicionales" className="space-y-8 pt-8 transition-all duration-500 ease-in-out">
                <h3 className="text-2xl font-bold tracking-tighter text-center">Granos Básicos</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {grainsProducts.map((product) => (
                    <div key={product.id} className="group relative overflow-hidden rounded-lg border">
                      <div className="relative h-[200px] w-full">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full font-bold">
                          {/*product.price*/}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-primary">{product.name}</h3>
                        <p className="text-muted-foreground line-clamp-2">{product.description}</p>
                        <div className="mt-2 flex items-center text-sm text-muted-foreground">
                          <span className="font-medium">Disponibilidad:</span>
                          <span className="ml-2">{product.availability}</span>
                        </div>
                        <Button className="mt-4" variant="outline" onClick={() => openProductModal(product)}>
                          <ShoppingBag className="mr-2 h-4 w-4 text-amber-900" />
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-bold tracking-tighter text-center pt-8">Huertos de Patio</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {gardenProducts.map((product) => (
                    <div key={product.id} className="group relative overflow-hidden rounded-lg border">
                      <div className="relative h-[200px] w-full">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full font-bold">
                          {/*product.price*/}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-primary">{product.name}</h3>
                        <p className="text-muted-foreground line-clamp-2">{product.description}</p>
                        <div className="mt-2 flex items-center text-sm text-muted-foreground">
                          <span className="font-medium">Disponibilidad:</span>
                          <span className="ml-2">{product.availability}</span>
                        </div>
                        <Button className="mt-4" variant="outline" onClick={() => openProductModal(product)}>
                          <ShoppingBag className="mr-2 h-4 w-4 text-amber-900" />
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center">
              <Button size="lg" onClick={toggleShowMoreProducts}>
                {showMoreProducts ? (
                  <>
                    Ver menos productos
                    <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Ver catálogo completo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>

        {/* Sección Testimonios */}
        <section id="testimonios" className="bg-muted/50 py-12 md:py-24">
          <div className="container space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Lo que dicen nuestros clientes
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Testimonios de quienes han disfrutado de nuestros productos y apoyado nuestra causa.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonio 1 */}
              <div className="rounded-lg border bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-10 w-10 rounded-full bg-primary/10">
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary">
                      M
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold">María González</h3>
                    <p className="text-sm text-muted-foreground">Cliente frecuente</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "Los productos de la cooperativa son excepcionales. Puedo sentir el amor y dedicación en cada fruta y
                  verdura que compro."
                </p>
              </div>

              {/* Testimonio 2 */}
              <div className="rounded-lg border bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-10 w-10 rounded-full bg-primary/10">
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary">
                      J
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold">Juan Pérez</h3>
                    <p className="text-sm text-muted-foreground">Chef local</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "Como chef, valoro la calidad y frescura de los productos. La cooperativa me proporciona los mejores
                  ingredientes para mis platos."
                </p>
              </div>

              {/* Testimonio 3 */}
              <div className="rounded-lg border bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-10 w-10 rounded-full bg-primary/10">
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary">
                      L
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold">Laura Ramírez</h3>
                    <p className="text-sm text-muted-foreground">Tienda orgánica</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "Mis clientes siempre preguntan por los productos de la cooperativa. La calidad es consistente y el
                  impacto social es invaluable."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nueva Sección de Certificaciones y Exportaciones */}
        <section id="certificaciones" className="py-12 md:py-24 relative overflow-hidden">
          <div className="absolute -left-20 top-1/3 w-[350px] h-[350px] rounded-full bg-primary/10 blur-3xl opacity-40 -z-10"></div>
          <div className="absolute right-0 bottom-0 w-[250px] h-[250px] rounded-full bg-secondary/10 blur-3xl opacity-50 -z-10"></div>
          <div className="container space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Certificaciones y Exportaciones
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Nuestros productos cumplen con los más altos estándares de calidad y sostenibilidad, permitiéndonos
                exportar a mercados internacionales exigentes.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Certificaciones */}
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-6 w-6"
                  >
                    <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.11"></path>
                    <circle cx="12" cy="8" r="7"></circle>
                  </svg>
                  Certificaciones
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col items-center p-4 rounded-lg border bg-background/50 transition-all hover:bg-primary/5">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                        <path d="M12 6a1 1 0 0 0-1 1v5a1 1 0 0 0 .4.8l3 2.5a1 1 0 0 0 1.2-1.6L13 11.5V7a1 1 0 0 0-1-1z" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="M20 12h2" />
                        <path d="M2 12h2" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-lg">Certificación Orgánica</h4>
                    <p className="text-center text-muted-foreground text-sm mt-2">
                      Productos 100% orgánicos, cultivados sin pesticidas ni químicos dañinos.
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg border bg-background/50 transition-all hover:bg-primary/5">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <path d="M12 8v8" />
                        <path d="M8 12h8" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-lg">Comercio Justo</h4>
                    <p className="text-center text-muted-foreground text-sm mt-2">
                      Garantizamos precios justos y condiciones laborales dignas para nuestras productoras.
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg border bg-background/50 transition-all hover:bg-primary/5">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M7 18a4.6 4.4 0 0 1 0-9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                        <polyline points="9 15 12 12 15 15" />
                        <line x1="12" y1="12" x2="12" y2="21" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-lg">Sostenibilidad</h4>
                    <p className="text-center text-muted-foreground text-sm mt-2">
                      Prácticas agrícolas sostenibles que protegen el medio ambiente y la biodiversidad.
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg border bg-background/50 transition-all hover:bg-primary/5">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-lg">Impacto Social</h4>
                    <p className="text-center text-muted-foreground text-sm mt-2">
                      Empoderamiento de mujeres y desarrollo de comunidades rurales.
                    </p>
                  </div>
                </div>
              </div>

              {/* Exportaciones */}
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-6 w-6"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  Exportaciones Internacionales
                </h3>
                <p className="text-muted-foreground mb-6">
                  Nuestros productos de alta calidad son reconocidos y valorados en mercados internacionales exigentes,
                  permitiéndonos exportar a:
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex flex-col items-center p-4 rounded-lg border bg-background/50 transition-all hover:bg-primary/5">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <div className="w-10 h-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1/3 bg-black"></div>
                        <div className="absolute top-1/3 left-0 w-full h-1/3 bg-red-600"></div>
                        <div className="absolute top-2/3 left-0 w-full h-1/3 bg-yellow-400"></div>
                      </div>
                    </div>
                    <h4 className="font-bold text-lg">Alemania</h4>
                    <p className="text-center text-muted-foreground text-sm mt-2">
                      Mercado europeo con altos estándares de calidad orgánica.
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg border bg-background/50 transition-all hover:bg-primary/5">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <div className="w-10 h-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-blue-700"></div>
                        <div className="absolute top-0 left-0 w-3 h-3 bg-blue-800"></div>
                        <div className="absolute top-0 left-3 w-7 h-full flex flex-wrap">
                          {[...Array(7)].map((_, i) => (
                            <div key={i} className="w-full h-[14.28%] bg-red-600 odd:bg-white"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <h4 className="font-bold text-lg">Estados Unidos</h4>
                    <p className="text-center text-muted-foreground text-sm mt-2">
                      Creciente demanda de productos orgánicos y de comercio justo.
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg border bg-background/50 transition-all hover:bg-primary/5">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <div className="w-10 h-10 relative overflow-hidden bg-red-600 flex items-center justify-center">
                        <div className="w-6 h-2 bg-white"></div>
                        <div className="absolute w-2 h-6 bg-white"></div>
                      </div>
                    </div>
                    <h4 className="font-bold text-lg">Suiza</h4>
                    <p className="text-center text-muted-foreground text-sm mt-2">
                      Mercado que valora la calidad premium y la sostenibilidad.
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-lg bg-primary/5 border">
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-5 w-5 text-primary"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    ¿Sabías que?
                  </h4>
                  <p className="text-muted-foreground">
                    Nuestros productos son reconocidos internacionalmente por su calidad excepcional y el impacto
                    positivo que generan en las comunidades rurales de mujeres nicaragüenses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Contacto */}
        <section id="contacto" className="py-12 md:py-24">
          <div className="container grid gap-6 md:grid-cols-2 md:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contáctanos</h2>
              <p className="text-muted-foreground md:text-xl">
                ¿Tienes preguntas sobre nuestros productos o quieres hacer un pedido? Estamos aquí para ayudarte.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Comunidad Jocote, Condega</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+505 7603 4405</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-primary"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>info@cmtierranuestra.com</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <h3 className="mb-4 text-lg font-bold">Envíanos un mensaje</h3>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Asunto
                  </label>
                  <input
                    id="subject"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Asunto del mensaje"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tu mensaje"
                  ></textarea>
                </div>
                <Button className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Enviar mensaje
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Pie de página */}
      <footer className="border-t bg-muted/50">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-primary">CM</span>
              <span className="text-2xl font-bold">Tierra Nuestra</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2023 CM TierraNuestra. Todos los derechos reservados.</p>
          </div>
          <nav className="flex flex-wrap gap-4 md:gap-6">
            <a href="#inicio" className="text-sm font-medium hover:text-primary transition-colors">
              Inicio
            </a>
            <a href="#nosotras" className="text-sm font-medium hover:text-primary transition-colors">
              Nosotras
            </a>
            <a href="#productos" className="text-sm font-medium hover:text-primary transition-colors">
              Productos
            </a>
            <a href="#testimonios" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonios
            </a>
            <a href="#certificaciones" className="text-sm font-medium hover:text-primary transition-colors">
              Certificaciones
            </a>
            <a href="#contacto" className="text-sm font-medium hover:text-primary transition-colors">
              Contacto
            </a>
          </nav>
        </div>
      </footer>

      {/* Modal de detalles del producto */}
      <ProductDetailModal product={selectedProduct} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}

