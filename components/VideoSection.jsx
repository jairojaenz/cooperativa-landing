export default function VideoSection({
  title,
  description,
  srcWebm,
  srcMp4,
  poster,
}) {
  return (
    <section className="bg-background w-screen h-screen flex flex-col items-center justify-center pt-16 py-16 px-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
        {description && (
          <p className="mt-4  text-muted-foreground max-w-2xl mx-auto">{description}</p>
        )}
      </div>

      <div className="relative w-full h-[50vh] md:h-full">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-xl"
          muted
          controls
          playsInline
          preload="auto"
          poster={poster}
        >
          <source src={srcWebm} type="video/webm" />
          {srcMp4 && <source src={srcMp4} type="video/mp4" />}
          Tu navegador no soporta este video.
        </video>
      </div>
    </section>
  );
}
