import request from "supertest";
import { app } from "../../app";

const baseUrl = "/api/v1/channex/properties";

describe("GET /api/v1/properties", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get(baseUrl);
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /api/v1/properties/:id", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get(
      `${baseUrl}/af075923-52d0-4829-ac67-b3491913ac7a`
    );
    expect(res.statusCode).toEqual(200);
  });
});

describe("POST /api/v1/properties", () => {
  it("should return 201 Created", async () => {
    const res = await request(app)
      .post(baseUrl)
      .send({
        property: {
          title: "API Test",
          currency: "CRC",
          group_id: "e8f72e75-6252-48bb-98c2-ec94abc2fc48",
        },
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
  });
});