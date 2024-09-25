import React from 'react';
import { motion } from 'framer-motion';
import UpcomingAppointments from '../components/UpcomingAppointments';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890'
  };

  const appointments = [
    { type: 'General Checkup', date: '2023-06-15', time: '10:00' },
    { type: 'Follow-up', date: '2023-06-22', time: '14:00' },
  ];

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-blue-800 mb-6">User Profile</h2>
        <div className="space-y-4">
          {Object.entries(user).map(([key, value]) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-100 p-4 rounded-md"
            >
              <h3 className="font-semibold text-blue-800 capitalize">{key}</h3>
              <p>{value}</p>
            </motion.div>
          ))}
        </div>
        <UpcomingAppointments appointments={appointments} />
      </motion.div>
    </div>
  );
};

export default Profile;
