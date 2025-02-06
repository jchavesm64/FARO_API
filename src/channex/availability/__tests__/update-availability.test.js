import request from "supertest";
import { connect, disconnectDatabase } from "../../../index";
import { updateAvailabilityMutation } from "../graphql/queries";
import { app } from "../../../app";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe("POST /graphql updateAvailabilityMutation", () => {
  it("should update availability", async () => {
    const input = {
      values: [
        {
          propertyId: "abc867aa-863a-465f-9cc8-e2243086c0c3",
          roomTypeId: "4ad24439-ea4d-4438-9eb6-7d7a6871634f",
          date: "2025-02-21",
          availability: 2,
        },
        {
          propertyId: "abc867aa-863a-465f-9cc8-e2243086c0c3",
          roomTypeId: "66cbaf0a-d47b-4d25-8b94-53c0a7f280b9",
          date: "2025-02-21",
          availability: 4,
        },
      ],
    };

    const response = await request(app).post("/graphql").send({
      query: updateAvailabilityMutation,
      variables: { input },
    });

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("updateAvailability");
    expect(response.body.data.updateAvailability).toHaveProperty(
      "status",
      "true"
    );
  });
});
