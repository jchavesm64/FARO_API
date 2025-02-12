import { connect, disconnectDatabase } from "../../../index";
import request from "supertest";
import { app } from "../../../app";
import { updateRestrictions } from "../graphql/queries";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe("POST /graphql updateRestrictions", () => {
  it("should update the restrictions", async () => {
    const input = {
      values: [
        {
          propertyId: "abc867aa-863a-465f-9cc8-e2243086c0c3",
          ratePlanId: "48738d43-4154-4404-967e-33824637972b",
          date: "2025-10-01",
          minStayArrival: 3,
          rate: 10,
          maxStay: 10,
          closedToArrival: false,
          minStayThrough: 3,
          minStay: 3,
          closedToDeparture: false,
          stopSell: false,
        },
      ],
    };

    const { body } = await request(app).post("/graphql").send({
      query: updateRestrictions,
      variables: { input },
    });

    console.log(body);

    expect(body.data.updateRestrictions).toBeDefined();
  });
});
