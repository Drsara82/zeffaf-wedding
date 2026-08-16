import React, { useState, useRef } from "react";
import bgImg from "../../../assets/images/home/videoSection/shape.png";
import videoBTN from "../../../assets/images/icons/video_butto.svg";
import weddingVideo from "../../../assets/videos/wedding-highlights-demo.mp4";
import videoPoster from "../../../assets/images/home/videoSection/pexels-westernsydneyweddings-6266941.jpg";

export const VideoSection = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);

  const handlePlayVideo = () => {
    videoRef.current.play();
    setHasStarted(true);
  };

  return (
    <section
      className=" py-15 px-4
    bg-no-repeat
    bg-center
    bg-contain
    md:bg-left
    md:bg-contain"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
      }}
    >
      <p className="text-footer-green text-[20px] text-center font-sail mb-10">
        Wedding Ceremony
      </p>

      <div className="max-w-6xl mx-auto relative rounded-xl overflow-hidden bg-black">
        {!hasStarted && <div className="absolute inset-0 bg-black/20 z-10" />}

        <video
          ref={videoRef}
          controls={hasStarted}
          poster={videoPoster}
          className="w-full h-[320px] md:h-[500px] object-cover"
        >
          <source src={weddingVideo} type="video/mp4" />
        </video>

        {!hasStarted && (
          <button
            onClick={handlePlayVideo}
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <img
              src={videoBTN}
              alt="Play Video"
              className="w-28 h-28 md:w-20 md:h-20 hover:scale-110 transition"
            />
          </button>
        )}
      </div>
    </section>
  );
};
