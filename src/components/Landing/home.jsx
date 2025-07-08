import Dot from '../../assets/dots.svg';
import Hero from '../../assets/hero.png';
import CLG from "../../assets/clg.png"

export default function Homee() {
  return (
    <section
      id="homee"
      className="relative overflow-hidden text-white pt-[120px] md:pt-[130px] lg:pt-[160px]"
      style={{ backgroundImage: `url(${CLG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center">
          {/* Text content */}
          <div className="w-full px-5 text-center max-w-[780px] mx-auto">
            <h1 className="mb-6 text-3xl font-bold leading-snug sm:text-4xl lg:text-5xl">
              Welcome to BVC's Attendance Maintenance System
            </h1>

            <p className="mx-auto mb-9 max-w-[600px] text-base sm:text-lg">
              This system is exclusively for 4th-year students of BVC. Registration is allowed only with official BVC email addresses ending in @bvcits.edu.in
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-4 md:gap-5">
              <a
                href="/signin"
                // onClick={(e) => e.preventDefault()}
                className="inline-flex items-center justify-center rounded-md bg-white text-blue-700 px-5 py-3 text-base font-medium shadow-md hover:bg-gray-100 md:px-7 md:py-[14px]"
              >
                Get Started
              </a>

              <a
                href="#intro"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("intro");
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-3 rounded-md border border-white bg-white/10 px-5 py-3 text-base font-medium text-white hover:bg-white hover:text-blue-700 transition md:px-7 md:py-[14px]"
              >
                ▶ Watch Intro
              </a>
            </div>

            {/* Attribution */}
            <p className="mb-4">
              Powered by <a href="https://bvcits.edu.in/" className="text-white font-medium underline">BVCITS</a>
            </p>

            {/* Tailwind CSS logo or decoration */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white"
              >
                <svg
                  className="fill-current"
                  height="26"
                  viewBox=".16 .18 799.8 98.72"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Add your SVG content here */}
                </svg>
              </a>
            </div>
          </div>

          {/* Hero Image with dots */}
          <div className="w-full px-5 relative mt-16 max-w-[845px] mx-auto">
            <img
              src={Hero}
              alt="Hero"
              className="mx-auto max-w-full rounded-xl"
            />
            <img
              src={Dot}
              alt="dots left"
              className="absolute -left-6 bottom-0 w-[120px] opacity-70"
            />
            <img
              src={Dot}
              alt="dots right"
              className="absolute -right-6 -top-6 w-[120px] opacity-70"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
