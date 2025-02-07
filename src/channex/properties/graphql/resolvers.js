import services from "../services";

export default {
  Query: {
    getProperties: async () => services.getProperties(),
    getPropertiesOptions: async () => services.getPropertiesOptions(),
  },

  Mutation: {
    createProperty: async (_, { input }) => services.createProperty({ input }),
    updateProperty: async (_, { id, input }) =>
      services.updateProperty({ id, input }),
    deleteProperty: async (_, { id }) => services.deleteProperty({ id }),
  },
};
