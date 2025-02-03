import request from "supertest";
import { app } from "../../app";

const baseUrl = "/api/v1/channex/restrictions";
const propertyId = "abc867aa-863a-465f-9cc8-e2243086c0c3";
const restrictions_set = {
  availability: "availability",
  rate: "rate",
  min_stay_arrival: "min_stay_arrival",
  min_stay_through: "min_stay_through",
  min_stay: "min_stay",
  closed_to_arrival: "closed_to_arrival",
  closed_to_departure: "closed_to_departure",
  stop_sell: "stop_sell",
  max_stay: "max_stay",
  availability_offset: "availability_offset",
  max_availability: "max_availability",
};

describe("POST /api/v1/channex/restrictions", () => {
  it("should create a new restriction based on the property ID and rate plan ID", async () => {
    const ratePlanId = "bd6fc34d-c7ad-4e36-9340-3d55b360c2f3";

    const payload = {
      values: [
        {
          property_id: propertyId,
          rate_plan_id: ratePlanId,
          date_from: "2025-02-20",
          date_to: "2025-02-25",
          min_stay_through: 2,
          closed_to_arrival: true,
          rate: 12345,
        },
      ],
    };

    const res = await request(app).post(baseUrl).send(payload);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.meta.warnings).toBe(undefined);
  });

  it("should return all the restrictions using all the filters", async () => {
    const startDate = "2025-01-01";
    const endDate = "2025-01-10";

    const res = await request(app)
      .get(baseUrl)
      .query({
        startDate,
        endDate,
        propertyId,
        restrictions: Object.values(restrictions_set).join(","),
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

describe("GET /api/v1/channex/restrictions", () => {
  it("should return the restrictions based on availability, a start date, end date and property ID", async () => {
    const startDate = "2025-01-01";
    const endDate = "2025-01-10";

    const restrictions = restrictions_set.availability;

    const res = await request(app)
      .get(baseUrl)
      .query({ startDate, endDate, propertyId, restrictions });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  /**
   * The HTTP request might look like:
   *
   * http://localhost:4000/api/v1/channex/restrictions?startDate=2025-01-01&endDate=2025-02-20&propertyId=abc867aa-863a-465f-9cc8-e2243086c0c3&restrictions=availability,rate,min_stay_arrival,min_stay_thourgh,min_stay,closed_to_arrival,closed_to_departure,stop_sell,max_stay,availability_offset,max_availability
   *
   * The restrictions query parameter is a comma-separated list of restrictions.
   *
   * The HTTP response should look like:
   *
   * {
   *  [RATE_PLAN_ID]: {
   *    [DATE_YYYY-MM-DD]: {
   *      [RESTRICTION]: [VALUE]
   *    }
   *  }
   * }
   */
  it("should return all the restrictions using all the filters", async () => {
    const startDate = "2025-01-01";
    const endDate = "2025-01-10";

    const res = await request(app)
      .get(baseUrl)
      .query({
        startDate,
        endDate,
        propertyId,
        restrictions: Object.values(restrictions_set).join(","),
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});
