# Assignment
This assignment is developed using **Nodejs v18.18.0**

## Live Demo
Use the link: [Live Demo Link](#) 

## Steps
To run the project, please use the following commands. Assuming Nodejs v18.18.0 is already installed. Server starts on port 8080.
```
1. npm install
2. node index.js
```

To run the test cases
```
1. npm test
```

Please find the **postman collection** json in the file postman_collection.json

### Approach
Went through calendly apis and payload and understood a user can set the availability according to
- days 
- Specific Date range 
- Holidays

### Api endpoints
- **POST /api/v1/availability** - To set availability of user
- **GET /api/v1/availability/:userId** - To get availability of user 
- **GET /api/v1/availability/overlap?user1=1&user2=2** - To find overlap between availability of two users 

### Sample Payload
```
{
    "userId": 2,
    "rule": [
        {
            "type": "day",
            "day": "monday",
            "intervals": [
                {
                    "from": "09:00",
                    "to": "12:00"
                },
                {
                    "from": "14:00",
                    "to": "14:15"
                }
            ]
        },
        {
            "type": "day",
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
- Storing the data right now in memory.
- Setting the user availability based on the day. Can be extended to accomadate date range and holidays.
- While comparing the schedules for two users, checking the overalap based on the availabilty. Not taking into booked events/meeting for that particular user
- Schedule comparison is being handled for local timezon
- Need to add propoer data vaidation to check request payload





   


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
