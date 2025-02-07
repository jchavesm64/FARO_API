import { connect, disconnectDatabase } from "../../../index";
import request from "supertest";
import { app } from "../../../app";
import { ackBookingRevisionMutation } from "../graphql/queries";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe("POST /graphql ackBookingRevisionMutation", () => {
  it("should ack the booking revision", async () => {
    const variables = {
      id: "da0656f9-5f3f-4512-8e61-88b6adcc10ba",
    };

    const { body } = await request(app)
      .post("/graphql")
      .send({ query: ackBookingRevisionMutation, variables: variables });

    console.log(body);

    expect(body.data.ackBookingRevision.status).toBe(true);
    expect(body.data.ackBookingRevision.message).toBe(
      "Booking revision acknowledged successfully"
    );
  });
});
