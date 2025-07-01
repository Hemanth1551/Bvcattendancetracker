import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";
import { ThemeToggleButton } from "../common/ThemeToggleButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full bg-[#4F6DF5] dark:bg-[#1E3A8A] text-white shadow-md transition duration-300"
{/*       style={{ backgroundColor: '#00BFFF' }}
      role="banner" */}
      aria-label="Navigation bar"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="https://bvcits.edu.in/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-14 h-auto sm:w-16" />
        </a>
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-[64px] left-0 w-full bg-blue-800 lg:static lg:block lg:w-auto lg:bg-transparent`}
          style={{ backgroundColor: '#00BFFF' }}
        >
          <ul className="flex flex-col bg-[#4F6DF5] dark:bg-[#1E3A8A] lg:flex-row items-center gap-5 p-4 lg:p-0">
            {["home", "about", "developer", "services", "intro", "contact"].map(
              (sectionId) => (
                <li key={sectionId}>
                  <a
                    href={`#${sectionId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const sectionElement = document.getElementById(sectionId);
                      if (sectionElement) {
                        sectionElement.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-white hover:text-gray-300 font-medium transition-colors"
                  >
                    {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
            

          <ThemeToggleButton />

          <button
            className="lg:hidden text-2xl"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <a
            href="/signin"
            className="hidden lg:inline-block px-5 py-2 rounded bg-white text-blue-700 hover:bg-gray-100 font-semibold transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
