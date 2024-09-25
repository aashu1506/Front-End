// Simulated delay to mimic API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const appointments = [];

export const mockApi = {
  getAppointments: async () => {
    await delay(500);
    return [...appointments];
  },

  createAppointment: async (appointment) => {
    await delay(500);
    const newAppointment = { ...appointment, id: Date.now() };
    appointments.push(newAppointment);
    return newAppointment;
  },

  cancelAppointment: async (id) => {
    await delay(500);
    const index = appointments.findIndex(app => app.id === id);
    if (index !== -1) {
        appointments.splice(index, 1);
        return true;
    }
    return false;
    },

};
