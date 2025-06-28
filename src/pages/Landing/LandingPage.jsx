import Navbar from '../../components/Landing/navbar';

import Home from "../../components/Landing/home";
import About from "../../components/Landing/about";
import Samp from "../../components/Landing/samp";
import Intro from "../../components/Landing/IntroVideo";
import Greting from "../../components/Landing/Gretings";
import Devloper from "../../components/Landing/Developer";
import Footer from '../../components/Landing/Footer';


export default function LandingPage() {
  return (
    <>
        <Navbar />
        <Home />
        <About />
        <Devloper />
        <Samp />
        <Intro />
        <Greting />
        <Footer />
    </>
  );
}
