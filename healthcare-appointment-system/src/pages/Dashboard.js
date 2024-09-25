import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockApi } from '../api/mockApi';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const fetchedAppointments = await mockApi.getAppointments();
      setAppointments(fetchedAppointments.filter(app => app.userId === user.email));
    } catch (err) {
      toast.error('Failed to fetch appointments');
    }
    setIsLoading(false);
  };

  const handleCancelAppointment = async (id) => {
    try {
      await mockApi.cancelAppointment(id);
      setAppointments(appointments.filter(app => app.id !== id));
      toast.success('Appointment cancelled successfully');
    } catch (err) {
      toast.error('Failed to cancel appointment');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Your Appointments</h2>
        {isLoading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p>You have no scheduled appointments.</p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <motion.li
                key={appointment.id}
                className="bg-blue-100 p-4 rounded-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Type:</strong> {appointment.type}</p>
                <button
                  onClick={() => handleCancelAppointment(appointment.id)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Cancel Appointment
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
