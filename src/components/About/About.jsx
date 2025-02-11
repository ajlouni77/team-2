import { useState } from 'react';
import { Navbar } from '../exports';
import { motion } from 'framer-motion';
import OurTeam from './OurTeam';
import Process from './Process';
import Hero from './Hero';
import Footer from "../Footer/Footer";

function About() {
  return (
    <>
      <Navbar />

      <Hero />


      <Process />


      <OurTeam />
<Footer/>

    </>
  );
}

export default About;