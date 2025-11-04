import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const videoTestimonials = [
  {
    id: 1,
    parentName: "Priya Sharma",
    thumbnail: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80",
    videoUrl: "/MV1.mp4",
    duration: "1:45"
  },
  {
    id: 2,
    parentName: "Rajesh Patel",
    thumbnail: "https://images.unsplash.com/photo-1560421683-6856ea585c78?auto=format&fit=crop&w=600&q=80",
    videoUrl: "/MV2.mp4",
    duration: "2:10"
  },
  {
    id: 3,
    parentName: "Meera Desai",
    thumbnail: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?auto=format&fit=crop&w=600&q=80",
    videoUrl: "/MV3.mp4",
    duration: "1:30"
  },
  {
    id: 4,
    parentName: "Amit Kumar",
    thumbnail: "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=600&q=80",
    videoUrl: "/MV4.mp4",
    duration: "2:00"
  },
  {
    id: 5,
    parentName: "Neha Agarwal",
    thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
    videoUrl: "/MV5.mp4",
    duration: "1:55"
  }
];

const VideoThumbnail = ({ video, onClick }: { video: typeof videoTestimonials[0], onClick: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Load the video and seek to 0.1 seconds to show first frame
      videoRef.current.currentTime = 0.1;
    }
  }, []);

  return (
    <div className="relative aspect-[9/16] bg-black cursor-pointer" onClick={onClick}>
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-full object-cover"
        preload="metadata"
        muted
        playsInline
      />
    </div>
  );
};

const VideoTestimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState<typeof videoTestimonials[0] | null>(null);

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Video
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Testimonials</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear directly from parents about their experience with our preschool.
            </p>
          </div>

          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-6 pb-4">
              {videoTestimonials.map((video, index) => (
                <Card
                  key={video.id}
                  className="inline-block w-[350px] overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <VideoThumbnail video={video} onClick={() => setSelectedVideo(video)} />


                  <div className="p-4">
                    <p className="font-semibold text-foreground">{video.parentName}</p>
                    <p className="text-sm text-muted-foreground">Parent Testimonial</p>
                  </div>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Scroll horizontally to view more testimonials →
          </p>
        </div>

        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-[95vw] md:max-w-[500px] p-0 overflow-hidden bg-black border-none">
            {selectedVideo && (
              <div className="relative aspect-[9/16]">
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
};

export default VideoTestimonials;
