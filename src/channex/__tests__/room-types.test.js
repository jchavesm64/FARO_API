import request from "supertest";
import { app } from "../../app";

const baseUrl = "/api/v1/channex/room_types";
const propertyId = "af075923-52d0-4829-ac67-b3491913ac7a";

describe("GET /api/v1/channex/room_types", () => {
  it("should return all room types", async () => {
    const res = await request(app).get(baseUrl);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should return all room types based on the property ID", async () => {
    const res = await request(app).get(`${baseUrl}?propertyId=${propertyId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should return a single room type based on the room type ID", async () => {
    const roomTypeId = "66cbaf0a-d47b-4d25-8b94-53c0a7f280b9";
    const res = await request(app).get(`${baseUrl}/${roomTypeId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should return the room type options", async () => {
    const res = await request(app).get(`${baseUrl}/options`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

describe("PUT /api/v1/channex/room_types", () => {
  it("should update a room type and return 200 ", async () => {
    const roomTypeId = "8119049f-db72-4989-9c51-3c5d7901de08";
    const payload = {
      room_type: {
        title: "Standard Room (Updated)",
        count_of_rooms: 20,
        occ_adults: 3,
        occ_children: 0,
        occ_infants: 0,
        default_occupancy: 2,
        room_kind: "room",
        capacity: null,
        content: {
          description: "Some Room Type Description Text",
        },
      },
    };
    const res = await request(app)
      .put(`${baseUrl}/${roomTypeId}`)
      .send(payload);

    console.log(res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});

describe("POST /api/v1/channex/room_types", () => {
  it("should create a new room type and return 201 Created", async () => {
    const payload = {
      room_type: {
        property_id: propertyId,
        title: "Standard Room",
        count_of_rooms: 20,
        occ_adults: 3,
        occ_children: 0,
        occ_infants: 0,
        default_occupancy: 2,
        facilities: [],
        room_kind: "room",
        capacity: null,
        content: {
          description: "Some Room Type Description Text",
        },
      },
    };

    const res = await request(app).post(baseUrl).send(payload);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
  });
});

describe("DELETE /api/v1/channex/room_types", () => {
  it("should delete a room type and return 200", async () => {
    const roomTypeId = "8119049f-db72-4989-9c51-3c5d7901de08";

    const res = await request(app).delete(`${baseUrl}/${roomTypeId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("meta");
  });
});
