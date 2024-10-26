// Object to store availability-related data access methods
let availabilityDAO = {};

// In-memory storage for user availabilities
var userAvailabilities = {};

availabilityDAO.getAvailability = async function (userId) {
  try {
    console.log("user id is ", userId);
    const avail = userAvailabilities[userId];
    console.log("Getting availability is ", avail);
    return avail;
  } catch (err) {
    console.log("Error in getting availability is ", err);
    throw new Error("Error in getting availability is ", err);
  }
};

availabilityDAO.addAvailability = async function (userId, availData) {
  try {
    // Store the availability data with a 'rule' property
    userAvailabilities[userId] = {rule: availData};
    console.log("User availability is ", userAvailabilities);
    return userAvailabilities[userId];
  } catch (err) {
    console.log("Error in adding availability is ", err);
    throw new Error("Error in adding availability is ", err);
  }
};

// Export the availabilityDAO object for use in other modules
module.exports = availabilityDAO;