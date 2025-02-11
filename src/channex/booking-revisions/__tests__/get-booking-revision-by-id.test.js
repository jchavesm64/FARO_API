import { connect, disconnectDatabase } from "../../../index";
import request from "supertest";
import { app } from "../../../app";
import { getBookingRevisionById } from "../graphql/queries";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe("POST /graphql getBookingRevisionById", () => {
  it("should return the booking revision by ID", async () => {
    const variables = {
      id: "da0656f9-5f3f-4512-8e61-88b6adcc10ba",
    };

    const { body } = await request(app)
      .post("/graphql")
      .send({ query: getBookingRevisionById, variables: variables });

    console.log(body);

    expect(body.data.getBookingRevisionById.status).toBe(true);
    expect(body.data.getBookingRevisionById.message).toBe(
      "Booking revision fetched successfully"
    );
  });
});
