import services from "../services";

export default {
  Query: {
    getRatePlansRestrictions: async (_, { filters }) =>
      services.getRestrictions({ filters }),
  },

  Mutation: {
    updateRestrictions: async (_, { input }) =>
      services.updateRestrictions({ input }),
  },
};
