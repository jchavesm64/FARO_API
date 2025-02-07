import services from "../services";

export default {
  Query: {
    getBookingRevisions: async () => services.getBookingRevisions(),
    getBookingRevisionById: async (_, { id }) =>
      services.getBookingRevisionById({ id }),
  },
};
