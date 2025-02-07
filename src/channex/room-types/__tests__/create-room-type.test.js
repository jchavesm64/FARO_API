import { connect, disconnectDatabase } from "../../../index";
import request from "supertest";
import { app } from "../../../app";
import { createRoomTypeMutation } from "../graphql/queries";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnectDatabase();
});

const propertyId = "af075923-52d0-4829-ac67-b3491913ac7a";

describe("POST /graphql createRoomType", () => {
  it("should create a new room type", async () => {
    const variables = {
      input: {
        nombre: "Amazing Room",
        descripcion: "A luxurious room with all amenities.",
        precioBase: 100,
        estado: "ACTIVO",
        channex: {
          propertyId: propertyId,
          countOfRooms: 10,
          occAdults: 2,
          occChildren: 2,
          occInfants: 1,
          defaultOccupancy: 4,
          facilities: [],
          roomKind: "dorm",
          capacity: 4,
          content: {
            description: "A luxurious room with all amenities.",
          },
        },
      },
    };

    const { body } = await request(app)
      .post("/graphql")
      .send({ query: createRoomTypeMutation, variables });

    console.log("body", body);

    expect(body.data.createRoomType.status).toBe(true);
    expect(body.data.createRoomType.data.nombre).toBe("Amazing Room");
    expect(body.data.createRoomType.message).toBe(
      "Room type created successfully"
    );
  });

  it("should return an error if the room type already exists", async () => {
    const variables = {
      input: {
        nombre: "Deluxe Room",
        descripcion: "A luxurious room with all amenities.",
        precioBase: 100,
        estado: "ACTIVO",
        channex: {
          propertyId: propertyId,
          countOfRooms: 10,
          occAdults: 2,
          occChildren: 2,
          occInfants: 1,
          defaultOccupancy: 4,
          facilities: [],
          roomKind: "dorm",
          capacity: 4,
          content: {
            description: "A luxurious room with all amenities.",
          },
        },
      },
    };

    const { body } = await request(app)
      .post("/graphql")
      .send({ query: createRoomTypeMutation, variables });

    expect(body.data.createRoomType.status).toBe(true);
    expect(body.data.createRoomType.data).toBe(null);
    expect(body.data.createRoomType.message).toBe(
      "There is already a room type with that name"
    );
  });
});
