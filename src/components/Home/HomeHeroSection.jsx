import React from 'react'
import { motion } from "framer-motion";
import "./home.css"

function HomeHeroSection() {
  return (
      <section className="relative w-full h-[600px]">
          <img className="w-full h-full object-cover" src="https://img.freepik.com/free-photo/top-view-businesswoman-analyzing-financial-graphs-statistics-drinking-coffee_482257-12332.jpg?t=st=1738339106~exp=1738342706~hmac=c6ca0bf4acf4b00d49d24b303ec01d3d9a4e2e7aa3fe6dd685ed0ebea5cc833e&w=1380" alt="Hero background" />
          <div className="absolute inset-0  bg-opacity-30 z-10 flex items-center justify-center trans">
              <div className="text-center text-white z-20">
                  <h1 className="text-5xl font-bold">Welcome</h1>
                  <p className="mt-4 text-lg">Discover our amazing features and services!</p>
              </div>
          </div>
      </section>
  )
}

export default HomeHeroSection