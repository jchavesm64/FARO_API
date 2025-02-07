import { connect, disconnectDatabase } from "../../../index";
import request from "supertest";
import { app } from "../../../app";
import { updateRoomTypeMutation } from "../graphql/queries";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnectDatabase();
});

const propertyId = "abc867aa-863a-465f-9cc8-e2243086c0c3";

describe("POST /graphql updateRoomTypeMutation", () => {
  it("should update an existing room type", async () => {
    const variables = {
      id: "66cbaf0a-d47b-4d25-8b94-53c0a7f280b9",
      input: {
        nombre: "Room 2 - GraphQL",
        channex: {
          propertyId: propertyId,
          countOfRooms: 10,
          occAdults: 2,
          occChildren: 2,
          occInfants: 2,
          defaultOccupancy: 2,
        },
      },
    };

    const { body } = await request(app)
      .post("/graphql")
      .send({ query: updateRoomTypeMutation, variables });

    console.log("body", body);

    expect(body.data.updateRoomType.status).toBe(true);
    expect(body.data.updateRoomType.data.nombre).toBe(variables.input.nombre);
    expect(body.data.updateRoomType.message).toBe(
      "Room type updated successfully"
    );
  });
});
