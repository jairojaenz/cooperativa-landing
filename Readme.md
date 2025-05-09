# Cooperativa Multisectorial Tierra Nuestra

Este proyecto es una página web diseñada para la **Cooperativa Multisectorial Tierra Nuestra**, también conocida como **Las Diosas R.L.**. La página tiene como objetivo destacar los productos y servicios ofrecidos por la cooperativa, así como promover su misión y valores.

## Características principales

- **Carrusel de imágenes**: Un carrusel interactivo que muestra imágenes representativas de la cooperativa, sus productos y su comunidad.
- **Modal de detalles del producto**: Una ventana emergente que muestra información detallada sobre los productos, incluyendo descripción, precio, disponibilidad y beneficios.
- **Diseño responsivo**: La página está optimizada para dispositivos móviles, tabletas y computadoras de escritorio.
- **Temas personalizables**: Incluye un interruptor de tema para cambiar entre modos claro y oscuro.

## Estructura del proyecto

```El proyecto está organizado de la siguiente manera:
├── app/ │
├── globals.css # Estilos globales 
│ ├── layout.jsx # Diseño principal de la aplicación 
│ └── page.jsx # Página principal 
├── components/ │ 
├── hero-carousel.jsx # Componente del carrusel de imágenes │ 
├── product-detail-modal.jsx # Modal para detalles de productos │ 
├── theme-provider.jsx # Proveedor de temas 
│ └── ui/ # Componentes reutilizables de la interfaz de usuario 
├── hooks/ │ 
├── use-mobile.jsx # Hook para detectar dispositivos móviles 
│ └── use-toast.js # Hook para notificaciones 
├── lib/ │ └── utils.js # Utilidades generales 
├── public/ # Archivos públicos como imágenes y fuentes ├── styles/ # Archivos de estilos adicionales 
├── tailwind.config.js # Configuración de Tailwind CSS ├── tsconfig.json # Configuración de TypeScript 
└── package.json # Dependencias y scripts del proyecto```


## Tecnologías utilizadas

- **Next.js**: Framework para aplicaciones web basado en React.
- **React**: Biblioteca para construir interfaces de usuario.
- **Tailwind CSS**: Framework de utilidades para estilos.
- **Lucide Icons**: Conjunto de íconos SVG.
- **PNPM**: Gestor de paquetes rápido y eficiente.

## Instalación y configuración

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd cooperativa-landing```

2.  Instala las dependencias:
    ```pnpm install```

3.   Inicia el servidor de desarrollo:
        ```pnpm dev```

4. Abre la aplicación en tu navegador en http://localhost:3000.

Scripts disponibles
pnpm dev: Inicia el servidor de desarrollo.
pnpm build: Construye la aplicación para producción.
pnpm start: Inicia el servidor en modo producción.
pnpm lint: Ejecuta el linter para verificar errores en el código.
Contribuciones
Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección de errores:
git checkout -b feature/nueva-funcionalidad
3. Realiza tus cambios y haz un commit:
git commit -m "Agrega nueva funcionalidad"
4. Envía tus cambios al repositorio remoto:
git push origin feature/nueva-funcionalidad
5. Abre un pull request en GitHub.


Contacto
Para más información sobre la cooperativa, visita nuestra página oficial o contáctanos a través de nuestras redes sociales.

Cooperativa Multisectorial Tierra Nuestra - Las Diosas R.L.