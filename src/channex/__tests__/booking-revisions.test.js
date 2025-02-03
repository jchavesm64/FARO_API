import request from "supertest";
import { app } from "../../app";

const baseUrl = "/api/v1/channex/booking_revisions";

describe("POST /api/v1/bookings", () => {
  it("should return the booking revisison by ID", async () => {
    const res = await request(app).get(
      `${baseUrl}/a66d7871-16ef-49be-9ab5-ed52be54cb40`
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should ack the booking revision", async () => {
    const res = await request(app).post(
      `${baseUrl}/a66d7871-16ef-49be-9ab5-ed52be54cb40/ack`
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("meta");
    expect(res.body.meta).toBeInstanceOf(Object);
  });

  it("should return the booking revisions feed", async () => {
    const res = await request(app).get(`${baseUrl}/feed`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});
