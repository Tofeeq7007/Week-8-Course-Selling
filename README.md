## Create a course selling app

- Initialize a new Node.js project
- Add Express, Mongoose,jsonwebtoken to it as a dependency
- Create index. js
- Add route skeleton for user login, signup, purchase a course, see the purchased courses
- Add routes for admin login, admin signup, create a course, delete a course, add course content.
- Define the schema for User, Admin, Course, Purchase
- Add middlewares for user and admin auth
- Add a database (mongodb), use dotenv to store the database connection string
- Complete the routes for user login, signup, purchase a course, see course (Extra points - Use express routing to
better structure your routes)
- Create the frontend

Good to have 
    - Use cookies intead of JWT for auth
    - Add a rate limiting middleware
    - Frontend in ejs (low Priority)
    - Frontend in React (try High Priority)