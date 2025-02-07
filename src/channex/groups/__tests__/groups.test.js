import request from "supertest";
import { app } from "../../../app";

const baseUrl = "/api/v1/channex/groups";

describe("GET /api/v1/groups", () => {
  it("should return all the groups", async () => {
    const res = await request(app).get(baseUrl);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should return a groups by id", async () => {
    const res = await request(app).get(
      `${baseUrl}/751047d3-2f35-4461-9d93-bcfbd57219ba`
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeInstanceOf(Object);
  });

  it("should return a 404 Resource Not Found", async () => {
    const nonExistentGroupId = "751047d3-2f35-4461-9d93-bcfbd57229ba";
    const res = await request(app).get(`${baseUrl}/${nonExistentGroupId}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveProperty("code");
    expect(res.body.errors.code).toEqual("resource_not_found");
  });
});

describe("POST /api/v1/groups", () => {
  const payload = {
    group: {
      title: "API Group",
    },
  };

  it("should create a new group", async () => {
    const res = await request(app).post(baseUrl).send(payload);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeInstanceOf(Object);
  });

  it("should return a 422 Unprocessable Entity when trying to create a group with a blank title", async () => {
    const malformedPayload = {
      group: {
        title: "",
      },
    };
    const res = await request(app).post(baseUrl).send(malformedPayload);

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveProperty("code");
    expect(res.body.errors.code).toEqual("validation_error");
  });
});

describe("POST /api/v1/groups/:group_id/properties/:property_id", () => {
  const property_id = "af075923-52d0-4829-ac67-b3491913ac7a";
  const group_id = "751047d3-2f35-4461-9d93-bcfbd57219ba";
  const prev_group_id = "e8f72e75-6252-48bb-98c2-ec94abc2fc48";

  it("should add the property to a group, withoud removing it from previous group", async () => {
    const res = await request(app).post(
      `${baseUrl}/${group_id}/properties/${property_id}`
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("meta");
  });

  it("should return 404 Not Found", async () => {
    const nonExistentGroupId = "751047d3-2f35-4461-9d93-bcfbd57229ba";
    const res = await request(app).post(
      `${baseUrl}/${nonExistentGroupId}/properties/${property_id}`
    );

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("errors");
  });

  it("should add the property to a group and remove it from the previous group", async () => {
    const res = await request(app).post(
      `${baseUrl}/${group_id}/properties/${property_id}`
    );

    const deleted_res = await request(app).delete(
      `${baseUrl}/${prev_group_id}/properties/${property_id}`
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("meta");
    expect(deleted_res.statusCode).toEqual(200);
    expect(deleted_res.body).toHaveProperty("meta");
  });
});

describe("PUT /api/v1/groups/:id", () => {
  it("should update a group", async () => {
    const group_id = "751047d3-2f35-4461-9d93-bcfbd57219ba";
    const payload = {
      group: {
        title: "api group",
      },
    };

    const res = await request(app).put(`${baseurl}/${group_id}`).send(payload);

    expect(res.statuscode).toequal(200);
    expect(res.body).tohaveproperty("data");
  });

  it("should return 422 Unprocessable Entity", async () => {
    const group_id = "751047d3-2f35-4461-9d93-bcfbd57219ba";
    const malformedPayload = {
      group: {
        title: "",
      },
    };

    const res = await request(app)
      .put(`${baseUrl}/${group_id}`)
      .send(malformedPayload);

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("errors");
  });

  it("should return 404 Not Found", async () => {
    const group_id = "751047d3-2f35-4461-9d93-bcfbd57229ba";
    const payload = {
      group: {
        title: "api group",
      },
    };

    const res = await request(app).put(`${baseUrl}/${group_id}`).send(payload);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("errors");
  });
});

describe("DELETE /api/v1/groups/:group_id/properties/:property_id", () => {
  it("should return 200 OK", async () => {
    const property_id = "af075923-52d0-4829-ac67-b3491913ac7a";
    const group_id = "751047d3-2f35-4461-9d93-bcfbd57219ba";

    const res = await request(app).delete(
      `${baseUrl}/${group_id}/properties/${property_id}`
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("meta");
  });

  it("should return 400 Bad Request", async () => {
    const property_id = "1";
    const group_id = "0";

    const res = await request(app).delete(
      `${baseUrl}/${group_id}/properties/${property_id}`
    );

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should return 404 Not Found", async () => {
    const property_id = "af075923-52d0-4829-ac67-b3491913ac7a";
    const group_id = "751047d3-2f35-4461-9d93-bcfbd57229ba";

    const res = await request(app).delete(
      `${baseUrl}/${group_id}/properties/${property_id}`
    );

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("errors");
  });
});
