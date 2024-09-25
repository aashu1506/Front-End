import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Calendar from '../components/Calendar';
import { mockApi } from '../api/mockApi';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const fetchedAppointments = await mockApi.getAppointments();
      setAppointments(fetchedAppointments);
    } catch (err) {
      setError('Failed to fetch appointments');
    }
    setIsLoading(false);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user) {
    setError('Please log in to schedule an appointment');
    return;
  }
  if (!selectedDate || !selectedTime || !appointmentType) {
    setError('Please fill in all fields');
    return;
  }
  setIsLoading(true);
  setError('');
  try {
    const newAppointment = await mockApi.createAppointment({
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      userId: user.email,
    });
    setAppointments([...appointments, newAppointment]);
    setSelectedDate(null);
    setSelectedTime('');
    setAppointmentType('');
    toast.success('Appointment scheduled successfully!'); // Add this line here
  } catch (err) {
    setError('Failed to create appointment');
    toast.error('Failed to schedule appointment'); // Optionally add an error toast
  }
  setIsLoading(false);
};

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Schedule an Appointment</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Calendar onDateSelect={handleDateSelect} />
          <form onSubmit={handleSubmit} className="space-y-4">
            {selectedDate && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Available Time Slots</h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <motion.button
                      key={time}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className={`p-2 rounded ${selectedTime === time ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Type
              </label>
              <select
                id="appointmentType"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select type</option>
                <option value="checkup">General Checkup</option>
                <option value="followup">Follow-up</option>
                <option value="specialist">Specialist Consultation</option>
              </select>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              disabled={isLoading || !selectedDate || !selectedTime || !appointmentType}
            >
              {isLoading ? 'Scheduling...' : 'Schedule Appointment'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Appointments;
