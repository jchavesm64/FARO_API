import request from "supertest";
import { app } from "../../../app";

const baseUrl = "/api/v1/channex/availability";
const propertyId = "abc867aa-863a-465f-9cc8-e2243086c0c3";

describe("POST /api/v1/channex/availability", () => {
  it("should create a new availability based on the property ID and rate plan ID", async () => {
    const roomTypeId = "66cbaf0a-d47b-4d25-8b94-53c0a7f280b9";
    const payload = {
      values: [
        {
          property_id: propertyId,
          room_type_id: roomTypeId,
          date: "2025-02-20",
          availability: 1,
        },
        {
          property_id: propertyId,
          room_type_id: roomTypeId,
          date: "2025-02-21",
          availability: 2,
        },
        {
          property_id: propertyId,
          room_type_id: roomTypeId,
          date: "2025-02-22",
          availability: 3,
        },
        {
          property_id: propertyId,
          room_type_id: roomTypeId,
          date: "2025-02-23",
          availability: 4,
        },
        {
          property_id: propertyId,
          room_type_id: roomTypeId,
          date: "2025-02-24",
          availability: 5,
        },
        {
          property_id: propertyId,
          room_type_id: roomTypeId,
          date: "2025-02-25",
          availability: 6,
        },
      ],
    };

    const res = await request(app).post(baseUrl).send(payload);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.meta.warnings).toBe(undefined);
  });

  it("should return all the availability using all the filters", async () => {
    const startDate = "2025-01-01";
    const endDate = "2025-01-10";

    const res = await request(app).get(baseUrl).query({
      startDate,
      endDate,
      propertyId,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

describe("GET /api/v1/channex/availability", () => {
  it("should return the availability based on a start date, end date and property ID", async () => {
    const startDate = "2025-01-01";
    const endDate = "2025-01-10";

    const res = await request(app)
      .get(baseUrl)
      .query({ startDate, endDate, propertyId });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should return the availability based on a single date and property ID", async () => {
    const date = "2025-01-01";

    const res = await request(app).get(baseUrl).query({ date, propertyId });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should return 400 Bad Request when property ID is missing", async () => {
    const startDate = "2025-01-01";
    const endDate = "2025-01-10";

    const res = await request(app).get(baseUrl).query({ startDate, endDate });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should return 400 Bad Request when start date is missing", async () => {
    const endDate = "2025-01-10";

    const res = await request(app).get(baseUrl).query({ endDate, propertyId });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
  });
});
