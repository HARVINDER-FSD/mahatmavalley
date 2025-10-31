import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    url: "/DSCF0066-Edit.jpg",
    category: "Classroom",
    title: "Learning Environment"
  },
  {
    id: 2,
    url: "/DSCF0068-Edit.jpg",
    category: "Activities",
    title: "Creative Activities"
  },
  {
    id: 3,
    url: "/DSCF0085.jpg",
    category: "Outdoor",
    title: "Outdoor Play"
  },
  {
    id: 4,
    url: "/DSCF0110.jpg",
    category: "Activities",
    title: "Fun Learning"
  },
  {
    id: 5,
    url: "/DSCF0126.jpg",
    category: "Classroom",
    title: "Interactive Sessions"
  },
  {
    id: 6,
    url: "/DSCF0134.jpg",
    category: "Events",
    title: "Special Events"
  },
  {
    id: 7,
    url: "/DSCF0135.jpg",
    category: "Facilities",
    title: "School Facilities"
  },
  {
    id: 8,
    url: "/DSCF0153.jpg",
    category: "Activities",
    title: "Engaging Activities"
  },
  {
    id: 9,
    url: "/DSCF0166.jpg",
    category: "Outdoor",
    title: "Outdoor Fun"
  },
  {
    id: 10,
    url: "/DSCF0167.jpg",
    category: "Classroom",
    title: "Learning Spaces"
  },
  {
    id: 11,
    url: "/DSCF0183.jpg",
    category: "Facilities",
    title: "Modern Facilities"
  },
  {
    id: 12,
    url: "/DSCF0185.jpg",
    category: "Events",
    title: "Celebrations"
  },
  {
    id: 13,
    url: "/DSCF0198.jpg",
    category: "Activities",
    title: "Creative Play"
  },
  {
    id: 14,
    url: "/DSCF0202.jpg",
    category: "Classroom",
    title: "Classroom Activities"
  },
  {
    id: 15,
    url: "/DSCF0214.jpg",
    category: "Outdoor",
    title: "Outdoor Learning"
  },
  {
    id: 16,
    url: "/DSCF0223.jpg",
    category: "Activities",
    title: "Group Activities"
  },
  {
    id: 17,
    url: "/DSCF0265.jpg",
    category: "Events",
    title: "School Events"
  },
  {
    id: 18,
    url: "/DSCF0268.jpg",
    category: "Facilities",
    title: "Campus Facilities"
  },
  {
    id: 19,
    url: "/DSCF0277.jpg",
    category: "Classroom",
    title: "Learning Together"
  },
  {
    id: 20,
    url: "/DSCF0296.jpg",
    category: "Activities",
    title: "Hands-on Learning"
  },
  {
    id: 21,
    url: "/DSCF0301.jpg",
    category: "Outdoor",
    title: "Outdoor Adventures"
  },
  {
    id: 22,
    url: "/DSCF0304.jpg",
    category: "Events",
    title: "Special Moments"
  },
  {
    id: 23,
    url: "/DSCF0315.jpg",
    category: "Facilities",
    title: "School Infrastructure"
  },
  {
    id: 24,
    url: "/DSCF0319.jpg",
    category: "Activities",
    title: "Joyful Learning"
  }
];

const categories = ["All", "Classroom", "Activities", "Outdoor", "Facilities", "Events"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Gallery</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take a glimpse into our vibrant learning environment and happy moments
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white text-foreground hover:bg-primary/10 hover:scale-105'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <Card
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={image.url}
                    alt={image.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-sm font-medium mb-1">{image.category}</p>
                      <p className="text-lg font-bold">{image.title}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No images found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-4xl p-0 overflow-hidden bg-black border-none">
          {selectedImage && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300"
              >
                <X className="w-6 h-6 text-black" />
              </button>
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <p className="text-sm font-medium mb-1">{selectedImage.category}</p>
                <p className="text-2xl font-bold">{selectedImage.title}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gallery;
