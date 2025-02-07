import request from "supertest";
import { faker } from "@faker-js/faker";

import { connect, disconnectDatabase } from "../../../index";
import {
  createGroupMutation,
  updateGroupMutation,
  addPropertyToGroupMutation,
  deletePropertyFromGroupMutation,
} from "../graphql/queries";
import { app } from "../../../app";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe("POST /graphql createGroupMutation", () => {
  it("should create a new group", async () => {
    const variables = {
      input: {
        group: {
          title: faker.lorem.words(2),
        },
      },
    };

    const { body } = await request(app)
      .post("/graphql")
      .send({ query: createGroupMutation, variables: variables });

    console.log("body", JSON.stringify(body));

    expect(body.data.createGroup.status).toBe(true);
    expect(body.data.createGroup.message).toBe("Group created successfully");
  });
});

describe("POST /graphql updateGroupMutation", () => {
  it("should update an existing group", async () => {
    const variables = {
      id: "e36c3954-cfc7-408d-95e4-493a21faefc5",
      input: {
        group: {
          title: faker.lorem.words(2),
        },
      },
    };

    const { body } = await request(app)
      .post("/graphql")
      .send({ query: updateGroupMutation, variables: variables });

    console.log("body", JSON.stringify(body));

    expect(body.data.updateGroup.status).toBe(true);
    expect(body.data.updateGroup.message).toBe("Group updated successfully");
  });

  describe("POST /graphql addPropertyToGroupMutation", () => {
    it("should add a property to a group", async () => {
      const variables = {
        groupId: "e36c3954-cfc7-408d-95e4-493a21faefc5",
        propertyId: "af075923-52d0-4829-ac67-b3491913ac7a",
      };

      const { body } = await request(app)
        .post("/graphql")
        .send({ query: addPropertyToGroupMutation, variables: variables });

      console.log("body", JSON.stringify(body));

      expect(body.data.addPropertyToGroup.status).toBe(true);
      expect(body.data.addPropertyToGroup.message).toBe(
        "Property added to group successfully"
      );
    });
  });

  describe("POST /graphql deletePropertyFromGroupMutation", () => {
    it("should delete a property from a group", async () => {
      const variables = {
        groupId: "e36c3954-cfc7-408d-95e4-493a21faefc5",
        propertyId: "af075923-52d0-4829-ac67-b3491913ac7a",
      };

      const { body } = await request(app)
        .post("/graphql")
        .send({ query: deletePropertyFromGroupMutation, variables: variables });

      console.log("body", JSON.stringify(body));

      expect(body.data.deletePropertyFromGroup.status).toBe(true);
      expect(body.data.deletePropertyFromGroup.message).toBe(
        "Property deleted from group successfully"
      );
    });
  });
});
