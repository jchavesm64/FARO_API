import services from "../services";

export default {
  Query: {
    getBookings: () => services.getBookings(),
    getBookingById: (_, { id }) => services.getBookingById(id),
  },

};
