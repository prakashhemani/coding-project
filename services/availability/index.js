"use strict";
const availabilityDAO = require("../../dao/availability");

var availabilitySvc = {};

// Get availability for a specific user
availabilitySvc.getAvailability = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const avail = await availabilityDAO.getAvailability(userId);
    if (!avail) {
      return res
        .status(404)
        .json({ message: `No availability found for user ${userId}` });
    }
    console.log("avail is ", avail);
    res.status(200).json({ userId: userId, ...avail });
  } catch (error) {
    console.log("Error in getting availability is ", error);
    return res.status(400).json(error);
  }
};

// Add availability for a user
availabilitySvc.addAvailability = async (req, res, next) => {
  try {
    const { userId, rule } = req.body;
    if (!userId || !rule) {
      return res.status(400).json({ message: "User ID and rule are required" });
    }
    await availabilityDAO.addAvailability(userId, rule);
    res.status(200).json({ message: `Availability set for user ${userId}` });
  } catch (error) {
    console.log("Error in adding availability is ", error);
    return res.status(400).json(error);
  }
};

// Find overlapping availability between two users
availabilitySvc.findOverlap = async (req, res, next) => {
  try {
    const { user1, user2 } = req.query;
    console.log("User1 is ", user1);
    console.log("User2 is ", user2);
    const availRule1 = await availabilityDAO.getAvailability(user1);
    const availRule2 = await availabilityDAO.getAvailability(user2);

    if (!user1 || !user2 || !availRule1 || !availRule2) {
      return res
        .status(400)
        .json({ message: "User availability not found for both users" });
    }
    const overlap = findOverlap(availRule1, availRule2);
    let result = [];
    Object.keys(overlap).forEach((day) => {
      result.push({
        type: "day",
        day: day,
        intervals: overlap[day],
      });
    });
    res.status(200).json(result);
  } catch (error) {
    console.log("Error in getting overlap is ", error);
    return res.status(400).json(error);
  }
};

// Helper function to find overlapping availability
function findOverlap(availRule1, availRule2) {
  console.log("avail rule 1 is ", availRule1);
  console.log("avail rule 2 is ", availRule2);
  let overlaps = [];

  // Organize availability slots by day for each user
  let user1DaywiseSlot = organizeDaywiseSlots(availRule1["rule"]);
  let user2DaywiseSlot = organizeDaywiseSlots(availRule2["rule"]);

  console.log("user1 daywise slot is ", user1DaywiseSlot);
  console.log("user2 daywise slot is ", user2DaywiseSlot);

  // Find overlaps for each day
  Object.keys(user1DaywiseSlot).forEach((day) => {
    console.log("day is ", day);
    const user1DayIntervals = user1DaywiseSlot[day];
    const user2DayIntervals = user2DaywiseSlot[day];
    console.log("user 1 interval for day is ", user1DayIntervals);
    console.log("user 2 interval for day is ", user2DayIntervals);

    // Compare intervals and find overlaps
    user1DayIntervals?.forEach((interval1) => {
      user2DayIntervals?.forEach((interval2) => {
        const start =
          interval1.from > interval2.from ? interval1.from : interval2.from;
        const end = interval1.to < interval2.to ? interval1.to : interval2.to;
        if (start < end) {
          if (!overlaps[day]) {
            overlaps[day] = [];
          }
          overlaps[day].push({ from: start, to: end });
        }
      });
    });
  });
  console.log("overlaps is ", overlaps);
  return overlaps;
}

// Helper function to organize slots by day
function organizeDaywiseSlots(slots) {
  let daywiseSlots = {};
  slots.forEach((slot) => {
    if (slot["type"] == "day") {
      daywiseSlots[slot["day"]] = slot["intervals"];
    }
  });
  return daywiseSlots;
}

module.exports = availabilitySvc;
