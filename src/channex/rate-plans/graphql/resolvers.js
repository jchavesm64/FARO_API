import services from "../services";

export default {
  Query: {
    getRatePlans: () => services.getRatePlans(),

    getRatePlanById: (_, { id }) => services.getRatePlanById(id),
  },

  Mutation: {
    createRatePlan: async (_, { input }) => services.createRatePlan(input),

    updateRatePlan: async (_, { id, input }) =>
      services.updateRatePlan({ id, input }),

    deleteRatePlan: async (_, { id }) => services.deleteRatePlan({ id }),
  },
};
