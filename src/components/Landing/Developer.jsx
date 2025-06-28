import Dev from "../../assets/pic2.jpg"; // Adjust the path if needed

export default function Developer() {
  return (
    <section id="developer" className="py-20 bg-white dark:bg-gray-900">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h6 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
            Meet the Developer
          </h6>
          <p className="text-gray-600 dark:text-gray-300">
            Passionate about clean code and functional design, Hemanth Dommeti is the core developer behind this attendance system—turning ideas into impactful digital solutions.
          </p>
        </div>

        <div className="flex justify-center lm:ml-30" onClick={() => (window.location.href = "https://hemanthdommeti.me")}>
          <div className="group bg-gray-50 dark:bg-gray-800 rounded-xl px-8 py-12 shadow-md hover:shadow-xl transition duration-300 text-center w-full max-w-sm">
            <div className="relative mx-auto w-32 h-32 mb-6">
              <img
                src={Dev}
                alt="Hemanth Dommeti"
                className="rounded-full object-cover w-full h-full border-4 border-white dark:border-gray-700"
              />
              {/* Decorative Hover Circles */}
              <span className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
              <span className="absolute top-0 right-0 w-8 h-8 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
              Hemanth Dommeti
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              Full Stack Developer
            </p>
            <div className="flex justify-center space-x-5 text-gray-400 dark:text-gray-300">
              <a href="https://hemanthdommeti.me" target="_blank" rel="noreferrer" className="hover:text-pink-500">
                <i className="lni lni-link"></i>
              </a>
              <a href="https://github.com/Hemanth1551" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                <i className="lni lni-github-original"></i>
              </a>
              <a href="https://www.linkedin.com/in/hemanth-dommeti-039092308/" target="_blank" rel="noreferrer" className="hover:text-blue-400">
                <i className="lni lni-linkedin-original"></i>
              </a>
              <a href="https://www.instagram.com/hemanth_dommeti_/" target="_blank" rel="noreferrer" className="hover:text-pink-500">
                <i className="lni lni-instagram-original"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
