import services from "../services";

export default {
  Query: {
    getBookingRevisions: async () => services.getBookingRevisions(),
    getBookingRevisionsFeed: async () => services.getBookingRevisionsFeed(),
    getBookingRevisionById: async (_, { id }) =>
      services.getBookingRevisionById({ id }),
  },

  Mutation: {
    ackBookingRevision: async (_, { id }) =>
      services.ackBookingRevision({ id }),
  },
};
