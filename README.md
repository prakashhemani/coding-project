# Assignment
This project provides a basic REST API for managing user availability and finding overlapping schedules, similar to Calendly. This assignment is developed using **Nodejs v18.18.0**

## Live Demo
Use the link: [Live Demo Link](http://3.111.30.50:8080/views/availability) 

## Steps
To set up and run the project locally, make sure Node.js v18.18.0 is installed. Then follow these steps: 
```
1. npm install
2. node index.js
```
Server starts on **port 8080** by default

To run the test cases
```
1. npm test
```


Please find the **postman collection** json in file postman_collection.json

### Approach
The API is designed to handle basic availability and overlap checks. Inspired by the Calendly API structure, users can set availability for:
- Days – Specifying timeslots for each day.
- Date Ranges – Can be added as an extension.
- Holidays – Can be added as an extension.

### Api endpoints
- **POST /api/v1/availability** - To set availability of user
- **GET /api/v1/availability/:userId** - To get availability of user 
- **GET /api/v1/availability/overlap?user1=1&user2=2** - To find overlap between availability of two users 

### Sample Payload
```
{
    "userId": 2,               // Unique identifier for the user
    "rule": [                  // Availability rules for specific days
        {
            "type": "day",     // Type of rule, here set for a weekday
            "day": "monday",   // Day of the week
            "intervals": [     // Time intervals user is available
                {
                    "from": "09:00",   // Start time
                    "to": "12:00"      // End time
                },
                {
                    "from": "14:00",
                    "to": "14:15"
                }
            ]
        },
        {
            "type": "day",     // Another rule for a different day
            "day": "tuesday",
            "intervals": [
                {
                    "from": "09:00",
                    "to": "12:00"
                },
                {
                    "from": "14:00",
                    "to": "15:00"
                }
            ]
        }
    ]
}
```

   
## Assumptions
- **In-memory Data Storage:** The current setup stores data in memory, which can be extended to use a database for persistence.
- **Availability Comparison:** The system compares availability without considering other booked events, focusing solely on open slots.
- **Timezone:** All comparisons are handled in the local timezone.
- **Validation:** Basic data validation is implemented, though additional checks could improve robustness.





   


# Harbor Take Home Project

Welcome to the Harbor take home project. We hope this is a good opportunity for you to showcase your skills.

## The Challenge

Build us a REST API for calendly. Remember to support

- Setting own availability
- Showing own availability
- Finding overlap in schedule between 2 users

It is up to you what else to support.

## Expectations

We care about

- Have you thought through what a good MVP looks like? Does your API support that?
- What trade-offs are you making in your design?
- Working code - we should be able to pull and hit the code locally. Bonus points if deployed somewhere.
- Any good engineer will make hacks when necessary - what are your hacks and why?

We don't care about

- Authentication
- UI
- Perfection - good and working quickly is better

It is up to you how much time you want to spend on this project. There are likely diminishing returns as the time spent goes up.

## Submission

Please fork this repository and reach out to Prakash when finished.

## Next Steps

After submission, we will conduct a 30 to 60 minute code review in person. We will ask you about your thinking and design choices.
