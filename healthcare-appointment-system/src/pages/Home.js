import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4">
          Welcome to HealthCare Appointment System
        </h1>
        <p className="text-xl md:text-2xl text-blue-600 mb-8">
          Schedule your medical appointments with ease
        </p>
        <Link 
          to="/appointments" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Book an Appointment
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 text-left"
      >
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Features</h2>
        <ul className="list-disc list-inside text-blue-700">
          <li className="mb-2">Real-time scheduling</li>
          <li className="mb-2">Automated reminders</li>
          <li className="mb-2">User-friendly interface</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Home;
