import { useState } from "react";
import Intro from "../../assets/intro-video.png"; // adjust path as needed


export default function IntroVideoSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section id="intro" className="py-20 bg-white dark:bg-gray-900">
  <div className="container mx-auto px-4">
    <div className="text-center max-w-xl mx-auto mb-12">
      <h6 className="text-primary dark:text-blue-400 font-semibold text-sm uppercase mb-2">
        Intro Video
      </h6>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Watch Our Intro Video
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        There are many variations of passages of Lorem Ipsum...
      </p>
    </div>

    <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
      <img
        src={Intro}
        alt="Intro video"
        className="w-full h-auto object-cover aspect-video"
      />
      <button
        onClick={() => setShowVideo(true)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-primary text-primary-color dark:bg-blue-500 dark:text-white 
        w-20 h-20 rounded-full flex items-center justify-center text-4xl bg-white
        shadow-md hover:bg-white hover:text-blue-600 dark:hover:bg-white dark:hover:text-blue-600 
        transition-all duration-300"
      >
        <i className="lni lni-play" />
      </button>
    </div>
  </div>

  {showVideo && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl px-4">
        <button
          onClick={() => setShowVideo(false)}
          className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
        >
          &times;
        </button>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Intro Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-[500px] rounded-xl"
          />
        </div>
      </div>
    </div>
  )}
</section>

  );
}
