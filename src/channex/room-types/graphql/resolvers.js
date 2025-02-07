import services from "../services";

export default {
  Query: {
    getRoomTypes: () => services.getRoomTypes(),

    getRoomTypeById: (_, { id }) => services.getRoomTypeById(id),
  },

  Mutation: {
    createRoomType: async (_, { input }) => {
      const result = await services.createRoomType(input);
      return {
        status: result.status,
        data: result.data,
        message: result.message,
      };
    },

    updateRoomType: async (_, { id, input }) =>
      services.updateRoomType({ id, input }),

    disableRoomType: async (_, { id }) => services.disableRoomType({id}),
  },
};
