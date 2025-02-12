import { connect, disconnectDatabase } from "../../../index";
import request from "supertest";
import { app } from "../../../app";
import { getRatePlansRestrictions } from "../graphql/queries";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnectDatabase();
});

describe("POST /graphql getRatePlansRestrictions", () => {
  it("should return the rate plans restrictions", async () => {
    const filters = {
      //   date: "2025-10-01",
      startDate: "2025-01-01",
      endDate: "2025-02-20",
      propertyId: "abc867aa-863a-465f-9cc8-e2243086c0c3",
      restrictions:
        "min_stay_arrival,rate,availability,max_stay,closed_to_arrival,min_stay_thorugh,min_stay,closed_to_departure,stop_sell,availability_offset,max_availability",
    };

    const { body } = await request(app).post("/graphql").send({
      query: getRatePlansRestrictions,
      variables: { filters },
    });

    console.log(body);

    expect(body.data.getRatePlansRestrictions).toBeDefined();
  });
});
