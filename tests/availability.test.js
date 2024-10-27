const request = require("supertest");
const app = require("./../index");

const availabilityDAO = require("../dao/availability");

jest.mock("./../dao/availability");

describe("Availability Service API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //1. Test for get availability
  describe("GET /api/v1/availability/:userId", () => {
    it("should return 200 and the availabilty when user exists", async () => {
      const mockAvailability = {
        rule: [
          {
            type: "day",
            day: "Monday",
            intervals: [{ from: "09:00", to: "17:00" }],
          },
        ],
      };
      availabilityDAO.getAvailability.mockResolvedValue(mockAvailability);

      const response = await request(app).get("/api/v1/availability/123");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ userId: "123", ...mockAvailability });
      expect(availabilityDAO.getAvailability).toHaveBeenCalledWith("123");
    });

    it("should return 404 when no availability is foudn", async () => {
      availabilityDAO.getAvailability.mockResolvedValue(null);
      const response = await request(app).get("/api/v1/availability/123");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No availability found for user 123");
    });

    it("should return 400 on error", async () => {
      availabilityDAO.getAvailability.mockRejectedValue(
        new Error("Database error")
      );
      const response = await request(app).get("/api/v1/availability/123");
      expect(response.status).toBe(400);
    });
  });

  // 2. Test for addA vailability
  describe("POST /availability", () => {
    it("should return 200 when availability is added successfully", async () => {
      availabilityDAO.addAvailability.mockResolvedValue();

      const body = {
        userId: "123",
        rule: [
          {
            type: "day",
            day: "Monday",
            intervals: [{ from: "09:00", to: "17:00" }],
          },
        ],
      };
      const response = await request(app)
        .post("/api/v1/availability")
        .send(body);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Availability set for user 123");
      expect(availabilityDAO.addAvailability).toHaveBeenCalledWith(
        "123",
        body.rule
      );
    });

    it("should return 400 if userId or rule is missing", async () => {
      const response = await request(app).post("/api/v1/availability").send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User ID and rule are required");
    });

    it("should return 400 on error", async () => {
      availabilityDAO.addAvailability.mockRejectedValue(
        new Error("Database error")
      );

      const body = {
        userId: "123",
        rule: {
          type: "day",
          day: "Monday",
          intervals: [{ from: "09:00", to: "17:00" }],
        },
      };
      const response = await request(app)
        .post("/api/v1/availability")
        .send(body);

      expect(response.status).toBe(400);
    });
  });

  // 3. Test for findOverlap
  describe("GET /availability/overlap", () => {
    it("should return 200 with the overlapping intervals", async () => {
      const mockUser1Availability = {
        rule: [
          {
            type: "day",
            day: "Monday",
            intervals: [{ from: "09:00", to: "12:00" }],
          },
        ],
      };
      const mockUser2Availability = {
        rule: [
          {
            type: "day",
            day: "Monday",
            intervals: [{ from: "10:00", to: "14:00" }],
          },
        ],
      };
      availabilityDAO.getAvailability
        .mockResolvedValueOnce(mockUser1Availability)
        .mockResolvedValueOnce(mockUser2Availability);

      const response = await request(app).get(
        "/api/v1/availability/overlap?user1=123&user2=456"
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          type: "day",
          day: "Monday",
          intervals: [{ from: "10:00", to: "12:00" }],
        },
      ]);
    });

    it("should return 400 if availability not found for either user", async () => {
      availabilityDAO.getAvailability.mockResolvedValue(null);

      const response = await request(app).get(
        "/api/v1/availability/overlap?user1=123&user2=456"
      );

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "User availability not found for both users"
      );
    });

    it("should return 400 on error", async () => {
      availabilityDAO.getAvailability.mockRejectedValue(
        new Error("Database error")
      );
      const response = await request(app).get(
        "/api/v1/availability/overlap?user1=123&user2=456"
      );
      expect(response.status).toBe(400);
    });
  });
});
