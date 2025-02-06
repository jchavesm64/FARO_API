import request from "supertest";
import { faker } from "@faker-js/faker";

import { connect, disconnectDatabase } from "../../../index";
import { deleteRatePlanMutation } from "../graphql/queries";
import { app } from "../../../app";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe("POST /graphql deleteRatePlanMutation", () => {
  it("should delete a rate plan", async () => {
    const variables = {
      id: "c78baf83-f374-4e34-bf76-db338fd5874f",
    };

    const { body } = await request(app)
      .post("/graphql")
      .send({ query: deleteRatePlanMutation, variables });

    console.log("body", body);

    expect(body.data.deleteRatePlan.status).toBe(true);
    expect(body.data.deleteRatePlan.message).toBe(
      "Rate plan deleted successfully"
    );
  });
});
