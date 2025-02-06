import request from "supertest";
import { faker } from "@faker-js/faker";

import { connect, disconnectDatabase } from "../../../index";
import { updateRatePlanMutation } from "../graphql/queries";
import { app } from "../../../app";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe("POST /graphql updateRatePlanMutation", () => {
  it("should update a new rate plan", async () => {
    const variables = {
      id: "61a03d57-87a1-4fc8-a98f-d84d1ac30e98",
      input: {
        title: faker.lorem.words(2),
        propertyId: "abc867aa-863a-465f-9cc8-e2243086c0c3",
        roomTypeId: "4ad24439-ea4d-4438-9eb6-7d7a6871634f",
        options: [
          {
            occupancy: 2,
            isPrimary: true,
            derivedOption: {
              rate: [["increase_by_percent", "10"]],
            },
            rate: 4000,
          },
        ],
        currency: "CRC",
        sellMode: "per_person",
        rateMode: "manual",
        mealType: "breakfast",
        childrenFee: "0",
        infantFee: "10",
        maxStay: [0, 0, 0, 0, 1, 0, 1],
        minStayArrival: [1, 1, 1, 1, 1, 1, 1],
        minStayThrough: [1, 1, 1, 1, 1, 1, 1],
        closedToArrival: [false, true, true, false, false, false, true],
        closedToDeparture: [false, false, false, false, true, true, true],
        stopSell: [false, false, false, true, true, false, true],
      },
    };

    const { body } = await request(app)
      .post("/graphql")
      .send({ query: updateRatePlanMutation, variables });

    console.log("body", body);

    expect(body.data.updateRatePlan.status).toBe(true);
    expect(body.data.updateRatePlan.message).toBe(
      "Rate plan updated successfully"
    );
  });
});
