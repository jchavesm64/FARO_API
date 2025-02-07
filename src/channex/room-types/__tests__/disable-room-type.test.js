import { connect, disconnectDatabase } from "../../../index";
import request from "supertest";
import { app } from "../../../app";
import { disableRoomTypeMutation } from "../graphql/queries";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe("POST /graphql disableRoomTypeMutation", () => {
  it("should disable a room type", async () => {
    const variables = {
      id: "66cbaf0a-d47b-4d25-8b94-53c0a7f280b9",
    };

    const { body } = await request(app)
      .post("/graphql")
      .send({ query: disableRoomTypeMutation, variables });

    console.log("body", body);

    expect(body.data.disableRoomType.status).toBe(true);
  });
});
