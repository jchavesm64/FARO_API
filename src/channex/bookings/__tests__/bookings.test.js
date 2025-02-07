import request from "supertest";
import { app } from "../../../app";

const baseUrl = "/api/v1/channex/bookings";

describe("GET /api/v1/bookings", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get(baseUrl);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

/**
 * It's not working. Perhaps:
 *
 * https://docs.channex.io/api-v.1-documentation/bookings-collection#no-show-report-api
 *
 * You can mark a reservation as a no-show from 00:00 (midnight, in property's local time) on the planned check-in date,
 * up to 48 hours later, provided that:
 * - the status of the reservation allows modifications;
 * - the reservation isn't overbooked.
 */
describe("POST /api/v1/bookings/:id/no_show", () => {
  it("should return 200 OK", async () => {
    const payload = {
      no_show_report: {
        waived_fees: false,
      },
    };
    const res = await request(app)
      .post(`${baseUrl}/b70645ff-6e48-403e-9eca-2f788ede2cf9/no_show`)
      .send(payload);

    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("meta");
  });
});

/**
 * It's not working. Perhaps:
 *
 * https://docs.channex.io/api-v.1-documentation/bookings-collection#invalid-card-report-api
 *
 * An invalid credit card can be reported immediately after the reservation is made,
 * up until midnight (00:00) on the day of check-in, in the property's local timezone.
 */
describe("POST /api/v1/bookings/:id/invalid_card", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).post(
      `${baseUrl}/b70645ff-6e48-403e-9eca-2f788ede2cf9/invalid_card`
    );
    console.log(res);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("meta");
  });
});
