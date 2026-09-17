# Giftogram-Technical-Assessment

# Name
## Matthew O'Connor

# How long it took for me to complete the assessment
## Coding: 4 hours
## Documentation & Clean up: 30 minutes
## Writing the README: ~30 minutes
## Overall: ~5 hours

# Summary of my steps
1. When I started this assessment I approached it how I would any problem. I identified what I was going to use which in this case was a very simple NodeJs backend using the free installation of MySQL Server.
2. After everything was installed I moved to architecting the initial design of how I wanted to file system to be laid out to handle the task at hand. This may seem a bit unconventional but for me it serves as a mental model when I don't have a paper and pen by me to break down the different pieces of a project and organize its functionality accordingly. One thing to note is that I do iterate on this initial architecture, it is by no means set in stone.
3. I initialized the project via npm init -y, creating my .gitignore, and adding things like my .env and node_modules to my .gitignore.
4. I began to map out all the functionality I would need. Since this backend wasn't too complex I took it upon myself to take the entire project under scope. However typically I break it into smaller pieces. To map this functionality I write out initial functions I feel I will need or just a few comments in an empty file talking myself through what I want to do and how to do it from a high level.
5. Time to start building! I initially had thought I would wire up the database connection last but I realized it would be hard to test as I go without having the connection along with the database constructed. So, I built a schema file as seen in schema.sql and I created my database from it. 
6. I made sure I had my connection elements in my .env file and I utilized those in my db file to create the database connection with a connection limit of 10. I understand that a connection limit in general for a project like this is definitely overkill but I wanted to architect this how I would think an early staged version of this backend could be deployed and for it to be deployed I had to resolve the issue of waiting on a single connection. Thus, I added a pool of 10 connections to make the database interaction feel flawless, to an extent.
7. Once the database connection was live I jumped straight into the endpoints. I tackled the endpoints in the order of POST first and GET second. My reason for this is because I feel like POST's can feel more daunting than a simple GET and I knew if I could get those finished then the GET's would take a fraction of the time.
8. Every time I finished an endpoint I made sure to test it for success and error to ensure the correct outputs. I also had to make sure everything was wired into the router so the endpoints would be valid.
9. Once I made sure everything was functioning correctly I went back and documented the endpoints. I believe documentation is extremely important but it should clutter the file. Instead it should be clear, concise, and to the point.
10. As I documented things I noticed some spelling mistakes and some more clean up I could do. So, I made a helper function for my POST routes and I noticed I was using body's on my GET routes which they are not supposed to have.
11. After I finished my clean up and I fixed my GET routes I performed a final test of everything and made sure the latest updates were pushed so I could wrap up the project.

# Issues with the endpoint structure
1. The endpoints regarding registering and logging in seemed to be very lacking in security measures from two angles. First, there is nothing stopping something from performing SQL injections, breaking in by inputting an absurdly long password, or entering some other malicious input. Second, there is nothing ensuring the user is as protected as they should be. There is no enforcement on the user's password regarding the length, characters, and capitalization. Also, someone can attempt this login as many times as their heart desires until they break into someones account.
2. There is no protection from someone querying all the messages in a conversation between two people. This would lead to a huge privacy issue.
3. There is nothing preventing someone from querying every single person and their account information. The list_all_users endpoint isn't protected by any tokens, authentication, etc.
4. The project itself doesn't state that there needs to be anything unique at all about a user's account. I took it upon myself to make the user's email unique so a single email couldn't make an infinite number of accounts. But, with how the register endpoint is described it doesn't seem to list that as a requirement which would allow a malicious actor to make tons of accounts.
5. There seems to be no form of rate limiting anywhere. Granted the endpoints are fairly lightweight it would still be a good idea to consider putting rate limiting in to prevent malicious actors from spamming one or more endpoints.

# Suggested improvements
## Security
1. There needs to be required projection against SQL injections or any other sort of malicious input for any endpoint that eventually touches the database via anything other than a GET.
2. There needs to be a requirement for the users password to be more sophisticated by including unique characters, a minimum length, capitalization, numbers, etc.
3. There needs to be some sort of authorization requirement to access messages between two users.
4. There needs to be some sort of authorization requirement to access all users regardless of excluding a user.
5. There needs to be a maximum number of password attempts per session and then the user either has to try after a wait period or their account gets locked.
6. Rate limiting should be considered especially for a messaging platform as you don't want downtime.

## Usability
1. There needs to be something unique about a user, ideally their email.
2. There needs to be a forgot password endpoint otherwise a user can never reset their password to login if they forget their password.

## API Design
1. I would start by ensuring inputs are sanitized from the requests because you should never trust information from the frontend. 
2. I would add the necessary changes to creating a password as mentioned in security improvements (special characters, minimum length, capitalizations, etc.).
3. I would add a maximum amount of login attempts and depending on the type of service this login gives access to I would either lock the account or time out any tries.
4. I would add a forgot password endpoint.
5. I would add an authorization layer to the view_messages endpoint to only allow the two users conversing to each other to see their message history and some sort of admin token as well.
6. I would add an authorization layer to the list_all_users endpoint to only allow a current user or an admin to see the list of users. One thing I would like to note about this point and every time I addressed it prior. I am assuming that only users should be able to see the list of other users not just anyone curious about the list of users.
7. I would create some sort of search endpoint where a user can search through their logs with another user to find a message where they may have said a word, phrase or anything of the sort. This search can be created by a regex lookup of the messages or something similar.
