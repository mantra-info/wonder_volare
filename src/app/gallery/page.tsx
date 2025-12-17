import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react"; // npm install lucide-react
import Header from "@/components/Layout/Header";
import Footer from "@/components/Footer";
import BookRideButton from "@/components/Booking/BookRidButton";
import PageBreadcrumb from "@/components/BreadCrumb";

export default function GalleryPage() {
  // Simulating the repeating pattern of images seen in the screenshot
  // using Unsplash IDs that match the visual themes.
  const baseImages = [
    {
      id: 1,
      alt: "Red and blue balloon in clouds",
      src: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?q=80&w=2948&auto=format&fit=crop",
    },
    {
      id: 2,
      alt: "Balloon over jungle mist",
      src: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2787&auto=format&fit=crop",
    },
    {
      id: 3,
      alt: "Balloon at sunset",
      src: "https://images.unsplash.com/photo-1504505278-831620025756?q=80&w=2940&auto=format&fit=crop",
    },
    {
      id: 4,
      alt: "Balloon over mountains at dawn",
      src: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2911&auto=format&fit=crop",
    },
    {
      id: 5,
      alt: "Blue and orange balloon",
      src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2940&auto=format&fit=crop",
    },
    {
      id: 6,
      alt: "Looking up into a balloon basket",
      src: "https://images.unsplash.com/photo-1473280025148-b4d241957469?q=80&w=2940&auto=format&fit=crop",
    },
  ];

  // The screenshot shows the set repeated 3 times
  const galleryImages = [...baseImages, ...baseImages, ...baseImages];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* Top Navigation Strip */}

      {/* Breadcrumb Strip */}
      <PageBreadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 relative">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8">
          Moments from the Sky
        </h1>

        {/* Floating CTA Button */}
        {/* 
           Positioned absolutely relative to the container for the specific 
           placement seen in the image, or fixed for better UX. 
           Here I used sticky/fixed positioning for usability.
        */}
        <div className="fixed bottom-8 right-8 z-50 animate-bounce-slow">
          <BookRideButton mode="inline" />
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="relative aspect-[4/3] group overflow-hidden rounded-xl bg-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgM7WB6kAAAAASUVORK5CYII="
              />

              {/* Optional: Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
