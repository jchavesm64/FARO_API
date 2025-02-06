import services from "../services";
export default {
  Query: {
    getAvailability: async (_, { filters }) =>
      services.getAvailability({ filters }),
  },

  Mutation: {
    updateAvailability: async (_, { input }) =>
      services.updateAvailability({ input }),
  },
};
