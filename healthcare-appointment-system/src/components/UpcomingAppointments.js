import React from 'react';
import { motion } from 'framer-motion';

const UpcomingAppointments = ({ appointments }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-blue-800 mb-4">Upcoming Appointments</h3>
      {appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appointment, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow p-4"
            >
              <p className="font-semibold">{appointment.type}</p>
              <p>{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</p>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingAppointments;
