import Navigation from "@/components/Navigation";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Gallery />
      <Contact />
    </div>
  );
};

export default GalleryPage;
