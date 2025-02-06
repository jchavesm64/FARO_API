import request from "supertest";
import { app } from "../../../app";

const baseUrl = "/api/v1/channex/rate_plans";
const mealTypes = {
  none: "none",
  all_inclusive: "all_inclusive",
  breakfast: "breakfast",
  lunch: "lunch",
  dinner: "dinner",
  american: "american",
  bed_and_breakfast: "bed_and_breakfast",
  buffet_breakfast: "buffet_breakfast",
  carribean_breakfast: "carribean_breakfast",
  continental_breakfast: "continental_breakfast",
  english_breakfast: "english_breakfast",
  european_plan: "european_plan",
  family_plan: "family_plan",
  full_board: "full_board",
  full_breakfast: "full_breakfast",
  half_board: "half_board",
  room_only: "room_only",
  self_catering: "self_catering",
  bermuda: "bermuda",
  dinner_bed_and_breakfast_plan: "dinner_bed_and_breakfast_plan",
  family_american: "family_american",
  breakfast_and_lunch: "breakfast_and_lunch",
  lunch_and_dinner: "lunch_and_dinner",
};

const payload = {
  rate_plan: {
    title: "Best Available Rate",
    property_id: "abc867aa-863a-465f-9cc8-e2243086c0c3",
    room_type_id: "4ad24439-ea4d-4438-9eb6-7d7a6871634f",
    // tax_set_id: "4adfa81f-af0a-4b39-834f-1336ab065c08",

    /**
     * Should refer to the docs, for better understanding:
     *
     * https://docs.channex.io/api-v.1-documentation/rate-plans-collection#occupancy-options
     */
    options: [
      {
        occupancy: 3,
        is_primary: true,
        rate: 0,
      },
    ],
    parent_rate_plan_id: null,
    currency: "GBP",
    sell_mode: "per_room",
    rate_mode: "manual", // "manual, derived, cascade, auto"
    meal_type: mealTypes.breakfast,
    auto_rate_settings: null,
    inherit_rate: false,
    inherit_closed_to_arrival: false,
    inherit_closed_to_departure: false,
    inherit_stop_sell: false,
    inherit_min_stay_arrival: false,
    inherit_min_stay_through: false,
    inherit_max_stay: false,
    inherit_max_sell: false,
    inherit_max_availability: false,
    inherit_availability_offset: false,
    children_fee: "0.00",
    infant_fee: "0.00",
    max_stay: [0, 0, 0, 0, 0, 0, 0],
    min_stay_arrival: [1, 1, 1, 1, 1, 1, 1],
    min_stay_through: [1, 1, 1, 1, 1, 1, 1],
    closed_to_arrival: [false, false, false, false, false, false, false],
    closed_to_departure: [false, false, false, false, false, false, false],
    stop_sell: [false, false, false, false, false, false, false],
  },
};

describe("PUT /api/v1/channex/rate_plans", () => {
  it("should update the rate plan and return 200 OK", async () => {
    const ratePlanId = "bd6fc34d-c7ad-4e36-9340-3d55b360c2f3";
    const res = await request(app)
      .put(`${baseUrl}/${ratePlanId}`)
      .send(payload);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

describe("POST /api/v1/channex/rate_plans", () => {
  it("should return 201 Created", async () => {
    const res = await request(app).post(baseUrl).send(payload);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
  });
});

describe("GET /api/v1/channex/rate_plans", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get(baseUrl);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should return a rate plan by ID", async () => {
    const ratePlanId = "bd6fc34d-c7ad-4e36-9340-3d55b360c2f3";

    const res = await request(app).get(`${baseUrl}/${ratePlanId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

describe("GET /api/v1/channex/rate_plans/options", () => {
  it("should return 200 OK", async () => {
    const propertyId = "abc867aa-863a-465f-9cc8-e2243086c0c3";

    const res = await request(app)
      .get(`${baseUrl}/options`)
      .query({ propertyId });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});
