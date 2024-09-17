import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import modBack from "../assets/homeBach.jpg"; // You may want to update this background image to match a herbal theme
import { motion } from "framer-motion";
import Per from "../assets/performanceimg.jpeg"; // Replace with herbal medicine-related images
import Style from "../assets/stylevehimg.jpeg"; // Replace with herbal medicine-related images
import Effi from "../assets/efficencyimg.jpeg"; // Replace with herbal medicine-related images

const HomePage = () => {
  return (
    <div>
      <Navbar />

      {/* Section 1: intro */}
      <div
        className="bg-center bg-cover min-h-screen flex justify-center items-center "
        style={{ backgroundImage: `url(${modBack})` }}
      >
        <div className="text-center text-white ">
          <h2 className="text-5xl font-extrabold bg-black bg-opacity-50 p-4">
            Embrace Natural Healing
          </h2>
          <motion.p
            className="mt-10 text-xl bg-black bg-opacity-50 p-6"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 5, ease: "linear" }}
          >
            Discover the power of herbal medicine for holistic health and
            wellness. Our carefully crafted remedies harness the healing
            properties of nature to help you lead a healthier, balanced life.
          </motion.p>
          <button
            onClick={() =>
              document
                .getElementById("benefits")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="mt-6 bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded"
          >
            Explore Remedies
          </button>
        </div>
      </div>

      {/* Section 2: Benefits */}
      <motion.section
        id="benefits"
        className="py-20 bg-gray-100 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-4xl font-bold mb-12">
          Why Choose Herbal Medicine?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <img
              src={Per} // Replace with a relevant herbal image
              alt="Natural Healing"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">Natural Healing</h3>
            <p className="mt-2 text-gray-600">
              Our herbal remedies are designed to restore balance and promote
              natural healing within the body.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <img
              src={Style} // Replace with a relevant herbal image
              alt="Holistic Wellness"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">Holistic Wellness</h3>
            <p className="mt-2 text-gray-600">
              Achieve overall well-being through a combination of ancient herbal
              knowledge and modern science.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <img
              src={Effi} // Replace with a relevant herbal image
              alt="Sustainable Health"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">Sustainable Health</h3>
            <p className="mt-2 text-gray-600">
              Our products are crafted from sustainably sourced herbs to ensure
              both your health and the environment's well-being.
            </p>
          </div>
        </div>
      </motion.section>
      <motion.section
        id="benefits"
        className="py-20 bg-gray-100 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-4xl font-bold mb-12">
          Why Choose Herbal Medicine?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <img
              src={Per} // Replace with a relevant herbal image
              alt="Natural Healing"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">Natural Healing</h3>
            <p className="mt-2 text-gray-600">
              Our herbal remedies are designed to restore balance and promote
              natural healing within the body.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <img
              src={Style} // Replace with a relevant herbal image
              alt="Holistic Wellness"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">Holistic Wellness</h3>
            <p className="mt-2 text-gray-600">
              Achieve overall well-being through a combination of ancient herbal
              knowledge and modern science.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <img
              src={Effi} // Replace with a relevant herbal image
              alt="Sustainable Health"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-xl font-semibold">Sustainable Health</h3>
            <p className="mt-2 text-gray-600">
              Our products are crafted from sustainably sourced herbs to ensure
              both your health and the environment's well-being.
            </p>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default HomePage;
