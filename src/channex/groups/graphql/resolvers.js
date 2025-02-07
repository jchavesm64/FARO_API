import services from "../services";

export default {
  Query: {
    getGroups: async () => services.getGroups(),
  },
  Mutation: {
    createGroup: async (_, { input }) => services.createGroup({ input }),
    updateGroup: async (_, { id, input }) =>
      services.updateGroup({ id, input }),
    addPropertyToGroup: async (_, { groupId, propertyId }) =>
      services.addPropertyToGroup({ groupId, propertyId }),
    deletePropertyFromGroup: async (_, { groupId, propertyId }) =>
      services.deletePropertyFromGroup({ groupId, propertyId }),
  },
};
