import request from "supertest";
import { faker } from "@faker-js/faker";

import { connect, disconnectDatabase } from "../../../index";
import {
  createPropertyMutation,
  updatePropertyMutation,
  deletePropertyMutation,
} from "../graphql/queries";
import { app } from "../../../app";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe("POST /graphql createPropertyMutation", () => {
  it("should create a new property", async () => {
    const variables = {
      input: {
        title: faker.lorem.words(1),
        email: faker.internet.email(),
        phone: faker.phone.number({ style: "international" }),
        currency: "USD",
        country: faker.location.countryCode("alpha-2"),
        state: faker.location.state(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        zipCode: faker.location.zipCode(),
        latitude: faker.location.latitude().toString(),
        longitude: faker.location.longitude().toString(),
        timezone: faker.location.timeZone(),
        groupId: "751047d3-2f35-4461-9d93-bcfbd57219ba",
        content: {
          description: faker.lorem.paragraph(),
        },
        facilities: [],
        settings: {},
      },
    };

    const { body } = await request(app)
      .post("/graphql")
      .send({ query: createPropertyMutation, variables: variables });

    console.log(body);

    expect(body.data.createProperty.status).toBe(true);
    expect(body.data.createProperty.message).toBe(
      "Property created successfully"
    );
  });
  it("should update an existing property", async () => {
    const variables = {
      id: "9e9b4524-9721-46b2-ab01-b747c2d74f1c",
      input: {
        title: faker.lorem.words(1),
        email: faker.internet.email(),
        phone: faker.phone.number({ style: "international" }),
        currency: "USD",
        country: faker.location.countryCode("alpha-2"),
        state: faker.location.state(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        zipCode: faker.location.zipCode(),
        latitude: faker.location.latitude().toString(),
        longitude: faker.location.longitude().toString(),
        timezone: faker.location.timeZone(),
        groupId: "751047d3-2f35-4461-9d93-bcfbd57219ba",
        content: {
          description: faker.lorem.paragraph(),
        },
        facilities: [],
        settings: {},
      },
    };

    const { body } = await request(app)
      .post("/graphql")
      .send({ query: updatePropertyMutation, variables: variables });

    console.log(body);

    expect(body.data.updateProperty.status).toBe(true);
    expect(body.data.updateProperty.message).toBe(
      "Property updated successfully"
    );
  }, 10000);

  it("should delete an existing property", async () => {
    const variables = {
      id: "9e9b4524-9721-46b2-ab01-b747c2d74f1c",
    };

    const { body } = await request(app)
      .post("/graphql")
      .send({ query: deletePropertyMutation, variables: variables });

    console.log(body);

    expect(body.data.deleteProperty.status).toBe(true);
    expect(body.data.deleteProperty.message).toBe(
      "Property deleted successfully"
    );
  });
});
