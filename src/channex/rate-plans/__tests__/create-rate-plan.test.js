import request from "supertest";
import { faker } from "@faker-js/faker";

import { connect, disconnectDatabase } from "../../../index";
import { createRatePlanMutation } from "../graphql/queries";
import { app } from "../../../app";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe("POST /graphql createRatePlanMutation", () => {
  it("should create a new rate plan", async () => {
    const variables = {
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
            rate: 100,
          },
        ],
        currency: "USD",
        sellMode: "per_person",
        rateMode: "manual",
        mealType: "family_plan",
        childrenFee: "10",
        infantFee: "5",
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
      .send({ query: createRatePlanMutation, variables });

    console.log("body", body);

    expect(body.data.createRatePlan.status).toBe(true);
    expect(body.data.createRatePlan.message).toBe(
      "Rate plan created successfully"
    );
  });
  it("shouldn't work and throw", async () => {
    const variables = {
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
            rate: 100,
          },
        ],
        currency: "USD",
        sellMode: "per_person",
        rateMode: "manual",
        mealType: "family_plan",
        childrenFee: "10",
        infantFee: "5",
        maxStay: [0, 0, 0, 0, 1, 0, 1],
        minStayArrival: [1, 1, 1, 1, 1, 1, 1],
        minStayThrough: [1, 1, 1, 1, 1, 1, 1],
        closedToArrival: [false],
        closedToDeparture: [false],
        stopSell: [false],
      },
    };

    const { body } = await request(app)
      .post("/graphql")
      .send({ query: createRatePlanMutation, variables });

    console.log("body", body);

    expect(body.data.createRatePlan.status).toBe(false);
  });
});
