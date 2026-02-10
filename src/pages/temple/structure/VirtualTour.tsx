import { motion } from "framer-motion";
import { Play, Pause, Maximize, RotateCcw, MapPin, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRef, useState } from "react";
import virtualTourVideo from "@/assets/virtual-tour.mp4";

const tourStops = [
  { name: "Main Entrance (Gopuram)", time: 0, description: "The towering gateway adorned with intricate sculptures" },
  { name: "Prakaram (Corridor)", time: 2, description: "Sacred circumambulation path around the sanctum" },
  { name: "Mandapam (Hall)", time: 4, description: "Pillared hall for ceremonies and gatherings" },
  { name: "Garbhagriha (Sanctum)", time: 6, description: "The innermost sanctum housing the presiding deity" },
  { name: "Shrine Complex", time: 8, description: "Sub-shrines dedicated to associated deities" },
];

const VirtualTour = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStop, setActiveStop] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const jumpToStop = (index: number) => {
    setActiveStop(index);
    if (videoRef.current) {
      videoRef.current.currentTime = tourStops[index].time;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleFullscreen = () => {
    videoRef.current?.requestFullscreen();
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setActiveStop(0);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" />
              Virtual Temple Tour
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Experience the sacred spaces of the temple through an immersive walkthrough
            </p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <MapPin className="h-3 w-3" /> 5 Stops
          </Badge>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="overflow-hidden border-2 border-primary/10">
            <div className="relative bg-black rounded-t-lg overflow-hidden">
              <video
                ref={videoRef}
                src={virtualTourVideo}
                className="w-full aspect-video object-cover"
                onEnded={() => setIsPlaying(false)}
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    const t = videoRef.current.currentTime;
                    const idx = [...tourStops].reverse().findIndex(s => t >= s.time);
                    if (idx !== -1) setActiveStop(tourStops.length - 1 - idx);
                  }
                }}
              />
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                  onClick={togglePlay}
                >
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl">
                    <Play className="h-8 w-8 text-primary-foreground ml-1" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 p-3 bg-card border-t border-border">
              <Button size="sm" variant="ghost" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="ghost" onClick={handleRestart}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">
                <span className="text-sm font-medium text-foreground">
                  {tourStops[activeStop].name}
                </span>
              </div>
              <Button size="sm" variant="ghost" onClick={handleFullscreen}>
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Tour Stops */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Tour Stops</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {tourStops.map((stop, i) => (
                <button
                  key={i}
                  onClick={() => jumpToStop(i)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    activeStop === i
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-muted border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        activeStop === i
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{stop.name}</div>
                      <div className="text-xs text-muted-foreground">{stop.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VirtualTour;
